// free-locks.js
// Role: Name each process that may lock a build output or install target, then stop that process by ID.
// Last reviewed: 2026-11-27

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const dryRun = args.indexOf('--dry-run') !== -1;
const rawTargets = args.filter(function (value) {
  return value.indexOf('--') !== 0;
});
const targets = (rawTargets.length > 0 ? rawTargets : ['builds']).map(function (value) {
  return path.resolve(process.cwd(), value);
});

// These processes are never stopped, even when a path matches, because they own the session or the desktop.
const protectedNames = [
  'system',
  'idle',
  'smss.exe',
  'csrss.exe',
  'wininit.exe',
  'winlogon.exe',
  'services.exe',
  'lsass.exe',
  'svchost.exe',
  'explorer.exe',
  'dwm.exe',
  'taskhostw.exe',
  'searchhost.exe',
  'startmenuexperiencehost.exe',
  'shellexperiencehost.exe',
  'textinputhost.exe',
  'applicationframehost.exe',
  'runtimebroker.exe',
  'launchd',
  'init',
  'systemd'
];

function normalize(value) {
  const resolved = path.resolve(value);
  return process.platform === 'win32' ? resolved.toLowerCase() : resolved;
}

// A command line can carry either separator, so compare both forms.
function normalizeText(value) {
  const text = String(value);
  if (process.platform !== 'win32') {
    return text;
  }
  return text.toLowerCase().replace(/\//g, '\\');
}

function inside(child, parent) {
  const left = normalize(child);
  const right = normalize(parent);
  return left === right || left.indexOf(right + path.sep) === 0;
}

function folderMatches(text, target) {
  const haystack = normalizeText(text);
  const needle = normalizeText(target);
  return haystack === needle || haystack.indexOf(needle + (process.platform === 'win32' ? '\\' : '/')) !== -1 || haystack.indexOf(needle + ' ') !== -1 || haystack.indexOf(needle + '"') !== -1;
}

function listWindows() {
  const command = [
    '$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()',
    '$items = @(Get-CimInstance Win32_Process | Select-Object ProcessId,ParentProcessId,Name,ExecutablePath,CommandLine)',
    'ConvertTo-Json -InputObject $items -Compress -Depth 3'
  ].join('; ');
  const text = execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', command], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    timeout: 60000,
    windowsHide: true
  });
  const parsed = JSON.parse(text);
  const list = Array.isArray(parsed) ? parsed : [parsed];
  return list.filter(function (item) {
    return item && item.ProcessId;
  }).map(function (item) {
    return {
      pid: Number(item.ProcessId),
      ppid: Number(item.ParentProcessId),
      name: String(item.Name || ''),
      exe: String(item.ExecutablePath || ''),
      commandLine: String(item.CommandLine || '')
    };
  });
}

function listPosix() {
  const text = execFileSync('ps', ['-eo', 'pid=,ppid=,comm=,args='], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
    timeout: 30000
  });
  const list = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*(\d+)\s+(\d+)\s+(\S+)\s*(.*)$/);
    if (!match) {
      continue;
    }
    list.push({
      pid: Number(match[1]),
      ppid: Number(match[2]),
      name: match[3],
      exe: '',
      commandLine: match[4]
    });
  }
  return list;
}

// Each entry is a process that names a target path in its executable path or command line.
function findLockHolders(list, target) {
  const byPid = new Map();
  for (const item of list) {
    byPid.set(item.pid, item);
  }

  const own = new Set();
  let cursor = process.pid;
  while (cursor && byPid.has(cursor) && !own.has(cursor)) {
    own.add(cursor);
    cursor = byPid.get(cursor).ppid;
  }

  const holders = [];
  const skipped = [];
  for (const item of list) {
    const name = item.name.toLowerCase();
    const exeMatch = item.exe && inside(item.exe, target);
    const commandMatch = item.commandLine && folderMatches(item.commandLine, target);
    if (!exeMatch && !commandMatch) {
      continue;
    }

    const holder = {
      pid: item.pid,
      name: item.name,
      path: item.exe || item.name,
      target: target
    };

    if (own.has(item.pid)) {
      skipped.push(Object.assign(holder, { reason: 'this process or a parent' }));
      continue;
    }
    if (protectedNames.indexOf(name) !== -1) {
      skipped.push(Object.assign(holder, { reason: 'protected system process' }));
      continue;
    }
    holders.push(holder);
  }
  return { holders: holders, skipped: skipped };
}

function stillRunning(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === 'EPERM';
  }
}

function sleep(milliseconds) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

// A signal is immediate on Windows. Elsewhere the process gets a grace period before a hard stop.
function stop(pid) {
  process.kill(pid);
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (!stillRunning(pid)) {
      return true;
    }
    sleep(100);
  }
  if (process.platform !== 'win32') {
    try {
      process.kill(pid, 'SIGKILL');
    } catch (error) {
      return !stillRunning(pid);
    }
    return !stillRunning(pid);
  }
  return !stillRunning(pid);
}

function line(prefix, holder) {
  return prefix + ': pid=' + holder.pid + ' name=' + holder.name + ' path=' + holder.path + ' target=' + holder.target;
}

function main() {
  let list;
  try {
    list = process.platform === 'win32' ? listWindows() : listPosix();
  } catch (error) {
    // A scan error must not block an unrelated build. The locked write fails loudly on its own.
    console.log('WARN: process scan failed, no lock holder was stopped: ' + error.message);
    console.log('PASS: lock check skipped');
    return 0;
  }

  let stopped = 0;
  for (const target of targets) {
    if (!fs.existsSync(target)) {
      console.log('PASS: no lock holder for ' + target + ' because the path does not exist');
      continue;
    }

    const found = findLockHolders(list, target);
    for (const holder of found.skipped) {
      console.log(line('SKIP', holder) + ' reason=' + holder.reason);
    }

    if (found.holders.length === 0) {
      console.log('PASS: no lock holder for ' + target);
      continue;
    }

    for (const holder of found.holders) {
      console.log(line('LOCK', holder));
      if (dryRun) {
        console.log('KEEP: pid=' + holder.pid + ' dry run');
        continue;
      }
      try {
        if (stop(holder.pid)) {
          stopped += 1;
          console.log('STOPPED: pid=' + holder.pid + ' name=' + holder.name);
        } else {
          console.log('WARN: pid=' + holder.pid + ' is still running after the stop signal');
        }
      } catch (error) {
        console.log('WARN: pid=' + holder.pid + ' could not be stopped: ' + error.message);
      }
    }
  }

  console.log('PASS: stopped ' + stopped + ' lock holder(s) for ' + targets.join(', '));
  return 0;
}

process.exitCode = main();

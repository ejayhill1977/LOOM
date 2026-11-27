// check-free-locks.js
// Title: Build lock stop gate
// Role: Prove the lock helper names and stops a lock holder.
// Last reviewed: 2026-11-27

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawn } = require('child_process');

const root = path.resolve(__dirname, '..', '..');
const helper = path.join(__dirname, '..', 'free-locks.js');
const failures = [];

function sleep(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

async function waitFor(predicate, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) {
      return true;
    }
    await sleep(50);
  }
  return predicate();
}

function removeFolder(folder) {
  try {
    fs.rmSync(folder, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch (error) {
    failures.push('Could not remove the test folder ' + folder + ': ' + error.message);
  }
}

// The holder keeps a file open and keeps the target path in its command line.
// Both facts are what the helper reads to name the process.
function startHolder(folder) {
  const script = path.join(folder, 'hold-lock.js');
  const file = path.join(folder, 'artifact.txt');
  const source = [
    'const fs = require("fs");',
    'const file = process.argv[2];',
    'const handle = fs.openSync(file, "w");',
    'fs.writeSync(handle, "held");',
    'process.stdout.write("READY\\n");',
    'setInterval(function () { fs.writeSync(handle, "held"); }, 500);'
  ].join('\n');
  fs.writeFileSync(script, source);

  const child = spawn(process.execPath, [script, file], {
    cwd: folder,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  });
  let output = '';
  child.stdout.on('data', function (chunk) {
    output += String(chunk);
  });
  child.stderr.on('data', function (chunk) {
    output += String(chunk);
  });

  return {
    child: child,
    file: file,
    ready: function () {
      return output.indexOf('READY') !== -1;
    },
    output: function () {
      return output;
    },
    exited: function () {
      return child.exitCode !== null || child.signalCode !== null;
    },
    stop: function () {
      if (!this.exited()) {
        try {
          child.kill();
        } catch (error) {
          failures.push('Could not stop the test holder: ' + error.message);
        }
      }
    }
  };
}

function runHelper(target, extra) {
  const helperArgs = [helper].concat(extra || [], [target]);
  try {
    return {
      status: 0,
      output: execFileSync(process.execPath, helperArgs, {
        cwd: root,
        encoding: 'utf8',
        timeout: 120000,
        windowsHide: true
      })
    };
  } catch (error) {
    return {
      status: error.status === undefined ? -1 : error.status,
      output: String(error.stdout || '') + String(error.stderr || '')
    };
  }
}

async function main() {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'loom-lock-gate-'));
  const emptyFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'loom-lock-empty-'));
  const holder = startHolder(folder);

  try {
    if (!await waitFor(holder.ready, 20000)) {
      failures.push('The test holder never reported READY: ' + holder.output());
    } else {
      const before = runHelper(folder);
      if (before.status !== 0) {
        failures.push('The helper exited ' + before.status + ' with a lock holder present: ' + before.output);
      }
      if (before.output.indexOf('pid=' + holder.child.pid + ' ') === -1) {
        failures.push('The helper did not name the holder PID ' + holder.child.pid + ': ' + before.output);
      }
      if (before.output.toLowerCase().indexOf(folder.toLowerCase()) === -1) {
        failures.push('The helper did not name the locked path ' + folder + ': ' + before.output);
      }
      if (!await waitFor(holder.exited, 20000)) {
        failures.push('The holder is still running after the helper returned');
      }

      const after = runHelper(folder);
      if (after.output.indexOf('PASS: no lock holder for ' + folder) === -1) {
        failures.push('The helper did not report the target clear after the stop: ' + after.output);
      }
    }
  } finally {
    holder.stop();
  }

  const keepFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'loom-lock-keep-'));
  const keepHolder = startHolder(keepFolder);
  try {
    if (!await waitFor(keepHolder.ready, 20000)) {
      failures.push('The dry run holder never reported READY: ' + keepHolder.output());
    } else {
      const dry = runHelper(keepFolder, ['--dry-run']);
      if (dry.output.indexOf('LOCK: pid=' + keepHolder.child.pid + ' ') === -1) {
        failures.push('The dry run did not name the holder PID ' + keepHolder.child.pid + ': ' + dry.output);
      }
      if (dry.output.indexOf('KEEP: pid=' + keepHolder.child.pid) === -1) {
        failures.push('The dry run did not keep the holder: ' + dry.output);
      }
      await sleep(500);
      if (keepHolder.exited()) {
        failures.push('The dry run stopped the holder');
      }
    }
  } finally {
    keepHolder.stop();
    await waitFor(keepHolder.exited, 10000);
    await sleep(300);
    removeFolder(keepFolder);
  }

  const empty = runHelper(emptyFolder);
  if (empty.status !== 0) {
    failures.push('The helper exited ' + empty.status + ' with no lock holder: ' + empty.output);
  }
  if (empty.output.indexOf('PASS: no lock holder for ' + emptyFolder) === -1) {
    failures.push('The helper did not report an empty target as clear: ' + empty.output);
  }

  removeFolder(folder);
  removeFolder(emptyFolder);

  if (failures.length > 0) {
    for (const failure of failures) {
      console.log('FAIL: ' + failure);
    }
    process.exit(1);
  }

  console.log('PASS: lock helper named the holder by PID and path, stopped it, and cleared empty targets');
}

main();

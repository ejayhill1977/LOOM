// one-shot.js
// Role: Run the gates, refresh the docs, commit, push, and build in one command.
// Last reviewed: 2026-11-27

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const node = process.execPath;
const artifactNames = ['index.html', 'styles.css', 'app.js', 'favicon.ico', 'docs.js'];
const syntaxFiles = [
  'app.js',
  'ask-onboarding.js',
  'check-contradictions.js',
  'check-docs.js',
  'discover-mcp.js',
  'free-locks.js',
  'generate-docs.js',
  'mcp-lib.js',
  'one-shot.js',
  'smoke-test.js',
  'update-comments.js',
  'update-roadmap.js',
  path.join('gates', 'check-data-rules.js'),
  path.join('gates', 'check-free-locks.js')
];
const results = [];

function fail(message) {
  console.log('\nFAIL: ' + message);
  process.exit(1);
}

function label(command, commandArgs) {
  return (command === node ? 'node' : command) + ' ' + commandArgs.join(' ');
}

function run(command, commandArgs) {
  const line = label(command, commandArgs);
  console.log('> ' + line);
  try {
    execFileSync(command, commandArgs, { cwd: root, stdio: 'inherit' });
  } catch (error) {
    fail('command failed with exit ' + (error.status === undefined ? 'unknown' : error.status) + ': ' + line);
  }
}

function capture(command, commandArgs) {
  try {
    return execFileSync(command, commandArgs, { cwd: root, encoding: 'utf8' });
  } catch (error) {
    fail('command failed with exit ' + (error.status === undefined ? 'unknown' : error.status) + ': ' + label(command, commandArgs));
  }
}

function step(name, action) {
  console.log('\n--- ' + name + ' ---');
  const started = Date.now();
  action();
  const seconds = ((Date.now() - started) / 1000).toFixed(1);
  results.push(name + ' (' + seconds + 's)');
}

function buildFile(relative) {
  return path.join('build', relative);
}

function preflight() {
  capture('git', ['rev-parse', '--is-inside-work-tree']);

  const branch = capture('git', ['branch', '--show-current']).trim();
  if (branch !== 'main') {
    fail('the pipeline runs on main only and the current branch is "' + (branch || 'detached HEAD') + '"');
  }

  if (/\bmaster\b/.test(capture('git', ['branch', '--list', 'main', 'master']))) {
    fail('a master branch exists next to main. Resolve the branch pair before running the pipeline');
  }

  const remotes = capture('git', ['remote']).split(/\r?\n/).map(function (value) {
    return value.trim();
  }).filter(Boolean);
  if (remotes.indexOf('origin') === -1) {
    fail('the repository has no origin remote');
  }

  const url = capture('git', ['remote', 'get-url', 'origin']).trim();
  if (url.indexOf('github.com') === -1) {
    fail('origin is not a GitHub remote: ' + url);
  }

  console.log('Branch: main');
  console.log('Remote: origin ' + url);
}

// The preflight gates read documents and settings only. They stop the run before any file is written.
function preflightGates() {
  run(node, [buildFile('check-contradictions.js')]);
  run(node, [buildFile(path.join('gates', 'check-data-rules.js'))]);
}

function assertNoSecrets() {
  const names = capture('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'])
    .split(/\r?\n/)
    .map(function (value) {
      return value.trim();
    })
    .filter(Boolean);
  const patterns = [
    /\.env(\.|$)/i,
    /secret/i,
    /credential/i,
    /token/i,
    /private[-_]?key/i,
    /id_rsa/i,
    /\.pem$/i,
    /\.pfx$/i,
    /\.p12$/i,
    /git-details\.local\.json$/i
  ];
  const flagged = names.filter(function (name) {
    return patterns.some(function (pattern) {
      return pattern.test(name);
    });
  });

  if (flagged.length > 0) {
    fail('staged files look sensitive. Unstage them and keep them in an ignored local file: ' + flagged.join(', '));
  }

  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(capture('git', ['diff', '--cached']))) {
    fail('the staged change contains a private key block. Remove it before the pipeline commits');
  }

  console.log('Secret scan: no likely secret in the staged change');
}

function buildArtifacts() {
  // The lock step runs first because a holder of builds\\ blocks the artifact write.
  run(node, [buildFile('free-locks.js'), 'builds']);
  run(node, [buildFile('generate-docs.js')]);

  const outputDir = path.join(root, 'builds');
  for (const name of artifactNames) {
    const file = path.join(outputDir, name);
    if (!fs.existsSync(file)) {
      fail('missing build artifact: ' + path.join('builds', name));
    }
    console.log('artifact: ' + path.join('builds', name) + ' (' + fs.statSync(file).size + ' bytes)');
  }
}

// The documentation gate compares builds\ with build\, so it runs after the artifact build.
function gates() {
  run(node, [buildFile('check-docs.js')]);
  run(node, [buildFile('check-contradictions.js')]);
  run(node, [buildFile(path.join('gates', 'check-data-rules.js'))]);
  run(node, [buildFile(path.join('gates', 'check-free-locks.js'))]);

  for (const relative of syntaxFiles) {
    run(node, ['--check', buildFile(relative)]);
  }
}

function commit() {
  const status = capture('git', ['status', '--short']).trim();

  if (!status) {
    console.log('No changes to commit.');
    return;
  }

  console.log('Changes detected:');
  console.log(status);

  run('git', ['add', '--all']);
  assertNoSecrets();

  const staged = capture('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR']).trim();
  if (!staged) {
    fail('git add staged no files');
  }
  console.log('Staged files:');
  console.log(staged);

  const message = [
    'Refresh code comments, roadmap, and viewer artifacts',
    '',
    'The one-shot pipeline refreshes comment dates and the roadmap, then builds the',
    'static viewer before the gate that compares it, so one run leaves a clean tree.',
    '',
    'Steps: preflight, preflight gates, code comments, roadmap, artifacts, gates, commit, push.',
    'Artifact: builds\\ with ' + artifactNames.join(', ') + '.',
    'Gate verdict: check-docs PASS, check-contradictions PASS, check-data-rules PASS.'
  ].join('\n');

  run('git', ['commit', '-m', message]);
}

function push() {
  console.log(capture('git', ['status', '-sb']).split(/\r?\n/)[0]);
  run('git', ['push', 'origin', 'main']);
}

function summary() {
  console.log('\n=== one-shot pipeline complete ===');
  for (const line of results) {
    console.log('step: ' + line);
  }
  console.log('commit: ' + capture('git', ['log', '-1', '--format=%h %s']).trim());
  console.log('remote: ' + capture('git', ['status', '-sb']).split(/\r?\n/)[0]);
  console.log('artifacts: builds\\ with ' + artifactNames.join(', '));
}

function main() {
  if (args.indexOf('one-shot') === -1) {
    console.log('Usage: node build\\one-shot.js one-shot');
    process.exit(1);
  }

  console.log('=== one-shot CI/CD pipeline ===');

  step('Step 1: Preflight', preflight);
  step('Step 2: Preflight gates', preflightGates);
  step('Step 3: Update code comments', function () {
    run(node, [buildFile('update-comments.js')]);
  });
  step('Step 4: Update roadmap', function () {
    run(node, [buildFile('update-roadmap.js')]);
  });
  step('Step 5: Build artifacts', buildArtifacts);
  step('Step 6: Gates', gates);
  step('Step 7: Commit', commit);
  step('Step 8: Push', push);

  summary();
}

main();

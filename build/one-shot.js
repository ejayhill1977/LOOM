const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

function run(command, description) {
  console.log('> ' + command);
  const result = execSync(command, { cwd: root, stdio: 'inherit', encoding: 'utf8' });
  return result;
}

function main() {
  if (args.indexOf('one-shot') === -1) {
    console.log('Usage: node build\\one-shot.js one-shot');
    process.exit(1);
  }

  console.log('=== one-shot CI/CD pipeline ===');

  // Step 1: Run gates
  console.log('\n--- Step 1: Run gates ---');
  run('node build\\check-docs.js', 'documentation checks');
  run('node build\\check-contradictions.js', 'contradiction checks');

  // Step 2: Update documentation (regenerate embedded docs from templates)
  console.log('\n--- Step 2: Update documentation ---');
  run('node build\\generate-docs.js', 'generate docs');

  // Step 3: Commit changes if any
  console.log('\n--- Step 3: Commit ---');
  const status = execSync('git status --short', { cwd: root, encoding: 'utf8' }).trim();
  if (status) {
    console.log('Changes detected:');
    console.log(status);
    run('git add -A', 'stage all changes');
    run('git commit -m "one-shot: update code comments and documentation"', 'commit changes');
  } else {
    console.log('No changes to commit.');
  }

  // Step 4: Push
  console.log('\n--- Step 4: Push ---');
  run('git push origin main', 'push to origin main');

  // Step 5: Build (final artifact generation)
  console.log('\n--- Step 5: Build ---');
  run('node build\\generate-docs.js', 'build artifacts');

  console.log('\n=== one-shot pipeline complete ===');
}

main();

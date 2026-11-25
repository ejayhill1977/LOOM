// check-data-rules.js
// Title: Data storage and onboarding default rules gate

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const failures = [];

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

const dataRulePhrases = [
  'Never store project data outside',
  'Store every database and data file in the `data\\` subfolder',
  'Never modify, move, or delete a file or folder'
];

const ruleFiles = [
  'AGENTS.md',
  'build\\AGENTS.template.md',
  'build\\handoff\\AGENTS.md'
];

for (const relative of ruleFiles) {
  const text = read(relative);
  for (const phrase of dataRulePhrases) {
    if (!text.includes(phrase)) {
      failures.push(relative + ' is missing data rule: ' + phrase);
    }
  }
}

const handoffAgents = read('build\\handoff\\AGENTS.md');

const defaultPhrases = [
  'Default or guidance',
  'Offer the current working directory',
  'Default to `main`',
  'tier list',
  'create your final product or installer',
  'Default to `check`',
  'Default to `builds\\`',
  'Model Context Protocol (MCP)',
  'Bring each contradiction to the user'
];

for (const phrase of defaultPhrases) {
  if (!handoffAgents.includes(phrase)) {
    failures.push('handoff AGENTS.md is missing onboarding default: ' + phrase);
  }
}

for (let id = 1; id <= 11; id += 1) {
  const row = '| Q' + id + ' |';
  if (!handoffAgents.includes(row)) {
    failures.push('handoff AGENTS.md is missing question row: Q' + id);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.log('FAIL: ' + failure);
  }
  process.exit(1);
}

console.log('PASS: data storage rules and onboarding defaults');
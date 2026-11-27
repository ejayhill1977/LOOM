// check-backup.js
// Title: Backup policy regression gate
// Role: Enforce the backup policy rules in rulebooks and handoff templates.
// Last reviewed: 2026-11-27

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const failures = [];

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

const backupRulePhrases = [
  'Make every backup feature resilient',
  'Keep every custom setting',
  'Make one backup each day',
  'Keep at least 10 daily backups',
  'Test each backup path'
];

const ruleFiles = [
  'AGENTS.md',
  'build\\AGENTS.template.md',
  'build\\handoff\\AGENTS.md'
];

for (const relative of ruleFiles) {
  const text = read(relative);
  for (const phrase of backupRulePhrases) {
    if (!text.includes(phrase)) {
      failures.push(relative + ' is missing backup rule: ' + phrase);
    }
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.log('FAIL: ' + failure);
  }
  process.exit(1);
}

console.log('PASS: backup policy rules');
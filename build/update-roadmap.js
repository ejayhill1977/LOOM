// update-roadmap.js
// Role: Refresh the verified date and the pipeline entry in ROADMAP.md.
// Last reviewed: 2026-11-26

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const roadmapPath = path.join(root, 'ROADMAP.md');

// Reminder: this tool owns the verified date and one pipeline line per day. It never rewrites other prose.
const changeLogStart = '## 7. Change log';
const changeLogEnd = '## 8. Maintenance';
const pipelineEntry = '- Ran the one-shot pipeline: gates, code comment review, roadmap refresh, artifact build, commit, push.';

function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return String(now.getFullYear()) + '-' + month + '-' + day;
}

function fail(message) {
  console.log('FAIL: roadmap refresh. ' + message);
  process.exit(1);
}

const original = fs.readFileSync(roadmapPath, 'utf8');
const date = today();
const changes = [];
let text = original;

const verifiedPattern = /Verified on \d{4}-\d{2}-\d{2}\./;
if (!verifiedPattern.test(text)) {
  fail('no verified date was found');
}

const refreshed = text.replace(verifiedPattern, 'Verified on ' + date + '.');
if (refreshed !== text) {
  text = refreshed;
  changes.push('status snapshot date -> ' + date);
}

const start = text.indexOf(changeLogStart);
const end = text.indexOf(changeLogEnd);

if (start === -1 || end === -1 || end < start) {
  fail('the change log or maintenance heading is missing');
}

const changeLog = text.slice(start, end);
const heading = '### ' + date;

if (changeLog.includes(heading)) {
  const headingIndex = changeLog.indexOf(heading);
  const nextSection = changeLog.indexOf('\n### ', headingIndex + heading.length);
  const sectionEnd = nextSection === -1 ? changeLog.length : nextSection;
  const section = changeLog.slice(headingIndex, sectionEnd);

  if (!section.includes(pipelineEntry)) {
    const lineEnd = changeLog.indexOf('\n', headingIndex) + 1;
    const updated = changeLog.slice(0, lineEnd) + '\n' + pipelineEntry + '\n' + changeLog.slice(lineEnd);
    text = text.slice(0, start) + updated + text.slice(end);
    changes.push('pipeline entry for ' + date);
  }
} else {
  const head = text.slice(0, end).replace(/\n*$/, '\n\n');
  const section = '### ' + date + '\n\n' + pipelineEntry + '\n\n';
  text = head + section + text.slice(end);
  changes.push('change log section for ' + date);
}

if (text !== original) {
  fs.writeFileSync(roadmapPath, text, 'utf8');
}

if (changes.length === 0) {
  console.log('No roadmap changes.');
} else {
  for (const change of changes) {
    console.log('UPDATE: ' + change);
  }
}

console.log('PASS: roadmap refresh');

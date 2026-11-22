const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
// Reminder: tab checks cover handoff templates only. Do not use LOOM-specific root docs as embedded tab content.
const handoffDir = path.join(__dirname, 'handoff');
const markdownFiles = ['README.md', 'ANALYSIS.md', 'AGENTS.md', 'SKILLS.md', 'ROADMAP.md'];
const tabbedFiles = ['AGENTS.md', 'SKILLS.md', 'README.md', 'ROADMAP.md'];
const failures = [];

const requiredSections = {
  'README.md': ['## Document map', '## Agent onboarding', '## How to use LOOM', '## Terminology'],
  'ANALYSIS.md': ['## 1. Scope', '## 6. Conflicts found'],
  'AGENTS.md': ['## 0. Agent onboarding', '## 3. Writing rules', '## 7. Linting, formatting, typechecking, and testing', '## 8. Version control', '## 9. Building and running', '## 10. MCP integration', '## 12. Definition of done'],
  'SKILLS.md': ['## Skill catalogue', '## 15. Run an onboarding interview', '## 16. Resolve documentation contradictions', '## 17. Document MCP integration'],
  'ROADMAP.md': ['## 2. Status snapshot', '## 3. Open work', '## 7. Change log']
};

const handoffSections = {
  'AGENTS.md': ['## 0. Agent onboarding', '## 3. Writing rules', '## 7. Linting, formatting, typechecking, and testing', '## 10. MCP integration', '## 12. Definition of done'],
  'SKILLS.md': ['## Catalogue', '## 15. Run an onboarding interview', '## 16. Resolve contradictions', '## 17. Document MCP integration'],
  'README.md': ['## Document map', '## Setup', '## Operation', '## Verification', '## MCP surface', '## Terminology'],
  'ROADMAP.md': ['## Status snapshot', '## Open work', '## Decisions', '## Change log']
};

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

function checkWriting(name, text) {
  const prose = stripCode(text);
  if (prose.includes('\u2014')) {
    failures.push('Em-dash in ' + name);
  }
  if (prose.includes(';')) {
    failures.push('Semicolon in ' + name);
  }
  if (/\b(?:don't|can't|won't|it's|isn't|aren't|wasn't|weren't|shouldn't|couldn't|wouldn't)\b/i.test(prose)) {
    failures.push('Contraction in ' + name);
  }
}

function checkH1(name, text) {
  const h1Count = text.split('\n').filter(function (line) {
    return line.startsWith('# ');
  }).length;
  if (h1Count !== 1) {
    failures.push('Expected one H1 in ' + name + ', found ' + h1Count);
  }
}

function checkLinks(name, filePath, text) {
  const pattern = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const match of text.matchAll(pattern)) {
    const rawTarget = match[1].split('#')[0];
    if (!rawTarget || /^[a-z][a-z0-9+.-]*:/i.test(rawTarget)) {
      continue;
    }
    const target = rawTarget.replace(/\\/g, '/');
    const resolved = path.resolve(path.dirname(filePath), target);
    if (!fs.existsSync(resolved)) {
      failures.push('Broken link in ' + name + ': ' + rawTarget);
    }
  }
}

for (const name of markdownFiles) {
  const filePath = path.join(root, name);
  const text = fs.readFileSync(filePath, 'utf8');

  if (/\{\{[^}]+\}\}/.test(text)) {
    failures.push('Unresolved placeholder in ' + name);
  }

  checkH1(name, text);

  for (const section of requiredSections[name]) {
    if (!text.includes(section)) {
      failures.push('Missing section in ' + name + ': ' + section);
    }
  }

  checkWriting(name, text);
  checkLinks(name, filePath, text);
}

for (const name of tabbedFiles) {
  const filePath = path.join(handoffDir, name);
  const text = fs.readFileSync(filePath, 'utf8');

  checkH1('handoff\\' + name, text);

  for (const section of handoffSections[name]) {
    if (!text.includes(section)) {
      failures.push('Missing section in handoff\\' + name + ': ' + section);
    }
  }

  checkWriting('handoff\\' + name, text);
  checkLinks('handoff\\' + name, filePath, text);
}

global.window = {};
try {
  require('./docs.js');
  for (const name of tabbedFiles) {
    const expected = fs.readFileSync(path.join(handoffDir, name), 'utf8');
    if (window.LOOM_DOCS[name] !== expected) {
      failures.push('Stale embedded template: ' + name);
    }
  }
} catch (error) {
  failures.push('Cannot load docs.js: ' + error.message);
}
delete global.window;

const readyStatus = 'Ready. Click a tab to display and copy its template.';
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const appSource = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

if (!html.includes('<title>Agent Handoff Templates</title>')) {
  failures.push('Viewer title is not set to Agent Handoff Templates');
}
if (!html.includes('<h1>Agent Handoff Templates</h1>')) {
  failures.push('Viewer H1 is not set to Agent Handoff Templates');
}
if (!html.includes(readyStatus)) {
  failures.push('Viewer status text is stale');
}
if (!appSource.includes(readyStatus)) {
  failures.push('Viewer script status text is stale');
}

let lastTabIndex = -1;
for (const name of tabbedFiles) {
  const index = html.indexOf('data-doc="' + name + '"');
  if (index === -1) {
    failures.push('Missing tab: ' + name);
    continue;
  }
  if (index <= lastTabIndex) {
    failures.push('Tab order mismatch at ' + name);
  }
  lastTabIndex = index;
}

const generatorSource = fs.readFileSync(path.join(__dirname, 'generate-docs.js'), 'utf8');
if (!generatorSource.includes("const handoffDir = path.join(__dirname, 'handoff');")) {
  failures.push('Generator is not bound to handoff templates');
}

try {
  const answers = JSON.parse(fs.readFileSync(path.join(root, 'onboarding-answers.json'), 'utf8'));
  for (const id of ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11']) {
    if (!Object.prototype.hasOwnProperty.call(answers, id)) {
      failures.push('Missing onboarding answer: ' + id);
    }
  }
} catch (error) {
  failures.push('Invalid onboarding answer file: ' + error.message);
}

const scripts = [
  'app.js',
  'ask-onboarding.js',
  'check-contradictions.js',
  'check-docs.js',
  'discover-mcp.js',
  'docs.js',
  'generate-docs.js',
  'mcp-lib.js',
  'smoke-test.js'
];

for (const file of scripts) {
  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  try {
    new Function(source);
  } catch (error) {
    failures.push('Syntax error in ' + file + ': ' + error.message);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.log('FAIL: ' + failure);
  }
  process.exit(1);
}

console.log('PASS: documentation checks');

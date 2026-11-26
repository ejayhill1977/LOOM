// check-docs.js
// Role: Check the documents, handoff templates, and built viewer artifacts.
// Last reviewed: 2026-11-26

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
// Reminder: tab checks cover handoff templates only. Do not use LOOM-specific root docs as embedded tab content.
const handoffDir = path.join(__dirname, 'handoff');
const markdownFiles = ['README.md', 'ANALYSIS.md', 'AGENTS.md', 'SKILLS.md', 'ROADMAP.md'];
const tabbedFiles = ['AGENTS.md', 'SKILLS.md', 'README.md', 'ROADMAP.md'];
const failures = [];

const requiredSections = {
  'README.md': ['## Document map', '## Agent onboarding', '## How to use LOOM', '## Update an existing project', '## Build output', '## Terminology'],
  'ANALYSIS.md': ['## 1. Scope', '## 6. Conflicts found'],
  'AGENTS.md': ['## 0. Agent onboarding', '### 0.6 Update an existing project', '## 3. Writing rules', '## 7. Linting, formatting, typechecking, and testing', '## 8. Version control', '## 9. Building and running', '## 10. MCP integration', '## 12. Definition of done'],
  'SKILLS.md': ['## Skill catalogue', '## 15. Run an onboarding interview', '## 16. Resolve documentation contradictions', '## 17. Document MCP integration', '## 18. Update an existing project'],
  'ROADMAP.md': ['## 2. Status snapshot', '## 3. Open work', '## 7. Change log']
};

const handoffSections = {
  'AGENTS.md': ['## 0. Agent onboarding', '### 0.6 Update an existing project', '## 3. Writing rules', '## 7. Linting, formatting, typechecking, and testing', '## 10. MCP integration', '## 12. Definition of done'],
  'SKILLS.md': ['## Catalogue', '## 16. Run an onboarding interview', '## 17. Resolve contradictions', '## 18. Document MCP integration', '## 19. Update an existing project'],
  'README.md': ['## Document map', '## Setup', '## Update an existing project', '## Operation', '## Verification', '## MCP surface', '## Terminology'],
  'ROADMAP.md': ['## Status snapshot', '## Open work', '## Decisions', '## Update record', '## Change log']
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

const citedAgents = fs.readFileSync(path.join(handoffDir, 'AGENTS.md'), 'utf8');
if (!citedAgents.includes('[agents.md](https://agents.md/)')) {
  failures.push('Handoff AGENTS.md is missing the format citation');
}
const citedSkills = fs.readFileSync(path.join(handoffDir, 'SKILLS.md'), 'utf8');
if (!citedSkills.includes('[agentskills.io](https://agentskills.io/)')) {
  failures.push('Handoff SKILLS.md is missing the format citation');
}
const rootIgnore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
if (!rootIgnore.split(/\r?\n/).includes('desktop.ini')) {
  failures.push('Root .gitignore omits desktop.ini');
}
const rootVcs = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
if (!rootVcs.includes('Never commit `desktop.ini`')) {
  failures.push('Root AGENTS.md omits the desktop.ini rule');
}
const faviconSizeFiles = [
  path.join(root, 'AGENTS.md'),
  path.join(root, 'README.md'),
  path.join(root, 'ROADMAP.md'),
  path.join(root, 'SKILLS.md'),
  path.join(root, 'build', 'AGENTS.template.md'),
  path.join(root, 'build', 'README.md'),
  path.join(handoffDir, 'AGENTS.md'),
  path.join(handoffDir, 'SKILLS.md')
];
for (const file of faviconSizeFiles) {
  if (!fs.readFileSync(file, 'utf8').includes('16x16')) {
    failures.push('Missing favicon size rule: ' + path.relative(root, file));
  }
}
const brandFiles = [path.join(root, 'branding', 'icon.ico'), path.join(root, 'branding', 'icon.png')];
for (const file of brandFiles) {
  if (!fs.existsSync(file)) {
    failures.push('Missing branding file: ' + path.relative(root, file));
  }
}
const featuredIcon = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
if (!featuredIcon.includes('branding/icon.png')) {
  failures.push('README does not feature the LOOM icon');
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
const faviconLink = '<link rel="icon" type="image/x-icon" href="favicon.ico">';
if (!html.includes(faviconLink)) {
  failures.push('Viewer favicon link is missing');
}
const faviconBytes = fs.readFileSync(path.join(__dirname, 'favicon.ico'));
if (faviconBytes.subarray(0, 4).toString('hex') !== '00000100' || faviconBytes[6] !== 16 || faviconBytes[7] !== 16) {
  failures.push('Viewer favicon file is not a 16x16 ICO');
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
  'docs.js',
  'generate-docs.js',
  'mcp-lib.js',
  'one-shot.js',
  'smoke-test.js',
  'update-comments.js',
  'update-roadmap.js'
];

for (const file of scripts) {
  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  try {
    new Function(source);
  } catch (error) {
    failures.push('Syntax error in ' + file + ': ' + error.message);
  }
}

const outputDir = path.join(root, 'builds');
const artifactFiles = ['index.html', 'styles.css', 'app.js', 'favicon.ico', 'docs.js'];

for (const file of artifactFiles) {
  const outputPath = path.join(outputDir, file);
  if (!fs.existsSync(outputPath)) {
    failures.push('Missing build artifact: builds\\' + file);
    continue;
  }
  if (fs.readFileSync(outputPath, 'utf8') !== fs.readFileSync(path.join(__dirname, file), 'utf8')) {
    failures.push('Stale build artifact: builds\\' + file);
  }
}

const gateRule = 'Store every regression gate in `build\\gates\\`.';
const rootAgentsText = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
if (!rootAgentsText.includes(gateRule) || !rootAgentsText.includes('Write final artifacts to `builds\\`.')) {
  failures.push('Root build rules omit the artifact folder or gate folder');
}
const handoffAgentsText = fs.readFileSync(path.join(handoffDir, 'AGENTS.md'), 'utf8');
if (!handoffAgentsText.includes(gateRule) || !handoffAgentsText.includes('Keep build tools in `build\\`.')) {
  failures.push('Handoff build rules omit the artifact folder or gate folder');
}

const builtHtml = fs.existsSync(path.join(outputDir, 'index.html'))
  ? fs.readFileSync(path.join(outputDir, 'index.html'), 'utf8')
  : '';
if (!builtHtml.includes('<title>Agent Handoff Templates</title>') || !builtHtml.includes(faviconLink)) {
  failures.push('Built viewer title or favicon is stale');
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.log('FAIL: ' + failure);
  }
  process.exit(1);
}

console.log('PASS: documentation checks');

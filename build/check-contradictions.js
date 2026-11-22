const fs = require('fs');
const path = require('path');
const lib = require('./mcp-lib');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return null;
  }
  return args[index + 1] || '';
}

function fail(message) {
  console.log('FAIL: contradiction ' + message);
  process.exit(1);
}

function normalize(value) {
  return String(value || '').trim().replace(/`/g, '');
}

const answersPath = path.resolve(root, option('--answers') || 'onboarding-answers.json');
const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
const answers = JSON.parse(fs.readFileSync(answersPath, 'utf8'));

const answerSection = agents
  .split(/### 0\.4 [^\n]+\n/)[1]
  .split('\n## ')[0];
const documented = new Map();

for (const match of answerSection.matchAll(/^\|\s*(Q\d+)\s*\|\s*(.+?)\s*\|/gm)) {
  documented.set(match[1], normalize(match[2]));
}

for (const item of documented) {
  const id = item[0];
  const expected = item[1];
  const actual = normalize(answers[id]);
  if (actual && actual !== expected) {
    fail(id + ': AGENTS.md says "' + expected + '" and the answer file says "' + actual + '"');
  }
}

for (const match of agents.matchAll(/node(?:\s+--check)?\s+(build\\[A-Za-z0-9.-]+\.js)/g)) {
  const script = match[1];
  if (!fs.existsSync(path.join(root, script))) {
    fail('documented script is missing: ' + script);
  }
}

if (fs.existsSync(path.join(root, '.git')) && agents.includes('is not a Git repository')) {
  fail('repository state changed and AGENTS.md still says no Git repository');
}

const mcpReport = lib.discover(root);
const mcpRoleMatch = agents.match(/\| Project MCP role \| ([^|]+) \|/);
const mcpRole = mcpRoleMatch ? normalize(mcpRoleMatch[1]) : '';

if (mcpReport.hasSurface && normalize(documented.get('Q10')).toLowerCase() === 'none') {
  fail('MCP configuration was found and Q10 says None');
}

if (!mcpReport.hasSurface && mcpRole && mcpRole.toLowerCase() !== 'none') {
  fail('AGENTS.md lists an MCP role and no MCP configuration was found');
}

let localDetails;
try {
  localDetails = JSON.parse(fs.readFileSync(path.join(__dirname, 'git-details.local.json'), 'utf8'));
} catch (error) {
  fail('local Git details are missing or invalid');
}

for (const key of ['user.name', 'user.email']) {
  if (!String(localDetails[key] || '').trim()) {
    fail('local Git detail is empty: ' + key);
  }
}

const sharedFiles = [
  'README.md',
  'ANALYSIS.md',
  'SKILLS.md',
  'ROADMAP.md',
  'onboarding-answers.json',
  'build\\AGENTS.template.md',
  'build\\ONBOARDING-PROMPT.md',
  'build\\README.md',
  'build\\app.js',
  'build\\ask-onboarding.js',
  'build\\check-contradictions.js',
  'build\\check-docs.js',
  'build\\discover-mcp.js',
  'build\\docs.js',
  'build\\generate-docs.js',
  'build\\index.html',
  'build\\mcp-lib.js',
  'build\\handoff\\AGENTS.md',
  'build\\handoff\\README.md',
  'build\\handoff\\ROADMAP.md',
  'build\\handoff\\SKILLS.md',
  'build\\onboarding-answers.template.json',
  'build\\smoke-test.js',
  'build\\fixtures\\onboarding-answers.empty.json',
  'build\\fixtures\\onboarding-answers.conflict.json',
  'build\\fixtures\\onboarding-answers.record.json'
];

for (const relative of sharedFiles) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) {
    continue;
  }
  const text = fs.readFileSync(absolute, 'utf8');
  if (text.includes(localDetails['user.email'])) {
    fail('local Git email copied into ' + relative);
  }
}

const genericFiles = [
  'README.md',
  'ANALYSIS.md',
  'SKILLS.md',
  'ROADMAP.md',
  'build\\AGENTS.template.md',
  'build\\ONBOARDING-PROMPT.md',
  'build\\README.md',
  'build\\handoff\\AGENTS.md',
  'build\\handoff\\README.md',
  'build\\handoff\\ROADMAP.md',
  'build\\handoff\\SKILLS.md',
  'build\\onboarding-answers.template.json',
  'build\\fixtures\\onboarding-answers.empty.json',
  'build\\fixtures\\onboarding-answers.conflict.json',
  'build\\fixtures\\onboarding-answers.record.json'
];

for (const relative of genericFiles) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) {
    continue;
  }
  const text = fs.readFileSync(absolute, 'utf8');
  if (text.includes(localDetails['user.name'])) {
    fail('local Git name copied into ' + relative);
  }
}

console.log('PASS: no documentation contradictions found');

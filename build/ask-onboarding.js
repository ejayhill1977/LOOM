// ask-onboarding.js
// Role: Ask one onboarding question per run and store the answer.
// Last reviewed: 2026-11-26

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return null;
  }
  return args[index + 1] || '';
}

const answersPath = path.resolve(root, option('--answers') || 'onboarding-answers.json');
const preview = args.includes('--preview');
const yes = args.includes('--yes');
const suppliedAnswer = option('--answer');
const defaults = { Q3: 'EJ Hill', Q4: 'main', Q10: 'None' };

const agents = fs.readFileSync(path.join(root, 'AGENTS.md'), 'utf8');
const questionSection = agents
  .split('### 0.2 Required questions')[1]
  .split('### 0.3 Contradiction protocol')[0];
const questions = new Map();

for (const match of questionSection.matchAll(/^\|\s*(Q\d+)\s*\|\s*(.+?)\s*\|/gm)) {
  questions.set(match[1], match[2]);
}

const answers = JSON.parse(fs.readFileSync(answersPath, 'utf8'));

function nextQuestion() {
  for (const item of questions) {
    const id = item[0];
    const question = item[1];
    if (!String(answers[id] || '').trim()) {
      return { id: id, question: question };
    }
  }
  return null;
}

function showQuestion(item) {
  console.log('Question ' + item.id + ': ' + item.question);
  if (defaults[item.id]) {
    console.log('Default: ' + defaults[item.id]);
  }
}

function writeAnswer(id, value) {
  answers[id] = value;
  fs.writeFileSync(answersPath, JSON.stringify(answers, null, 2) + '\n', 'utf8');
}

function fail(message) {
  console.log('FAIL: ' + message);
  process.exit(1);
}

const item = nextQuestion();
if (!item) {
  console.log('PASS: onboarding complete');
  process.exit(0);
}

showQuestion(item);
if (preview) {
  process.exit(0);
}

if (suppliedAnswer !== null) {
  const value = suppliedAnswer.trim() || defaults[item.id] || '';
  if (!value) {
    fail('answer required for ' + item.id);
  }
  writeAnswer(item.id, value);
  console.log('PASS: recorded ' + item.id);
  process.exit(0);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Answer: ', function (input) {
  const value = input.trim() || defaults[item.id] || '';
  if (!value) {
    rl.close();
    fail('answer required for ' + item.id);
  }

  if (yes) {
    rl.close();
    writeAnswer(item.id, value);
    console.log('PASS: recorded ' + item.id);
    return;
  }

  rl.question('Record "' + value + '"? [Y/n] ', function (confirmation) {
    rl.close();
    if (confirmation.trim().toLowerCase() === 'n') {
      fail('answer not recorded');
    }
    writeAnswer(item.id, value);
    console.log('PASS: recorded ' + item.id);
  });
});

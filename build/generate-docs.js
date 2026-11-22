const fs = require('fs');
const path = require('path');

// Reminder: the viewer serves generic handoff templates. Do not embed LOOM-specific root docs here.
const handoffDir = path.join(__dirname, 'handoff');
const files = ['AGENTS.md', 'SKILLS.md', 'README.md', 'ROADMAP.md'];
const docs = {};

for (const file of files) {
  docs[file] = fs.readFileSync(path.join(handoffDir, file), 'utf8');
}

const output = 'window.LOOM_DOCS = ' + JSON.stringify(docs, null, 2) + ';\n';
fs.writeFileSync(path.join(__dirname, 'docs.js'), output, 'utf8');

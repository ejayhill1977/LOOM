const fs = require('fs');
const path = require('path');

// Reminder: the viewer serves generic handoff templates. Do not embed LOOM-specific root docs here.
const handoffDir = path.join(__dirname, 'handoff');
const buildDir = __dirname;
const outputDir = path.resolve(buildDir, '..', 'builds');
const files = ['AGENTS.md', 'SKILLS.md', 'README.md', 'ROADMAP.md'];
const docs = {};

for (const file of files) {
  docs[file] = fs.readFileSync(path.join(handoffDir, file), 'utf8');
}

const docsSource = 'window.LOOM_DOCS = ' + JSON.stringify(docs, null, 2) + ';\n';
fs.writeFileSync(path.join(buildDir, 'docs.js'), docsSource, 'utf8');

const artifact = {
  'index.html': fs.readFileSync(path.join(buildDir, 'index.html')),
  'styles.css': fs.readFileSync(path.join(buildDir, 'styles.css')),
  'app.js': fs.readFileSync(path.join(buildDir, 'app.js')),
  'favicon.ico': fs.readFileSync(path.join(buildDir, 'favicon.ico')),
  'docs.js': Buffer.from(docsSource, 'utf8')
};

fs.mkdirSync(outputDir, { recursive: true });

for (const name of Object.keys(artifact)) {
  const target = path.join(outputDir, name);
  fs.writeFileSync(target, artifact[name]);
  if (!fs.readFileSync(target).equals(artifact[name])) {
    throw new Error('Artifact verification failed: builds\\' + name);
  }
}

console.log('PASS: built static viewer in builds\\');

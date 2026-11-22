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

const report = lib.discover(root);

if (args.includes('--json')) {
  console.log(JSON.stringify(report, null, 2));
} else if (!report.hasSurface) {
  console.log('PASS: no MCP configuration found');
} else {
  console.log('PASS: MCP configuration found');
  for (const server of report.servers) {
    console.log(server.path + ': ' + server.name);
  }
}

if (args.includes('--update-answers')) {
  const answersPath = path.resolve(root, option('--answers') || 'onboarding-answers.json');
  const answers = JSON.parse(fs.readFileSync(answersPath, 'utf8'));
  answers.Q10 = report.hasSurface
    ? report.servers.map(function (server) {
        return server.path + ':' + server.name;
      }).join(', ')
    : 'None';
  fs.writeFileSync(answersPath, JSON.stringify(answers, null, 2) + '\n', 'utf8');
  console.log('PASS: updated Q10');
}

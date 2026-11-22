const fs = require('fs');
const path = require('path');

const configPaths = [
  '.mcp.json',
  'mcp.json',
  '.cursor/mcp.json',
  '.vscode/mcp.json',
  'opencode.json',
  'opencode.jsonc',
  '.opencode/opencode.json',
  '.opencode/opencode.jsonc'
];

function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

function discover(root) {
  const files = [];
  const servers = [];

  for (const relative of configPaths) {
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) {
      continue;
    }

    let status = 'unreadable';
    let parsed = null;

    try {
      parsed = JSON.parse(stripComments(fs.readFileSync(absolute, 'utf8')));
      status = 'no-mcp';
    } catch (error) {
      status = 'unreadable';
    }

    if (parsed) {
      const blocks = [parsed.mcp, parsed.mcpServers, parsed.servers].filter(Boolean);
      for (const block of blocks) {
        if (typeof block !== 'object') {
          continue;
        }
        for (const name of Object.keys(block)) {
          servers.push({ path: relative, name: name });
          status = 'mcp-found';
        }
      }
    }

    files.push({ path: relative, status: status });
  }

  return { files: files, servers: servers, hasSurface: servers.length > 0 };
}

module.exports = { discover: discover };

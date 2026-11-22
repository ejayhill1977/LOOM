const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const strict = args.includes('--strict');

let chromium;
try {
  chromium = require('playwright').chromium;
} catch (error) {
  if (strict) {
    console.log('FAIL: browser smoke test not run. Playwright is not installed.');
    process.exit(1);
  }
  console.log('SKIP: browser smoke test not run. Playwright is not installed.');
  process.exit(0);
}

global.window = {};
require('./docs.js');
const docs = global.window.LOOM_DOCS;
delete global.window;

// Reminder: compare the viewer with handoff templates, not LOOM-specific root docs.
const files = ['AGENTS.md', 'SKILLS.md', 'README.md', 'ROADMAP.md'];
const target = 'file:///' + path.join(root, 'build', 'index.html').replace(/\\/g, '/');

function fail(message) {
  console.log('FAIL: browser smoke test. ' + message);
  process.exit(1);
}

(async function () {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write']
  });
  const page = await context.newPage();
  await page.goto(target);

  for (const name of files) {
    await page.click('[data-doc="' + name + '"]');
    await page.waitForFunction(function () {
      const status = document.getElementById('copy-status').textContent;
      return status !== 'Ready. Click a tab to display and copy its template.';
    });

    const status = await page.textContent('#copy-status');
    if (status.includes('Clipboard access failed')) {
      throw new Error(status);
    }

    const displayed = await page.textContent('#document-content');
    if (displayed !== docs[name]) {
        throw new Error(name + ' display does not match the source template');
    }

    const clipboard = await page.evaluate(function () {
      return navigator.clipboard.readText();
    });
    if (clipboard !== docs[name]) {
        throw new Error(name + ' clipboard does not match the source template');
    }
  }

  await browser.close();
  console.log('PASS: browser smoke test');
})().catch(function (error) {
  fail(error.message);
});

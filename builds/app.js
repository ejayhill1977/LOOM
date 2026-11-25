// app.js
// Role: Draw the handoff viewer and copy the selected template to the clipboard.
// Last reviewed: 2026-11-26

(function () {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panel = document.getElementById('doc-panel');
  const content = document.getElementById('document-content');
  const status = document.getElementById('copy-status');
  const docs = window.LOOM_DOCS || {};

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.top = '-1000px';
      document.body.appendChild(helper);
      helper.select();

      let copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }

      document.body.removeChild(helper);
      if (copied) {
        resolve();
        return;
      }
      reject(new Error('Clipboard copy failed'));
    });
  }

  function getTemplate(name) {
    if (Object.prototype.hasOwnProperty.call(docs, name)) {
      return docs[name];
    }
    return 'Handoff template data for ' + name + ' is missing. Run: node build/generate-docs.js';
  }

  function activate(tab, shouldCopy) {
    const name = tab.dataset.doc;
    const text = getTemplate(name);

    tabs.forEach(function (item) {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panel.setAttribute('aria-labelledby', tab.id);
    content.textContent = text;

    if (!shouldCopy) {
      status.textContent = 'Ready. Click a tab to display and copy its template.';
      return;
    }

    copyText(text).then(function () {
      status.textContent = 'Displayed ' + name + ' template and copied it to the clipboard.';
    }).catch(function () {
      status.textContent = 'Displayed ' + name + ' template. Clipboard access failed. Select the text and copy it manually.';
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      activate(tab, true);
    });

    tab.addEventListener('keydown', function (event) {
      let targetIndex = null;

      if (event.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        targetIndex = 0;
      } else if (event.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex === null) {
        return;
      }

      event.preventDefault();
      tabs[targetIndex].focus();
      activate(tabs[targetIndex], true);
    });
  });

  const initialTab = tabs.find(function (tab) {
    return tab.getAttribute('aria-selected') === 'true';
  }) || tabs[0];

  activate(initialTab, false);
})();

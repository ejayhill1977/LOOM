# DESIGN.md

Design rules for this project's UI surfaces.

## 1. Purpose

This document records approved UI components, design tokens, interaction requirements, accessibility rules, and explicit prohibitions. Agents must read this guide before changing any UI surface.

## 2. Scope

- Applies to all HTML, CSS, and JavaScript in this project.
- Applies to template source and generated artifacts.
- Does not apply to external documentation rendered by the project.

## 3. Design tokens

### 3.1 Colors

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#0f0f0f` | Page background |
| `--panel` | `#f5f5f5` | `#181818` | Card/panel background |
| `--panel-2` | `#eeeeee` | `#202020` | Secondary panel |
| `--text` | `#1a1a1a` | `#f3f4f6` | Primary text |
| `--muted` | `#6b6b6b` | `#a3a3a3` | Secondary text |
| `--accent` | `#2563eb` | `#60a5fa` | Primary action, focus ring |
| `--border` | `#d1d5db` | `#2a2a2a` | Borders, dividers |
| `--success` | `#059669` | `#34d399` | Success state |
| `--warning` | `#d97706` | `#fbbf24` | Warning state |
| `--destructive` | `#dc2626` | `#ef4444` | Error, destructive action |

### 3.2 Spacing

| Token | Value |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |

### 3.3 Typography

| Token | Value |
| --- | --- |
| `--font-sans` | `Poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif` |
| `--font-mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |
| `--text-xs` | 12px |
| `--text-sm` | 14px |
| `--text-base` | 16px |
| `--text-lg` | 18px |
| `--text-xl` | 20px |

- All written content, form elements, buttons, and other GUI elements must use an embedded Poppins font as the default font face and 16px as the default font size.
- Poppins is embedded locally with `font-display: swap`.
- Settings must allow the user to change the font face and font size.

### 3.4 Radius and shadows

| Token | Value |
| --- | --- |
| `--radius-sm` | 4px |
| `--radius` | 8px |
| `--radius-lg` | 12px |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` |
| `--shadow` | `0 4px 6px rgba(0,0,0,0.1)` |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` |

## 4. Approved components

### 4.1 Buttons

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-destructive">Destructive</button>
```

- Primary: `--accent` background, white text, `--radius`
- Secondary: `--panel-2` background, `--text` text, `--border` border
- Ghost: transparent background, `--text` text, hover shows `--panel-2`
- Destructive: `--destructive` background, white text

All buttons:
- `min-height: 36px`
- `padding: 0 16px`
- `font: inherit`
- `cursor: pointer`
- `:focus-visible` shows 2px `--accent` outline with 2px offset
- `:disabled` opacity 0.5, `cursor: not-allowed`

### 4.2 Inputs

```html
<input type="text" class="input" placeholder="Enter value" />
<select class="input">...</select>
<textarea class="input">...</textarea>
```

- `--panel` background, `--border` border, `--radius`
- `padding: 8px 12px`
- `font: inherit`
- `:focus` border `--accent`, no outline
- `:disabled` opacity 0.5

### 4.3 Tabs

```html
<nav class="tabs" role="tablist" aria-label="Sections">
  <button role="tab" aria-selected="true" tabindex="0">Tab 1</button>
  <button role="tab" aria-selected="false" tabindex="-1">Tab 2</button>
</nav>
<div role="tabpanel" aria-labelledby="tab-1" tabindex="0">...</div>
```

- Horizontal layout, gap 2px
- Active tab: `--bg` background, `--border` border, bottom border `--bg`
- Inactive tab: `--panel-2` background
- `:focus-visible` outline 2px `--accent`
- Keyboard: Arrow keys navigate, Home/End jump, Enter/Space activate

### 4.4 Cards

```html
<article class="card">
  <img class="card-img" src="..." alt="" />
  <div class="card-body">
    <h3 class="card-title">Title</h3>
    <p class="card-text">Description</p>
  </div>
</article>
```

- `--panel` background with backdrop blur
- `--border` border (10% opacity light / 10% white dark)
- `--radius-lg` radius
- `overflow: hidden`
- Hover: slight lift, border accent color

### 4.5 Modal / Dialog

```html
<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal-content">
    <header class="modal-header">
      <h2 id="modal-title">Title</h2>
      <button class="modal-close" aria-label="Close">×</button>
    </header>
    <div class="modal-body">...</div>
    <footer class="modal-footer">
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-primary">Confirm</button>
    </footer>
  </div>
</div>
```

- Fixed overlay, centered
- Backdrop: `rgba(0,0,0,0.55)`
- `--panel` background, `--radius-lg`
- Trap focus inside while open
- Escape key closes

### 4.6 Tooltips

```html
<button class="has-tooltip" data-tooltip="Tooltip text">Hover me</button>
```

- `--text` text on `--bg` background
- `--radius-sm`, padding 6px 10px
- Small arrow pointing to trigger
- Show on hover/focus, hide on leave/blur

## 5. Interaction requirements

### 5.1 Focus management

- Every interactive element must be keyboard reachable
- Focus order matches visual order
- Focus visible state uses 2px `--accent` outline with 2px offset
- Never remove focus outline without replacement
- Modal dialogs trap focus
- Skip links provided for main content areas

### 5.2 Touch and pointer

- Minimum touch target 44x44px
- Hover states not required for function
- Active/tap state provides immediate feedback
- Drag operations have keyboard alternative

### 5.3 Animations

- Respect `prefers-reduced-motion`
- Default transitions: 150-250ms ease
- No auto-playing animations > 5s without pause control

### 5.4 Presenting multiple options

- When presenting multiple options, never use a bulleted or numbered list.
- Render each option as a selectable card in a responsive grid.
- Keep each card concise.
- Make the whole card selectable.
- Let the grid wrap to fit the available screen width and height.
- If the interface cannot render interactive cards, say so rather than pretending plain-text boxes are selectable.

## 6. Accessibility requirements

### 6.1 Semantic HTML

- Use native HTML elements over custom ARIA when possible
- `<button>` for actions, `<a>` for navigation
- Heading hierarchy: one `<h1>`, sequential `<h2>`-`<h6>`
- Lists use `<ul>`/`<ol>`/`<li>`
- Forms use `<label>` with `for`/`id` or wrapping

### 6.2 ARIA

- `role="tablist"`, `role="tab"`, `role="tabpanel"` for tabs
- `role="dialog"`, `aria-modal="true"` for modals
- `aria-label` or `aria-labelledby` for icon-only buttons
- `aria-expanded`/`aria-controls` for disclosures
- `aria-live="polite"` for status updates
- Do not use `role="button"` on non-interactive elements

### 6.3 Color and contrast

- Minimum 4.5:1 contrast for normal text (WCAG AA)
- Minimum 3:1 contrast for large text (18pt+/14pt+ bold)
- Minimum 3:1 for UI components and graphics
- Do not convey information by color alone
- Test in both light and dark modes

### 6.4 Text and content

- No horizontal scrolling at 320px width
- Text resize to 200% without loss of function
- Line height ≥ 1.5, paragraph spacing ≥ 2x line height
- Letter spacing ≥ 0.12em, word spacing ≥ 0.16em

## 7. Explicit prohibitions

### 7.1 HTML elements to avoid

Do not use these obsolete or non-standard elements in new code:

| Element | Replacement |
| --- | --- |
| `<acronym>` | `<abbr>` |
| `<big>` | CSS `font-size` |
| `<center>` | CSS `text-align: center` |
| `<font>` | CSS `font-family`, `color`, `font-size` |
| `<marquee>` | CSS animation |
| `<strike>` | `<del>` or `<s>` |
| `<tt>` | `<code>`, `<kbd>`, `<samp>`, or CSS `font-family: monospace` |
| `<frame>` | `<iframe>` or server-side includes |
| `<frameset>` | CSS layout |
| `<noframes>` | Remove |
| `<noembed>` | Remove |
| `<param>` | Remove (used only in `<object>`) |
| `<plaintext>` | `<pre>` or `<code>` |
| `<content>` | `<slot>` (Shadow DOM) |
| `<shadow>` | `<slot>` (Shadow DOM) |
| `<menuitem>` | `<button>` in `<menu>` or custom component |

### 7.2 CSS properties to avoid

- Do not use obsolete properties as defaults (e.g., `clip` → use `clip-path`)
- Do not use vendor-prefixed properties (`-webkit-`, `-moz-`, `-ms-`) unless a documented browser-support requirement calls for them
- Check MDN and caniuse.com before adding any property with questionable support
- Do not use non-standard properties as primary styling

### 7.3 JavaScript APIs to avoid

Do not use deprecated legacy APIs:

| Deprecated API | Replacement |
| --- | --- |
| `escape()` / `unescape()` | `encodeURIComponent()` / `decodeURIComponent()` |
| `RegExp.prototype.compile()` | `new RegExp()` |
| `Object.prototype.__defineGetter__()` | `Object.defineProperty()` |
| `Object.prototype.__defineSetter__()` | `Object.defineProperty()` |
| `String.prototype.trimLeft()` | `String.prototype.trimStart()` |
| `String.prototype.trimRight()` | `String.prototype.trimEnd()` |
| `document.all` | `document.getElementById()`, `querySelector()` |
| `document.layers` | `document.querySelectorAll()` |
| `navigator.userAgent` for feature detection | Feature detection (`'feature' in element`) |

### 7.4 General prohibitions

- No inline styles (`style="..."`) except for dynamic values set by JavaScript
- No `!important` except for utility classes explicitly documented as overrides
- No fixed pixel widths on fluid containers
- No `overflow: hidden` on `<body>` or `<html>` that prevents scrolling
- No removal of native focus styles without accessible replacement
- No keyboard traps
- No autoplaying audio
- No content that flashes > 3 times per second

## 8. Windows desktop app specific rules

### 8.1 Window chrome

- Custom titlebar: three square buttons (minimize, maximize/restore, close) in top-right
- `-webkit-app-region: drag` on draggable areas
- `-webkit-app-region: no-drag` on interactive elements
- Minimum window size enforced

### 8.2 System integration

- Respect system theme preference (`prefers-color-scheme`)
- Respect system accent color where applicable
- High contrast mode support
- DPI scaling: test at 100%, 125%, 150%, 200%

### 8.3 File handling

- Drag-and-drop from Explorer supported
- File picker uses native dialog
- Context menu integration where applicable

## 9. Web app specific rules

### 9.1 Responsive breakpoints

| Breakpoint | Width | Columns |
| --- | --- | --- |
| Mobile | ≤ 600px | 2 |
| Tablet | 601-900px | 4 |
| Desktop | 901-1200px | 5 |
| Wide | 1201-1400px | 6 |
| Ultra | > 1400px | auto-fill |

### 9.2 PWA considerations

- Service worker for offline shell
- Manifest with icons, theme color, display mode
- Install prompt handled gracefully

### 9.3 Performance

- Critical CSS inlined
- Fonts: `font-display: swap`
- Images: lazy loading, WebP with fallback
- JavaScript: code splitting, defer non-critical

## 10. Linting and enforcement

### 10.1 HTML

- `html-validate` or equivalent for semantic checks
- Check for prohibited elements in CI/gate

### 10.2 CSS

- `stylelint` with recommended config
- Custom rule: flag prohibited properties
- Custom rule: flag vendor prefixes without fallback

### 10.3 JavaScript

- ESLint with `eslint-plugin-compat` for browser compat
- Custom rule: flag deprecated APIs
- TypeScript `noImplicitAny`, `strictNullChecks`

## 11. Verification checklist

Before merging UI changes, verify:

- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all interactive elements
- [ ] Color contrast meets WCAG AA in both themes
- [ ] No prohibited HTML elements
- [ ] No prohibited CSS properties
- [ ] No prohibited JavaScript APIs
- [ ] Responsive at all breakpoints
- [ ] `prefers-reduced-motion` respected
- [ ] High contrast mode functional
- [ ] Screen reader announces dynamic changes
- [ ] No horizontal scroll at 320px
- [ ] Text resizes to 200% without loss

## 12. Behavioral design guidelines (from Principle Cards)

These guidelines are derived from behavioral science Principle Cards. Each represents a documented heuristic for product and UI decisions.

### 12.1 Make It Easy (Friction Reduction)
- Audit every conversion flow, signup, and onboarding step for micro-barriers (an extra click, a mandatory field, a download-before-action) and remove them.
- Measure the outsized impact of each removal rather than assuming users will push through.
- For unwanted behaviors (cancellation, data scraping), add deliberate friction instead — but never confuse the two directions.

### 12.2 The Von Restorff Effect (Isolation & Distinctiveness)
- Audit competitor UX patterns, typography, and color schemes in your category.
- Intentionally break non-essential conventions (e.g., brutalist monochrome styling in a sea of corporate pastel blue dashboards, or an interactive CLI where competitors use bloated web wizards).
- Violating superficial category patterns maximizes organic memorability.

### 12.3 The Peak-End Rule (Endings Shape Memory)
- Design a memorable peak and a strong ending for every user journey.
- Make the final screen, the last email, and the last interaction count.
- Do not let a long, mediocre middle create a bad ending.
- Use peaks and endings for onboarding, demos, and support.

### 12.4 The Zeigarnik Effect (Incomplete Tasks & Information Gaps)
- Harness incomplete cognitive loops across onboarding flows and profile setups with persistent visual progress indicators (e.g., "78% profile completed — 1 final step remaining: add webhook URL").
- Avoid dumping complete feature explanations upfront; instead, reveal teasing previews of high-value insights or analytics that unlock only upon finishing the setup sequence.

### 12.5 The Right Amount of Weird (MAYA Optimal Distinctiveness)
- Break non-essential category conventions, but keep the core interaction legible.
- Introduce novelty as an evolution of a familiar pattern, not a reinvention.
- Test how far you can push distinctiveness before comprehension or trust drops, and pull back to the edge of acceptable.

### 12.6 Cognitive Ease (Easy Feels True)
- Make low-stakes, habitual actions easy and fluent.
- For high-stakes decisions, introduce deliberate cognitive strain: checklists, second reviews, and time delays.
- Do not let a smooth, confident interface substitute for careful judgment.
- Use ease for action and strain for judgment.

### 12.7 The Labor Illusion
- Avoid hiding complex background calculations behind an instant blank transition or silent spinner (especially in AI software).
- Expose backend effort using step-by-step progress microcopy (e.g., "Analyzing 45,000 data points against 14 compliance rules...") to dramatically elevate perceived value.

### 12.8 The Concreteness Effect (Vivid Copywriting)
- Replace abstract marketing buzzwords ("scalable end-to-end architecture," "seamless synergy") with vivid, tangible descriptions — such as "Deploy updates before your coffee cools" or "Search 10 million rows in a single blink."

### 12.9 The Generation Effect (Self-Generated Recall)
- Replace declarative statements with interactive discovery — such as onboarding quizzes that let users infer their ideal plan, placeholder text that prompts completion rather than stating the answer, or config wizards where users select their own defaults.
- Users generate the conclusion and remember it longer.

### 12.10 WYSIATI (Coherence Beats Completeness)
- Do not mistake a coherent story for a complete one. Ask what information is missing.
- Show the comparison set, not only the options you want the user to consider.
- Provide context that users would not otherwise think of.
- Treat confidence as a signal of coherence, not of accuracy.

### 12.11 Speed Is Quality (Iterate, Don't Perfect)
- Ship a measurable version 1 quickly. Iterate in short cycles.
- Treat failures as data. Do not let perfectionism delay the feedback loop.
- The goal is the fastest path to a high-quality version 6, not a perfect version 1.

### 12.12 The Focusing Illusion (Attention Inflates Importance)
- Do not let users or your team overweight the feature in focus.
- Consider the whole experience and the long-term adaptation.
- Measure persistent pains (load time, noise, commute), not only one-off delights.
- Ask what will still matter in six months.

## 13. References

- [MDN Web Docs: HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [MDN Web Docs: CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [MDN Web Docs: JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [can i use](https://caniuse.com/)
# LOOM Roadmap

LOOM turns observed agentic documentation patterns into reusable templates.
This file states measured status, open work, decisions, and change history. It
links to the other documents instead of restating them.

## 1. Purpose

- `README.md` owns product purpose, use, and terminology.
- `ANALYSIS.md` owns evidence and extraction decisions.
- `AGENTS.md` owns the LOOM project rulebook.
- `build\AGENTS.template.md` owns the generic rulebook source.
- `build\handoff\` owns the four generic templates served by the viewer.
- `SKILLS.md` owns reusable procedures.
- This file owns measured status and open work.

## 2. Status snapshot

Verified on 2026-11-27.

| Item | State | Evidence |
| --- | --- | --- |
| Source projects analysed | 5 of 5 | `ANALYSIS.md` section 2 |
| Universal core rules extracted | 12 | `ANALYSIS.md` section 3 |
| Strong consensus rules extracted | 10 | `ANALYSIS.md` section 4 |
| Optional minority patterns recorded | 5 | `ANALYSIS.md` section 5 |
| Conflicts recorded with precedence | 6 | `ANALYSIS.md` section 6 |
| Root docs drafted | 5 | `README.md`, `ANALYSIS.md`, `AGENTS.md`, `SKILLS.md`, `ROADMAP.md` |
| Template applied to LOOM | 1 | `AGENTS.md` has no placeholders |
| Handoff template set | 4 | `build\handoff\` |
| Existing-project update path | Present | Update sections in the four handoff templates |
| Final output folder | `builds\` | Five viewer files in `builds\` |
| Tabbed viewer | Present | `build\index.html` and `build\handoff\` |
| Docs embed generator | Present | `build\generate-docs.js` |
| Code comment updater | Present | `build\update-comments.js` |
| Roadmap updater | Present | `build\update-roadmap.js` |
| One-shot pipeline | Present | `build\one-shot.js` |
| Document check gate | Present | `build\check-docs.js` |
| Onboarding question catalogue | Present | `AGENTS.md` section 0 |
| Onboarding answer file | Present | `onboarding-answers.json` |
| Onboarding question runner | Present | `build\ask-onboarding.js` |
| Onboarding prompt | Present | `build\ONBOARDING-PROMPT.md` |
| Contradiction protocol | Present | `AGENTS.md` section 0 |
| Contradiction detector gate | Present | `build\check-contradictions.js` |
| MCP integration section | Present | `AGENTS.md` section 10 |
| MCP discovery helper | Present | `build\discover-mcp.js` |
| MCP surface | None | No configured server or tool |
| MCP test result storage | Present | `tests\README.md` and `AGENTS.md` section 10.1 |
| Browser smoke test | Present, not run | `build\smoke-test.js` |
| Browser verification | Not run | No Playwright browser is installed |
| Version control | `main` published | `git status -sb` and `git branch -vv` |
| Controlled language enforcement | Absent | Rules documented, not checked |
| Data storage rules | Present | `AGENTS.md` section 1 and section 5 |
| Data rules gate | Present | `build\gates\check-data-rules.js` |
| Secret protection rules | Present | `AGENTS.md` section 8.1 and section 11 |

The active branch is `main`.

## 3. Open work

### 3.1 Verify the tabbed viewer in a browser

**Goal:** prove that each tab displays and copies its handoff template.

**Work:** run `node build\smoke-test.js` with Playwright installed. The script
opens `build\index.html`, clicks each tab, compares displayed text with the
matching file in `build\handoff\`, and reads the clipboard after each click.

**Done when:** the script prints `PASS: browser smoke test` for all four tabs.

### 3.2 Add a project template generator

**Goal:** remove manual copy errors.

**Work:** add a script that creates a new project documentation set from the
generic template and prompts for each named placeholder.

**Done when:** the script creates a complete doc set in a sandbox inside this
repository, and every generated file passes `node build\check-docs.js`.

### 3.3 Add an optional controlled language module

**Goal:** support projects that require full ASD-STE100 without forcing it on
all projects.

**Work:** expand the optional module in `SKILLS.md` with an approved-term
template and a sentence-length check.

**Done when:** the module can be enabled in one project without editing the
universal rules, and its check runs locally.

### 3.4 Add a reusable gate catalogue example

**Goal:** give new projects a working gate pattern.

**Work:** add an example gate directory with a title header, `PASS:` and
`FAIL:` output, hard and baseline styles, and a gate README.

**Done when:** the example gate passes a healthy fixture, fails a broken
fixture, and is documented with its closure check.

## 4. Planned work

- Add a glossary template for project terms.
- Add a verification command table generator from `package.json` or equivalent.
- Add a handoff template registry for common protocol contracts.
- Add a migration checklist from legacy docs into the three-document model.
- Add an onboarding answer validator gate.

Each planned item needs a measurable closure check before it moves to open
work.

## 5. Known gaps and debt

- Regression gates still live in `build\`. The data rules gate is the first gate in `build\gates\`.
- The one-shot pipeline builds artifacts before the artifact gate, so a failed late gate leaves regenerated files uncommitted.
- Browser verification has not run. The smoke test reports a skip.
- No full controlled language check exists.
- MCP discovery reads local config files only.
- Some evidence line counts are partial because docs are large.
- The source projects disagree on lint warning policy, gate order, and AI
  attribution. `ANALYSIS.md` records the chosen precedence.

## 6. Decisions

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-11-22 | Keep three root documents with separate ownership | All projects use this shape |
| 2026-11-22 | Put gates before artifacts | Documented explicitly and one source contained a stale conflicting line |
| 2026-11-22 | Treat controlled English as optional | Required by some projects, not others |
| 2026-11-22 | Trust executable config over prose | Source projects contain stale documentation |
| 2026-11-22 | Keep historical notes dated | Source projects preserve past reports and decisions |
| 2026-11-22 | Preserve the generic template in `build\AGENTS.template.md` | The root rulebook is now project-specific |
| 2026-11-22 | Use `build\check-docs.js` and `build\check-contradictions.js` as the local gates | No external linter or test runner exists |
| 2026-11-22 | Ask onboarding questions one at a time | Gives the owner one simple answer field |
| 2026-11-22 | Handle contradictions one at a time | Prevents mixed decisions |
| 2026-11-22 | Include an MCP section in every rulebook | Agents need a trust boundary for external tools |
| 2026-11-22 | Store onboarding answers in a JSON file | One answer field maps to one stored value |
| 2026-11-22 | Fail the contradiction gate on the first conflict | One conflict per run keeps decisions clear |
| 2026-11-22 | Skip the browser test when Playwright is absent | A missing tool must not read as a pass |
| 2026-11-22 | Keep LOOM Git details in a local config file | Prevents owner data from entering generic docs |
| 2026-11-22 | Order viewer tabs by coding agent handoff flow | Agents read rules, skills, context, then status |
| 2026-11-22 | Serve handoff templates in the viewer instead of LOOM docs | The tabs are for handoff to other projects |
| 2026-11-22 | Initialize Git on `main` before the first public commit | The owner requested a public GitHub repository |
| 2026-11-22 | Merge the remote initial commit before publishing | The remote already held the repository license |
| 2026-11-22 | Support template updates for existing projects | Handoff must refresh docs without losing verified facts |
| 2026-11-22 | Write final viewer artifacts to `builds\` and keep tools in `build\` | Owner separates build tools from final output artifacts |
| 2026-11-22 | Store every regression gate in `build\gates\` | Keep gates separate from tools and templates |
| 2026-11-22 | Keep `favicon.ico` at 16x16 pixels | A larger icon adds bytes without improving the browser tab |
| 2026-11-25 | Store all project data inside the project root and in `data\` | Owner rule for every project |
| 2026-11-25 | Treat locations outside the project root as read only during analysis | Owner rule for every project |
| 2026-11-25 | Bake onboarding defaults into the handoff templates | Owner wants sensible defaults for each question |
| 2026-11-25 | Add a data rules regression gate in `build\gates\` | Prevent silent removal of the data rules and defaults |
| 2026-11-25 | Add a secret and credential protection policy to every rulebook | Prevent secrets from entering commits |
| 2026-11-25 | Build the viewer artifacts before the gate that compares them | The freshness gate can only pass after a rebuild |
| 2026-11-26 | Store every MCP test result in `tests\` inside the project root | Keeps results with the project and builds a persistent troubleshooting knowledge base. The owner may change the folder. |
| 2026-11-25 | Commit only after every gate passes | A failed gate must not reach history |
| 2026-11-25 | Scan the staged change for likely secrets before each commit | A file name alone does not show a secret |
| 2026-11-25 | Record one pipeline line per day in the change log | Provenance stays short and free of repeats |
| 2026-11-25 | Keep the pipeline on `main` and `origin` only | Every run ends on one published branch |

## 7. Change log

### 2026-11-22

- Analysed first-party docs across multiple agentic coding projects.
- Extracted universal, strong-consensus, and optional patterns.
- Drafted `README.md`, `ANALYSIS.md`, `AGENTS.md`, `SKILLS.md`, and `ROADMAP.md`.
- Added writing, linting, version control, and building sections.
- Built the static tabbed viewer under `build\`.
- Preserved the generic rulebook in `build\AGENTS.template.md`.
- Replaced every placeholder in the root `AGENTS.md`.
- Added `build\check-docs.js` as the local documentation gate.
- Regenerated `build\docs.js` from the four root documents.
- Added one-by-one onboarding and contradiction questions.
- Added MCP integration sections and trust rules.
- Added the onboarding answer file, template, question runner, and prompt.
- Added the contradiction detector gate with a seeded conflict fixture.
- Added MCP config discovery with answer update support.
- Added a browser smoke test with explicit skip reporting.
- Recorded LOOM-only Git details in a local config file.
- Reordered viewer tabs for the coding agent handoff flow.
- Added four generic handoff templates under `build\handoff\`.
- Retargeted the viewer and generator from LOOM docs to handoff templates.
- Added viewer source reminders to code comments and documentation.
- Added a gate check that binds the generator to handoff templates.
- Added `.gitignore` for local Git details and environment files.
- Initialized Git on `main` for the first public commit.
- Merged the remote initial commit and published `main` to `ejayhill1977/LOOM`.
- Added an existing-project update path to the four handoff templates.
- Added update sections to the generic rulebook source and the root documents.
- Added gate coverage for the new update sections.
- Separated build tools in `build\` from final artifacts in `builds\`.
- Added the artifact split and `build\gates\` rules to templates and LOOM docs.
- Moved the emoji favicon from an inline data URI to `favicon.svg` in `builds\`.
- Cited agents.md and agentskills.io in the two handoff tabs.
- Added the robot emoji to the start of the viewer page title.
- Replaced the SVG link and title emoji with one PNG favicon link.
- Fixed artifact verification to compare Buffers so the PNG is checked byte for byte.
- Replaced the robot emoji favicon with a resized LOOM icon from `branding\icon.png`.
- Replaced the PNG favicon with a 64x64 ICO derived from `branding\icon.png`.
- Documented that `desktop.ini` must never be committed and added it to `.gitignore`.
- Set `favicon.ico` to 16x16 pixels and added the size rule to every note.
- Tracked `branding\icon.ico` and featured `branding\icon.png` in the README.

#### Build record

| Field | Value |
| --- | --- |
| Date | 2026-11-22 |
| Branch | `main` |
| Commit | `2364ede` |
| Uncommitted paths | 17 modified files plus untracked `branding\icon.ico`, `build\favicon.png`, `builds\`, `desktop.ini` |
| Artifact | `builds\` static viewer with `index.html`, `styles.css`, `app.js`, `favicon.png`, `docs.js` |
| Gate verdict | `check-docs` PASS, `check-contradictions` PASS |
| Not run | Browser smoke test skipped because Playwright is absent |
| Signing | Not performed because no signing step exists |

#### Build record 2

| Field | Value |
| --- | --- |
| Date | 2026-11-22 |
| Branch | `main` |
| Commit | `7924c5e` |
| Uncommitted paths | ICO favicon and `desktop.ini` source edits plus untracked `branding\icon.ico` |
| Artifact | `builds\` static viewer with `index.html`, `styles.css`, `app.js`, `favicon.ico`, `docs.js` |
| Gate verdict | `check-docs` PASS, `check-contradictions` PASS |
| Not run | Browser smoke test skipped because Playwright is absent |
| Signing | Not performed because no signing step exists |

#### Build record 3

| Field | Value |
| --- | --- |
| Date | 2026-11-22 |
| Branch | `main` |
| Commit | `7924c5e` |
| Uncommitted paths | Favicon size rule and note edits plus untracked `branding\icon.ico` |
| Artifact | `builds\` static viewer with `index.html`, `styles.css`, `app.js`, `favicon.ico`, `docs.js` |
| Gate verdict | `check-docs` PASS, `check-contradictions` PASS |
| Not run | Browser smoke test skipped because Playwright is absent |
| Signing | Not performed because no signing step exists |

#### Build record 4

| Field | Value |
| --- | --- |
| Date | 2026-11-22 |
| Branch | `main` |
| Commit | `7924c5e` |
| Uncommitted paths | Favicon, note, and generated-file edits plus untracked `branding\icon.ico` |
| Artifact | `builds\` static viewer with `index.html`, `styles.css`, `app.js`, `favicon.ico`, `docs.js` |
| Gate verdict | `check-docs` PASS, `check-contradictions` PASS |
| Not run | Browser smoke test skipped because Playwright is absent |
| Signing | Not performed because no signing step exists |

### 2026-11-25

- Added onboarding defaults to the handoff `AGENTS.md` question table and `SKILLS.md` interview steps.
- Added data storage rules to the handoff `AGENTS.md`, the root `AGENTS.md`, and `build\AGENTS.template.md`.
- Added the read only rule for locations outside the project root.
- Added the `data\` subfolder convention and ignored `data\` in `.gitignore`.
- Added `build\gates\check-data-rules.js` and wired it into the gates, full test, and one-shot pipeline.
- Clarified that the Q9 installer timestamp uses the local build time.
- Recorded the browser smoke test skip as an accepted gap.
- Added the secret and credential protection policy to the handoff, root, and template rulebooks and to the data rules gate.
- Upgraded the one-shot pipeline to review code comments, refresh the roadmap, build artifacts before the artifact gate, scan the staged change for secrets, then commit and push.
- Added `build\update-comments.js` to keep each build script header current.
- Added `build\update-roadmap.js` to refresh the verified date and the pipeline entry.
- Fixed the pipeline order so artifacts are built and verified before the commit.
- Recorded the pipeline order, the secret scan, and the daily record rule in the decisions table.

### 2026-11-26

- Ran the one-shot pipeline: gates, code comment review, roadmap refresh, artifact build, commit, push.
- Fixed the handoff `SKILLS.md` structure: removed the duplicate section 11, renumbered sections to 12 through 19, and updated every cross-reference.
- Updated the `check-docs` gate to require the renumbered onboarding, contradiction, MCP, and update sections. A duplicate number or a drifted reference must fail the gate.
- Replaced the em dashes in the handoff `DESIGN.md` and the root `DESIGN.md` with commas and a full stop.
- Added the MCP test result storage rule to `AGENTS.md` section 10.1, `build\AGENTS.template.md`, and `build\handoff\AGENTS.md`. The default folder is `tests\` under the project root. The owner may change it by editing the rule.
- Added the same storage rule to `SKILLS.md` section 17 and `build\handoff\SKILLS.md` section 18.
- Added `tests\README.md` as the index for the troubleshooting knowledge base.
- Extended the data rules gate to assert the MCP test result rule in all three rulebooks.
- Added the storage instruction and the owner change path to `build\handoff\README.md`, and extended the gate to check that README. The handoff set now carries the rule in `AGENTS.md` section 10.1, `SKILLS.md` section 18, and `README.md`.
- Listed `tests\README.md` in the root `README.md` document map.
- Added a document map path check to the documentation gate. Each path in the root `README.md` document map must exist, so a renamed or removed file fails the gate instead of leaving a stale row.
- Rewrote handoff `SKILLS.md` section 20 as a nine-step procedure with a copyable prompt for a false installer running-app detection. The prompt names the main-window evidence, the fail-open rule on a probe error, and both regression cases. The documentation gate now requires the section heading, the `MainWindowHandle` evidence rule, and the failing-case-first instruction.
- Added two prompt steps to handoff `SKILLS.md` section 20. The agent must report the name, path, `MainWindowHandle`, and parent process of each counted process before an edit, and must show the failing case before the fix.

### 2026-11-27

- Ran the one-shot pipeline: gates, code comment review, roadmap refresh, artifact build, commit, push.

- Added skill 20 to the handoff `SKILLS.md`: a copyable review prompt for false running-app detections in Windows installers and updaters.
- Regenerated `build\docs.js` and the five files in `builds\`.
- Gate result: `check-docs` PASS, `check-contradictions` PASS, `check-data-rules` PASS.

## 8. Maintenance

1. Re-measure every figure with the named command before editing it.
2. Verify a commit ID with `git log -1 --format=%s <hash>` before using it.
3. Move shipped work out of open work. Do not duplicate it.
4. Add no speculative open item.
5. Date each snapshot and each decision.
6. Link to the owning document instead of copying its content.
7. Keep this file aligned with `ANALYSIS.md` when new source projects are
   analysed.

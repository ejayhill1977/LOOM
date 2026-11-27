# build

This folder holds the LOOM documentation viewer, onboarding tools, and local
checks.

## Files

| File | Role |
| --- | --- |
| `index.html` | Static tabbed viewer for four handoff templates |
| `favicon.ico` | LOOM tab icon copied to `builds\` |
| `styles.css` | Light and dark styles for the viewer |
| `app.js` | Tab behavior and clipboard copy |
| `handoff\` | Four generic templates served by the viewer |
| `AGENTS.template.md` | Generic rulebook source for new projects |
| `ONBOARDING-PROMPT.md` | Copyable prompt for an agent session |
| `onboarding-answers.template.json` | Empty answer file template |
| `ask-onboarding.js` | Asks one onboarding question per run |
| `generate-docs.js` | Embeds handoff templates into `docs.js` |
| `docs.js` | Generated template data used by the viewer |
| `check-docs.js` | Documentation gate |
| `check-contradictions.js` | Contradiction detector gate |
| `update-comments.js` | Refreshes the header date on each changed build script |
| `update-roadmap.js` | Refreshes the verified date and the pipeline entry |
| `one-shot.js` | Runs gates, comments, roadmap, artifacts, commit, and push |
| `gates\` | Regression gates that enforce project rules |
| `mcp-lib.js` | Shared MCP config discovery logic |
| `discover-mcp.js` | MCP config discovery command |
| `smoke-test.js` | Browser smoke test |
| `git-details.local.json` | LOOM-only Git author details |
| `fixtures\` | Small test fixtures for onboarding and contradictions |

Resize `branding\icon.png` to 16x16 with high-quality interpolation when the
favicon source changes. Keep the result at `build\favicon.ico`.

## Run the viewer

Open `build\index.html` in a browser for development. Click a tab to display
its template and copy the full text to the clipboard. The viewer has no runtime
dependencies.

Open `builds\index.html` to view the final artifact.

The templates are generic and intended for handoff to other projects. The viewer
does not show LOOM-specific documents. Do not retarget the viewer to LOOM
documents.

Tab order follows the coding agent handoff flow. The order is `AGENTS.md`,
`SKILLS.md`, `README.md`, then `ROADMAP.md`.

If clipboard access fails, select the displayed text and copy it manually.

## Build output

`builds\` holds the final static viewer. `build\` holds the tools, templates,
and gates.

| File | Role |
| --- | --- |
| `builds\index.html` | Viewer page with the LOOM favicon |
| `builds\styles.css` | Viewer styles |
| `builds\app.js` | Tab behavior and clipboard copy |
| `builds\favicon.ico` | 16x16 LOOM tab icon |
| `builds\docs.js` | Embedded handoff templates |

Run the generator from the project root to write all five files. The gate checks
that each artifact matches its source. Do not edit files in `builds\` by hand.

Note. Keep `favicon.ico` at 16x16 pixels. A larger icon adds bytes without
improving the browser tab.

## Update an existing project

Each handoff template carries an update path for an already onboarded project.

| Template | Update section |
| --- | --- |
| `handoff\AGENTS.md` | `### 0.6 Update an existing project` |
| `handoff\SKILLS.md` | `## 18. Update an existing project` |
| `handoff\README.md` | `## Update an existing project` |
| `handoff\ROADMAP.md` | `## Update record` |

Use the `AGENTS.md` section to confirm stored answers. Use the `SKILLS.md`
section for the update steps. Use the `README.md` section for the operator
checklist. Use the `ROADMAP.md` section to record the result.

Copy each full template from the viewer into the matching project document.
Keep verified project facts. Replace every placeholder. Run the local gates.
Record the result in the target `ROADMAP.md`.

## Local Git details

`git-details.local.json` holds LOOM-only author details. Use it only for LOOM.
Do not copy its values into generic templates or shared documents.

## Onboard a project

Copy `onboarding-answers.template.json` to the project root as
`onboarding-answers.json`. Run this command from the project root.

`node build\ask-onboarding.js`

The runner prints one question and records one answer per run. It asks about the
next missing answer on the next run. Use `--preview` to print the next question
without recording an answer.

Use `ONBOARDING-PROMPT.md` when an agent will ask the questions in chat.

## Regenerate document data

Run this command from the project root after any handoff template changes.

`node build\generate-docs.js`

The command reads `build\handoff\` and rewrites `build\docs.js`. It then copies
the viewer files and generated data into `builds\`. Do not edit `docs.js` or the
files in `builds\` by hand.

## One-shot pipeline

Run this command from the project root.

`node build\one-shot.js one-shot`

The pipeline runs eight steps in order.

| Step | Action |
| --- | --- |
| 1 | Check `main`, `origin`, and the GitHub remote. |
| 2 | Run the contradiction gate and the data rules gate. |
| 3 | Refresh each changed build script header date. |
| 4 | Refresh the verified date and the pipeline entry in `ROADMAP.md`. |
| 5 | Build the static viewer in `builds\` and confirm all five artifacts. |
| 6 | Run the documentation gate, the other two gates, and a syntax check on each script. |
| 7 | Scan the staged change for likely secrets, then commit with a detailed message. |
| 8 | Push `main` to `origin`. |

The pipeline and an installer run stop any process that locks an output path or
an install target. Identify the process by ID and executable path, then stop that
ID. Never stop a process by a name pattern, because a pattern can match an
unrelated process or the build shell itself. Record the process ID, name, and
path.

Step 7 runs only when the tree has changes. The pipeline exits non-zero at the
first failure and names the step. The artifact build comes before the gate that
compares `builds\` with `build\`, because that gate cannot pass on a stale
artifact. The commit follows the full gate set, so a failed gate leaves no
commit and no push.

## Gates

| Gate | Command | Rule |
| --- | --- | --- |
| Documentation | `node build\check-docs.js` | Check root placeholders, handoff links and headings, root document map paths, writing markers, update sections, build rules, format citations, embedded templates, tab order, build artifacts, and syntax |
| Contradictions | `node build\check-contradictions.js` | Check answer data, documented scripts, MCP state, and Git state |
| Data rules | `node build\gates\check-data-rules.js` | Assert the data storage rules, MCP test result storage rules, secret protection rules, and onboarding defaults in the rulebooks |

Each gate exits `0` on pass and non-zero on failure. Each gate prints
`PASS: ...` or `FAIL: ...`. The contradiction gate reports one conflict per run. Use
`--answers <path>` to test another answer file.

Store every regression gate in `build\gates\`. Name each gate file `check-*.js`.
The gates in this folder remain in `build\` until the move is complete. The data
rules gate already lives in `build\gates\`.

## MCP discovery

Run this command from the project root.

`node build\discover-mcp.js`

The command reads local config files only. It prints server names and paths. It
never prints tool arguments or secrets. Use `--json` for a structured report.
Use `--update-answers` to write the result to `Q10` in the answer file.

## MCP test results

`tests\` at the project root holds every MCP test result. Each file records one
test session and supports later troubleshooting. `AGENTS.md` section 10.1 owns
the rule, the file name pattern, and the record fields. Read `tests\README.md`
for the folder procedure.

The owner may change the storage folder. Edit `AGENTS.md` section 10.1, the two
template copies, and `tests\README.md` together, then move the stored files.

## Browser smoke test

Run this command from the project root.

`node build\smoke-test.js`

The test needs Playwright. When Playwright is absent, the command prints a
`SKIP:` line and exits `0`. Use `--strict` to fail instead of skipping.

## Known limit

The viewer has not been verified in a browser because Playwright is not
installed in this environment.

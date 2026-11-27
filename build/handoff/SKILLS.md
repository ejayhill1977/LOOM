# SKILLS.md

Use these skills when work repeats across projects. Keep rules in `AGENTS.md`.
Keep product behavior in `README.md`. Keep measured status in `ROADMAP.md`.

> This template is designed for use with agentic coding agents (e.g., Freebuff, Opencode, Qoder, GitHub Copilot, Kilo Code, Kiro, Cursor, and similar tools). It provides reusable procedures that agents can load and execute to maintain consistency across the project.

The open Agent Skills standard at [agentskills.io](https://agentskills.io/)
defines `SKILL.md` as a portable folder of agent instructions. It packages
specialized knowledge and repeatable workflows. Agents load a skill when a task
matches its description. This file keeps those procedures in one catalogue.

## Catalogue

| Section | Skill | Use when |
| --- | --- | --- |
| 1 | Start a new project | A project has no onboarding record. |
| 2 | Audit an existing project | An existing project needs a documentation baseline. |
| 3 | Compare documents with code | A rule may disagree with executable configuration. |
| 4 | Write an `AGENTS.md` | The project needs a rulebook. |
| 5 | Write a `README.md` | The project needs an operator guide. |
| 6 | Write a `ROADMAP.md` | The project needs measured status and open work. |
| 7 | Engineer a regression gate | A defect needs a guard that cannot silently pass. |
| 8 | Prepare a build gate | An artifact requires checks before creation. |
| 9 | Design a build system | The project needs a supported artifact path. |
| 10 | Write a `DESIGN.md` | The project needs UI components, tokens, and accessibility rules. |
| 11 | Analyze local sources | A template needs evidence from real projects. |
| 12 | Write controlled prose | Docs, comments, or commit text need review. |
| 13 | Resolve a conflict | Two documents or settings make different claims. |
| 14 | Apply a change | A defect or request needs a controlled edit. |
| 15 | Finish a change | Work needs verification and a final report. |
| 16 | Run an onboarding interview | Required project facts are missing. |
| 17 | Resolve contradictions | Documents disagree with executable configuration. |
| 18 | Document MCP integration | The project exposes or consumes MCP surfaces. |
| 19 | Update an existing project | A project needs its docs brought to the current template. |
| 20 | Review installer running-app detection | A Windows installer or updater reports a false running-app detection. |

## 1. Start a new project

1. Run the onboarding interview in section 16.
2. Copy `AGENTS.md`, `README.md`, `ROADMAP.md`, and this file into the project root.
3. Create the `data\` subfolder for databases and data files.
4. Replace every placeholder token with a verified answer.
5. Record the project root, owner, runtime, commands, and output path in `AGENTS.md`.
6. Record the product purpose and setup steps in `README.md`.
7. Record the first measured status entry in `ROADMAP.md`.
8. Run the local gates before the first edit.

Use section 19 for a project that already has these documents.

## 2. Audit an existing project

1. List the root files and executable configuration.
2. Read each current document that owns project facts.
3. Identify missing rules, stale commands, and unsupported claims.
4. Run the contradiction check when one exists.
5. Name each conflict in one sentence.
6. Ask the owner which source is true when code alone cannot decide.
7. Repair the losing document.
8. Record each decision and date in `ROADMAP.md`.

Use section 19 to apply the current template after the audit.

## 3. Compare documents with code

1. Select one documented command or rule.
2. Find the executable source that governs it.
3. Run the command or inspect the configuration.
4. Record the observed result.
5. Trust executable configuration until the owner decides otherwise.
6. Repair the losing document.
7. Repeat for the next documented command or rule.

## 4. Write an `AGENTS.md`

1. Use one H1 with the filename.
2. State the project root, owner, default branch, and review date.
3. Own stack facts, commands, rules, and file ownership in this file.
4. Include onboarding questions and the contradiction protocol.
5. Include writing, engineering, testing, Git, build, MCP, and safety rules.
6. Link to focused subdocuments instead of copying their content.
7. Verify every command against executable configuration.

## 5. Write a `README.md`

1. Use one H1 with the product title.
2. State the product purpose in one sentence.
3. Add a short status callout when work is incomplete.
4. Own setup, controls, behavior, procedures, and terminology in this file.
5. Add a document map that links to `AGENTS.md` and `ROADMAP.md`.
6. State known limits and missing verification.
7. Keep historical notes in dated sections.

## 6. Write a `ROADMAP.md`

1. Use one H1 with the project title and `Roadmap`.
2. State that `AGENTS.md` owns rules and `README.md` owns product behavior.
3. Record only measured status.
4. Give each open item a closure check.
5. Record decisions with a date and the winning source.
6. Record shipped work in a change log.
7. Re-measure every figure before editing it.

## 7. Engineer a regression gate

1. Reproduce the defect with a named command or surface.
2. Capture the actual failing output.
3. State one cause in one sentence.
4. Write a check that fails on that cause.
5. Keep the check deterministic and bounded.
6. Print `PASS: ...` or `FAIL: ...`.
7. Exit with `0` on pass and non-zero on failure.
8. Store the gate in `build\gates\` under version control.
9. Document the gate in the owning subsystem guide.

## 8. Prepare a build gate

1. Run all hard gates before an artifact is written.
2. Stop the build when any hard gate fails.
3. Do not skip, weaken, or suppress a gate.
4. State the artifact name and output folder.
5. Record the commit, branch, uncommitted paths, and gate verdict.
6. State any check that did not run.
7. Ask for permission before a new build when no standing approval exists.
8. Stop any process that locks a build output path or an installation target.
   Stop it without asking. Identify the process by ID and executable path, then
   stop that ID. Stop only a process that holds the locked path or runs from the
   project output. Do not stop a process by a name pattern. Record the process
   ID, name, and path in the build report.

## 9. Design a build system

1. Name one supported build entry point.
2. Resolve paths at runtime.
3. Write artifacts only to the documented output directory.
4. Keep one artifact shape.
5. Keep staging inside the checkout.
6. Clean staging after success and failure.
7. Rebuild the build tool after its source changes.
8. Verify the artifact with the documented smoke test.
9. Keep `favicon.ico` at 16x16 pixels. A larger icon adds bytes without
   improving the browser tab.

## 10. Write a `DESIGN.md`

1. List approved UI components with markup and CSS examples.
2. Define design tokens: colors, spacing, typography, radius, shadows.
3. Specify interaction requirements: focus, touch, animations.
4. Specify accessibility requirements: semantic HTML, ARIA, contrast, text.
5. List explicit prohibitions: obsolete HTML, CSS, and JavaScript APIs.
6. Add platform-specific sections (Windows desktop, web app).
7. Document linting and enforcement rules.
8. Provide a verification checklist for PR review.
9. Link `DESIGN.md` from `AGENTS.md` authority section.

## 11. Analyze local sources

1. List candidate projects before reading files.
2. Exclude dependencies, generated output, binaries, vendor files, and private notes.
3. Record each source path and the files read.
4. Count repeated patterns across sources.
5. Separate universal patterns from project-specific patterns.
6. Record conflicts between sources.
7. Turn only evidence-backed patterns into templates.

## 12. Write controlled prose

1. Use short words and one meaning per word.
2. Use the same term for the same thing every time.
3. Write instructions in imperative form.
4. Put a condition before the instruction it governs.
5. Keep an instruction sentence to 20 words or fewer.
6. Keep a descriptive sentence to 25 words or fewer.
7. Do not use semicolons, contractions, or em dashes.
8. Wrap paths, commands, and literal values in backticks.
9. Use a vertical list for a complex sequence.

## 13. Resolve a conflict

1. Name one conflict in one sentence.
2. Name the two sources.
3. Identify the executable source when one exists.
4. Trust executable configuration until the owner answers.
5. Ask the owner when the true source is unclear.
6. Repair the losing source.
7. Record the decision and date in `ROADMAP.md`.
8. Repeat for the next conflict.

## 14. Apply a change

1. Reproduce the failure.
2. Inspect bounded logs, state, and source.
3. State one cause in one sentence.
4. Change the smallest correct cause.
5. Do not weaken an assertion or skip a gate.
6. Run the focused check.
7. Run the broader check when shared code changed.
8. Repeat the original reproduction.
9. Update the owning document.

## 15. Finish a change

1. Confirm the requested behavior works.
2. Confirm no unrequested surface was added.
3. Confirm focused and full verification results.
4. Confirm gate verdicts.
5. Re-measure roadmap figures.
6. Confirm secrets and user data are untouched or safely migrated.
7. Review status, diff, and recent history when Git is present.
8. State which checks ran and which checks did not run.

## 16. Run an onboarding interview

Ask one question at a time. Use the required questions in `AGENTS.md` section 0.
Wait for each answer before asking the next question. Offer one short answer
field. Offer a default when a default is known. Do not combine questions. Do not
infer a missing answer from a path.

Use these defaults. For Q2 offer the current working directory and allow a
custom directory. For Q4 default to `main` and allow an override. For Q6 offer a
tier list of the best runtime and stack choices with a short reason for each and
allow a custom entry. For Q7 use plain words such as which command should create
your final product or installer. For Q8 default to `check` and allow an
alternative. For Q9 default to `builds\` and name installers
`{ProjectName}-Setup-YYYY.MM.DD-HHMM-x64.exe` where `HHMM` is the local build
time.
For Q10 offer the best Model Context Protocol (MCP) surface for the project and
explain what it does. For Q11 bring each contradiction to the user and ask the
user to resolve it.

Record each answer in the owning document. Ask a follow-up question when an
answer is unclear. Stop when every required answer is known.

Use a local onboarding runner when one exists. Use a copyable prompt when one
exists. Store answers in `onboarding-answers.json`.

## 17. Resolve contradictions

Run the local contradiction checker before manual review when one exists.
Compare each current document with executable configuration. Name one conflict
in one sentence. Ask which source is true. Trust executable configuration until
the owner answers.

Repair the losing document. Record the decision and date in `ROADMAP.md`.
Repeat from the next conflict. Record a missing checker as a gap. Do not
simulate its output.

## 18. Document MCP integration

Run local MCP discovery when one exists. Record the project MCP role, server
packages, configuration path, exposed tools, and trust boundary in `AGENTS.md`
section 10.

Treat MCP tool input as untrusted. Validate every tool argument against its
schema. Put write tools behind explicit confirmation. Redact secrets in logs and
error reports.

Keep credentials in the environment or an untracked local file. Restart a
client after its MCP configuration changes. Document each tool in `README.md`
or a subsystem document. Record a missing tool as a gap. Do not simulate its
output.

Store every MCP test result in the `tests\` folder of the project root. Section
10.1 of `AGENTS.md` owns the folder, the file name, and the record fields.

## 19. Update an existing project

Use this skill to bring an existing project onto the current template.

1. Run the audit in section 2. List the stale and missing sections.
2. Read the stored answers. Mark each answer that code or config contradicts.
3. Ask the owner for each marked answer. Ask one question at a time.
4. Apply the current template sections to the project documents.
5. Keep every verified project fact. Replace only stale or missing content.
6. Preserve the decisions and dated history in `ROADMAP.md`.
7. Record the update with the date, source, change, and gate result.
8. Run the checks in section 15. State each check that did not run.

Closure check: no placeholder remains, every answer matches configuration, and
all gates pass.

## 20. Review installer running-app detection

Use this skill when a Windows installer or updater reports a false running-app
detection. Copy the prompt below into a new session before the agent edits
installer code.

1. Find the running-app check. Search the NSIS script for
   `customCheckAppRunning`, `.onInit` callers, and `tasklist` or process scans.
2. Trace the detection logic and every caller before you change a line.
3. Identify how the check separates a real app from an installer-owned helper
   that reuses the executable name, such as an engine or sidecar process.
4. Reject a broad name-based skip. Use executable path, process ancestry, the
   parent process, a helper-only environment variable, or window ownership.
5. Count only processes with a non-zero `MainWindowHandle`. A real app owns a
   window. A headless sidecar does not.
6. Make the probe fail open. A query error must allow the install, not block it.
7. Preserve blocking for a real open app.
8. Add one regression case for each outcome. A helper must not block. A running
   app must block.
9. Require the process evidence before the edit. Ask for the name, executable
   path, `MainWindowHandle`, and parent process of each counted process.
10. Require the failing case first. A green installer run alone does not prove
    the probe changed.
11. Report the changed files and the tests run.

```text
You are reviewing a Windows NSIS installer for a false "application is running" detection that blocks installation even when no app window is open.

Task
1. Find the installer's app-running check (for example, an NSIS macro such as customCheckAppRunning, or a tasklist/process scan).
2. Trace the detection logic and its callers before changing anything.
3. Identify how the installer distinguishes a real running app from its own helper or sidecar processes that reuse the app's executable name (for example, an Electron/WebTorrent sidecar launched with the same exe).
4. Do not fix this by broadly ignoring every process with that name; that could allow installation over a genuinely running app. Prefer evidence such as executable path, process ancestry, parent process, a helper-only environment variable, or whether the process owns a window.
5. Make the smallest safe change. Preserve blocking for a real open app. Make the check fail open (a query error must not block installation).
6. Add regression tests for both cases: an installer-owned helper/sidecar must not block installation; a running installed app must block installation.
7. Verify the fix and run the tests. Report the files changed and the tests run.

Before you edit
8. Report the blocking process evidence first: process name, executable path, MainWindowHandle, and parent process for every process the current check counts.
9. Show the failing case first. Reproduce the false block and capture the output before the change. Then show the same command pass after the change. A green installer run alone does not prove the probe changed.

Key precedent: count only processes with a non-zero MainWindowHandle (a real app owns a window; a headless sidecar does not), and default to allowing the install when the probe itself errors.
```

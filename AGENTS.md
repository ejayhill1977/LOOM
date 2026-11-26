# AGENTS.md

Rulebook for LOOM.

Project root: `D:\LOOM Agentic Documentation`
Owner: `EJ Hill`
Default branch: `main`
Last reviewed: `2026-11-22`

Keep project facts in this file. Keep product description in `README.md`. Keep
status and open work in `ROADMAP.md`. Keep the generic template in
`build\AGENTS.template.md`.

## 0. Agent onboarding

Use this section before editing any project. Ask every required question for a
new project. Confirm the stored answers for an existing project.

### 0.1 Question protocol

1. Ask one question in each message.
2. Wait for the answer before asking the next question.
3. Offer one short answer field. Offer a default when a default is known.
4. Do not combine questions. Do not infer a missing answer from a path.
5. Record each answer in the owning document.
6. Ask a follow-up question when an answer is unclear.
7. Stop when every required answer is known.

### 0.2 Required questions

| ID | Question | Store in |
| --- | --- | --- |
| Q1 | What is the project name or title? | `README.md` |
| Q2 | What is the main project directory? | `AGENTS.md` |
| Q3 | Who owns the project? | `AGENTS.md` |
| Q4 | Which branch is the default branch? | `AGENTS.md` |
| Q5 | What does the product do in one sentence? | `README.md` |
| Q6 | Which runtime and stack does the project use? | `AGENTS.md` |
| Q7 | Which command builds the supported artifact? | `AGENTS.md` |
| Q8 | Which commands run checks and gates? | `AGENTS.md` |
| Q9 | Where does the build write artifacts? | `AGENTS.md` |
| Q10 | Which MCP servers or tools does the project use? | `AGENTS.md` section 10 |
| Q11 | Does any current document disagree with executable configuration? | `ROADMAP.md` |

### 0.3 Contradiction protocol

1. Compare each current document with executable configuration.
2. Name one conflict in one sentence.
3. Ask which source is true.
4. Trust executable configuration until the owner answers.
5. Repair the losing document.
6. Record the decision and date in `ROADMAP.md`.
7. Repeat from step 2 for the next conflict.

### 0.4 LOOM onboarding answers

| ID | Answer |
| --- | --- |
| Q1 | LOOM |
| Q2 | `D:\LOOM Agentic Documentation` |
| Q3 | EJ Hill |
| Q4 | `main` |
| Q5 | LOOM turns observed agentic documentation patterns into reusable templates. |
| Q6 | Static HTML, CSS, JavaScript, and Node local checks |
| Q7 | `node build\generate-docs.js` |
| Q8 | `node build\check-docs.js; node build\check-contradictions.js; node build\gates\check-data-rules.js` |
| Q9 | `builds\` |
| Q10 | None |
| Q11 | No known conflict |

### 0.5 Onboarding tools

Use `node build\ask-onboarding.js` to ask one question per run. Use
`build\ONBOARDING-PROMPT.md` for a chat prompt. Store answers in
`onboarding-answers.json`.

Run `node build\check-contradictions.js` before manual contradiction review.

### 0.6 Update an existing project

Use this procedure before you change the docs of a project that is onboarded.

1. Read each current root document. List the facts that it owns.
2. Run the local gates. Record the current result.
3. Compare each documented command with executable configuration.
4. Name one conflict in one sentence. Ask the owner which source is true.
5. Trust executable configuration until the owner answers.
6. Keep every verified project fact. Replace only stale or missing content.
7. Re-ask a required question when its answer is missing or contradicted.
8. Run the gates after the edit. Record the result in `ROADMAP.md`.
9. State each check that did not run.

Do not replace a verified fact with a placeholder. Do not remove a decision or
a dated record.

## 1. Authority and scope

1. `D:\LOOM Agentic Documentation` is the only location for project files. Do
   not write project files to another directory.
2. Commands in this file run from the project root unless stated otherwise.
3. `AGENTS.md` owns stack facts, commands, rules, and file ownership.
4. `README.md` owns product behavior, controls, setup, and operator procedures.
5. `ROADMAP.md` owns measured status, open work, decisions, and change history.
6. `DESIGN.md` owns approved UI components, design tokens, interaction and
   accessibility requirements, and explicit prohibitions. Read `DESIGN.md`
   before changing any UI surface.
7. A focused subdocument such as `build\README.md` owns one subsystem. Link to
   it instead of restating it here.
8. If a document and executable configuration disagree, trust the executable
   configuration and repair the document.
9. Do not read, edit, move, delete, or commit a directory marked private by the
   owner. Never un-ignore a private directory.
10. Never store project data outside the project root at any time.
11. Store every database and data file in the `data\` subfolder.
12. When you query or analyze a location outside the project root, treat it as
    read only. Never modify, move, or delete a file or folder there.

## 2. Professional standard

Apply this standard to every code and documentation change.

- Write clean, correct, well-structured code.
- Assume another engineer will read every line.
- Keep functions small and focused.
- Use explicit data flow instead of hidden global state.
- Do not add hacks, commented-out code, magic numbers, or silent failures.
- Do not add a setting, UI control, or diagnostic surface that the owner did not
  request. If one appears necessary, state the need and ask first.
- Make the smallest correct change in the existing style.
- Preserve the detected architecture. Record a required architecture change in
  `ROADMAP.md` before implementation.

### 2.1 Presenting multiple options

- When presenting multiple options, never use a bulleted or numbered list.
- Render each option as a selectable card in a responsive grid.
- Keep each card concise.
- Make the whole card selectable.
- Let the grid wrap to fit the available screen width and height.
- If the interface cannot render interactive cards, say so rather than pretending
  plain-text boxes are selectable.

## 3. Writing rules

These rules apply to code comments, documentation, commit messages, pull
request descriptions, changelog entries, and client-facing text. Conversational
chat replies may use clear standard English.

### 3.1 Language

- Use short, simple words. Use one meaning for each word.
- Use the same word for the same thing every time.
- Maintain a terminology list in `README.md` or a dedicated glossary.
- Use simple verb forms: infinitive, imperative, simple present, simple past,
  simple future, and past participle as an adjective.
- Use active voice. Use passive voice in descriptive text only when no active
  construction is possible.
- Write instructions in imperative form. Write one instruction per sentence.
- Put a condition before the instruction it governs.
- Keep an instruction sentence to 20 words or fewer.
- Keep a descriptive sentence to 25 words or fewer.
- Limit a paragraph to one topic and six sentences.
- Keep a noun cluster to three words or fewer.
- Do not omit articles. Do not use contractions. Do not use semicolons.
- Use a vertical list for a complex sequence.
- Mark a safety statement with `WARNING`, `CAUTION`, or `Note`. State the risk
  or the result.
- Do not use the em-dash character. Use a comma, colon, parentheses, or a new
  sentence.

### 3.2 Document structure

- Use one H1 per document. Use H2 for major sections and H3 for nested detail.
- Use tables for inventories, status, commands, and gate catalogues.
- Use fenced blocks for commands, JSON, and directory trees.
- Wrap paths, commands, filenames, branch names, tool names, and literal values
  in backticks.
- Use numbered lists when order matters. Use bullets for unordered rules.
- Use blockquotes for brief status callouts.
- Keep dates in one format per project. Prefer `YYYY-MM-DD`.
- Link to another document instead of copying its content.
- Keep historical sections dated. Do not rewrite history as current state.

### 3.3 Documentation maintenance

- Update comments and documentation with the code change.
- Verify commands against the executable configuration, not against prose.
- Re-measure every roadmap figure before editing it.
- Use verified commit IDs only. Verify a commit with `git log -1 --format=%s <hash>`.
- Move shipped work out of open work. Do not duplicate it.
- Add no speculative roadmap entry. Every open item states a closure check.
- Record a build, measurement, or tooling investigation with the fix and the
  rule that must not break.

### 3.4 Citation standards

These rules apply when you write research synthesis, technical documentation,
academic papers, code comments, legal or policy briefs, or other content that
needs source attribution.

1. Core mandate. Always verify and use the latest official edition of the chosen
   citation style. Do not rely on an outdated edition unless the owner asks for
   it.
2. Use a tiered list of citation formats for the current project. Rank the tiers
   from most appropriate to least appropriate. Give a clear reason for each tier
   before you apply the top style. If the choice is ambiguous, wait for owner
   input.
3. Enforce dual format separation. Keep the in-text citation and the reference
   list entry separate. Do not paste a full bibliographic entry inline. Do not
   leave an unexpanded inline marker in the reference list.

Authoritative formats and official specifications:

- Engineering, computer science, and electronics. Use IEEE or ACM. The latest
  versions are the IEEE Editorial Style Manual for Authors and the ACM Primary
  Article Templates and Reference Format.
- Social sciences, psychology, education, and general research. Use APA or
  Chicago. The latest versions are APA 7th edition and Chicago 18th edition.
- Humanities, history, publishing, and multidisciplinary work. Use Chicago,
  Turabian, MLA, or Harvard. The latest versions are Chicago 18th edition,
  Turabian 9th edition, MLA 9th edition, and Harvard referencing.
- Medicine, life sciences, and clinical research. Use AMA or Vancouver. The
  latest versions are AMA 11th edition and Vancouver 2nd edition.
- Law and government policy. Use The Bluebook or Harvard. The latest versions
  are The Bluebook 22nd edition and Harvard referencing.
- Commonwealth, UK, Australian, or South African academic and institutional
  work. Use Harvard. The latest versions follow the target institution or a
  standard such as Cite Them Right.

Tiered recommendation protocol:

- Before you write or refactor citations, output a tiered citation recommendation.
  Rank tiers from Tier 1 to Tier N. Tier 1 is the primary recommended standard.
  Tier 2 is a viable alternative. Tier 3 is not recommended.

Dual format rule:

1. In-text or inline citation. Use it in body prose, footnotes, or code
   docstrings. Use a compact format. For code comments, use a compact marker. Put
   the full entry in a module header, README, or references file.
2. Reference list entry. Use it in the terminal source section. Follow the sorting
   rule of the chosen style. Do not omit required punctuation, italics, case
   rules, or identifiers.

## 4. Change workflow

Use this loop for every defect or requested change.

1. Reproduce. Name the failing command, gate, page, or live surface. Capture the
   actual error.
2. Inspect. Read logs, state, diffs, and the relevant source block. Use bounded
   output.
3. Hypothesize. State one cause in one sentence. Name a file and symbol.
4. Patch. Change the cause with the smallest edit. Do not weaken an assertion,
   skip a gate, or add a suppression.
5. Verify. Run the focused check. Run the broader check when shared code
   changed. Repeat the original reproduction.
6. Record. Add the measurement and the rule to the correct document.

Do not declare a fix before step 5 passes. If a step cannot run, state which
step failed and why. Report evidence, not intent.

## 5. Engineering conventions

- Resolve application, resource, and user data paths at runtime. Do not hard-code
  absolute paths in program code.
- Keep all project data inside the project root at all times.
- Store every database and data file in the `data\` subfolder.
- Add `data\` to `.gitignore` when the files are local user data.
- Put test sandboxes inside the project and add them to `.gitignore`. Do not
  write project data to the OS temp folder.
- When you analyze a location outside the project root, do not modify or remove
  any file or folder there.
- Keep dependency versions pinned. Keep related runtime packages compatible.
- Bundle every runtime binary the product needs.
- Keep LOOM branding in `branding\`. Track both icon files in Git.
- Validate and sanitize IPC input, external data, file paths, and URI input.
- Treat external addresses, stores, logs, and protocol handlers as untrusted.
- Never edit a live data store by hand. Use application code or a supported
  tool. Back up before a manual repair.
- Never print a secret value. Redact secrets in logs and error reports.
- Keep credentials in the environment or an untracked local file. Never commit
  a token, certificate, password, or personal key.

## 6. Context hygiene and tool use

Use the first tool that covers the domain. Use a raw shell command only when no
structured tool covers the work.

1. Symbol lookup or native code intelligence.
2. Structured source control for status, diff, and history.
3. Documentation lookup for external APIs. Query by library id, major version,
   and exact question.
4. Structured runtime inspection for a live app, browser, or service.
5. Scoped shell for builds, tests, and commands with no structured tool.
6. Raw file reads and text search for prose, config, and CSS.

Additional rules:

- Use file discovery first, then a narrow search, then a bounded read window.
- Do not read a large source file end to end. Resolve the symbol first.
- Do not grep for a symbol that a code intelligence tool can resolve.
- Use filters and line limits on logs. Do not load a whole log.
- Project one field from a large JSON store. Do not print the whole store.
- Keep gate output to the result line and failed checks. Preserve exit status.
- Restart a client after its tool configuration changes.
- Do not invent a missing tool or simulate its output. Record the gap.

## 7. Linting, formatting, typechecking, and testing

Run verification before you declare work finished. The named commands are the
only source of truth.

| Check | Command | Gate style | Rule |
| --- | --- | --- | --- |
| Lint | `node build\check-docs.js` | Hard | Check placeholders, links, required sections, root document map paths, and writing markers. |
| Contradictions | `node build\check-contradictions.js` | Hard | Compare answer file, documented scripts, MCP state, and Git state. |
| Data rules | `node build\gates\check-data-rules.js` | Hard | Assert the data storage rules, MCP test result storage rules, secret protection rules, and onboarding defaults in the rulebooks and the handoff README. |
| Format check | `None` | Gap | No formatter is configured. |
| Typecheck | `None` | Gap | No typechecker is configured. |
| Focused test | `node --check build\app.js` | Hard | Run after JavaScript changes in `build\`. |
| Browser smoke test | `node build\smoke-test.js` | Gap when unavailable | Run when Playwright is installed. State a skip. |
| Full test | `node build\check-docs.js; node build\check-contradictions.js; node build\gates\check-data-rules.js; node build\generate-docs.js; node --check build\app.js; node --check build\generate-docs.js; node --check build\docs.js; node build\smoke-test.js` | Hard | Run all local checks before completion. State a browser skip. |
| Gates | `node build\check-docs.js; node build\check-contradictions.js; node build\gates\check-data-rules.js` | Hard | Do not weaken or skip a gate. |
| one-shot pipeline | `node build\one-shot.js one-shot` | Hard | Run gates, review code comments, refresh the roadmap, build artifacts, commit, and push in one command. |

Rules:

- Run the focused check before the full suite when a specific defect is under
  repair.
- Add coverage for new behavior. Keep existing suites green.
- Do not weaken a test to make a gate pass. Repair the cause or retire a suite
  whose subject was removed, and state why.
- A broken tool must not read as green. A missing tool is a failure or a stated
  gap, never a silent pass.
- A baseline gate blocks new failures. It does not require unrelated debt to be
  fixed in the same change.
- Pay down baseline debt one family at a time. Update the baseline after each
  verified batch.
- Never report a test, lint, typecheck, or gate run that did not happen.
- State clearly which check ran and which check did not run.
- No linter, formatter, typechecker, test runner, or CI exists beyond the local
  checks named above. Those checks are the whole gate.

Gate contract:

- Store regression gates in `build\gates\`.
- Name a gate file `check-*.js`.
- Give each gate a title header in its file or output.
- Exit `0` on pass and non-zero on failure.
- Print `PASS: ...` or `FAIL: ...`.
- Run gates from the project root with the project runtime.
- Keep a gate baseline at `build\gate-baseline.json` when debt is tracked.
- Document every new gate in `build\README.md`.

## 8. Version control

Read this section before any edit, commit, push, or pull request.

1. Run `git branch --show-current` and `git branch --list main master` before
   the first edit.
2. Use `main` for every task. Use another branch only when the current prompt
   explicitly names it.
3. If `master` exists and `main` does not, rename `master` to `main`. If the
   rename fails, stop and report the error.
4. If `main` and `master` both exist, stop and report both. Do not merge,
   delete, or rename either without an instruction.
5. Do not create a branch. This covers feature, bugfix, release, hotfix,
   experiment, and temporary branches.
6. Do not create a worktree for another branch.
7. Do not switch branches or open a pull request from another branch unless the
   current prompt explicitly instructs it.
8. If you find an unexpected branch, stop and report it. Do not move, delete,
   or rewrite it without an instruction.
9. When Git is present, commit to `main` after each completed change. Stage only
   files from the current change.
10. Write a detailed commit message that states what changed and why. State the
    change in the subject line.
11. The owner authors every commit. Do not add `Co-Authored-By`, `Generated
    with`, or any other AI attribution line. Keep `includeCoAuthoredBy` set to
    `false` where the tool supports it.
12. Do not push, amend, rebase, force-push, or open a pull request unless the
    current prompt asks for that action.
13. Do not rename or delete a remote branch without explicit confirmation.
14. Never commit secrets, tokens, personal data, certificate data, or `.env`
    files.
15. Never force-push, reset a shared branch, clean the worktree destructively,
    or rewrite history without a direct request.
16. Keep `.git` visible on every operating system. Never set Hidden or System
    attributes on it. Check again after a restore.
17. A tool approval prompt does not relax any rule in this section.
18. Treat a write through an MCP tool the same as the same write through the
    shell.
19. Never commit `desktop.ini`. Keep it in `.gitignore`.

`D:\LOOM Agentic Documentation` uses Git on `main` as of 2026-11-22.

Set `user.name` and `user.email` from `build\git-details.local.json`. Do not use
these values in another project or in a generic template. Keep
`build\git-details.local.json` ignored.

### 8.1 Secret and credential protection

Before you create or modify a commit, inspect every staged file and the staged
diff. Inspect untracked files that you are about to add.

Treat these as potentially sensitive, not only files named `.env`:

- API keys, tokens, passwords, private keys, certificates, connection strings,
  and session cookies.
- Cloud, database, payment, source-control, and deployment credentials.
- Credential stores, local agent settings, logs, backups, exports, and files
  with names such as `*secret*`, `*credential*`, `*token*`, or `*key*`.

If you find a likely secret:

1. Do not stage or commit it. Do not print, quote, or copy the secret into chat,
   logs, commands, or generated files.
2. Report the file path and a brief reason, with the suspected value redacted.
3. Suggest removing the secret from the change. Add the file or pattern to
   `.gitignore` where appropriate. Use an environment variable or an approved
   secret manager instead.
4. If the secret may already be committed or shared, advise the owner to revoke
   or rotate it.

Do not assume `.gitignore` protects a file that is already tracked. Verify
whether a file is staged or tracked before you claim it is excluded. Do not
delete or rewrite a user file automatically.

The owner may override a warning for a specific file. Explain that the file
appears to contain sensitive data. Ask for confirmation. Proceed only after a
clear and specific confirmation. Never reveal the suspected value. A general
instruction such as "ignore the warnings" is not confirmation for a particular
secret-bearing file.

Note. A tool approval prompt does not relax this rule.

## 9. Building and running

### 9.1 Supported commands

| Purpose | Command |
| --- | --- |
| Install dependencies | `None` |
| Run in development | Open `build\index.html` in a browser |
| Ask next onboarding question | `node build\ask-onboarding.js` |
| Discover MCP configuration | `node build\discover-mcp.js` |
| Run checks | `node build\check-docs.js; node build\check-contradictions.js; node build\gates\check-data-rules.js` |
| Update code comments | `node build\update-comments.js` |
| Update roadmap | `node build\update-roadmap.js` |
| Browser smoke test | `node build\smoke-test.js` |
| Build | `node build\generate-docs.js` |
| Build gates only | `node build\check-docs.js; node build\check-contradictions.js; node build\gates\check-data-rules.js` |
| Rebuild build tool | `node build\generate-docs.js` |
| Clean staging | `None` |

Use `node build\generate-docs.js` as the supported build entry point.
No legacy build entry point exists. The source viewer is a static page in
`build\index.html`. The build writes the final static viewer to `builds\`.

### 9.2 Build rules

1. Ask before a new installer build. Build only after explicit agreement. A
   standing owner request is the only exception.
2. Do code work, comments, documentation, verification, and the commit before
   asking about a build.
3. Run the preflight gates first. A failed preflight gate stops the run before
   any artifact is written. Build the artifact before the gate that checks
   artifact freshness.
4. Do not bypass, skip, or weaken a gate to make a build pass.
5. Write artifacts only to `builds\`.
6. Keep one artifact shape. Use the static viewer with `index.html`,
   `styles.css`, `app.js`, `favicon.ico`, and `docs.js`.
7. Do not build or ship a portable folder, ZIP, unpacked folder, or per-user
   variant unless the owner asks for it.
8. Close running app instances that lock build output. Retry on `EBUSY` or a
   lock error. Do not force-kill a running app during a build.
9. Keep staging inside the checkout. Clean staging after success and failure.
10. Keep the newest artifact. Delete older artifacts only under the documented
    retention rule.
11. Record build provenance: commit, branch, uncommitted paths, artifact name,
    and gate verdict.
12. State a build limit when a full sweep was not run or a signing step was not
    performed.
13. Rebuild the build tool after its source changes.
14. Rebuild any required companion application before the main installer build.
15. Verify the built artifact with the documented smoke test before calling the
    build successful.
16. Keep the tabbed viewer bound to `build\handoff\`. Do not point it at
    LOOM-specific root documents.
17. Keep build tools in `build\`. Write final artifacts to `builds\`.
18. Store every regression gate in `build\gates\`.

Note. Keep `favicon.ico` at 16x16 pixels. A larger icon adds bytes without
improving the browser tab.

### 9.3 Artifact permission gate

Before a build, state the following in the request:

- the artifact name and output folder,
- the checks that passed,
- the checks that did not run,
- whether the artifact replaces a previous build,
- any known limit.

Wait for the owner's answer. Do not infer permission from a previous build.

## 10. MCP integration

Use this section when the project exposes or consumes MCP servers, tools,
resources, or prompts. State `None` when no MCP surface exists.

Run `node build\discover-mcp.js` before recording the MCP answers.

| Item | Value |
| --- | --- |
| Project MCP role | None |
| Server packages | None |
| Configuration path | None |
| Exposed tools | None |
| Trust boundary | Not applicable |

1. Treat MCP tool input as untrusted.
2. Validate every tool argument against its schema.
3. Put write tools behind explicit confirmation.
4. Redact secrets in logs and error reports.
5. Keep credentials in the environment or an untracked local file.
6. Restart a client after its MCP configuration changes.
7. Document each tool in `README.md` or a subsystem document.
8. Record a missing tool as a gap. Do not simulate its output.

### 10.1 MCP test result storage

1. Store every MCP test result inside the project folder under the `tests\`
   subfolder. The stored results form a persistent knowledge base for
   troubleshooting.
2. Create one file for each MCP test session. Name the file
   `mcp-{server}-{YYYY-MM-DD-HHMM}.md`.
3. Record the date, server, tool, request, response summary, expected result,
   actual result, cause, and fix in each file.
4. Redact secrets and personal data before you write the file.
5. Keep each result file that supports a recorded fix. Do not delete it.
6. Change the storage folder only when the owner asks. Edit this subsection, then
   move the existing result files to the new folder.

## 11. Autonomy and safety

Auto-approved:

- reads, symbol lookup, documentation queries,
- read-only state and store queries,
- log, console, and network inspection with bounded output,
- task-scoped source edits,
- focused tests, read-only projections, and syntax checks,
- read-only git commands.

Explicit confirmation required:

- destructive data mutation, migration, `DROP`, or `TRUNCATE`,
- force-push, history rewrite, branch deletion, or remote change,
- production write, release, deploy, or billing action,
- secret, credential, token, vault, or environment file change,
- new runtime dependency,
- build or installer creation,
- global tooling change,
- deletion or move of source, test, or user data outside the task.

Never:

- commit a secret or personal data,
- stage or commit a file that contains a likely secret,
- print, quote, or copy a secret into chat, logs, commands, or generated files,
- write project files outside the project root,
- store project data outside the project root at any time,
- store a database or data file outside the `data\` subfolder,
- modify or remove a file or folder outside the project root during analysis,
- weaken a gate to make a build pass,
- claim a check that did not run,
- hide `.git`,
- write to production or a remote environment without instruction.

## 12. Definition of done

A change is complete only when every applicable item is true.

- The requested behavior works.
- The smallest correct cause was changed.
- No unrequested setting or surface was added.
- Focused verification passed.
- Full verification passed, or the gap is stated.
- Gates passed, or the baseline rule is stated.
- Documentation matches code.
- Roadmap facts were re-measured.
- User data and secrets are untouched or safely migrated.
- When Git is present, `git status --short`, `git diff`, and `git log -1 --oneline` were reviewed.
- When Git is present, the commit is on `main` with a message that states what and why.
- When Git is absent, the gap is stated in the final report.
- No generated artifact was created without permission.
- The final report names the checks that ran and the checks that did not.

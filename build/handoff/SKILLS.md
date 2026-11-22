# SKILLS.md

Use these skills when work repeats across projects. Keep rules in `AGENTS.md`.
Keep product behavior in `README.md`. Keep measured status in `ROADMAP.md`.

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
| 10 | Analyze local sources | A template needs evidence from real projects. |
| 11 | Write controlled prose | Docs, comments, or commit text need review. |
| 12 | Resolve a conflict | Two documents or settings make different claims. |
| 13 | Apply a change | A defect or request needs a controlled edit. |
| 14 | Finish a change | Work needs verification and a final report. |
| 15 | Run an onboarding interview | Required project facts are missing. |
| 16 | Resolve contradictions | Documents disagree with executable configuration. |
| 17 | Document MCP integration | The project exposes or consumes MCP surfaces. |

## 1. Start a new project

1. Run the onboarding interview in section 15.
2. Copy `AGENTS.md`, `README.md`, `ROADMAP.md`, and this file into the project root.
3. Replace every placeholder token with a verified answer.
4. Record the project root, owner, runtime, commands, and output path in `AGENTS.md`.
5. Record the product purpose and setup steps in `README.md`.
6. Record the first measured status entry in `ROADMAP.md`.
7. Run the local gates before the first edit.

## 2. Audit an existing project

1. List the root files and executable configuration.
2. Read each current document that owns project facts.
3. Identify missing rules, stale commands, and unsupported claims.
4. Run the contradiction check when one exists.
5. Name each conflict in one sentence.
6. Ask the owner which source is true when code alone cannot decide.
7. Repair the losing document.
8. Record each decision and date in `ROADMAP.md`.

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
8. Keep the gate under version control.
9. Document the gate in the owning subsystem guide.

## 8. Prepare a build gate

1. Run all hard gates before an artifact is written.
2. Stop the build when any hard gate fails.
3. Do not skip, weaken, or suppress a gate.
4. State the artifact name and output folder.
5. Record the commit, branch, uncommitted paths, and gate verdict.
6. State any check that did not run.
7. Ask for permission before a new build when no standing approval exists.

## 9. Design a build system

1. Name one supported build entry point.
2. Resolve paths at runtime.
3. Write artifacts only to the documented output directory.
4. Keep one artifact shape.
5. Keep staging inside the checkout.
6. Clean staging after success and failure.
7. Rebuild the build tool after its source changes.
8. Verify the artifact with the documented smoke test.

## 10. Analyze local sources

1. List candidate projects before reading files.
2. Exclude dependencies, generated output, binaries, vendor files, and private notes.
3. Record each source path and the files read.
4. Count repeated patterns across sources.
5. Separate universal patterns from project-specific patterns.
6. Record conflicts between sources.
7. Turn only evidence-backed patterns into templates.

## 11. Write controlled prose

1. Use short words and one meaning per word.
2. Use the same term for the same thing every time.
3. Write instructions in imperative form.
4. Put a condition before the instruction it governs.
5. Keep an instruction sentence to 20 words or fewer.
6. Keep a descriptive sentence to 25 words or fewer.
7. Do not use semicolons, contractions, or em dashes.
8. Wrap paths, commands, and literal values in backticks.
9. Use a vertical list for a complex sequence.

## 12. Resolve a conflict

1. Name one conflict in one sentence.
2. Name the two sources.
3. Identify the executable source when one exists.
4. Trust executable configuration until the owner answers.
5. Ask the owner when the true source is unclear.
6. Repair the losing source.
7. Record the decision and date in `ROADMAP.md`.
8. Repeat for the next conflict.

## 13. Apply a change

1. Reproduce the failure.
2. Inspect bounded logs, state, and source.
3. State one cause in one sentence.
4. Change the smallest correct cause.
5. Do not weaken an assertion or skip a gate.
6. Run the focused check.
7. Run the broader check when shared code changed.
8. Repeat the original reproduction.
9. Update the owning document.

## 14. Finish a change

1. Confirm the requested behavior works.
2. Confirm no unrequested surface was added.
3. Confirm focused and full verification results.
4. Confirm gate verdicts.
5. Re-measure roadmap figures.
6. Confirm secrets and user data are untouched or safely migrated.
7. Review status, diff, and recent history when Git is present.
8. State which checks ran and which checks did not run.

## 15. Run an onboarding interview

Ask one question at a time. Use the required questions in `AGENTS.md` section 0.
Wait for each answer before asking the next question. Offer one short answer
field. Offer a default when a default is known. Do not combine questions. Do not
infer a missing answer from a path.

Record each answer in the owning document. Ask a follow-up question when an
answer is unclear. Stop when every required answer is known.

Use a local onboarding runner when one exists. Use a copyable prompt when one
exists. Store answers in `onboarding-answers.json`.

## 16. Resolve contradictions

Run the local contradiction checker before manual review when one exists.
Compare each current document with executable configuration. Name one conflict
in one sentence. Ask which source is true. Trust executable configuration until
the owner answers.

Repair the losing document. Record the decision and date in `ROADMAP.md`.
Repeat from the next conflict. Record a missing checker as a gap. Do not
simulate its output.

## 17. Document MCP integration

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

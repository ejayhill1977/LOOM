# LOOM Documentation Analysis

LOOM extracts reusable documentation rules from existing agentic coding
projects. This file records the evidence base and the decisions behind the
reusable templates in this repository.

## 1. Scope

The source documentation came from real agentic coding projects. Only
first-party documentation was used. Dependency folders, generated output,
binaries, and vendor files were excluded.

The sources covered several agentic coding products. The reviewed docs came
from core rulebooks, operator guides, status plans, and build gate records.

## 2. Evidence matrix

Legend: Y means the rule is explicit. P means the rule is partial or implied.
N means the rule is absent or contradicted.

| Pattern | Evidence | Verdict |
| --- | --- | --- |
| Root `AGENTS.md`, `README.md`, `ROADMAP.md` | Present across sources | Universal |
| `AGENTS.md` owns agent rules | Present across sources | Universal |
| `README.md` owns product or operator description | Present across sources | Universal |
| `ROADMAP.md` owns status and open work | Present across sources | Universal |
| Quality gates block builds | Present across sources | Universal in intent |
| One supported build entry point | Present across sources | Universal |
| Build output under `builds\` | Present across sources | Universal |
| Ask before an installer build | Present across sources | Strong |
| Run verification before completion | Present across sources | Universal |
| Never report an unrun check | Present across sources | Strong |
| Work on `main` by default | Present across sources | Universal |
| Do not create branches without explicit instruction | Present across sources | Universal |
| Commit after each change | Present across sources | Strong |
| Detailed commit message stating what and why | Present across sources | Strong |
| No AI attribution in commits | Present across sources | Strong |
| Never force-push or rewrite history without approval | Present across sources | Universal |
| Never commit secrets | Present across sources | Universal |
| Keep `.git` visible | Present across sources | Universal |
| Update docs with code | Present across sources | Universal |
| Professional standard: clean, correct, structured, no hacks | Present across sources | Strong |
| Five-step repair loop: reproduce, inspect, hypothesize, patch, verify | Present across sources | Strong |
| Record causes, measurements, and rules in docs | Present across sources | Universal |
| Tool hierarchy prefers structured tools over raw shell | Present across sources | Strong |
| Bounded reads and context hygiene | Present across sources | Strong |
| Explicit autonomy tiers | Present across sources | Strong |
| Controlled technical English | Present across sources | Minority, valuable as an option |
| No em-dash in project artifacts | Present across sources | Minority, valuable as an option |
| No unrequested settings | Present across sources | Strong |
| No CI/CD | Present across sources | Strong |
| Installers are per-machine x64 NSIS | Present across sources | Strong |

## 3. Universal core

These rules appear across sources or are directly implied by the same
operating model.

1. Keep one project root. Resolve paths from that root.
2. Keep three root documents with separate ownership. `AGENTS.md` holds agent
   rules. `README.md` holds product and operator facts. `ROADMAP.md` holds
   measured status and open work.
3. Write every project artifact to a professional standard. Prefer clean,
   correct, small, well-structured changes. Do not add hacks, commented-out
   code, magic numbers, or silent failures.
4. Protect user data and secrets. Never commit credentials, tokens, personal
   data, or `.env` files. Never print a secret.
5. Verify before you report completion. Run the named lint, typecheck, test,
   gate, and build commands. Report what ran and what did not run.
6. Use one supported build entry point. Run gates before artifacts. A failed
   gate stops the build. Fix the cause, not the assertion.
7. Keep installers and build output in the documented output folder. Ask before
   an installer build unless a standing owner instruction exists.
8. Work on `main` by default. Do not create branches, switch branches, open a
   pull request, rebase, force-push, or rewrite history without an explicit
   current instruction.
9. Keep `.git` visible on every OS.
10. Update documentation and code in the same change.
11. Record facts with commands and measurements. Do not copy status values
    forward without re-measuring them.
12. Keep context bounded. Use symbol lookup, narrow searches, filtered logs,
    and small read windows.

## 4. Strong consensus

These rules appear consistently across sources. They are included in the
templates as defaults and marked as configurable where a source differs.

- Commit after each completed change with a message that states what changed
  and why.
- The owner authors every commit. Do not add AI attribution lines. Keep
  `includeCoAuthoredBy` set to `false` where the tool supports it.
- Never add a setting that the owner did not request. Ask first when a setting
  seems necessary.
- Use a five-step repair loop. Do not declare a fix before verification.
- Use a tool hierarchy. Prefer structured code, git, runtime, and docs tools
  before raw shell reads and broad text search.
- Define autonomy tiers: auto-approved, confirmation required, and never.
- Treat missing tooling honestly. Say that CI, a linter, a typechecker, or an
  integration server is absent. Do not claim a check that did not run.
- Use baseline gates for known debt. Block new failures and pay down the
  baseline over time.
- Prefer one installer shape. Avoid portable, unpacked, ZIP, or per-user
  variants unless the owner asks for them.
- Treat a dated historical note as history. Do not rewrite it as current
  architecture.

## 5. Valuable minority patterns

These patterns appeared in some sources. They are offered as optional
modules rather than universal defaults.

- ASD-STE100 Simplified Technical English for all project artifacts, with a
  chat-reply exemption.
- Sentence and paragraph length limits, active voice, one instruction per
  sentence, and no contractions, semicolons, or em-dash.
- A `PASS:` and `FAIL:` gate script contract with a `# gate-title:` header.
- Regression baselines with an explicit update command.
- Dedicated investigation, measurement, and handoff documents.

## 6. Conflicts found

The sources contain internal drift. The templates resolve these
conflicts with the following precedence.

1. An executable config or gate result beats prose. If `package.json`, a gate
   script, or a build tool disagrees with a README, trust the executable source
   and repair the prose.
2. A stricter agent-facing rule beats a looser tool-facing rule. A source
   required zero lint warnings in its rulebook while its gate README allowed
   warnings. The agent-facing zero-warning rule is the safer default.
3. The build tool order beats a stale README sentence. A source had one README
   line that put gates after installer creation. Every other source put gates
   first. The templates keep gates first.
4. A dated historical report stays dated. A source kept old paths and earlier
   states in its investigation record. Keep those facts as history and link to
   current docs for present state.
5. Do not weaken a pin to make a gate green. A source recorded repeated repairs
   where a stale assertion was retargeted to the current shipped shape while its
   mutation test still caught the original defect.
6. A placeholder doc is a gap, not a fact. A source kept a sidecar doc that said
   the sidecar was planned while the root docs described it as implemented.

## 7. Decisions taken in the templates

- The templates use named placeholders for project facts. Replace every
  placeholder before adopting a template.
- The writing section teaches concise controlled English without making the
  full ASD-STE100 standard mandatory. Projects that require it can enable the
  optional module in `SKILLS.md`.
- The verification section supports three gate styles: hard gates, baseline
  gates, and advisory checks.
- The version control section defaults to `main` only, owner-authored commits,
  no AI attribution, and no destructive history operations.
- The build section defaults to one build command, gates before artifacts, one
  output folder, and explicit permission before installers.
- The roadmap section requires measured facts, closure checks, no speculative
  entries, and links instead of duplicated manuals.

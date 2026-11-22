# LOOM Documentation Analysis

LOOM extracts reusable documentation rules from existing agentic coding projects.
This file records the evidence base and the decisions behind the reusable
templates in this repository.

## 1. Scope

The following projects were analysed. Only first-party documentation was used.
Dependency folders, generated output, binaries, and vendor files were excluded.

| Project | Core first-party docs reviewed | Other first-party docs reviewed |
| --- | --- | --- |
| `D:\BRICK Floor Planner` | `AGENTS.md` 198 lines, `README.md` 261, `ROADMAP.md` 125 | `build\gates\README.md` 56, `.agents\CONTEXT.md` 34, `package.json` |
| `D:\CONTXT Menu Editor` | `AGENTS.md` 152, `README.md` 140, `ROADMAP.md` 125 | `.github\workflows\build.yml`, `build\build.rs`, 7 gate scripts, config files |
| `D:\FLUX Feed Reader` | `AGENTS.md` 244, `README.md` 344, `ROADMAP.md` 348 | `build\README.md` 49, `mcp-server\README.md` 216, config files |
| `D:\MOXY Web Browser` | `AGENTS.md`, `ROADMAP.md` | `PLAN.md` 488, `FEATURES.md` 211, `FLUX-FEED-HANDOFF.md` 170, `build\gates\torrent_streaming_tests.md` 356 |
| `D:\NETLIX Media Streamer` | `AGENTS.md` 336, `README.md` 209, `ROADMAP.md` 309 | `INVESTIGATION.md` 199, `docs\MCP.md` 247, `docs\SCROLL-PERFORMANCE.md` 228, `docs\SOURCES.md` 99, `docs\SOURCE-RESEARCH.md` 75, `engine\README.md` 10 |

## 2. Evidence matrix

Legend: Y means the rule is explicit. P means the rule is partial or implied.
N means the rule is absent or contradicted.

| Pattern | BRICK | CONTXT | FLUX | MOXY | NETLIX | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| Root `AGENTS.md`, `README.md`, `ROADMAP.md` | Y | Y | Y | Y | Y | Universal |
| `AGENTS.md` owns agent rules | Y | Y | Y | Y | Y | Universal |
| `README.md` owns product or operator description | Y | Y | Y | Y | Y | Universal |
| `ROADMAP.md` owns status and open work | Y | Y | Y | Y | Y | Universal |
| Quality gates block builds | Y | Y | Y | Y | P | Universal in intent |
| One supported build entry point | Y | Y | Y | Y | Y | Universal |
| Build output under `builds\` | Y | Y | Y | Y | Y | Universal |
| Ask before an installer build | Y | P | Y | Y | Y | Strong |
| Run verification before completion | Y | Y | Y | Y | Y | Universal |
| Never report an unrun check | P | P | Y | Y | Y | Strong |
| Work on `main` by default | Y | Y | Y | Y | Y | Universal |
| Do not create branches without explicit instruction | Y | Y | Y | Y | Y | Universal |
| Commit after each change | Y | Y | Y | P | Y | Strong |
| Detailed commit message stating what and why | Y | Y | Y | P | Y | Strong |
| No AI attribution in commits | N | Y | Y | Y | Y | Strong |
| Never force-push or rewrite history without approval | Y | Y | Y | Y | Y | Universal |
| Never commit secrets | Y | P | Y | Y | Y | Universal |
| Keep `.git` visible | Y | Y | Y | Y | Y | Universal |
| Update docs with code | Y | Y | Y | Y | Y | Universal |
| Professional standard: clean, correct, structured, no hacks | Y | P | Y | Y | Y | Strong |
| Five-step repair loop: reproduce, inspect, hypothesize, patch, verify | Y | P | Y | Y | Y | Strong |
| Record causes, measurements, and rules in docs | Y | Y | Y | Y | Y | Universal |
| Tool hierarchy prefers structured tools over raw shell | Y | P | Y | Y | Y | Strong |
| Bounded reads and context hygiene | Y | N | Y | Y | Y | Strong |
| Explicit autonomy tiers | Y | N | Y | Y | Y | Strong |
| Controlled technical English | N | N | Y | Y | Y | Minority, valuable as an option |
| No em-dash in project artifacts | N | N | Y | Y | Y | Minority, valuable as an option |
| No unrequested settings | P | N | Y | Y | Y | Strong |
| No CI/CD | Y | N | Y | Y | Y | Strong |
| Installers are per-machine x64 NSIS | Y | Y | Y | P | Y | Strong |

## 3. Universal core

These rules appear in all five projects or are directly implied by the same
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

These rules appear in four of five projects. They are included in the templates
as defaults and marked as configurable where one project differs.

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

These patterns appeared in three projects. They are offered as optional
modules rather than universal defaults.

- ASD-STE100 Simplified Technical English for all project artifacts, with a
  chat-reply exemption.
- Sentence and paragraph length limits, active voice, one instruction per
  sentence, and no contractions, semicolons, or em-dash.
- A `PASS:` and `FAIL:` gate script contract with a `# gate-title:` header.
- Regression baselines with an explicit update command.
- Dedicated investigation, measurement, and handoff documents.

## 6. Conflicts found

The source projects contain internal drift. The templates resolve these
conflicts with the following precedence.

1. An executable config or gate result beats prose. If `package.json`, a gate
   script, or a build tool disagrees with a README, trust the executable source
   and repair the prose.
2. A stricter agent-facing rule beats a looser tool-facing rule. BRICK requires
   zero lint warnings in `AGENTS.md`, while its gate README allows warnings.
   The agent-facing zero-warning rule is the safer default.
3. The build tool order beats a stale README sentence. CONTXT has one README
   line that puts gates after installer creation. Every other source puts gates
   first. The templates keep gates first.
4. A dated historical report stays dated. NETLIX `INVESTIGATION.md` records old
   paths and earlier states. Keep those facts as history and link to current
   docs for present state.
5. Do not weaken a pin to make a gate green. MOXY records repeated repairs
   where a stale assertion was retargeted to the current shipped shape while
   its mutation test still caught the original defect.
6. A placeholder doc is a gap, not a fact. NETLIX `engine\README.md` still says
   the sidecar is planned while the root docs describe it as implemented.

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

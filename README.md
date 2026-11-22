# LOOM

LOOM is a documentation workshop for agentic coding projects. It turns
project-specific rules into reusable templates. The templates help a new project
start with a proven rulebook and help an existing project repair its docs.

> **Status and plans:** see `ROADMAP.md`. Evidence for the templates is in
> `ANALYSIS.md`.

## Document map

| File | Owns |
| --- | --- |
| `README.md` | Product purpose, use, terminology, and document map |
| `ANALYSIS.md` | Evidence base, cross-project patterns, conflicts, and decisions |
| `AGENTS.md` | Reusable agent rulebook template |
| `SKILLS.md` | Reusable skills for agentic coding work |
| `ROADMAP.md` | Measured status, open work, and change history |
| `build\AGENTS.template.md` | Generic agent rulebook source |
| `build\handoff\` | Generic viewer templates for handoff |
| `build\README.md` | Viewer and local gate procedures |

## Evidence base

The templates were extracted from the first-party docs of five projects.

- `D:\BRICK Floor Planner`
- `D:\CONTXT Menu Editor`
- `D:\FLUX Feed Reader`
- `D:\MOXY Web Browser`
- `D:\NETLIX Media Streamer`

Dependency folders, generated output, binaries, and vendor files were excluded.
`ANALYSIS.md` records the documents, the pattern frequency, and the conflicts.

## Outputs

The reusable outputs are:

1. `build\AGENTS.template.md`, with rules for writing, engineering, linting,
   version control, building, and completion.
2. `SKILLS.md`, with reusable procedures for repairs, gates, verification,
   git, builds, roadmaps, context, safety, and handoffs.
3. `ROADMAP.md`, with measured status, closure checks, and dated history.
4. `build\index.html`, a tabbed viewer that displays four handoff templates and
   copies each template to the clipboard.
5. `onboarding-answers.json`, the stored answers to the required questions.
6. `build\ONBOARDING-PROMPT.md`, a copyable prompt for an agent session.
7. Local tools for onboarding questions, contradictions, MCP discovery, and
   browser smoke tests.

## How to use LOOM

1. Read `ANALYSIS.md` to understand which patterns are universal and which are
   optional.
2. Copy `build\handoff\AGENTS.md` to the target project as `AGENTS.md`.
3. Copy `build\handoff\SKILLS.md`, `build\handoff\README.md`, and
   `build\handoff\ROADMAP.md` into the target project root.
4. Copy `build\onboarding-answers.template.json` to the target project as
   `onboarding-answers.json`.
5. Run `node build\ask-onboarding.js` until it reports completion.
6. Replace every placeholder token.
7. Fill the stack facts and command tables from the executable configuration.
8. Keep product behavior in the target `README.md`.
9. Re-measure every roadmap figure before changing it.
10. Run the named checks and record the results.

Do not copy the evidence table into a target project. Link back to LOOM instead.

## Agent onboarding

When an agent receives these documents, it must ask for missing project facts
before work starts.

1. Ask one question per message.
2. Wait for one answer before asking the next question.
3. Offer one short answer field. Offer a default when one is known.
4. Record the answer in its owning document.
5. Ask about each contradiction one at a time.
6. Trust executable configuration until the owner decides otherwise.

The required questions are in `AGENTS.md` section 0. The generic template source
is in `build\AGENTS.template.md`. The handoff copy is in
`build\handoff\AGENTS.md`.

Use `node build\ask-onboarding.js` for one question per run. Use
`build\ONBOARDING-PROMPT.md` for a chat prompt.

## Terminology

| Term | Meaning |
| --- | --- |
| Project root | The only directory that holds project files for one project |
| Agent rulebook | `AGENTS.md`, the authority for agent rules and commands |
| Product doc | `README.md`, the authority for product behavior and procedures |
| Plan ledger | `ROADMAP.md`, the authority for status and open work |
| Gate | An executable check that protects a known behavior |
| Hard gate | A gate that blocks completion or a build on failure |
| Baseline gate | A gate that blocks new failures but tolerates recorded debt |
| Advisory check | A check that reports findings without blocking |
| Closure check | The condition that proves an open roadmap item is done |
| Artifact | A build output written to the documented output folder |
| Controlled language | A restricted writing style with short sentences and one meaning per word |
| MCP | Model Context Protocol, a surface that exposes tools, resources, or prompts |
| MCP surface | One configured MCP server, tool, resource, or prompt |

## Template rules

- Do not add a rule that the source projects do not support.
- Prefer a rule from all five projects over a rule from three projects.
- Keep minority patterns as optional modules.
- Trust executable configuration over prose.
- Keep the viewer source fixed to `build\handoff\`.
- Do not retarget the viewer to LOOM documents.
- Keep historical notes dated.
- Never weaken a gate to make a check pass.

## Current limits

- The viewer serves generic handoff templates. It does not show LOOM-specific docs.
- The template has been applied to LOOM. Browser verification is still open.
- The document check covers placeholders, links, headings, writing markers,
  embedded text, tabs, and JavaScript syntax.
- The contradiction gate covers answer data, documented scripts, MCP state, and
  Git state.
- The controlled language module is documented, not enforced.
- MCP discovery is local and config based. LOOM has no MCP surface.
- The browser smoke test reports a skip when Playwright is not installed.
- Git is published on `main` at `ejayhill1977/LOOM`.

## Related documents

- `ANALYSIS.md`
- `AGENTS.md`
- `SKILLS.md`
- `ROADMAP.md`
- `build\README.md`
- `build\AGENTS.template.md`
- `build\handoff\`

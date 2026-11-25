# {{PROJECT_TITLE}}

{{PRODUCT_PURPOSE}}

> Status: `{{STATUS_SUMMARY}}`. See `ROADMAP.md` for measured status and open work.
>
> This template is designed for use with agentic coding agents (e.g., Freebuff, Opencode, Qoder, GitHub Copilot, Kilo Code, Kiro, Cursor, and similar tools). It provides a structured product document that agents can read to understand the project's behavior, setup, and procedures.

## Scope

This document owns product behavior, setup, controls, operator procedures, and
terminology. `AGENTS.md` owns rules and commands. `ROADMAP.md` owns measured
status, decisions, and change history. `DESIGN.md` owns UI components, tokens,
interaction, accessibility, and prohibitions.

Link to a focused subdocument instead of copying its content.

Data storage rules live in `AGENTS.md` section 1 and section 5.

## Document map

| Document | Use |
| --- | --- |
| `AGENTS.md` | Rules, stack facts, commands, and gates. |
| `SKILLS.md` | Repeatable work procedures. |
| `README.md` | Product behavior and operator procedures. |
| `ROADMAP.md` | Status, open work, decisions, and change history. |
| `DESIGN.md` | UI components, tokens, interaction, accessibility, prohibitions. |

## Setup

1. Verify the required runtime: `{{RUNTIME}}`.
2. Install dependencies with `{{INSTALL_COMMAND}}`.
3. Configure required values with `{{CONFIGURATION_STEPS}}`.
4. Confirm the setup with `{{VERIFY_SETUP_COMMAND}}`.

## Update an existing project

Use this section to refresh an already onboarded project.

1. Read `AGENTS.md`, `SKILLS.md`, `README.md`, `ROADMAP.md`, and `DESIGN.md`.
2. Run the local checks. Record the current result.
3. Compare each documented command with executable configuration.
4. Confirm missing or contradicted answers with the owner. Ask one question at
   a time.
5. Apply the current template sections. Keep every verified project fact.
6. Preserve decisions and dated history in `ROADMAP.md`.
7. Run the checks in the Verification section. Record the result and each
   skipped check.

Do not replace a verified fact with a placeholder. Do not remove a dated record.

## Operation

| Task | Command or control | Result |
| --- | --- | --- |
| Start | `{{START_COMMAND}}` | `{{START_RESULT}}` |
| Use primary control | `{{PRIMARY_CONTROL}}` | `{{PRIMARY_RESULT}}` |
| Stop | `{{STOP_COMMAND}}` | `{{STOP_RESULT}}` |

Add one row for each operator task. State a condition before the instruction it
governs. Mark a safety statement with `WARNING`, `CAUTION`, or `Note`.

## Verification

1. Run the focused check with `{{FOCUSED_CHECK_COMMAND}}`.
2. Run the gates with `{{GATE_COMMAND}}`.
3. Run the full check with `{{FULL_CHECK_COMMAND}}`.
4. Run the smoke test with `{{SMOKE_TEST_COMMAND}}` when available.
5. State any check that did not run.

A missing tool is a failure or a stated gap. It is never a silent pass.

## MCP surface

| Item | Value |
| --- | --- |
| Project MCP role | `{{MCP_ROLE}}` |
| Server packages | `{{MCP_SERVER_PACKAGES}}` |
| Configuration path | `{{MCP_CONFIG_PATH}}` |
| Exposed tools | `{{MCP_TOOLS}}` |
| Trust boundary | `{{MCP_TRUST_BOUNDARY}}` |

Document each exposed tool here or in a focused subdocument. Put write tools
behind explicit confirmation. Redact secrets in logs and error reports.

## Terminology

| Term | Meaning |
| --- | --- |
| `{{TERM}}` | `{{TERM_MEANING}}` |

Use one meaning for each term. Use the same term for the same thing every time.

## Known limits

- `{{LIMIT}}`

State each limit that affects an operator. Do not hide a missing check.

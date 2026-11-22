# {{PROJECT_TITLE}} Roadmap

`AGENTS.md` owns rules and commands. `README.md` owns product behavior and
operator procedures. This file owns measured status, open work, decisions, and
change history.

## Status snapshot

| Area | Status | Evidence | Last measured |
| --- | --- | --- | --- |
| `{{AREA}}` | `{{STATUS}}` | `{{EVIDENCE}}` | `{{DATE}}` |

Use verified evidence only. Re-measure every figure before editing it.

## Open work

| ID | Item | Closure check | Owner |
| --- | --- | --- | --- |
| `{{ITEM_ID}}` | `{{ITEM}}` | `{{CLOSURE_CHECK}}` | `{{OWNER}}` |

Add no speculative item. Every item states a closure check. Move shipped work
out of this table. Do not duplicate it.

## Decisions

| Date | Decision | Winning source | Reason |
| --- | --- | --- | --- |
| `{{DATE}}` | `{{DECISION}}` | `{{SOURCE}}` | `{{REASON}}` |

Trust executable configuration until the owner decides otherwise. Record each
contradiction decision here. Keep historical decisions dated.

## Update record

Record each refresh of this project with the template source and gate result.

| Date | Template source | Change | Gate result |
| --- | --- | --- | --- |
| `{{DATE}}` | `{{TEMPLATE_SOURCE}}` | `{{UPDATE_CHANGE}}` | `{{GATE_RESULT}}` |

Use a verified template version or source commit. Keep each entry dated. Do not
rewrite an earlier entry.

## Change log

| Date | Change | Verification | Result |
| --- | --- | --- | --- |
| `{{DATE}}` | `{{CHANGE}}` | `{{VERIFICATION}}` | `{{RESULT}}` |

Record a build, measurement, or tooling investigation with the fix and the rule
that must not break.

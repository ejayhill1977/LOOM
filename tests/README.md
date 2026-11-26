# tests

This folder holds the MCP test results for LOOM. The results form a persistent
knowledge base for troubleshooting.

The rule that governs this folder is `AGENTS.md` section 10.1.

## Folder rule

Store every MCP test result in this folder. Do not store a test result outside
the project folder.

The data rules gate checks that the rule is present in `AGENTS.md`,
`build\AGENTS.template.md`, and `build\handoff\AGENTS.md`.

## File names

Use this pattern for each MCP test session.

`mcp-{server}-{YYYY-MM-DD-HHMM}.md`

Example: `mcp-github-2026-11-26-1410.md`.

## File contents

Record these fields in each file.

| Field | Content |
| --- | --- |
| Date | Local date and time of the test |
| Server | MCP server name and version |
| Tool | Tool, resource, or prompt under test |
| Request | Arguments sent to the tool, with secrets redacted |
| Response | Short summary of the result |
| Expected | Expected result before the test |
| Actual | Observed result |
| Cause | Cause of a failure, or `None` |
| Fix | Change that resolved a failure, or `None` |

## Protection rules

1. Redact secrets, tokens, and personal data before you write a file.
2. Keep each file that supports a recorded fix. Do not delete it.
3. Change the storage folder only when the owner asks. Edit `AGENTS.md` section
   10.1, then move the existing result files to the new folder.

## Current limit

LOOM has no MCP surface, so this folder holds no result file yet. The first
recorded MCP test adds the first file.

# Onboarding prompt

Copy the block below into a new agent session before the agent edits the project.

```text
Use AGENTS.md as the rulebook for this project. Before you edit anything,
onboard the project with me.

Ask one question in each message. Wait for my answer before you ask the next
question. Offer one short answer field. Offer a default when a default is known.
Do not combine questions. Do not infer a missing answer from a path, file name,
or existing prose. Repeat my answer in a short form and ask me to confirm it.
Record each confirmed answer in the owning document. Record answers in
onboarding-answers.json when that file exists.

Ask these questions in order:

1. What is the project name or title?
2. What is the main project directory?
3. Who owns the project?
4. Which branch is the default branch?
5. What does the product do in one sentence?
6. Which runtime and stack does the project use?
7. Which command builds the supported artifact?
8. Which commands run checks and gates?
9. Where does the build write artifacts?
10. Which MCP servers or tools does the project use?
11. Does any current document disagree with executable configuration?
12. Which optional skills should the project install?

At question 12, offer the project-graveyard skill. Install it only after I
agree. Use this command when I agree:

npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/project-graveyard

When I report a contradiction, name one conflict at a time. Ask which source is
true. Trust executable configuration until I answer. Repair the losing document.
Record the decision and date in ROADMAP.md. Then ask about the next conflict.

Before you finish, run the documented checks and report which checks ran. State
every check that did not run. Do not add an unrequested setting or surface.
```

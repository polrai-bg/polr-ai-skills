# agentic-os

Stand up a multi-agent "company" in a folder, then grow it. This plugin ships
two interview-driven skills that build and extend an Agentic OS: a simple,
file-based convention for organizing identity, context, a team of agents, their
connections, and their automations.

It contains no real company data. The skills interview **you** and write the
files into a folder **you** choose.

## Install

```
/plugin marketplace add polrai-bg/polr-ai-skills
/plugin install agentic-os@polr-ai-skills
```

## Skills

| Skill | Invoke | What it does |
|---|---|---|
| `bootstrap-company` | `/agentic-os:bootstrap-company` | A staged interview that turns an empty folder into a complete Agentic OS: identity, domain, team, connections, automations. Run once at creation. |
| `add-new-agent` | `/agentic-os:add-new-agent` | A one-question-at-a-time interview that adds a single specialist agent, updates the roster, and wires the Chief of Staff routing table. Run any time. |

## The OS layout it builds

```
00-deliverables/   agent outputs (one subfolder per project)
00-tasks.md        cross-agent active task list
01-identity/       SOUL.md, USER.md, PRINCIPLES.md
01-sops/           shared standard operating procedures
02-context/        company.md, domain.md, projects.md
03-skills/         shared workflows
04-memory/         cross-session persistence
05-connections/    one file per external system
06-agents/         each agent: AGENT.md, skills/, memory/, optionally automations/
```

## Bundled references

`bootstrap-company` ships reference files it copies in during scaffolding:

- `references/default-principles.md` (offered if you have no principles in mind)
- `references/sop-deliverables.md`
- `references/sop-task-tracking.md`
- `references/tasks-template.md`

## License

[MIT](../../LICENSE).

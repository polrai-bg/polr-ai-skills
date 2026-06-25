# Evals for `daily-brief`

A starting set of evaluations for this skill. Evals measure two things
separately, per [Anthropic's guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#evaluation-and-iteration):

1. **Triggering** — does Claude invoke the skill on prompts it should, and stay
   away on prompts it shouldn't? (`type: "trigger"` cases in `evals.json`.)
2. **Output quality** — once invoked, does the brief match what you expect?
   (`type: "behavior"` cases.)

## How to run

The trigger cases run as-is. The behavior cases are **scaffolds**: `daily-brief`
reads a user data repo (`business/`, `personal/`, `tasks.md`) and pulls live MCP
data, so they need fixtures before they produce a meaningful pass/fail. Fill in
the `fixtures` placeholders with a path to a throwaway fixture repo (copy the
files under `plugins/daily-brief/examples/`) and connected or mocked MCP servers.

The easiest harness is the official **skill-creator** plugin, which automates the
with-skill vs. without-skill comparison loop:

```
/plugin install skill-creator@claude-plugins-official
/reload-plugins
```

Then, from a session with this skill available:

```
evaluate the daily-brief skill with skill-creator
```

It writes `grading.json` and `benchmark.json` alongside this file. See the
[eval file format and workflow](https://agentskills.io/skill-creation/evaluating-skills)
for the full reference.

## When to update these

Treat evals as the source of truth for whether a `SKILL.md` edit is an
improvement. When real usage reveals the skill mis-fired or produced the wrong
shape, add a case here that captures it before changing the skill, then confirm
the case passes after.

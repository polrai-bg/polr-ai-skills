# architect-to-implementer

Turn a finished planning conversation into an implementation contract that a
different coding agent can execute without having seen any of it. You do the
architecture in one session (Claude Code, Codex, Cursor, wherever); the
Implementer picks it up in another with only the repository and the handoff
file. The skill inspects the repo, separates approved decisions from
assumptions, writes explicit scope and escalation rules, validates the result,
commits and pushes it, and ends with a short prompt you paste into the
Implementer's window.

It is a role-transition skill. For a same-role context reset or a fresh session
on the same problem, use a session-continuation handoff instead.

## Install

```
/plugin marketplace add polrai-bg/polr-ai-skills
/plugin install architect-to-implementer@polr-ai-skills
```

It also works as a plain skill: copy `skills/architect-to-implementer/` into
`~/.claude/skills/` or `~/.codex/skills/` (it ships `agents/openai.yaml` for
Codex).

## Use

```
/architect-to-implementer:architect-to-implementer
```

Run it at the end of planning, once the spec or task plan exists. It will:

1. Read the repo's agent instructions, the spec and plan, Git state, and just
   enough code to verify integration points. Read-only until the save.
2. Apply a readiness gate. Unresolved architectural choices go into a
   "still requiring approval" section rather than being invented.
3. Write the handoff (see `skills/architect-to-implementer/references/handoff-template.md`
   for the sections), saving it under the repo's existing convention or
   `docs/handoffs/`.
4. Validate it with `scripts/validate_handoff.py` (structure, placeholders,
   obvious secrets).
5. Commit the handoff plus the untracked spec/plan files it cites, and push to
   the repo's working branch. Nothing else is staged; no branches, PRs, or
   force pushes.
6. End with a kickoff prompt: repo, branch, commit, the files to read in order,
   the one-line assignment, where to stop, and the completion artifact to write.

## What the handoff pins down

- Approved decisions with IDs, rationale, and implications, kept separate from
  assumptions and open questions.
- What the Implementer may decide alone and what needs escalation.
- In-scope and out-of-scope work, observable acceptance criteria, and
  project-specific verification (typecheck, tests, migrations, RLS, browser).
- Environment and safety boundaries: which database is a test target, what is
  never pushed, what is destructive.
- A required completion artifact so the next agent inherits durable state.

No private data is bundled. The skill reads your repository at run time and
references secrets only by environment-variable name.

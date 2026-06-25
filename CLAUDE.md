# CLAUDE.md

Guidance for Claude (and any agent) working in this repository.

## What this repo is

A public, MIT-licensed **Claude Code plugin marketplace** of skills from POLR AI.
The root `.claude-plugin/marketplace.json` lists installable plugins; each plugin
lives under `plugins/<name>/` and bundles **one skill** (folder with a
`SKILL.md`). `template/` is the copy-me starter and is intentionally **not**
registered in the marketplace.

```
.claude-plugin/marketplace.json   # registry of installable plugins
plugins/<name>/                   # installable plugin (one skill each)
  .claude-plugin/plugin.json      # name, description, license, keywords, homepage
  skills/<name>/SKILL.md          # the skill (required)
  skills/<name>/references/       # optional longer docs the skill reads at runtime
  examples/ + SETUP.md            # optional fictional data + wiring instructions
template/                         # copy-me starter, NOT registered
scripts/validate-manifests.mjs    # local + CI validation
docs/PLUGIN_DEVELOPMENT.md        # full how-to for adding a skill
```

## Before you commit — always validate

```
node scripts/validate-manifests.mjs
```

It must exit `0`. CI (`.github/workflows/validate.yml`) runs the same check on
every PR, plus a guard that no private-data paths were committed. Run it after
any change to a `SKILL.md`, a `plugin.json`, or `marketplace.json`.

## SKILL.md frontmatter rules (enforced by the validator)

These mirror the [official skill rules](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices):

- `description` (**required**): says what the skill does **and** when to use it,
  in third person; name the trigger phrases. Max **1024 characters**.
- `name` (optional, defaults to the folder name): **lowercase letters, numbers,
  and hyphens only**, max 64 chars, no reserved words (`anthropic`, `claude`),
  and **must match the skill's directory name**.
- Keep the `SKILL.md` **body under 500 lines** (the validator warns past this).
  Push long reference material into `references/` and link to it one level deep.

## Adding or editing a skill

1. Copy `template/` into `plugins/<name>/` and rename the inner `skills/<name>/`
   folder to match (see `docs/PLUGIN_DEVELOPMENT.md` for the exact commands).
2. Set frontmatter `name` (== folder), a specific `description`, and the body.
3. Update `plugins/<name>/.claude-plugin/plugin.json` (name, description,
   keywords, homepage).
4. Register the plugin in `.claude-plugin/marketplace.json` (`source` is relative
   to `metadata.pluginRoot`, i.e. `./<name>`).
5. Add a one-paragraph `plugins/<name>/README.md`.
6. Run `node scripts/validate-manifests.mjs`.

## Privacy — never commit real data

No real names, emails, credentials, API keys, client data, or financial figures
anywhere. Skills that need user data read it from files **the user** keeps in
their own repo and from **MCP servers the user connects**; ship only fictional
placeholders under `examples/` and document wiring in a `SETUP.md`.
`plugins/daily-brief/` is the reference implementation. `.gitignore` and the CI
`no-secrets` job are backstops, not a substitute for care.

## Conventions

- One skill per plugin; keep install and invocation predictable.
- Reference bundled **docs** by relative path (`references/x.md`); reference
  bundled **scripts** with `${CLAUDE_PLUGIN_ROOT}/...`. Never use `../` to escape
  the skill folder, and always use forward slashes.
- Omit `version` in `plugin.json` so installs track the git commit.
- Treat skills as living documents: when real usage reveals a gap, update the
  `SKILL.md` rather than working around it.

# Plugin development guide

How to add a skill to this marketplace, test it, and publish it. If you have
forked the repo, the same steps apply to your fork.

## Concepts in 60 seconds

- A **skill** is a folder with a `SKILL.md` (YAML frontmatter + Markdown body).
  Claude reads the `description` to decide when to use it.
- A **plugin** bundles one or more skills, plus an optional
  `.claude-plugin/plugin.json` manifest. In this repo we keep it to **one skill
  per plugin** for clarity.
- A **marketplace** is a repo with `.claude-plugin/marketplace.json` at its
  root listing the installable plugins. This repo is one.

## Anatomy of a plugin in this repo

```
plugins/<name>/
├── .claude-plugin/
│   └── plugin.json              # name, description, license, keywords, homepage
├── skills/<name>/
│   ├── SKILL.md                 # entry point (required)
│   └── references/              # optional longer docs the skill reads
├── examples/                    # optional fictional placeholder data
├── SETUP.md                     # optional: how the user wires up data / MCP
└── README.md                    # what it does, install, invoke
```

`plugin.json` minimal form:

```json
{
  "name": "my-skill",
  "description": "What it does and when to use it.",
  "license": "MIT"
}
```

We intentionally **omit `version`** in `plugin.json` so installs track the git
commit. Bump behavior is controlled at the marketplace level instead.

## SKILL.md frontmatter

| Field | Required | Notes |
|---|---|---|
| `description` | yes | Drives auto-invocation. Be specific; name trigger phrases. Keep under ~200 chars of signal. |
| `name` | no | Defaults to the folder name. Use kebab-case. |
| `disable-model-invocation` | no | `true` makes the skill `/slash`-only (never auto-invoked). |
| `allowed-tools` | no | Whitelist of tools the skill may use while active. |

## Step-by-step: add a skill

1. **Copy the template.**
   ```bash
   cp -R template plugins/my-skill
   mv plugins/my-skill/skills/example-skill plugins/my-skill/skills/my-skill
   ```
2. **Edit `plugins/my-skill/.claude-plugin/plugin.json`**: set `name`,
   `description`, `keywords`, `homepage`.
3. **Write `plugins/my-skill/skills/my-skill/SKILL.md`**: set frontmatter
   `name: my-skill`, a specific `description`, and the body.
4. **Register it** in `.claude-plugin/marketplace.json`:
   ```json
   {
     "name": "my-skill",
     "source": "./my-skill",
     "description": "...",
     "category": "productivity",
     "keywords": ["..."],
     "homepage": "https://github.com/polrai-bg/polr-ai-skills/tree/main/plugins/my-skill"
   }
   ```
   `source` is relative to `metadata.pluginRoot` (`./plugins`), so it is
   `"./my-skill"`.
5. **Add a `README.md`** in the plugin folder (one paragraph + install + invoke).

## Handling data the skill needs

Never commit real data, names, emails, or credentials. If a skill needs user
context:

- Read it from files the **user** keeps in their own repo. Document the exact
  paths the skill expects.
- Pull live data from **MCP servers the user connects** (CRM, email, calendar,
  accounting, etc.). The skill names the tools; the user provides the
  connection.
- Ship **fictional** placeholders under `examples/` and a `SETUP.md` describing
  how to create the real versions. The repo `.gitignore` blocks common real-data
  paths (`/business/`, `/personal/`, etc.) as a backstop.

`plugins/daily-brief/` is the reference implementation of this pattern.

## Paths inside a skill

- Reference bundled **docs** by relative path: `references/output-format.md`.
- Reference bundled **scripts/executables** with `${CLAUDE_PLUGIN_ROOT}` so they
  resolve after install-to-cache: `${CLAUDE_PLUGIN_ROOT}/scripts/run.sh`.
- Never use `../` to escape the skill folder.

## Test locally

```
/plugin marketplace add ./
/plugin install my-skill@polr-ai-skills
/my-skill:my-skill
```

If you change files, run `/plugin marketplace update polr-ai-skills` (or
`/reload-plugins`) to pick them up.

Validate the manifests if you have the CLI:

```
claude plugin validate ./
```

## Publish

Commit and push. Anyone who has added the marketplace gets your skill on their
next `/plugin marketplace update polr-ai-skills`. The CI workflow in
`.github/workflows/validate.yml` checks the manifests on every PR.

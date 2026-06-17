---
# ── Required ────────────────────────────────────────────────────────────────
# `description` is the single most important field. Claude reads it to decide
# WHEN to use this skill. Make it specific: say what the skill does AND name the
# phrases or situations that should trigger it. Keep it under ~200 characters of
# real signal. Vague descriptions ("helps with tasks") never get invoked.
name: example-skill
description: A starter skill that explains the SKILL.md format. Replace this. Triggers on "run the example skill" or "show me the skill template". Says what it does and names its trigger phrases, the way every good description should.

# ── Optional ────────────────────────────────────────────────────────────────
# Uncomment any you need. Delete the ones you don't. Claude Code ignores
# unknown keys, but a clean frontmatter is easier to maintain.
#
# `disable-model-invocation: true`
#   Makes the skill /slash-only. Claude will NOT auto-invoke it from the
#   description; the user must type /<plugin>:<skill>. Use for destructive or
#   expensive skills you only want run on explicit request.
#
# disable-model-invocation: true
#
# `allowed-tools`
#   Restrict which tools this skill may use while active (a whitelist). Omit to
#   allow all tools the session already permits.
#
# allowed-tools: ["Read", "Grep", "Glob"]
---

# Example Skill

This is the skill body. Everything below the frontmatter is the instruction set
Claude follows once the skill is invoked. Write it the way you would brief a
sharp new teammate: concrete, ordered, and unambiguous.

> Delete this whole file's contents and write your own. The notes below are a
> guide to the format, not content to keep.

## How a skill is invoked

- **Automatically**, when the user's request matches your `description`.
- **Manually**, by typing `/<plugin-name>:<skill-name>`. For this template
  that would be `/example-skill:example-skill` once installed.

Plugin skills are always namespaced by the plugin name, so pick names that read
well together.

## How to structure the body

Use plain Markdown headings. A reliable shape:

1. **Trigger phrases**: restate the exact phrases that should fire the skill,
   so behavior is predictable.
2. **Workflow**: numbered steps. Tell Claude what to read, what to compute, and
   in what order. Be explicit about parallel vs. sequential work.
3. **Output format**: show the exact shape of the result. If it is long, put it
   in a `references/` file (see below) and point to it.
4. **Rules / guardrails**: what to never do, what to confirm before doing, how
   to handle missing data.
5. **Examples**: a few `"user says X"` to `"skill does Y"` lines remove
   ambiguity faster than paragraphs of prose.

## Bundling supporting files

A skill is a folder, not just one file. You can ship:

```
example-skill/
├── SKILL.md            # this file, the entry point
├── references/         # longer docs the skill reads at runtime
│   └── output-format.md
└── scripts/            # helper scripts the skill can run
    └── do-thing.sh
```

Reference bundled docs by their relative path (e.g. "see
`references/output-format.md`") and Claude will read them. If a step runs a
bundled **script or executable**, reference it with the `${CLAUDE_PLUGIN_ROOT}`
variable (e.g. `${CLAUDE_PLUGIN_ROOT}/scripts/do-thing.sh`) so the path still
resolves after the plugin is installed into Claude Code's cache. Never use
`../` to reach outside the skill folder.

## Reading the user's own data

If your skill needs the user's files or live data, do NOT bake real data into
the skill. Instead:

- Read from files the user keeps in **their** repo (document the expected paths).
- Pull live data from **MCP servers the user connects** themselves.
- Ship only fictional placeholders under an `examples/` folder, and write a
  `SETUP.md` telling the user how to wire up their own.

See `plugins/daily-brief/` in this repo for a full worked example of that
pattern.

## Checklist before you publish

- [ ] `description` is specific and names trigger phrases.
- [ ] Folder renamed; `name` in frontmatter matches the folder.
- [ ] `.claude-plugin/plugin.json` updated (name, description, keywords).
- [ ] No real data, emails, names, or credentials anywhere.
- [ ] Registered in `.claude-plugin/marketplace.json`.
- [ ] Installed and invoked once locally to confirm it loads.

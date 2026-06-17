# template: copy-me starter plugin

This folder is a minimal, working plugin you copy to start a new skill. It is
**not** listed in `.claude-plugin/marketplace.json`, so it never shows up as an
installable plugin. It exists only to be duplicated.

## Make a new skill from it

From the repo root:

```bash
# 1. Copy the template into the installable plugins folder under a new name
cp -R template plugins/my-skill

# 2. Rename the skill folder to match
mv plugins/my-skill/skills/example-skill plugins/my-skill/skills/my-skill
```

Then edit:

1. `plugins/my-skill/.claude-plugin/plugin.json`: set `name`, `description`,
   `keywords`, `homepage`.
2. `plugins/my-skill/skills/my-skill/SKILL.md`: set the frontmatter `name` to
   `my-skill`, write a specific `description`, and replace the body.
3. `.claude-plugin/marketplace.json` (repo root): add an entry:

   ```json
   {
     "name": "my-skill",
     "source": "./my-skill",
     "description": "What it does and when to use it.",
     "category": "productivity",
     "keywords": ["..."],
     "homepage": "https://github.com/polrai-bg/polr-ai-skills/tree/main/plugins/my-skill"
   }
   ```

   (`source` is relative to `metadata.pluginRoot`, which is `./plugins`, so you
   write `"./my-skill"`, not `"./plugins/my-skill"`.)

## Test it before pushing

```
/plugin marketplace add ./            # add this repo as a local marketplace
/plugin install my-skill@polr-ai-skills
/my-skill:my-skill                    # confirm it loads and runs
```

Full guidance, including the SKILL.md format and how to bundle reference files,
is in [docs/PLUGIN_DEVELOPMENT.md](../docs/PLUGIN_DEVELOPMENT.md).

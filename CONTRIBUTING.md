# Contributing

Thanks for your interest. This repo is a public store of Claude Code skills.
Contributions that add a genuinely useful, self-contained skill, or improve an
existing one, are welcome.

## Before you start

Open an issue for anything beyond a small fix so we can agree on scope first.
Issue templates live in [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE).

## What makes a good skill here

- **Self-contained.** It works after `/plugin install` without extra context.
  All docs it needs are bundled in the plugin folder.
- **Specific `description`.** It names what the skill does and the phrases that
  should trigger it. See [docs/PLUGIN_DEVELOPMENT.md](docs/PLUGIN_DEVELOPMENT.md).
- **No private data.** No real names, emails, credentials, API keys, client
  data, or financial figures. Skills that need user data read it from the
  user's own files and connected MCP servers, and ship only fictional
  `examples/`.
- **One skill per plugin.** Keeps install and invocation predictable.

## How to add a skill

Follow [docs/PLUGIN_DEVELOPMENT.md](docs/PLUGIN_DEVELOPMENT.md): copy
[`template/`](template/) into `plugins/`, edit it, register it in
`.claude-plugin/marketplace.json`, and test it locally.

## Pull request checklist

- [ ] Copied from `template/` and renamed cleanly.
- [ ] `SKILL.md` `description` is specific and names trigger phrases.
- [ ] Plugin registered in `.claude-plugin/marketplace.json` (`source` relative
      to `./plugins`).
- [ ] No real data, names, emails, or secrets anywhere in the diff.
- [ ] Installed and invoked once locally to confirm it loads.
- [ ] A short `README.md` in the plugin folder.

## Removing leaked content

If you spot personal, proprietary, or otherwise private content that slipped
into a skill, a PR removing it is always welcome and will be merged quickly.
For anything sensitive, see [SECURITY.md](SECURITY.md).

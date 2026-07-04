# polr-ai-skills

A public, MIT-licensed store of [Claude Code](https://claude.com/claude-code)
skills from POLR AI. This repo is a **Claude Code plugin marketplace**: add it
once, then install any skill with a single command. It is also a **template**:
fork it, drop in your own skills, and you have your own marketplace that you and
your team (or anyone you share the link with) can install from.

Every skill here is manually invoked, self-contained, and ships with the docs
needed to use it without reading the source.

## Install a skill

Inside Claude Code:

```
/plugin marketplace add polrai-bg/polr-ai-skills
/plugin install daily-brief@polr-ai-skills
```

Then invoke it (plugin skills are namespaced `/<plugin>:<skill>`):

```
/daily-brief:daily-brief
```

Update later with `/plugin marketplace update polr-ai-skills`, and remove with
`/plugin uninstall daily-brief@polr-ai-skills`.

## What's in the store

| Plugin | What it does |
|---|---|
| [`daily-brief`](plugins/daily-brief/) | One-screen morning brief blending repo context with live CRM / email / calendar / accounting data pulled from your connected MCP servers. Ships with a worked example and a `SETUP.md`. |
| [`agentic-os`](plugins/agentic-os/) | Turn an empty folder into a complete Agentic OS through a staged interview, then grow it one role at a time. Ships two skills: `bootstrap-company` and `add-new-agent`. |
| [`x-twitter-scraper`](plugins/x-twitter-scraper/) | Plan Xquik X/Twitter data workflows for REST API setup, MCP setup, SDKs, webhooks, exports, monitors, and confirmation-gated actions. |

More skills land over time. Watch or star the repo to follow along.

## Fork it and run your own store

This repo doubles as a starting point for your own marketplace:

1. **Fork** `polrai-bg/polr-ai-skills` on GitHub (or use it as a template).
2. **Add your fork** in Claude Code: `/plugin marketplace add <your-org>/<your-fork>`.
3. **Add a skill** by copying [`template/`](template/) into `plugins/`, renaming
   it, and editing the `SKILL.md`. See [docs/PLUGIN_DEVELOPMENT.md](docs/PLUGIN_DEVELOPMENT.md).
4. **Register it** by adding an entry to
   [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json).
5. **Push.** Anyone who has added your marketplace gets it on the next
   `/plugin marketplace update`.

You own your fork. Nothing here phones home, and there is no dependency on this
upstream repo once you have copied what you need.

## Repository layout

```
polr-ai-skills/
├── .claude-plugin/
│   └── marketplace.json     # makes this repo a marketplace; lists installable plugins
├── plugins/                 # installable plugins (one skill each)
│   └── daily-brief/
├── template/                # copy-me starter plugin (NOT listed in the marketplace)
├── docs/
│   └── PLUGIN_DEVELOPMENT.md # how to add, test, and publish a skill
├── LICENSE                  # MIT
└── .github/                 # issue/PR templates + manifest validation workflow
```

`plugins/` holds things you install. `template/` is the thing you copy when you
want to build a new one. Keeping them separate means the template never shows up
as an installable plugin by accident.

## A note on privacy

Skills in this repo never contain real personal or business data, credentials,
or API keys. Skills that need your data (like `daily-brief`) read it from files
**you** create in your own repo and from MCP servers **you** connect. The
`examples/` folders ship only fictional placeholder data. See each skill's
`SETUP.md`.

## License

[MIT](LICENSE). Use it, fork it, ship it.

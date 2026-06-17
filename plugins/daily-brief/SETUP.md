# daily-brief — setup

The skill ships with **no data**. You provide two things: a small set of context
files in your own repo, and connections to the MCP servers you want it to pull
live data from. This takes about 10 minutes.

## 1. Install the skill

```
/plugin marketplace add polrai-bg/polr-ai-skills
/plugin install daily-brief@polr-ai-skills
```

Invoke it with `/daily-brief:daily-brief` (or just say "daily brief").

## 2. Create your context files

The skill reads static context from a data repo you control — usually the repo
you run Claude Code in. Copy the fictional starters from this plugin's
`examples/` folder and edit them with your real (private) information:

```
your-data-repo/
├── tasks.md
├── business/
│   ├── plan.md
│   ├── weekly-tracker.md      ← copy from examples/business/weekly-tracker.example.md
│   └── contracts.md           ← copy from examples/business/contracts.example.md
└── personal/
    └── family/
        └── events.md          ← copy from examples/personal/events.example.md
```

The full layout and the "contract" for each file is documented in
[`skills/daily-brief/references/context-structure.md`](skills/daily-brief/references/context-structure.md).
You don't need every file — start with `tasks.md`, `weekly-tracker.md`, and
`contracts.md`, then add personal files as you want them.

> **Keep this data private.** It is yours and should live in a private repo. If
> you forked `polr-ai-skills`, do **not** commit your real `business/` or
> `personal/` files into the public fork — the repo's `.gitignore` blocks those
> paths as a backstop, but the safe move is a separate private data repo.

## 3. Connect the MCP servers you want

The skill pulls live data from whatever you have connected. It works with any
subset — connect only what you use. Common choices:

| Category | Examples | Used for |
|---|---|---|
| Calendar | Google Calendar, Outlook | Today/tomorrow events, conflicts, look-ahead |
| CRM | HubSpot, Salesforce, Close | Open deals, lead status, activity logging |
| Email | Gmail, Outlook | Inbox/sent sweep, silence detection, drafts |
| Accounting | QuickBooks, Xero | MTD income, A/R aging, cash on hand |

Connect MCP servers through Claude Code's MCP configuration (see the Claude Code
docs on MCP). The skill names **categories**, not specific vendors, so it adapts
to whatever you connect. If a connector is missing, the skill notes the gap and
produces the rest of the brief.

> Never paste API keys or credentials into the skill or your context files. MCP
> manages authentication separately.

## 4. Adapt the skill to your setup (optional)

- If your files live at different paths, edit the path references in
  `skills/daily-brief/SKILL.md`.
- Tune the silence thresholds and weekly counters in your `contracts.md` and
  `weekly-tracker.md`.
- Adjust the output sections in
  `skills/daily-brief/references/brief-format.md` to taste.

## 5. Run it

```
/daily-brief:daily-brief
```

On a weekday you get the full operating brief; on a weekend, the lighter
family-first variant. Try "run a client pulse" or "run a lead pulse" for a
single section.

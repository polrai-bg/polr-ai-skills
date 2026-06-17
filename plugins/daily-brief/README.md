# daily-brief

A one-screen morning brief for a solo operator or small-team owner. It blends
**repo-based context** (your plan, contracts, family, home) with **live data**
from the MCP servers you connect (CRM, email, calendar, accounting), and returns
a tight, scannable operating plan for the day: work and personal in one place.

It is manually invoked, opinionated about output (no fluff, one screen), and
ships with a worked example plus a setup guide. It contains **no real data**.

## Install

```
/plugin marketplace add polrai-bg/polr-ai-skills
/plugin install daily-brief@polr-ai-skills
```

## Use

```
/daily-brief:daily-brief        # or just say "daily brief"
```

- **Weekday**: full operating brief: anchor, Critical Number, Top 3, calendar,
  time block, client/lead pulse, finance, home & family, week pulse.
- **Weekend**: lighter, family-first variant.
- **Sections on demand**: "run a client pulse", "run a lead pulse", "midday
  check", "evening wrap".

## Setup

The skill reads context files you create and pulls from MCP servers you connect.
Both are quick. See [`SETUP.md`](SETUP.md). The data layout is documented in
[`skills/daily-brief/references/context-structure.md`](skills/daily-brief/references/context-structure.md),
and the exact output format in
[`skills/daily-brief/references/brief-format.md`](skills/daily-brief/references/brief-format.md).

## What's in this folder

```
daily-brief/
├── .claude-plugin/plugin.json
├── skills/daily-brief/
│   ├── SKILL.md                       # the skill
│   └── references/
│       ├── brief-format.md            # exact output format
│       └── context-structure.md       # data files the skill expects
├── examples/                          # fictional starter data (copy + edit)
│   ├── business/contracts.example.md
│   ├── business/weekly-tracker.example.md
│   └── personal/events.example.md
├── SETUP.md
└── README.md
```

## License

[MIT](../../LICENSE).

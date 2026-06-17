# Data repo structure

The daily-brief skill reads your context from a **data repo you control**,
typically the repo you run Claude Code in, or one you point it at. Nothing here
ships with the plugin; you create these files. Copy the fictional starters in
this plugin's `examples/` folder and edit them.

Only the files you actually use need to exist. The skill degrades gracefully:
if a file is missing, it notes the gap rather than failing.

## Layout

```
your-data-repo/
├── tasks.md                      # canonical open-task list (skill edits this)
├── business/
│   ├── plan.md                   # positioning, targets, ICP, pricing, kill list
│   ├── weekly-tracker.md         # Critical Number, weekly counters, pipeline (edited)
│   ├── contracts.md              # contracts, proposals, deliverables, silence thresholds (edited)
│   ├── customers.md              # narrative per customer
│   └── pipeline.md               # narrative per deal/candidate
└── personal/
    ├── family/
    │   ├── important-dates.md    # birthdays, anniversaries
    │   ├── events.md             # one-off events, who needs prep
    │   └── profiles.md           # people, preferences, gift ideas
    ├── house/
    │   └── maintenance.md        # cadence + last-done dates
    └── goals.md                  # personal goals/habits (optional)
```

You can rename or restructure these. If you do, update the path references in
`SKILL.md` so the skill reads the right files. The skill cares about three
things existing in some form:

1. **A task list** it can read first and check items off of.
2. **A weekly tracker** with countable cadence targets.
3. **A contracts ledger** with per-engagement silence thresholds and deliverable
   checklists. This drives the CLIENT PULSE section.

## Key file contracts

### `tasks.md`
Sections like Today/Tomorrow, This Week, named project buckets, Watching For,
Done. The skill checks items off when you confirm completion and appends new
ones when you capture them.

### `business/weekly-tracker.md`
- A **Critical Number** line (the one metric that matters this quarter).
- **Weekly counters** in `x/y` form (e.g. `Coffees: 1 / 3`). The skill
  increments these when you log an activity and resets them on Mondays.
- A **pipeline table** of candidates.

### `business/contracts.md`
- **Active** engagements (retainers, delivery) with a per-engagement silence
  threshold and a deliverables checklist (`- [ ]` / `- [x]` with dates).
- **Sent / Awaiting Signature** with a sent date and amount.
- **Lost** and **Closed-Won** tables.
The default silence thresholds the skill applies: retainers 7d, active delivery
5d, sent proposals 7d, past customers 60d. Override per engagement in the file.

### `personal/` files
Important dates drive the 30-day look-ahead. Maintenance files drive overdue
flags. Keep them simple; the skill only needs dates and short notes.

## Live data vs. repo data

| Lives in the repo (static) | Comes from MCP (live) |
|---|---|
| Plan, targets, ICP, kill list | Calendar events |
| Weekly counters, pipeline | Open deals, lead status |
| Contracts, deliverables, thresholds | Inbox / sent mail |
| Family dates, maintenance cadence | Income, A/R, cash on hand |

See [`SETUP.md`](../../SETUP.md) for connecting the MCP servers.

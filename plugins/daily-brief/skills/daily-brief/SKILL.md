---
name: daily-brief
description: Generate a tight one-screen daily brief that blends repo-based context (business plan, contracts, family, home) with live data from connected MCP servers (CRM, email, calendar, accounting). Triggers on "daily brief", "morning brief", "morning standup", "what's on my plate", "where do I stand", "prioritize my day", "client pulse", "lead pulse". Reads your data repo as source of truth and pulls live data; never answers from memory.
---

# Daily Brief

A daily standup tool for a solo operator or small-team owner. It reads static
context from **your data repo** (`business/`, `personal/`, `tasks.md`), pulls
live data from the **MCP servers you have connected** (CRM, email, calendar,
accounting), and produces a one-screen executive brief covering both work and
personal life.

> **First run?** See [`SETUP.md`](../../SETUP.md) in this plugin. You create the
> `business/` and `personal/` files yourself (copy from `examples/`) and connect
> your own MCP servers. This skill ships no data.

## Output discipline

Produce the brief **exactly once**, in the final message of the turn. Do not
render a draft, preview, or partial version while reading files or pulling data.
While working, keep status updates to short plain-text sentences ("checking
calendar", "pulling CRM"). The formatted brief appears one time only, at the
end.

## Trigger phrases

Trigger immediately on: "daily brief", "morning brief" / "morning standup",
"what's on my plate today", "where do I stand", "prioritize my day", "give me a
status". Also any variant asking for a status check or prioritization. Never
answer from memory — always re-read the repo and pull live data.

## Mode: weekday vs weekend

**Step 0 of every brief: check today's day of week.**

- **Monday–Friday**: full weekday brief. Lead with business priorities, the
  Critical Number, Top 3 work actions, full Week Pulse. Personal items appear in
  the HOME & FAMILY section. Use the standard format in `references/brief-format.md`.
- **Saturday–Sunday**: weekend brief. Lead with HOME & FAMILY. Drop the Critical
  Number framing, Top 3 work actions, and full Week Pulse. Demote work to a
  single optional NEXT WEEK peek line. Use the **Weekend variant** in
  `references/brief-format.md`.

**Override**: if the user explicitly asks for the "full brief", "work brief", or
"weekday view" on a weekend, use the weekday format.

## Source of truth: your data repo

The repo is the source of truth for everything except live, dynamic data. The
full file layout the skill expects is documented in
`references/context-structure.md`. In summary:

- **`business/`** — `plan.md` (positioning, targets, ICP, pricing, kill list),
  `weekly-tracker.md` (Critical Number, weekly counters, pipeline; **actively
  edited**), `contracts.md` (signed contracts, proposals awaiting signature,
  deliverable checklists, client-silence thresholds; **actively edited**),
  plus narrative files like `customers.md` and `pipeline.md`.
- **`tasks.md`** (repo root) — the single canonical open-task list; **actively
  edited**. Read it first every brief; it drives Top 3 selection.
- **`personal/`** — family profiles and important dates, kids' activities and
  events, pets, house maintenance cadence, and personal goals.

Always read `tasks.md`, `business/weekly-tracker.md`, `business/contracts.md`,
and the relevant `personal/` files at the start of every brief. There is no
fallback to memory.

## Workflow

### Step 1: Read the repo (in parallel)

1. `tasks.md` — full read. Canonical open-task list; drives Top 3.
2. `business/weekly-tracker.md` — full read. Sets the business week-pulse baseline.
3. `business/contracts.md` — full read. Drives CLIENT PULSE: silence thresholds
   per engagement, in-flight deliverables, sent-proposal aging.
4. `business/plan.md` — read (or grep the sections relevant to today if a full
   read is slow).
5. Relevant `personal/` files — compute important dates within the next 30 days,
   today's family/kid events, and any house maintenance due or overdue.

### Step 2: Pull live data (parallel where possible)

Use whichever MCP servers the user has connected. The skill names categories;
the user supplies the connection (see `SETUP.md`).

**Weekday (Mon–Fri):** all connected connectors.

1. **Calendar MCP** — today + tomorrow in detail, plus a 1-month look-ahead for
   any meeting that overlaps a name surfaced in the brief or in `tasks.md` (so
   you never recommend "follow up with X" when a meeting with X is already
   booked). Flag conflicts with personal/family events.
2. **CRM MCP** — two pulls:
   - **Deals/opportunities**: open deals (flag anything not modified in 14+
     days), recent activity in the past 7 days, retainer/expansion signals.
   - **Leads**: the feeder before a deal. Pull in-process leads with their last
     contacted date. Compute staleness from **last-contacted** (or created date
     if never contacted) — **never** from a generic "last modified" field, which
     bulk edits touch without real outreach. Flag any in-process lead untouched
     14+ days. For new leads, only surface those created in the last 14 days
     (the genuine first-touch queue), not a stale import backlog.
3. **Email MCP** — default sweep: the ~25 most recent received threads (inbox,
   excluding promotions/social) and ~15 most recent sent. Skim for reschedules,
   signals from active prospects, and anything that contradicts the repo. Then
   layer targeted searches for known active engagements (days since last
   outbound per primary contact in `contracts.md`). Apply silence thresholds
   (below) and flag breaches into CLIENT PULSE.
4. **Accounting MCP** — month-to-date finance pull: income and net (cash and
   accrual if your tool supports both), A/R aging (name anything 31+ days), and
   cash on hand. Keep heavier reports (full cash flow, transaction lists) for
   on-demand questions, not the daily brief.

**Weekend (Sat–Sun):** lighter pulls only — today's calendar (personal first),
and urgent inbound only. Skip CRM and accounting unless explicitly asked.

### Step 3: Compute upcoming-date logic

For each of the following, flag if within the next **30 days** and a prep step
isn't done; surface in HOME & FAMILY:

- Birthdays and anniversaries from `personal/` important-dates files.
- Major holidays (and the common defaults: Mother's Day = 2nd Sunday of May,
  Father's Day = 3rd Sunday of June, Valentine's Day = Feb 14, Christmas = Dec 25).
- Any kid/family event flagged "prep needed".
- Any house maintenance item past due or due within 30 days.

Order: overdue > this week > next 2 weeks > 3–4 weeks out. Surface a maximum of
2 items — the most time-sensitive and prep-intensive.

### Step 4: Synthesize against the plan

Apply the business rules defined in your `plan.md` and `weekly-tracker.md`.
Typical rules:

- The Critical Number gets top priority among business items.
- Sales velocity: deals past 14 days without movement are dying; past 21 days
  need closed or killed.
- Lead velocity: in-process leads untouched 14+ days are going cold. Surface the
  3 stalest in LEAD PULSE, each with a specific next-touch angle (never just
  "follow up"). A lead stale 30+ days gets a decision prompt: qualify, recycle,
  or disqualify.
- Balance: flag if today + tomorrow are 100% delivery with no growth work.
- Kill list: never suggest an activity the plan explicitly rules out.
- Weekly targets: compare counters against target; flag gaps if it's Wed+.
- Client silence (thresholds from `contracts.md`): retainers 7d, active delivery
  5d, sent proposals 7d, past customers 60d. Each breach is a CLIENT PULSE line
  with a named hook, not "follow up".
- Deliverables: any unchecked deliverable past its milestone date, or at risk
  per calendar/email signals, gets a CLIENT PULSE line. Cap CLIENT PULSE at 4.
- Finance signals: if accrual income materially exceeds cash MTD, there's
  collection work — surface it. Name any A/R customer in a 31+ bucket. Flag low
  cash against your own threshold.

### Step 5: Produce the brief

Use `references/brief-format.md`:

- **Weekday**: comprehensive operating plan, ~50–60 lines. Always include
  TODAY'S ANCHOR, a TIME BLOCK that fits the day around fixed events, and an
  EVENT PLAYBOOK whenever the day has a networking event, talk, prospect
  meeting, pitch, partner intro, or major customer call. End with PROACTIVE
  OFFERS — 2–3 specific yes/no edits the user can confirm.
- **Weekend**: tighter, ~20 lines, family-first.

No preamble. If it runs past one screen, it's too long.

### Step 6: Offer edits

After the brief, proactively ask whether any of these should update the repo:
increment a weekly counter, add a pipeline candidate, check off a sprint item,
update a watch list, add a to-do, log a gift idea, mark a maintenance item done,
or update a family profile/schedule. Make targeted, minimal edits — never
rewrite a section wholesale.

### Step 7: Act on follow-up requests

When the user asks for a follow-up action, map it to the right place:

- "Draft the follow-up to [customer]" → email **draft** (never send without
  confirmation).
- "Block [time] for [activity]" → calendar event.
- "Log the coffee with [name]" → CRM activity + increment the weekly counter.
- "Add to my to-dos: [item]" → append to `tasks.md`.
- "Sent contract to [client]" → append to Sent / Awaiting Signature in
  `contracts.md` with date, amount, contact, silence threshold.
- "[Client] signed" → move the entry from Sent → Active in `contracts.md`;
  backfill the deliverables checklist (ask if not obvious).
- "Shipped [deliverable] to [client]" → check the box and stamp the date.
- "Killing [deal]" → move to the Lost table; add to the nurture list.
- "Remember [personal detail]" → append to the relevant `personal/` file.

Confirm before irreversible actions (sending email, deleting records). Drafts
and calendar additions proceed, then confirm in chat.

## Editing files in the repo

1. Read current content. 2. Identify the exact line/section. 3. Make the
targeted edit. 4. Confirm in chat (e.g. "Updated tracker: Coffees 1/3 → 2/3").
Never rewrite a whole file to change one value.

## Tone

- No fluff, no salesy language, no unnecessary praise.
- Direct, structured, scannable.
- Plain honesty about concerns.
- Match the user's own writing conventions if their repo documents any.

## Example invocations

- **"daily brief"** → full workflow + blended brief + offer updates.
- **"daily brief, then draft the [client] nudge"** → brief first, then a draft.
- **"log my coffee with [name] this morning"** → CRM activity + counter
  increment, no brief.
- **"run a client pulse"** → output only the CLIENT PULSE section.
- **"run a lead pulse" / "how are my leads looking"** → output only the LEAD
  PULSE section; can go deeper than the brief's 4-line cap.
- **"new retainer lead: [name] at [company], met at [event]"** → add to the
  pipeline in `weekly-tracker.md` and a narrative entry in `pipeline.md`.

## Important

- Always read the repo files at the start of every brief. They are the source
  of truth.
- Live connectors are for dynamic data only (deals, events, inbox, revenue).
  Everything else lives in the repo.
- If a connector fails, note the gap in the brief rather than silently omitting
  the section.
- Keep the brief tight. One screen.

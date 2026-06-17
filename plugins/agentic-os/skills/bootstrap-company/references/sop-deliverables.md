# SOP: Deliverables

## Default destination

All agent deliverables ship to `00-deliverables/YYYY-MM-DD-<slug>/` at the repo root.

- `YYYY-MM-DD` is the date the deliverable was created.
- `<slug>` is a short kebab-case description (e.g., `pricing-research`, `launch-week-plan`).
- Each deliverable folder contains a primary file (`STRATEGY.md`, `BRIEF.md`, `POST.md`, etc.) and any supporting assets.

## When this rule applies

Use this default for any draft, brief, strategy, post, case study, scoping note, decision doc, or other artifact that ships as a file.

## When to override

Some agents produce deliverables that don't ship as files in this repo. Their `AGENT.md` will state the override explicitly. Common cases:

- Engineers: code changes ship in the relevant code repo. Briefs and scoping docs still go to `00-deliverables/`.
- Chief of Staff: send-ready outputs (emails, posts) ship through the relevant channel. Drafts still go to `00-deliverables/` first.

If an `AGENT.md` does not state an override, the default in this SOP applies.

## Naming hygiene

- Use today's date, not a planned-publish date.
- Slug should be specific enough that someone scanning the folder list can guess what's inside.
- One folder per deliverable. Do not pile multiple unrelated drafts into one dated folder.

## Linking back

Every deliverable should be linked to its task in `00-tasks.md`. See `01-sops/task-tracking.md`.

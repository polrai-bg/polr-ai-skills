# SOP: Task Tracking

## Source of truth

Every active task across all agents is tracked in `00-tasks.md` at the repo root.

## Schema

| Field | Description |
|---|---|
| id | `t-YYYY-MM-DD-NNN` where NNN is a 3-digit sequence for that date |
| owner | The agent responsible (use the agent's short name from `06-agents/README.md`) |
| task | One-line description of the work |
| status | `open` / `in_progress` / `blocked` / `done` / `abandoned` |
| started | Date the agent began work |
| updated | Date of last status change |
| deliverable | Path to the deliverable in `00-deliverables/`, or note for non-file outputs |

## When to write

- Add a row when you start a task. Status `in_progress`. Set `started` to today.
- Update the row as work progresses. Update `updated` on every status change.
- When complete, flip status to `done` and fill in the `deliverable` link.
- If you abandon work, status `abandoned` with reason in the task description.

## Disruption recovery

If you or another agent crash mid-task, the orphaned `in_progress` row is the recovery signal. Whoever picks up the work confirms the task with the principal before resuming.

## Status values

- `open`: task identified, not yet started.
- `in_progress`: actively being worked on.
- `blocked`: waiting on an external dependency. Add the blocker to the task description.
- `done`: finished and deliverable is linked.
- `abandoned`: explicitly abandoned with reason in the task description.

## Filtering

Agents filter by `owner` to find their own work. The principal reads the whole list as the company-wide pane of glass.

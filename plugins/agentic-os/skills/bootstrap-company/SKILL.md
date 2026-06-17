---
name: bootstrap-company
description: Interview the principal in phases to build a complete Agentic OS from an empty folder: identity, context, team, connections, and automations. Use once at company creation on an otherwise-empty folder (only this skill and a thin AGENTS.md). Do not run it on an already-populated OS.
---

# Bootstrap a Company

A staged interview that turns an empty folder into a complete Agentic OS. Treats the conversation like founding a real company: get the foundation right, then design the team, then wire the systems.

## Before you start

- **Confirm this is a fresh bootstrap.** If `01-identity/` already exists or `06-agents/` has any agent other than this skill's seed, stop and ask the principal whether to (a) abort, (b) continue and overwrite, or (c) switch to `add-new-agent` for incremental additions.
- **Allow pause-and-resume.** The interview is long. After each phase, offer the principal a save point: "We can stop here and resume next session. Your answers so far are recorded in `04-memory/bootstrap-progress.md`." Write progress to that file at every phase boundary.
- **One question per turn.** Never batch. Reflect each answer back in one line ("I heard X, right?") before advancing.
- **Offer a default when the principal hesitates.** Reaction beats authoring from scratch.

## The framework being built

The OS uses these top-level locations:

```
00-deliverables/  where agent outputs land (one subfolder per project)
00-tasks.md       cross-agent active task list (lightweight, append-only)
01-identity/      SOUL.md (company), USER.md (principal), PRINCIPLES.md
01-sops/          shared standard operating procedures (deliverables, task-tracking)
02-context/       company.md, domain.md, projects.md
03-skills/        shared workflows
04-memory/        cross-session persistence
05-connections/   one file per external system
06-agents/        each agent has AGENT.md, skills/, memory/, optionally automations/
```

Verification = required section in every `SKILL.md` and `AGENT.md`.
Automations = lives under the agent that owns it.

---

## Phase 1 . Company essence (5 questions)

### 1.1 Name
> "What's the company called?"

Capture both the display name and the folder slug. Derive the slug as lowercase, hyphenated, ASCII only, no spaces. Confirm: "Display name `<name>`, folder slug `<slug>`. OK?" Spaces or capitals in the slug create stale absolute paths the moment anything references the OS by full path (this has happened before on a capitalized company folder and required a cleanup commit). No exceptions.

### 1.2 Synopsis
> "Give me one or two sentences on what the company does and who it's for."
Reflect back. If it has more than one product or audience, ask which is the primary.

### 1.3 Stage
> "Where are you today: idea, building MVP, MVP complete, paying customers, scaling?"

### 1.4 12-month north star
> "What's true 12 months from now if the year goes well? Pick the single most-load-bearing metric or milestone."

### 1.5 Operating principles
> "What are 2 to 4 principles you want every agent in this company to operate by? (e.g. 'verify before claiming done', 'route, don't sprawl', 'one agent per concern'.)"
If the principal is stuck, offer the four defaults from this skill's `references/default-principles.md` (or just propose them inline) and ask which to keep.

**Phase 1 writes (at end of phase, after confirmation):** `01-identity/SOUL.md`, `01-identity/PRINCIPLES.md`, top of `02-context/company.md`.

---

## Phase 2 . The principal (4 questions)

### 2.1 Identity
> "Your name, role at the company, and email?"

### 2.2 How you work
> "How do you prefer to work? (Async vs sync, terse vs verbose, options plus recommendation vs just options, batch vs steady stream, anything else.)"

### 2.3 Decision style
> "When agents bring you a decision, what makes one easy for you to act on? (Specific examples beat principles here.)"

### 2.4 Hard nos
> "What should agents never do without explicit confirmation? Always include external sends, money movement, and destructive data actions. What else?"

**Phase 2 writes:** `01-identity/USER.md`.

---

## Phase 3 . Domain (3 questions)

### 3.1 Industry / market
> "What industry or market does the company live in? Who are the buyers, what's the landscape, what's the size?"

### 3.2 Vocabulary
> "What 5 to 15 terms must every agent get exactly right? (Words your buyers use, technical terms, internal jargon.)"
Capture term plus one-line definition each.

### 3.3 Active projects and deadlines
> "What's on the front burner right now? List active projects, deadlines, and stakeholders."

**Phase 3 writes:** `02-context/domain.md`, `02-context/projects.md`, fills out the rest of `02-context/company.md`.

---

## Phase 4 . Team design (variable length)

This is the longest phase. Goal: produce the full org chart with enough depth that the Chief of Staff can route correctly. Per-agent depth comes later via `add-new-agent` if needed.

### 4.1 Org sketch
> "Two ways to do this. Option A: tell me the roles you want (e.g. 'CEO, CMO, marketing manager, developer, designer, PM'). Option B: describe the work that needs to happen and I'll propose a team. Which?"

### 4.2 If Option A, confirm the list
Reflect the list back. Ask: "Anything missing? Anything that should be split or merged?"

### 4.3 If Option B, propose the team
Based on the synopsis (Phase 1.2), stage (1.3), domain (Phase 3), and active projects (3.3), propose 4 to 8 roles with one-line role statements each. Ask for adds, drops, splits.

### 4.4 Always include the Chief of Staff
The Chief of Staff is the routing entry point and is not optional. Confirm with the principal: "I'll add a Chief of Staff as the front door. Every request lands there first and routes to the specialists. OK?"

### 4.5 Per-agent quick capture
For each agent in the confirmed list (one agent at a time, not all at once):
1. **Purpose**: "One sentence: why does this role exist?"
2. **Top 3 responsibilities**: "Three things this role owns end-to-end."
3. **Out of scope**: "What's NOT this role's job, even though someone might assume it is?"
4. **Common request shapes**: "Three concrete things you'd ask this agent in a normal week."
5. **Escalation**: "When should this agent stop and check with you?" (Default to the company hard-nos from Phase 2.4.)

If the principal wants more depth on any single agent, offer to run `add-new-agent` after bootstrap completes.

### 4.6 Routing table
After all agents are captured, draft the Chief of Staff routing table from the "common request shapes" entries. Show it to the principal: "These are the routing rules. Add, remove, or change?"

**Phase 4 writes:** `06-agents/<each-agent>/AGENT.md`, `06-agents/<each-agent>/memory/README.md`, `06-agents/README.md` (roster), `06-agents/chief-of-staff/AGENT.md` (with routing table) plus its three default skills (`triage-request`, `clarify-intent`, `route-to-agent`).

---

## Phase 5 . Connections (variable length)

### 5.1 What systems
> "What real systems will agents need to reach? Common ones: Gmail, Calendar, HubSpot, GitHub or Linear, Slack, Figma, Notion or Drive, Stripe, analytics. List the ones that matter for this company."

### 5.2 Per-system: read or write?
For each system, one question:
> "<System>: read-only, drafts only, or full read/write? And what should always require explicit confirmation before agents act?"

Default to the safest: most systems start read-only or drafts-only. Writes require explicit principal confirmation per call.

### 5.3 Auth
> "<System>: how is auth handled, env var, OAuth, MCP server, none yet? Don't paste secrets here, just point at where they live."

### 5.4 Ownership
> "Which agent(s) primarily use <system>?"

**Phase 5 writes:** `05-connections/<system>.md` for each system.

---

## Phase 6 . Automations (3 questions)

### 6.1 Recurring work
> "What recurring work should happen on a schedule? Examples: weekly pipeline report, daily inbox triage, Monday roadmap pull, monthly investor update draft. List what would actually save you time."

### 6.2 Per-automation
For each automation:
- Trigger (cron / event)
- Owning agent
- Output destination (file, message, draft email)
- Failure mode (default: notify principal, don't retry destructively)

### 6.3 Confirmation gates
> "Which of these can run end-to-end vs. which produce a draft for you to confirm before action? Default to draft-only for anything externally visible."

**Phase 6 writes:** `06-agents/<owning-agent>/automations/<automation-name>.md` for each.

---

## Phase 7 . Confirm and scaffold

Show the principal a single summary:

```
About to write:

00-deliverables/
  README.md                      (per-project subfolders go here)

00-tasks.md                      (active cross-agent task list, seeded empty)

01-identity/
  SOUL.md, USER.md, PRINCIPLES.md

01-sops/
  deliverables.md                (where outputs go and how they're named)
  task-tracking.md               (how 00-tasks.md is used)

02-context/
  company.md, domain.md, projects.md

03-skills/
  add-new-agent/SKILL.md       (so you can add agents incrementally later)
  README.md

04-memory/
  README.md
  bootstrap-progress.md          (interview record)

05-connections/
  <each system>.md               (N files)

06-agents/
  README.md                      (roster)
  chief-of-staff/                AGENT.md + 3 routing skills
  <each specialist>/             AGENT.md + memory/README.md
  <agents with automations>/     automations/<name>.md

AGENTS.md                        (entry point, already exists; updated to point at the populated OS)
```

Ask: "Proceed? (yes / changes)"

Only write files after explicit "yes."

### Seed sources

When scaffolding, copy these reference files verbatim (they are already generic):

- `references/sop-deliverables.md` to `01-sops/deliverables.md`
- `references/sop-task-tracking.md` to `01-sops/task-tracking.md`
- `references/tasks-template.md` to `00-tasks.md`

Do not paraphrase them at write time. If the principal wants changes, edit the SOP files after scaffolding so the change is visible as a normal commit.

---

## After scaffolding . handoff

Tell the principal:
1. "Company is live. Start any new conversation by reading `AGENTS.md`."
2. "Talk to the Chief of Staff. Every request enters there."
3. "Want deeper specs on any agent? Run the `add-new-agent` skill on that role to do a full deep-dive interview."
4. "Run `bootstrap-company` once. For incremental changes after this, use `add-new-agent` or edit files directly."

## Verification (required section)

Before declaring this skill done, confirm:
- [ ] Folder slug is lowercase and hyphenated, no spaces or capitals.
- [ ] All top-level locations exist (`00-deliverables/`, `00-tasks.md`, `01-identity/`, `01-sops/`, `02-context/`, `03-skills/`, `04-memory/`, `05-connections/`, `06-agents/`) with `README.md` where applicable.
- [ ] `01-sops/deliverables.md` and `01-sops/task-tracking.md` exist and are linked from `AGENTS.md`.
- [ ] `01-identity/` has SOUL, USER, PRINCIPLES, no template placeholders left.
- [ ] `02-context/company.md` synopsis matches what the principal said in 1.2.
- [ ] Every agent listed in `06-agents/README.md` has an `AGENT.md` with all six sections (Role, Scope in/out, Default loop, Common request shapes, Escalation, Success criteria).
- [ ] Chief of Staff routing table covers every "common request shape" captured across all agents.
- [ ] Every connection file has the four sections (Purpose, Mechanism, Auth, Allowed operations).
- [ ] Every automation lives under its owning agent's `automations/` folder.
- [ ] `04-memory/bootstrap-progress.md` exists and records the interview answers, so a future session can audit the choices.

## Anti-patterns

- **Skipping phases to "save time".** Each phase informs the next. Skipping Phase 3 (domain) makes Phase 4 (team design) generic.
- **Batching questions.** A 30-question form is not an interview. One at a time, every time.
- **Writing files mid-interview.** Only Phase 7 writes. Earlier phases stage progress in `04-memory/bootstrap-progress.md` only.
- **Inventing the company.** When the principal hesitates, *propose* options; don't *assume* answers.
- **Letting "out of scope" stay empty for any agent.** Out of scope drives routing more than in-scope does.
- **Generic success criteria.** "Does the job well" is not measurable. Push for observables.
- **Skipping the Chief of Staff.** It's the entry point. Non-negotiable.
- **Spaces or capitals in the folder slug.** Creates stale absolute paths the moment anything references the OS by full path. Force lowercase-hyphen at Phase 1.1.
- **Putting deliverables in a hidden folder.** `.deliverables/` looks tidy but hides outputs from the principal and from grep. Use `00-deliverables/` so it sorts to the top and stays visible.

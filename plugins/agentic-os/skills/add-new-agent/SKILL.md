---
name: add-new-agent
description: Interview the principal one question at a time to build a new specialist agent: produces a complete AGENT.md, updates the roster, and wires the Chief of Staff routing table. Triggers on "add an agent", "hire a [role]", "create a new agent for X", or when the Chief of Staff finds a request shape no existing agent covers.
---

# Add a New Agent

A structured interview that grows the company one role at a time. Treats the principal like a real founder hiring a real person: gets the role spec right *before* opening the offer letter (i.e. before writing any files).

## Operating rules for this skill

1. **One question per turn.** Never batch multiple questions in a single response. Wait for the answer.
2. **Reflect before advancing.** After each answer, restate what you heard in one line and ask "right?" before moving on. Catch misunderstandings early, not at the end.
3. **Offer a default when the principal hesitates.** "If you're not sure, my default would be X, does that work?" beats forcing them to author from scratch.
4. **Pull from existing context.** Read `02-context/company.md` and `06-agents/README.md` first. If the role overlaps an existing agent, surface that *before* the interview, not after.
5. **No file writes until step 13.** The interview is reversible; file writes are not.
6. **One agent per run.** If the principal mentions a second role mid-interview, note it and offer to run the skill again afterward.

## The interview

### Step 0 . Pre-flight (do this silently before asking anything)

- Read `06-agents/README.md` to know the current roster.
- Read `06-agents/chief-of-staff/AGENT.md` for the current routing table.
- Read `02-context/company.md` for current priorities and open loops.

### Step 1 . Working title

> "What's the working title for this role? (e.g. CTO, SDR, Customer Success Lead, Bookkeeper.)"

After the answer: check the roster. If a similar role exists, ask: "We already have *X*, is this a split, a replacement, or genuinely new?"

### Step 2 . One-sentence purpose

> "In one sentence, why does this role exist at this company?"

Reflect back. If the sentence has more than one verb, push for a sharper version.

### Step 3 . Who they pair with

> "Who does this role report to or pair with most? (The principal, another agent, no one in particular?)"

This shapes the escalation rules later.

### Step 4 . In-scope responsibilities (round 1)

> "Give me the first three things this role owns end-to-end. Just bullet form."

### Step 5 . In-scope responsibilities (round 2, sharpen)

For each bullet from step 4, ask one follow-up to make it concrete. Examples:
- Vague: "Owns sales." Sharpen: "What part of sales? Outbound prospecting, discovery, closing, all of it?"
- Vague: "Handles customer success." Sharpen: "Onboarding only, or onboarding plus expansion plus renewal?"

### Step 6 . Out-of-scope

> "What's specifically *not* this role's job, even though someone might assume it is?"

If the principal says "nothing comes to mind," offer two or three plausible scope-creep risks and ask which to exclude. Out-of-scope is the most-skipped section and the most-useful one for routing.

### Step 7 . Common request shapes

> "Give me 3 to 5 concrete things you'd actually ask this agent to do in a normal week."

These become the "Common request shapes" section and double as the routing-table entries later.

### Step 8 . Escalation triggers

> "When should this agent stop and check with you instead of acting? (Money, external sends, hiring decisions, anything irreversible, what's the line?)"

If the principal is vague, suggest the company defaults: external sends, money, hiring above IC level, destructive data actions.

### Step 9 . Success criteria

> "If this agent is doing its job well three months from now, what's true that isn't true today?"

Push for observable criteria, not vibes. "Pipeline is healthier" becomes "Weekly pipeline report lands every Monday without being asked."

### Step 10 . Folder name

> "I'll create the agent at `06-agents/<folder-name>/`. I suggest `<kebab-case-name>`, confirm or override?"

Use kebab-case. Examples: `cto`, `sdr`, `customer-success`, `bookkeeper`.

### Step 11 . Routing-table entries

Based on Step 7 answers, draft 3 to 7 routing rows for the Chief of Staff, e.g.:

| Request shape | Route to |
|---|---|
| Architecture decision spanning modules | **CTO** |
| Cold outbound sequence to a Tier-2 prospect | **SDR** |

Show the draft to the principal and ask: "These are the routing rules I'll add to the Chief of Staff. Add, remove, or change?"

### Step 12 . First skills (optional)

> "Want me to seed 1 to 3 starter skills for this agent now, or leave the skills folder empty for later?"

If yes, ask for skill names only (not contents): get the list, then offer to run a separate `add-new-skill` flow per skill afterward.

### Step 13 . Confirm and write

Show the principal a summary:
```
About to create:
  - 06-agents/<folder>/AGENT.md
  - 06-agents/<folder>/skills/  (empty)
  - 06-agents/<folder>/memory/README.md
Updates:
  - 06-agents/README.md  (add row to roster)
  - 06-agents/chief-of-staff/AGENT.md  (append routing rows)
Proceed? (yes / changes)
```

Only write files after explicit "yes."

## What gets written

### `06-agents/<folder>/AGENT.md`
Use this template, filled from the interview:

```markdown
# <Role>

## Role
<One-sentence purpose from Step 2.>

## Scope

### In scope
- <bullets from Steps 4 to 5>

### Out of scope
- <bullets from Step 6>

## Default loop
1. Read relevant context files (`02-context/company.md` plus any role-specific ones).
2. Confirm the request shape against "Common request shapes" below.
3. Produce the artifact.
4. Verify against the relevant check in `07-verification/`.
5. Update durable facts in the right context file.

## Common request shapes
- <bullets from Step 7>

## Escalation
Flag for the principal's explicit decision when:
- <bullets from Step 8>

## Success criteria
- <bullets from Step 9>
```

### `06-agents/<folder>/memory/README.md`
```markdown
# <Role> . Local Memory

Notes only this agent needs. Cross-company memory goes in `04-memory/` instead.
```

### Roster update . append a row to `06-agents/README.md`
| Role | folder | one-line role | Active |

### Routing-table update . append rows to `06-agents/chief-of-staff/AGENT.md`
The 3 to 7 rows confirmed in Step 11.

## Done means

- The agent's `AGENT.md` exists and is filled (no template placeholders left).
- The roster table includes the new agent.
- The Chief of Staff routing table includes the new rows.
- The principal has been told: "Hired. The Chief of Staff can route to <role> as of now."

## Anti-patterns

- **Asking everything at once.** A 10-question form is not an interview. One at a time.
- **Writing files before confirmation.** The skill is reversible until step 13. Keep it that way.
- **Letting "out of scope" stay empty.** If you can't name what the role *won't* do, you can't route around it.
- **Generic success criteria.** "Does the job well" is not a success criterion. Push for observables.
- **Inventing the role for the principal.** When they hesitate, *offer* a default, don't *assume* one.

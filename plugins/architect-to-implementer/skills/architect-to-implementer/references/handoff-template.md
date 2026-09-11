# Implementation handoff template

Use this template as a drafting structure. Replace every bracketed prompt, remove drafting comments, and omit conditional sections only when they are genuinely irrelevant. Do not copy generic requirements that the project does not need.

```markdown
# Implementation Handoff

You are the implementation engineer for the assignment below.

Only decisions explicitly listed under Approved Decisions are approved and authoritative. Preserve them unless implementation evidence reveals a concrete blocker, security problem, contradiction, destructive requirement, or technical impossibility. Do not implement areas blocked by decisions still requiring approval.

Use full engineering judgment for implementation details inside these boundaries. Do not reopen product strategy or redesign approved architecture merely because you prefer another approach. Read the specified source-of-truth files before modifying code. Implement the assignment, verify it against the acceptance criteria, and leave the required completion handoff.

## Objective

[Describe the user or business outcome, not a list of code changes.]

## Assignment

[Define exactly what this agent must complete now. Name the phase or boundary and state where it must stop.]

## Business / User Context

[Include only context that changes implementation decisions.]

## Read First

Read these before modifying code, in this order:

1. `[authoritative file]`
2. `[authoritative file]`

## Source of Truth

When sources disagree, use this precedence:

1. [highest-authority source]
2. [next source]
3. [existing code or lower-authority source]

[Explain how to handle a conflict between approved architecture and current code.]

## Current System State

- Repository: [path or identity]
- Branch: [branch]
- Latest relevant commit: [short SHA and subject]
- Working tree: [clean or concise status]
- Implemented baseline: [what already exists]
- Relevant integration points: [paths or interfaces]

## Approved Decisions

### [Existing decision ID]: [decision title]

**Decision:** [approved choice]

**Rationale:** [why the choice was approved, only when it affects implementation]

**Implications:**

- [constraint or implementation consequence]

## Architecture Decisions Still Requiring Approval

### [Decision ID]: [unresolved decision]

- **Why unresolved:** [missing evidence or approval]
- **Blocked work:** [affected implementation]
- **Unblocked work:** [work that may safely continue]

## Architectural Guardrails

- [invariant that must remain true]

## Implementation Autonomy

The approved architecture defines decision boundaries, not every line of code. Use full engineering judgment inside those boundaries.

### Implementer MAY Decide

- [implementation detail that does not require escalation]

### Implementer MUST NOT Change Without Escalation

- [approved product, architecture, data, security, dependency, API, deployment, or core UX decision]

## Scope

### In Scope

- [required work]

### Out of Scope

- [explicit exclusion]

## Functional Requirements

### [Existing or new FR ID]

[Write observable required behavior.]

## Technical Requirements

- [project-specific implementation constraint]

## Data / API Contracts

[Summarize only the contracts required for this assignment. Reference full authoritative specifications.]

## Implementation Sequence

1. [dependency-aware implementation step]
2. [next step]

The Implementer may optimize sequencing when dependencies require it, provided scope and approved architecture remain unchanged.

## Acceptance Criteria

### [Existing or new AC ID]

[Write an objectively demonstrable completion condition.]

## Verification Requirements

Before declaring completion:

- [project-specific typecheck, lint, unit, integration, migration, build, browser, security, data-integrity, or regression check]

For user-facing work, require real-browser verification of relevant workflows unless it is genuinely inapplicable. Compilation alone is not browser verification. Mark unavailable required checks `NOT RUN` and leave the assignment `Partial` or `Blocked` until the verification gap is resolved.

## Known Risks and Gotchas

- [non-obvious implementation trap supported by evidence]

## Dependencies

- [external prerequisite or environment-variable name, never a secret value]

## Escalation Conditions

Do not change approved architecture merely to make implementation easier. Pause the affected work and report the issue if:

1. An approved design is technically impossible.
2. Implementation reveals a material security or data-integrity risk.
3. Existing behavior contradicts a foundational architecture assumption.
4. A required dependency or API lacks an assumed capability.
5. A destructive or irreversible operation is required but was not approved.
6. Meeting acceptance criteria requires changing product scope.
7. Authoritative specifications materially contradict one another.

When escalating, report the conflicting decision, evidence, impact, viable options, and recommended resolution. Continue unaffected work when safe and practical.

## Definition of Done

The assignment is complete only when:

- all in-scope functionality is implemented
- acceptance criteria pass
- required verification passes
- applicable build and browser verification complete successfully
- no known critical regression remains
- deviations and outstanding issues are documented
- durable completion state is written for the next agent

## Completion Handoff Requirements

Create or update the repository's established completion-state artifact. If no convention exists, use `IMPLEMENTATION_RESULT.md` with:

- assignment and status: `Complete`, `Partial`, or `Blocked`
- implemented work
- files changed
- verification commands and `PASS`, `FAIL`, or `NOT RUN` results
- status of every acceptance criterion
- deviations from approved architecture, with IDs
- issues and follow-up work
- branch, latest commit, and uncommitted state
- recommended next task

Before switching implementation environments, finish or deliberately stop the assignment, identify uncommitted changes, run relevant verification, and update this completion state. Do not assume that the same model in another environment shares conversation or tool history.
```

## Decision-writing rules

- Preserve all authoritative decision and requirement IDs.
- Assign a new local ID only when the handoff introduces a derived requirement or acceptance criterion and no project convention exists.
- Never convert an inference into an approved decision. Label it as an assumption and state how it should be verified.
- If an unresolved choice blocks implementation, keep it in the approval section instead of hiding it in risks or dependencies.

## Verification selection

Choose checks that match the changed surface:

- Libraries and services: typecheck, lint, unit tests, integration tests, build, contract tests, failure-path tests.
- Data work: additive migration review, apply and rollback behavior where supported, constraints, isolation, backfill safety, and representative data validation.
- Authentication and permissions: server-side enforcement, ownership or tenant isolation, denied paths, token and session behavior, and rate limits where relevant.
- User interfaces: production build, browser workflow, forms, navigation, error and loading states, console and network errors, accessibility, responsive layouts, and affected-flow regression.
- External integrations: sandbox or test-environment checks, retries, idempotency, timeouts, partial failures, observability, and a clear statement of anything not verified live.

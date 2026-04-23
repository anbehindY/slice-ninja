# Slice NN: [Name]

> **Status:** DEEP | **Depends on:** [slices] | **Owner:** [TBD]
> **Prototype validated:** yes/no | **Last updated:** YYYY-MM-DD

## Blocking questions
- [ ] [unresolved items go here at the TOP]

## Problem
[1-2 sentences]

## Goal
[1 sentence]

## Success criteria
- [ ] [testable]
- [ ] [testable]

## Context from dependencies
| From slice | What this slice uses |
|---|---|
| Slice N | [entity, API, invariant] |

## Boundaries

| Type | Details |
|---|---|
| Functional | [what it does] |
| Non-functional | [perf, reliability] |
| Constraints | [non-negotiable] |
| Out of scope | [NOT this slice] |

## User flow
**Happy path:**
1. [step]

**Failure branches:**
- [what if X fails -> what happens]

## Entities

| Entity | Key fields | Notes |
|---|---|---|
| [Name] | [fields] | [notes] |

## State machines
```
STATE_A -- trigger --> STATE_B
STATE_A -- trigger --> STATE_C
STATE_B --X--> STATE_A  (reason)

Terminal: STATE_B
```

## Invariants
| Rule | Enforced in |
|---|---|
| [invariant] | code / API / test |

## Cross-cutting concerns
| Concern | How this slice uses it |
|---|---|
| [sync/auth/etc] | [description] |

## API contracts
```
METHOD /path
Auth: [required/optional]

Request:  { field: type }
Response: { field: type }
Errors:   { code: description }
Retry:    [idempotency behavior]
```

## Technical decisions
| Decision | Choice | Why |
|---|---|---|
| [what] | [pick] | [reason] |

## Fixed vs deferred
| Fixed (this slice) | Deferred (later) |
|---|---|
| [locked] | [not now] |

## Risks
| Risk | Severity | Mitigation | Detection |
|---|---|---|---|
| [risk] | H/M/L | [action] | [signal] |

## Rollout
- **Phase a:** [scope]
- **Phase b:** [scope]
- **Gate:** [what must pass before next phase]

## ADRs
- ADR-NNN: [title]

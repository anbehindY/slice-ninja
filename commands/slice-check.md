---
description: Check if a slice is ready for next step (prototype or build).
argument-hint: "<N> — e.g., 1"
---
Use slice-ninja to check slice readiness. Slice: $ARGUMENTS

1. Read the slice file
2. Detect status (LIGHT or DEEP)

If LIGHT — check readiness for prototyping:
- Has clear user flow?
- Has boundaries with out-of-scope?
- Has key constraints?
- Open questions resolved?
- Verdict: READY TO PROTOTYPE / NOT READY

If DEEP — check readiness for building:
- Goal is 1 sentence, criteria are testable?
- Every status field has a state machine?
- API contracts are specific enough for parallel dev?
- 3+ risks with specific mitigations?
- No unresolved blocking questions?
- No TBD in critical sections?
- Verdict: READY TO BUILD / NOT READY

List specific gaps with severity: BLOCKING / IMPORTANT / NICE-TO-HAVE

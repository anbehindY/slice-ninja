---
description: Generate test cases from a deep slice. For Notion tracking.
argument-hint: "<N> — e.g., 1"
---
Use slice-ninja to generate test cases. Slice: $ARGUMENTS

1. Read the DEEP slice file (must exist and be status DEEP)
2. Read templates/testcases.md
3. Generate tests for: happy path, failure cases, edge cases, invariant checks
4. Derive tests from: user flows, failure branches, state machine transitions, invariants
5. Assign priorities: P0 for invariants + happy path, P1 for failures, P2 for edges
6. Create docs/tests/ if missing
7. Save to docs/tests/slice-NN-tests.md
8. Report: test count by priority, any untested invariants

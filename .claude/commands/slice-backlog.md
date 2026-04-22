---
description: Generate backlog + test cases from a deep slice. For larger slices. Notion-ready.
argument-hint: "<N> — e.g., 1"
---
Use slice-ninja to generate backlog + tests. Slice: $ARGUMENTS

1. Read the DEEP slice file (must be status DEEP)
2. Read templates/backlog.md and templates/testcases.md
3. Break the slice into tasks: frontend, backend, infra. Estimate S/M/L. Note dependencies.
4. Map success criteria to acceptance criteria
5. Generate test cases (same as /slice-tests)
6. Create docs/backlogs/ and docs/tests/ if missing
7. Save backlog to docs/backlogs/slice-NN-backlog.md
8. Save tests to docs/tests/slice-NN-tests.md
9. Report: task count, test count, suggested build order

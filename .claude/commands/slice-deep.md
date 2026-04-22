---
description: Full architectural deep dive. Run AFTER prototype is validated.
argument-hint: "<N> <name> — e.g., 1 Offline Collection"
---
Use slice-ninja to generate a DEEP slice. Slice: $ARGUMENTS

1. Run discovery — read context docs, slice map, existing light slice for this number, dependency slices
2. Read templates/slice-deep.md
3. Fill ALL sections: problem/goal, boundaries, flows (happy + failure), entities, state machines (mandatory for status fields), invariants, cross-cutting concerns, API contracts, decisions, risks, rollout
4. Populate "Context from dependencies" from dependency slices
5. Save to docs/slices/slice-NN-name.md (overwrite light pass)
6. Flag: conflicts with other slices, needed ADRs, blocking questions at TOP

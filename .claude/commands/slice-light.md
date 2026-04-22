---
description: Generate a light slice for prototyping. Flows and boundaries only, no architecture.
argument-hint: "<N> <name> — e.g., 2 Donor Claim Flow"
---
Use slice-ninja to generate a LIGHT slice. Slice: $ARGUMENTS

1. Run discovery — read context docs + slice map
2. Read templates/slice-light.md
3. Fill with: problem, goal, user flow, boundaries, constraints
4. NO API contracts, NO data models, NO state machines — those come in deep dive
5. Save to docs/slices/slice-NN-name.md
6. Report: context used, what's filled, what's TBD, questions blocking prototype

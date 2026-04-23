---
description: Generate or update the project slice map from discovered context.
argument-hint: "[optional focus]"
---
Use slice-ninja to generate a slice map. Focus: $ARGUMENTS

1. Run discovery — read existing context docs
2. Identify natural vertical slices and dependencies
3. Identify cross-cutting concerns
4. Generate docs/slices/README.md using templates/slice-map.md
5. Create docs/slices/ and docs/adr/ if missing
6. Report: context used, slices identified, blocking questions

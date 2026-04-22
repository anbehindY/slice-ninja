---
name: slice-ninja
description: Plan, design, and document product features as vertical slices using the 5-block compact framework. Use when the user mentions "slice", "light pass", "deep dive", "slice map", "ADR", "backlog", "test cases", "slice context", or wants to scope, design, prototype-align, or generate implementation artifacts for a feature. Auto-discovers project context before generating. Outputs editable markdown under docs/slices/ and docs/adr/. Do NOT use for bug fixes or generic coding unrelated to feature planning.
---

# Slice Ninja

Generate editable markdown for vertical slices. Designed for small teams using Claude for both brainstorming and building.

## Workflow (this is the order)

```
1. /slice-discover     scan project for context
2. /slice-map          identify all slices + dependencies
3. /slice-light N      quick scope (enough to prototype)
4. [manual]            build frontend prototype, iterate
5. /slice-update N     align light slice with actual prototype
6. /slice-deep N       add architecture, APIs, state machines, ADRs
7. /slice-tests N      generate test cases (small slice)
   /slice-backlog N    generate backlog + test cases (larger slice)
8. [manual]            build real system against deep slice
```

Light slices are for PROTOTYPING. Flows and boundaries only. No API contracts.
Deep slices come AFTER the prototype is validated.
Slices should be SMALL. Small enough to skip backlogs and just track by tests.

## Discovery (run first, every time)

Before asking the user anything, scan the project:

1. Run: `find . -type f \( -name "*.md" -o -name "*.txt" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/docs/slices/*" -not -path "*/docs/adr/*" 2>/dev/null | head -40`
2. Read files matching: prfaq, prd, problem, requirements, spec, overview, architecture, design
3. Check `docs/slices/` for existing slices and `docs/adr/` for decisions
4. Tell the user what you found. Only ask about gaps.

## File locations

| What | Where |
|---|---|
| Slice files | `docs/slices/slice-NN-name.md` |
| Slice map | `docs/slices/README.md` |
| ADRs | `docs/adr/NNN-title.md` |
| Test cases | `docs/tests/slice-NN-tests.md` |
| Backlogs | `docs/backlogs/slice-NN-backlog.md` |
| Context summary | `docs/slices/CONTEXT.md` |

## Template rules

Templates must be READABLE and SCANNABLE:
- Short headers, not paragraphs
- Tables for structured data
- Blockquotes `>` for key decisions or warnings
- Checkboxes `- [ ]` for actionable items
- Max 3-5 bullets per section
- `[TBD]` for unknowns, don't pad
- Both AI and humans must parse easily

## Context sharing

Users work with Claude in TWO places:
- **Claude Code** — slash commands auto-discover project files
- **Claude.ai chat** — user pastes `docs/slices/CONTEXT.md` for brainstorming

`/slice-context` generates a compact summary of all slices, decisions, and cross-cutting concerns for pasting into Claude.ai chat sessions.

## Rules

- Every entity with a status field gets a state machine (deep dives only)
- Out-of-scope is mandatory in every slice
- Risks need specific mitigations
- Flag blocking open questions at the TOP of every file
- Cross-cutting concerns live in the slice map only
- Light slices: NO API contracts, NO detailed data models
- Deep slices: MUST have API contracts, state machines, invariants

---
description: Update existing slice with a change. Preserves manual edits.
argument-hint: "<N> <what changed> — e.g., 1 added search filter to user flow"
---
Use slice-ninja to update a slice. Update: $ARGUMENTS

1. Find and READ the existing file completely
2. Use str_replace for targeted edits only — do NOT regenerate
3. Preserve all manual edits
4. If change affects other slices: flag them, suggest slice map update, suggest ADR
5. Report: what changed, ripple effects, follow-ups

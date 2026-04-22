---
description: Generate a context summary to paste into Claude.ai chat for brainstorming.
---
Use slice-ninja to generate a context summary for Claude.ai chat.

1. Read: slice map, all slice files, all ADRs
2. Read templates/context.md
3. Compile: project summary, slice status table, key decisions, invariants, cross-cutting concerns, current focus, open questions
4. Keep it COMPACT — this gets pasted into a chat, so max ~100 lines
5. Save to docs/slices/CONTEXT.md
6. Tell the user: "Copy docs/slices/CONTEXT.md and paste it at the start of your Claude.ai chat."

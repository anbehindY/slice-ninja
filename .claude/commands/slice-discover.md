---
description: Scan project for context docs and report what's available for slice planning.
---
Run slice-ninja discovery on this project:
1. Scan for markdown/text files in docs/, product/, requirements/, notes/, specs/, root
2. Read files matching: prfaq, prd, problem, requirements, spec, overview, architecture, design
3. Check docs/slices/ for existing slices, docs/adr/ for decisions
4. Report: files found with summaries, existing slices, gaps

Do NOT generate any files. Reconnaissance only.

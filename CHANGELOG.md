# Changelog

## v1.1.0 (2026-04-23)

Docs, install, and template polish. No breaking changes to commands or workflow.

**Install**
- Published as an npm package — install with `npx slice-ninja init` (works in Claude Code CLI, VSCode extension, Cursor, Codex CLI, Gemini CLI)
- Added `.claude-plugin/` manifest so the repo also installs as a Claude Code terminal CLI plugin
- `init --dry-run` previews changes, `init --force` overwrites, `uninstall` removes

**Skill**
- New "Design principle" section in `SKILL.md`: docs are dual-purpose (human-readable + AI-parseable)
- Tightened "Template rules" — stable headers and fixed enums are called out as the schema
- `slice-deep.md`: split `Problem & goal` into `Problem` / `Goal` / `Success criteria` to match `slice-light.md` headers, so cross-slice AI parsing finds the same section names everywhere

**README**
- Per-block breakdown explaining what goes in each of the 5 blocks and why it earns its spot
- New "Docs that work for humans AND AI" subsection
- Dense prose paragraphs converted to bullets for scan-speed

## v1.0.0 (2026-04-22)

Initial public release.

- 8 slash commands: discover, map, light, deep, update, tests, backlog, check
- 7 templates: light slice, deep slice, slice map, ADR, test cases, backlog, context
- Auto-discovery of project context docs before generating
- Light/deep slice separation (prototype spec vs build spec)
- ADR embedded in deep slices, not separate files
- Notion-ready test case and backlog output
- Works with Claude Code, Claude.ai, Cursor, Codex CLI, Gemini CLI

# Slice Ninja 🥷

A Claude skill for designing and documenting software features as vertical slices using the **5-block compact framework**.

Built for small teams building complex, state-driven systems. Works with **Claude Code** (slash commands) and **Claude.ai** (paste context docs).

## What it does

Generates editable markdown files that plan features as vertical slices — each slice is a complete end-to-end feature (UI → API → DB → error handling) documented in 5 blocks:

| Block | Answers |
|---|---|
| **Outcome** | What problem? How do we know it's solved? |
| **Boundaries** | What's in, out, and non-negotiable? |
| **Design** | Flows, entities, state machines, invariants |
| **Delivery** | API contracts, decisions, fixed vs deferred |
| **Risk & Rollout** | What breaks? How do we ship safely? |

## The workflow

```
1. /slice-discover     → scan project for existing context docs
2. /slice-map          → identify all slices + dependencies
3. /slice-light N Name → quick scope per slice (prototype spec)
4. [manual]            → build frontend prototype, iterate
5. /slice-update N     → align docs with prototype changes
6. /slice-deep N Name  → full architecture + ADR (build spec)
7. /slice-tests N      → test cases for Notion tracking
   /slice-backlog N    → task breakdown (only if slice is large)
8. [manual]            → build real system against deep slice
```

Light slices are for **prototyping** — no API contracts, no data models.  
Deep slices come **after** the prototype validates the user flow.  
Slices should be **small** — small enough to skip backlogs most of the time.

## Install

Works with **any** Claude Code client (terminal CLI, VSCode extension, Cursor, Codex CLI, Gemini CLI). Pick whichever option fits.

### Option 1 — npx (recommended, works everywhere)

From your project root:

```bash
npx slice-ninja init
```

Copies `skills/slice-ninja/` and `slice-*.md` commands into `./.claude/`. Commit the folder so your team gets it automatically:

```bash
git add .claude
git commit -m "Add slice-ninja skill"
```

Other subcommands:

```bash
npx slice-ninja init --dry-run    # preview changes
npx slice-ninja init --force      # overwrite existing files
npx slice-ninja uninstall         # remove slice-ninja from .claude/
```

### Option 2 — manual copy

No Node.js required:

```bash
git clone https://github.com/anbehindY/slice-ninja.git
cp -r slice-ninja/skills/slice-ninja your-project/.claude/skills/
cp slice-ninja/commands/slice-*.md your-project/.claude/commands/
```

### Option 3 — Claude Code plugin (terminal CLI only)

> Requires the Claude Code terminal CLI. The VSCode extension, Cursor, and similar clients don't currently support `/plugin` — use Option 1 or 2 for those.

```
/plugin marketplace add anbehindY/slice-ninja
/plugin install slice-ninja@slice-ninja
```

Auto-updates on `/plugin marketplace update`. Commands are namespaced as `/slice-ninja:slice-light`, `/slice-ninja:slice-deep`, etc.

### Claude.ai (upload)

1. Download the [latest release](../../releases) zip file
2. Go to **Settings → Features → Skills**
3. Upload the zip

> Note: Claude.ai skills and Claude Code skills don't sync automatically. Install in both if you use both.

## Commands

| Command | Purpose | Arguments |
|---|---|---|
| `/slice-discover` | Scan project for context docs | — |
| `/slice-map` | Generate slice map with dependencies | `[optional focus]` |
| `/slice-light` | Light slice for prototyping | `<N> <Name>` |
| `/slice-deep` | Full architecture + ADR | `<N> <Name>` |
| `/slice-update` | Edit existing slice (preserves manual edits) | `<N> <what changed>` |
| `/slice-tests` | Generate test cases from deep slice | `<N>` |
| `/slice-backlog` | Task breakdown (larger slices only) | `<N>` |
| `/slice-check` | Readiness check (different for light vs deep) | `<N>` |

## File structure

After running the commands, your project gets:

```
docs/
├── slices/
│   ├── README.md              ← slice map
│   ├── slice-01-light.md      ← prototype spec
│   ├── slice-01-deep.md       ← build spec + ADR
│   ├── slice-02-light.md
│   └── ...
├── tests/
│   ├── slice-01-tests.md      ← copy to Notion
│   └── ...
└── backlogs/                   ← only when needed
    └── slice-01-backlog.md
```

## Sharing context with Claude.ai chat

For brainstorming in Claude.ai (not Claude Code):

| Session type | What to paste |
|---|---|
| Product brainstorming | Slice map + all light slices |
| Architecture discussion | Slice map + relevant deep slice + dependency deep slices |
| Implementation help | Deep slice + test cases |

Light slices are short enough (~30 lines each) to paste several at once.

## Philosophy

- **Design only what this slice needs.** Light pass for future slices.
- **Prototype before architecture.** Validate the flow, then design the system.
- **Every status field gets a state machine.** In deep dives. No exceptions.
- **Invariants are enforced, not documented.** If listed, it's in code + API + tests.
- **Failure-first.** Every flow has a failure branch.
- **Docs stay current.** Code changed? Update the slice doc immediately.
- **Keep it practical.** If the framework takes more time than building, cut ruthlessly.

## Who this is for

Small teams (1–5 developers) building complex systems — offline-first apps, sync-heavy backends, multi-role workflows, state-driven architectures. The framework is lightweight enough to maintain but structured enough to prevent architectural decisions from getting lost.

## Compatibility

Works with any tool that supports the `SKILL.md` format:

- ✅ Claude Code
- ✅ Claude.ai (via zip upload)
- ✅ Cursor
- ✅ Codex CLI
- ✅ Gemini CLI

## License

MIT — use it however you want.

## Contributing

Found a gap? Have a template improvement? PRs welcome.

1. Fork the repo
2. Make your changes
3. Test with Claude Code in a real project
4. Submit a PR with a description of what changed and why

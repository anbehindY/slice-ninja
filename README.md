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

### What each block does — and why it earns its spot

#### 1. Outcome
- **In it:** problem, one-sentence goal, testable success criteria
- **Why it's there:** gives every later decision something to measure against. No success criteria = no way to say "done."

#### 2. Boundaries
- **In it:** functional scope, non-functional requirements, hard constraints, and an **explicit out-of-scope list**
- **Why it's there:** the out-of-scope list is what saves you. Name what you're *not* building, or features creep.

#### 3. Design
- **In it:** user flows (happy path + failure branches), entities, state machines, invariants, cross-cutting concerns
- **Why it's there:** state machines kill bugs — write down the legal transitions and the illegal ones can't silently happen in prod. Failure branches answer "what if the network drops here?" during design, not at 2am on call.

#### 4. Delivery
- **In it:** API contracts (request, response, errors, retry), decisions with reasoning, **fixed-vs-deferred** table, linked ADRs
- **Why it's there:** locks the seam between planning and building. Fixed-vs-deferred lets you ship a lean v1 without forgetting what you punted.

#### 5. Risk & Rollout
- **In it:** risks with severity, mitigation, and **detection signal**; phased rollout with gates
- **Why it's there:** the detection signal is how you spot failures before your users do. Gates prevent "shipped everything Friday, paged all weekend."

### Docs that work for humans AND AI

Each file this skill writes is **dual-purpose**.

**Fast for humans to skim:**
- Short, stable headers
- Tables instead of prose
- Explicit out-of-scope lists and mandatory invariants
- A PM or new dev grasps any slice in under a minute

**Structured for AI to ingest:**
- Consistent section names across every slice
- Fixed enums: `LIGHT / DEEP`, `P0 / P1 / P2`, `H / M / L`
- Cross-references between slices and ADRs
- Claude re-reads existing docs before generating new ones — the format is the schema that makes this possible

Paste `docs/slices/CONTEXT.md` into any new chat and Claude picks up where you left off. The shape of each doc is load-bearing, not decorative.

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

From your project root:

```bash
npx slice-ninja init
```

**Works in any editor:** Claude Code (CLI + VSCode), Cursor, Codex CLI, Gemini CLI.

**Safe to re-run:**
- Adds `slice-ninja` alongside anything else in `.claude/`
- Skips files that already exist
- Use `--force` to overwrite

Commit the folder so your team gets the skill automatically:

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

**Small teams (1–5 developers)** building complex, state-driven systems:

- Offline-first apps
- Sync-heavy backends
- Multi-role workflows
- Anything where architectural decisions get lost in Slack threads

Lightweight enough to maintain. Structured enough to stop decisions from slipping through the cracks.

## Compatibility

Works with any tool that reads `.claude/skills/` and `.claude/commands/`:

- ✅ Claude Code (terminal CLI + VSCode extension)
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

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
**What goes in:** problem statement, one-sentence goal, testable success criteria.
**Why it matters:** gives every later decision something to measure against. Without explicit success criteria you can't tell when the slice is actually done — "looks right" becomes the bar, and scope creeps forever.

#### 2. Boundaries
**What goes in:** functional scope, non-functional requirements (performance, reliability), hard constraints, and an **explicit out-of-scope list**.
**Why it matters:** the out-of-scope list is the one that saves you. Features creep unless you name exactly what you're *not* building. The constraints line keeps the designer and the engineer honest about what can't be changed later.

#### 3. Design
**What goes in:** user flows (happy path + failure branches), entities with key fields, state machines for every status field, invariants, cross-cutting concerns.
**Why it matters:** state machines kill bugs — if you write down the legal transitions, the illegal ones can't silently happen in prod. Documenting failure branches forces you to answer "what if the network drops here?" during design, not at 2am in the on-call rotation.

#### 4. Delivery
**What goes in:** API contracts (request, response, errors, retry/idempotency), technical decisions with reasoning, a **fixed-vs-deferred** table, and linked ADRs.
**Why it matters:** the contract is the seam between planning and building — nailing it down keeps implementation faithful to the design. The fixed-vs-deferred split lets you ship a lean v1 without losing track of what you consciously punted (and why).

#### 5. Risk & Rollout
**What goes in:** risks with severity, mitigation, and **detection signal**; a phased rollout with gates between phases.
**Why it matters:** naming the detection signal means you'll actually notice the failure mode in prod instead of hearing about it from users. Rollout gates prevent the classic "shipped everything Friday, paged all weekend" — you only flip the next phase once the previous one is provably stable.

### Docs that work for humans AND AI

Each file this skill writes is **dual-purpose**:

- **Fast for humans to skim** — stable short headers, tables instead of prose, explicit out-of-scope lists, mandatory invariants. A PM or a new dev can land on any slice and grasp it in under a minute.
- **Structured for AI to ingest** — consistent section names across slices, fixed enums (`LIGHT / DEEP`, `P0 / P1 / P2`, `H / M / L`), cross-references between slices and ADRs. The skill itself re-reads the slice map, dependency slices, and ADRs before generating the next slice — the format is the schema that makes that possible. Paste `docs/slices/CONTEXT.md` into any new chat and the AI picks up where you left off.

That's why the templates look the way they do (tables, checkboxes, fixed statuses) rather than free-form prose — the shape of each doc is load-bearing, not decorative.

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

Works in any editor (Claude Code terminal CLI, VSCode extension, Cursor, Codex CLI, Gemini CLI). Safe to run whether or not `.claude/` already exists — it adds `slice-ninja` alongside anything else you've got and skips files that are already there. Pass `--force` to overwrite.

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

Small teams (1–5 developers) building complex systems — offline-first apps, sync-heavy backends, multi-role workflows, state-driven architectures. The framework is lightweight enough to maintain but structured enough to prevent architectural decisions from getting lost.

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

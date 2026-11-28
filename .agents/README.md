# .agents - shared project memory for AI agents

Versioned, tool-neutral memory of Equinox. `AGENTS.md` (repo root) is the entry point and holds the binding rules; this tree holds the knowledge and the procedures. Everything versioned here is current-state, English, free of personal data and of machine-specific paths.

## Layout

| Path | Content | Budget |
|------|---------|--------|
| `context/principles.md` | Binding product, architecture and process rules of the maintainers | 80 lines |
| `context/project.md` | What the project is, related repositories, versions, dependencies, conventions | 80 lines |
| `context/architecture.md` | Verified code map, "where do I change X", large files | 300 lines |
| `context/pitfalls.md` | Durable traps by theme | 150 lines |
| `context/decisions.md` | Adopted and rejected approaches, and why | 150 lines |
| `context/data-contract.md` | VT and SmartPI attributes the card reads, paths, fallbacks, version handling | 300 lines |
| `context/ui-patterns.md` | Rendering, charts, colors, translations of the card UI | 300 lines |
| `workflows/` | task-lifecycle, develop, testing, release, delegation, memory-maintenance | |
| `templates/` | plan, handoff, review | |
| `scripts/check_memory.py` | Consistency check (paths, symbols, budgets, privacy, profiles, local tier) | |
| `scripts/gen_profiles.py` | Generates the `equinox-*` agent profiles for Claude and Codex from one list | |
| `local/` | Short-term memory, gitignored, one folder per task | |

## The two memory tiers

| | Long-term (`context/`) | Short-term (`local/tasks/<task-slug>/`) |
|---|---|---|
| Versioned | yes, shared with all developers | no, local to one checkout |
| Content | current truths useful to future, different tasks | plan, findings, dead ends, measurements, resumption state |
| Lifetime | until the code changes | the task; deleted at close |
| Written by | the agent that changed the code, at task end | any agent, during the task |

Admission test, promotion step and pruning rules: `workflows/memory-maintenance.md`.

## Conventions

- Code references are backticked repo-relative paths, optionally `path::Symbol`; `check_memory.py` verifies they exist.
- Other repositories are named, never referenced by a local path.
- No dates, issue or pull-request numbers, plan or review identifiers, people names, URLs or entity ids of real installations.

# AGENTS.md - Equinox

Instructions for any AI coding agent (Claude Code, Codex, Copilot, others) working in this repository. They are meant to be sufficient on their own. Deeper knowledge lives in `.agents/` (versioned, shared memory). Answer in the language the user writes in; code, comments, commit messages and `.agents/` are in English.

## What this is

Equinox is a Home Assistant dashboard (Lovelace) card, written in TypeScript with Lit and built with Vite, that shows the regulation of Versatile Thermostat (VT) thermostats driven by the SmartPI plugin or by TPI. The built bundle `dist/equinox-card.js` is committed. It reads attributes published by VT and by the SmartPI plugin (separate repositories) and draws history through the `@kipk/ha-better-history` library (separate repository).

## Start of a session: what to read

Always read `.agents/README.md` (index) and `.agents/context/principles.md` (binding rules). Then, by task:

| Task | Read |
| --- | --- |
| Any code change | `workflows/task-lifecycle.md`, `workflows/develop.md`, `context/architecture.md`, `context/pitfalls.md` |
| Card data, attributes read from VT or SmartPI | `context/data-contract.md` |
| UI, charts, colors, UI translations | `context/ui-patterns.md` |
| Bug analysis | `context/pitfalls.md`, then the `equinox-debugger` profile |
| Tests | `workflows/testing.md` |
| Release | `workflows/release.md` |
| Past choices (do not re-propose rejected ideas) | `context/decisions.md` |
| Which sub-agent to use | `workflows/delegation.md` (`equinox-*` profiles) |
| Finishing any task | `workflows/memory-maintenance.md` |

Load only what the task needs: grep and partial reads.

## Hard rules

1. **No hallucination.** Every claim rests on code, docs, observed data or a demonstrable argument; mark the rest "unverified". When a decision is not certain, stop and ask.
2. **Plan first.** A non-trivial task starts with a written plan (`.agents/templates/plan.md`) in the local task folder, validated by the user before any code. Trivial tasks get a three-line plan in the conversation. See `workflows/task-lifecycle.md`.
3. **Read-only consumer.** The card only reads what VT and SmartPI publish; it never computes regulation itself. Every attribute it reads is listed in `context/data-contract.md`; a change on the producer side is reflected there.
4. **Quality, no shortcuts.** Simple, readable code; English comments and docstrings that explain why. Fix root causes: no swallowed errors, special-case flags, test-only branches, duplicated logic. Think about rendering cost: no heavy work on every `hass` update that does not depend on the entities that changed, bounded history fetches, subscriptions and timers released when the element is disconnected. Details: `workflows/develop.md`.
5. **Stay in scope.** Change only what the task needs; do not fix other things unasked. Re-read every diff you produced. Always `git --no-pager`.
6. **No commits.** Never commit, push, tag or publish unless the user expressly asks. After a change, give a brief English commit message (no links, no file paths).
7. **Tests.** targeted test files first (`workflows/testing.md`). Long runs go in the background: wait for the completion notification, never poll a running job.
8. **Docs.** Documentation describes the current state only, as if never published (no "new/now/fixed/changed" wording). After a user-visible change update the README and the docs.
9. **No private context in the repository.** Code, comments, docs, tests and `.agents/` never mention plans, phases, review identifiers, personal names, credentials, URLs of private systems, real entity ids or machine-specific paths.
10. **Cost discipline.** Cheapest adequate model per sub-task, tight briefs, short reports, a fresh sub-agent per task (`workflows/delegation.md`).

## Commands

```bash
npm run build                                   # vite build -> dist/equinox-card.js (committed; Node 24)
npm run test:smartpi                            # SmartPI dashboard tests (Node test runner)
npm run test:tpi                                # TPI dashboard tests
node node_modules/typescript/bin/tsc --noEmit   # typecheck
# Where npm shims are not executable: node node_modules/vite/bin/vite.js build
python3 .agents/scripts/check_memory.py   # memory consistency check
git --no-pager status --short ; git --no-pager diff --stat
```

## Repository map (short)

- `src/equinox-card.ts`, `src/equinox-card-editor.ts`: Lovelace element and visual editor; `src/components/eq-main-card.ts` is the main card and owns every dialog.
- `src/components/eq-regulation-{dialog,renderer}.ts`: Regulation dialog and the generic dashboard renderer.
- `src/data/`: pure logic (config validation, climate and VT view models, actions, dashboard resolver/loader/values); `src/data/dashboards/regulation/*.json` are the built-in `smartpi`, `tpi` and `hysteresis` dashboards.
- `src/localize/languages/*.json`: UI translations (20 languages, `en` fallback); `src/styles/`: flat and Liquid Glow styles.
- `tests/`: Node tests and `tests/fixtures/smartpi-diagnostics-paths.json` (published SmartPI paths); `docs/regulation-dashboard.md`: user schema reference.
- `dist/equinox-card.js`: committed bundle, rebuilt per branch; `.github/workflows/`: build, HACS validation, draft release on tag. Full map: `.agents/context/architecture.md`.

## Two memory tiers

- **Long-term, versioned**: `.agents/context/` - the current truth about the project, shared with every developer. A fact enters it only if it passes the admission test of `workflows/memory-maintenance.md`.
- **Short-term, local, never versioned**: `.agents/local/tasks/<task-slug>/` with `plan.md`, `notes.md`, `handoff.md`. Work in progress, findings, dead ends, resumption state. Deleted when the task closes, after promoting the few durable facts.

Every task ends with the checklist of `workflows/memory-maintenance.md` and a line "memory: updated X" or "memory: nothing to update because ...".

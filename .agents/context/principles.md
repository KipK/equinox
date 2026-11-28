# Principles (binding)

Rules stated by the maintainers. An agent that finds a task conflicting with one of them stops and asks. The user may waive a rule for one task; it applies again once that task is done.

## Architecture

- **Read-only consumer.** The card only reads what VT and SmartPI publish; it never computes regulation itself. Every attribute it reads is listed in `context/data-contract.md`; a change on the producer side is reflected there.
- **Regulation views are data.** What the Regulation dialog shows is a JSON dashboard (`src/data/dashboards/regulation/`) drawn by the generic renderer `src/components/eq-regulation-renderer.ts`; a new algorithm or field is a JSON change, and renderer changes stay algorithm-neutral.
- **Attribute paths live in one layer.** Fallback chains for climate and VT attributes are in `src/data/` (`climate-state.ts`, `vt-state.ts`), plugin diagnostics paths in the dashboard JSON; components consume the view model or the dashboard. Exceptions: the sensor more-info dialog (VT power and valve paths) and the humidity reads of the history dialog and main card; do not add more.
- **One self-contained bundle.** Translations, units and built-in dashboards are compile-time imports in `dist/equinox-card.js`; the only runtime import is the user's optional custom dashboard file.
- **One mechanism per job.** Reuse the existing module or helper instead of a parallel path doing the same thing.

## Code quality

- Simple, readable code that a non-specialist can follow. Clear names, small functions, early returns.
- English comments and docstrings on public functions, classes and components; they explain intent and constraints, not history.
- Elegant solutions only: fix the root cause; no shortcut taken because it is easier (swallowed errors, special-case flags, test-only branches, copy-paste, sleeps to dodge races).
- Think about rendering cost: no heavy work on every `hass` update that does not depend on the entities that changed, bounded history fetches, subscriptions and timers released when the element is disconnected.
- Types on new code; named constants, no magic numbers.

## Process

- Plan before coding; the user validates the plan of a non-trivial task (`workflows/task-lifecycle.md`).
- Proceed step by step; validate each step before the next.
- Change only what the task requires; re-read the diff after each edit.
- No commit, push, tag or publish without an express request.
- Evidence before claims: say what was verified and how; mark the rest "unverified".
- Token economy: grep and partial reads, the cheapest adequate sub-agent, concise answers.

## Documentation

- Docs describe the current state only, as if never published; only release notes and the changelog list changes.
- A user-visible change updates the README and the docs in the same change set.

## Repository hygiene

- Nothing private or install-specific in versioned files: no plan or review references, people names, credentials, private URLs, real entity ids, absolute or machine paths.
- Commit messages are brief, informative, in English, without links or file paths.

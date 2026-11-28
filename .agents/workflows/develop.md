# Develop

Rules for changing the card. Task steps are in `task-lifecycle.md`; architecture answers in `context/principles.md`.

## Stack and commands

- TypeScript (strict, `noUnusedLocals`, `noUnusedParameters`), Lit 3, Vite 8, TypeScript 7 compiler. Source in `src/`, bundle `dist/equinox-card.js`.
- Use Node 24. Where package-manager shims are not executable, call the tools through node:
  - build: `npm run build` or `node node_modules/vite/bin/vite.js build`
  - typecheck: `node node_modules/typescript/bin/tsc --noEmit`
  - tests: `workflows/testing.md`
- Dependencies are `lit`, `@kipk/ha-better-history`, `@kipk/load-ha-components`. Adding a dependency or changing `package.json` or `package-lock.json` needs the user's agreement; a local link to the history library must never leak into those files.

## Where code goes

Follow the table "Where do I change X" in `context/architecture.md`. In short:

- Pure logic (reading attributes, normalizing config, formatting) in `src/data/`, typed, no DOM; components in `src/components/`; shared types in `src/types/`.
- A new thing the Regulation dialog shows is JSON first, renderer code only when no existing block can express it. A renderer change is generic: no per-algorithm or per-path branch in `eq-regulation-renderer.ts` (the list of services needing confirmation, `DESTRUCTIVE_ACTION_SERVICES`, is the one exception).
- A new attribute read from VT or a plugin: one reader function with the fallback chain, an entry in `context/data-contract.md`, and a test payload.
- One mechanism per job: reuse `readRegulationSourceValue`, `asNumber`/`asString`, `localize`, `normalizeCssLength`, `eq-dialog` instead of writing a second path.

## How code is written

- Early returns, small functions, named constants for thresholds and sizes, English comments that explain why.
- Types on new code; no `any`. Unknown input from Home Assistant is `unknown` and narrowed through the helpers in `src/data/format.ts`.
- Treat `undefined`, `null`, `"unknown"` and `"unavailable"` as "no value". Keep `0` and `false`.
- Do not mutate `hass`, entity states or the config object received from Home Assistant; copy first.
- Styles: tokens from `src/styles/flat.ts`, Home Assistant variables with fallbacks, `:host([light])` for light mode, no `prefers-color-scheme` (`context/ui-patterns.md`).
- UI text: add the key to `en.json` and `fr.json` (other languages fall back to `en`); dashboard text goes in the dashboard's own `translations` (`fr` and `en`).
- Errors: surface a short UI state or console message with context; never an empty `catch`.

## Performance

- `hass` changes on every state change of the instance. Anything derived from `hass` that does not depend on the card's entities must not run on each update: compare the relevant entity objects, or cache by a key (see the history config cache in `eq-history-dialog.ts` and `eq-regulation-renderer.ts`).
- History fetches are bounded: default ranges are 24 h, a longer range is opt-in.
- Dashboards and dialogs load on demand (menu or dialog open), not at card construction.
- Release what you hold: listeners on `window` or `document` added in `connectedCallback` are removed in `disconnectedCallback` (see `popstate` in `eq-main-card.ts`), timers are cleared, observers disconnected (`eq-dialog.ts`).

## Before handing over

1. Typecheck, the targeted tests, then both dashboard test files; fix everything you caused.
2. Rebuild the bundle when `src/` changed (`dist/equinox-card.js` is committed per branch) and report that it changed.
3. Update in the same change set: `docs/regulation-dashboard.md` (dashboard features), `README.md` (user-visible options), `CHANGELOG.md` (top section while its version is unreleased; past sections stay untouched), `context/data-contract.md` for any attribute change.
4. Documentation and comments describe the current state: no "new", "now", "fixed", "no longer" outside `CHANGELOG.md`.
5. No private context: no plan or review identifiers, people names, real entity ids (use `climate.living_room`, `sensor.living_room_diagnostics`), URLs of private systems, machine paths.
6. Re-read the whole diff, then run `python3 .agents/scripts/check_memory.py`.
7. Give a brief English commit message without links or file paths; do not commit unless asked.

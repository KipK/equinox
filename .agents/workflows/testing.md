# Testing

## Commands

Run from the repository root with Node 24 (module hooks and `stripTypeScriptTypes` are required):

```bash
npm run test:smartpi    # node --test --test-isolation=none tests/smartpi-dashboard.test.mjs
npm run test:tpi        # node --test --test-isolation=none tests/tpi-dashboard.test.mjs
node --test --test-isolation=none tests/<file>.test.mjs --test-name-pattern="<part of a test name>"
```

Where package-manager shims are not executable, call `node --test --test-isolation=none tests/<file>.test.mjs` directly. There is no combined script and no lint script; typecheck is `node node_modules/typescript/bin/tsc --noEmit`.

Run the targeted file first, then both files. The suites are short; a build (`npm run build`) is the next check when `src/` changed. If any run turns out long, start it as a background task and wait for the completion notification; never poll it.

## Layout

| Path | Content |
| --- | --- |
| `tests/smartpi-dashboard.test.mjs` | SmartPI dashboard: published-path bindings, documentation examples, translations, section behavior, `vt-state` calibration message |
| `tests/tpi-dashboard.test.mjs` | TPI dashboard: registration and validity, actions, learning section, coefficient grids, learning graph |
| `tests/fixtures/smartpi-diagnostics-paths.json` | Snapshot of the SmartPI published paths (`live` dotted paths, `history` leaves, `source` provenance) |

## How the tests work

- A `registerHooks` preamble (copied at the top of each file) resolves `.js` imports to `.ts`, strips types from `.ts` files and wraps `.json` imports, so the real sources and the real dashboard JSON are imported without a bundler or a test dependency.
- Tests instantiate `EquinoxRegulationRenderer` or `EquinoxRegulationDialog` directly, set `hass`, `config`, `dashboard`, `language`, `activeSectionId`, and call private methods (`_conditionMatches`, `_betterHistoryConfig`, `_formatSourceValue`, `_renderItem`). Lit templates are inspected as data (`templateText` flattens them); no browser is involved.
- Helpers to reuse: `renderer(live, mode)` (builds a renderer with a climate entity and a diagnostics entity; it asserts the live payload only uses published paths), `section(id)`, `walk(value)` (iterate every node of a JSON tree), `assertPublished(path)`, `assertBindings(value)`.
- Payloads are partial and realistic: build only the live blocks a test needs, with the plugin's real value types and enum strings.

## What to test

- A dashboard change: bindings exist in the fixture, translation keys used equal translation keys defined (`fr` and `en`), condition behavior with present, absent, zero and `false` values, unknown enum code fallback, and `null` staying `--`.
- A new formatter or block field: renderer methods with a normal value, zero, `null`, a non-numeric value, and the fallback.
- A producer change: refresh the fixture first (`context/data-contract.md`), then adapt the dashboard until the binding test passes.
- A `vt-state.ts` or `climate-state.ts` change: call `buildVtViewModel` / `buildClimateViewModel` with attributes for each thermostat type (switch, valve, climate with valve regulation) and with none.
- A new algorithm dashboard: a new test file named `tests/<algorithm>-dashboard.test.mjs` and an `npm run test:<algorithm>` script, modeled on the TPI file.
- What is not covered: painting, theme appearance, dialog stacking in popups, Back button behavior. Say so in the report and ask for a check in Home Assistant when a change touches them.

## Rules

- Fix the cause of a failing test; never weaken an assertion or delete a test to pass.
- Do not call a producer or Home Assistant from tests; use payloads.
- A regression test names the behavior, not the history of the bug.

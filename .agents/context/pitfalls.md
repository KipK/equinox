# Pitfalls

Durable traps that cost time and will bite again. One bullet each, by theme. Remove a bullet when the code no longer has the trap.

## Build and dependencies

- `npm run build` runs `vite build` only. The `.js.gz` copy comes from the separate script `npm run gzip:dist`; the build output folder holds a single file, and the release workflow checks only `dist/equinox-card.js`. `dist/equinox-card.js.gz` is neither versioned nor ignored: never stage it.
- `dist/equinox-card.js` is committed and rebuilt on every branch. Never resolve a conflict on it by merging: rebuild it from the merged sources.
- `@kipk/ha-better-history` may be a local `npm link` symlink during development. `npm install` replaces the symlink with the registry copy; rebuild the library, check the link, then build the card. `package.json` and `package-lock.json` must not change because of the link (CI resolves the package from the registry).
- `vite.config.ts` dedupes `lit`, `lit-html`, `@lit/reactive-element` and `@kipk/load-ha-components`. A linked package otherwise resolves its own copy and the bundle carries two Lit runtimes.
- The history library must be used through the private tag `equinox-better-history` (`src/const.ts::HISTORY_TAG`, registered in `src/equinox-card.ts`). Rendering the library's default tag races with other cards that bundle another build.
- `ensureHaComponents` loads only the elements listed in `src/ha/load-components.ts` (editor form controls, `ha-dialog`, sliders, pickers). The card UI is built from native elements and `eq-dialog`; do not rely on another Home Assistant element being reachable from a custom card without adding and testing it there.

## Regulation dashboards (JSON)

- `visible_if`: an unknown operator evaluates to true (the item stays visible), equality is strict, and `0` is falsy. A bare `{"var": ...}` hides a legitimate zero; compare explicitly. A condition on a missing path sees `undefined`.
- Status `map` keys are strings: a boolean is matched by `"true"` / `"false"`; a number by its string form. `"unknown"` and `"unavailable"` count as missing and never reach the map.
- A nested `layout_grid` with its own `min_width` directly under a `stretch_items: false` parent also receives the parent's child width rule, so the pair can collapse to one status width. Keep side-by-side pairs at section level.
- `readRegulationSourceValue` addresses the entity object when the path starts with `state`, `attributes` or `entity_id`; any other path is read from the attributes first, then from the entity object. An attribute named like one of those three words is unreachable through a bare path.
- A dashboard test requires every `*_key` used in the JSON to exist in both `fr` and `en` and every defined key to be used. Add and remove translation keys together with their use.
- Documentation JSON examples in `docs/regulation-dashboard.md` are parsed by the SmartPI test: they must be valid JSON and name only published paths. Backticked `live/...` and `history/...` paths in that file are checked too (use `...` or `*` to opt out of a pattern).
- Block types are whitelisted twice: `isDashboardItem` in `src/data/regulation-dashboard-loader.ts` and the renderer `switch`. A new type needs both, or the dashboard is rejected as invalid.
- Custom dashboards are imported once per page load and cached by `custom:<algorithm>` (`clearRegulationDashboardCache` has no caller). Editing the user file needs a page reload, and the browser may cache the module.
- The same dashboard can be shown for several thermostats: nothing in the JSON may name a real entity id; use the source tokens.

## SmartPI diagnostics

- Current values are only under `live/`, chart values only under `history/`; a path not in `tests/fixtures/smartpi-diagnostics-paths.json` fails the test, so update the fixture and the dashboard together.
- The publisher's own path fixture is incomplete for the room-model quiet-period fields and publishes a HEAT snapshot of the dead-time paths; the Equinox fixture adds the missing ones by hand. The `source.note` of the fixture lists them: keep it accurate.
- The `calibration/interruptions` value is a list; the test strips the index when checking a path such as `calibration/interruptions/0/reason`.
- Calibration states are lowercase plain words; a comparison written against a capitalized state silently shows the calibration message on every SmartPI thermostat (`src/data/vt-state.ts::isSmartPiCalibrationActive` compares without case).
- A SmartPI field removed by the plugin must be removed from the JSON together with its translations and its tests: a stale binding renders `--` forever and the key-usage test then fails on the orphan label.
- History leaves are only those the plugin records (17). Never rebuild a historical curve from a live value, and never invent a leaf path: ask the producer for it.

## Home Assistant integration

- VT publishes power and valve values both at the attribute root and under a namespaced block; history exports may contain only the root path. A chart that selects only the namespaced path can render as a flat line of the live value. See the three candidate paths in `src/components/eq-sensor-more-info-dialog.ts`.
- Parent popup containers (browser_mod, Bubble Card) clip normal absolutely positioned dialogs; dialogs must use the native popover path of `eq-dialog.ts`.
- Closing a dialog by `history.back()` can consume the parent popup's or dashboard's own navigation entry; the card clears its marker with `replaceState` for history, schedule and sensor dialogs. The Regulation dialog unwinds the entries it pushed with `history.go(-depth)`.
- Themes may write `--ha-card-border-width: 0` (no unit): inside `calc()` it invalidates the declaration and the glow insets collapse. Normalize first (`src/data/css-length.ts`).
- The schedule dialog embeds the ha-chauffage card created once per entity; recreating it drops unsaved week edits, so `hass` is forwarded to the same instance. Only its documented card contract (`chauffage-programme-card`, `setConfig({thermostats: [entity]})`, then `hass`) is used; its module is loaded globally by that integration and must never be imported or bundled.
- `hass.locale.language` may carry a region (`fr-FR`): every language lookup normalizes to the first segment (`localize`, `translateRegulationDashboardText`).
- Per-mode customization maps keyed by user text: `__proto__` and similar keys must be set with `Object.defineProperty` on a normal object (`src/data/mode-customizations.ts`), because Home Assistant calls `hasOwnProperty` on emitted config objects.

## Tests and tooling

- The tests load the TypeScript sources through `node:module` hooks and `stripTypeScriptTypes`: they need a Node version that provides both (24, as the build workflow uses).
- Run test files with `--test-isolation=none`, as the package scripts do.
- The tests exercise renderer methods and Lit templates without a browser; final appearance of Flat and Liquid Glow needs a check in Home Assistant.

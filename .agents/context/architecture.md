# Architecture

## Data flow

1. Home Assistant sets `hass` on `src/equinox-card.ts::EquinoxCard` (the Lovelace element) and calls `setConfig`.
2. `setConfig` validates and normalizes the config (`src/data/config.ts::validateEquinoxConfig`, defaults in `src/types/config.ts::DEFAULT_CONFIG`). An error key is rendered as a localized message instead of the card.
3. `willUpdate` builds the view model (`src/data/climate-state.ts::buildEquinoxViewModel`): `climate` (standard attributes) and `vt` (Versatile Thermostat extras, `src/data/vt-state.ts::buildVtViewModel`, undefined for a plain climate). Types in `src/types/view-model.ts`, `src/types/vt.ts`.
4. `EquinoxCard` renders `src/components/eq-main-card.ts::EquinoxMainCard` with `hass`, `config`, `viewModel`. That component owns every dialog; each dialog is a separate element receiving `hass`, `config`, `viewModel` and `language` and closing through the `eq-dialog-close` event.
5. Actions call Home Assistant through `src/data/actions.ts`, which checks lock and capability before `hass.callService`.

## Module map

| Path | Role |
| --- | --- |
| `src/equinox-card.ts` | Element registration (`equinox-card`), `window.customCards` entry (the only inlined translation, `CARD_DESCRIPTIONS`), grid options, calls `defineHaBetterHistory(HISTORY_TAG)` at import |
| `src/equinox-card-editor.ts` | Visual editor; emits `config-changed`; loads HA form components through `src/ha/load-components.ts::ensureHaComponents` |
| `src/const.ts` | Tags (`CARD_TAG`, `HISTORY_TAG`, `EDITOR_TAG`) and default option values |
| `src/components/eq-main-card.ts` | Main card (4500+ lines): three layouts, setpoint controls, state icons, gauge, dialog state machine (`_activeDialog`), browser history integration, Regulation loading |
| `src/components/eq-dialog.ts` | Reusable dialog shell (native popover top layer when available, fixed-position fallback, full screen on mobile) used by the hvac, preset, fan, swing, boost, temperature, auto start/stop, menu, sensor more-info and regulation dialogs |
| `src/components/eq-{hvac,preset,fan,swing,boost,temperature,auto-start-stop,lock,menu,sensor-more-info}-dialog.ts` | One dialog each. `eq-menu-dialog.ts` is the entry menu (history, schedule, boost, Regulation sections); `eq-lock-dialog.ts` draws its own overlay without `eq-dialog` |
| `src/components/eq-history-dialog.ts`, `eq-schedule-dialog.ts` | Use `ha-dialog`: history wraps `<equinox-better-history>`; schedule embeds the ha-chauffage card (`src/data/chauffage-schedule.ts`) |
| `src/components/eq-regulation-dialog.ts` | Regulation dialog: desktop side navigation, mobile full-screen section menu; single-section dashboards collapse to one column |
| `src/components/eq-regulation-renderer.ts` | Renders one section of a `RegulationDashboard`: block types, formatting, `visible_if`, history graphs, action buttons |
| `src/data/regulation-dashboard-{resolver,loader,values,i18n}.ts` | Choose the dashboard, load and validate it (cached per `source:algorithm`), read values by path, translate its texts |
| `src/data/dashboards/index.ts` + `dashboards/regulation/*.json` | Built-in dashboards by algorithm name |
| `src/types/regulation-dashboard.ts` | Dashboard schema types (version 1) |
| `src/data/{actions,climate-modes,mode-customizations,colors,format,css-length,navigation,fan}.ts` | Services, mode order/icons/tones, per-mode label/icon/tone/visibility overrides, tone names, number/string coercion, theme length normalization |
| `src/data/{attribute-units.ts,attributes.json}` | Attribute to unit map handed to the history component |
| `src/styles/{base,flat,liquid-glow}.ts` | Style modules; `flat.ts` defines the design tokens, `liquid-glow.ts` is layered on top |
| `src/localize/` | `localize(language, key, replacements)`, `languages/*.json` (20 languages) aggregated by `src/localize/languages/index.ts`, loaded synchronously at import by `loader.ts` |
| `tests/` | Node test files, `tests/fixtures/smartpi-diagnostics-paths.json` |
| `scripts/dedupe-translations.mjs`, `scripts/gzip-dist.mjs` | Translation key cleanup; precompressed copy of `dist/` files (not part of `npm run build`) |

## Where do I change X

| Change | Where |
| --- | --- |
| A card option | `src/types/config.ts` (type, default), `src/data/config.ts` (validation), `src/equinox-card-editor.ts` (control), `src/localize/languages/en.json` and `fr.json` (labels), `README.md` |
| Something the main card shows from a VT attribute | `src/data/vt-state.ts` and `src/types/vt.ts`, then the render method in `eq-main-card.ts`; document the path in `context/data-contract.md` |
| A value, status, graph or action in the Regulation dialog | The dashboard JSON in `src/data/dashboards/regulation/`, both `fr` and `en` translations, `docs/regulation-dashboard.md`, the matching test |
| A new block type or formatter field | `src/types/regulation-dashboard.ts`, `isDashboardItem` in the loader (block types are whitelisted), `eq-regulation-renderer.ts`, `docs/regulation-dashboard.md` |
| A new built-in algorithm dashboard | JSON file, import and entry in `src/data/dashboards/index.ts` (the key is the normalized algorithm name), a test file, `docs/regulation-dashboard.md` |
| Unit or axis of a history series | `src/data/attributes.json` |
| UI text | `src/localize/languages/<lang>.json`; `en` is the fallback for a missing key |
| Mode order, icon, tone | `src/data/climate-modes.ts`, `src/data/colors.ts`, `src/data/mode-customizations.ts` |
| Theme look | `src/styles/flat.ts` (tokens), `src/styles/liquid-glow.ts`, component styles in the component file |
| Dialog open/close and browser Back behavior | `eq-main-card.ts` (`_browserHistoryState`, `_handleBrowserPopState`, `_open*`/`_close*Dialog`) |

## Regulation dashboard pipeline

- `eq-main-card.ts::_ensureRegulationDashboard` resolves (`resolveRegulationDashboard`) and loads (`loadRegulationDashboard`) on demand (menu or dialog open), keyed by mode, source and algorithm; a key change resets the active section.
- Menu entry: `_regulationMenuAvailable` is true for `custom`, and for `auto` only after a dashboard loaded.
- `eq-regulation-dialog.ts` picks the section; `eq-regulation-renderer.ts` renders `section.items` recursively (`layout_grid` nests). Block types: `hero_status`, `value`, `metric_grid`, `status`, `progress`, `text`, `section_note`, `history`, `action`, `layout_grid`.
- `history` blocks build a `BetterHistoryConfig` (cached per config key) and render `<equinox-better-history>`.
- Full schema for users: `docs/regulation-dashboard.md`; field-level semantics (multipliers, `divide_by`, prefix maps, conditions) in `context/ui-patterns.md`.

## History component

- `@kipk/ha-better-history` is bundled; the card registers it under its own tag `equinox-better-history` so another card bundling another build cannot collide. Never render the library's default tag.
- `eq-history-dialog.ts` configures default entities (climate, diagnostics entity, power, humidity unless the climate has its own, temperature entity), cached by a key of the involved entity ids and language; `debugPerformance` stays false.
- Attribute units come from `src/data/attribute-units.ts::equinoxAttributeUnits` (static import, resolved synchronously).

## Large files (grep, never read whole)

| File | Lines |
| --- | --- |
| `src/data/dashboards/regulation/smartpi.json` | about 4900 |
| `src/components/eq-main-card.ts` | about 4500 |
| `src/components/eq-regulation-renderer.ts` | about 1350 |
| `src/styles/liquid-glow.ts` | about 600 |
| `docs/regulation-dashboard.md` | about 1300 |

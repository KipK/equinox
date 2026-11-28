# Project facts

## Identity

- Home Assistant Lovelace custom card `custom:equinox-card` (tag `equinox-card`), distributed through HACS / the Home Assistant Marketplace as a dashboard (`plugin`) repository. `hacs.json` names the bundle file and holds the minimum Home Assistant and HACS versions.
- TypeScript, Lit 3, Vite; one ES module bundle `dist/equinox-card.js`, committed (`vite.config.ts`: lib mode, entry `src/equinox-card.ts`). Translations, attribute units and the built-in regulation dashboards are imported at compile time and live inside the bundle; nothing is fetched at runtime except an optional user dashboard file.
- Version: `package.json` `version` (mirrored in `package-lock.json`); release notes in `CHANGELOG.md`. The card has no version string in code.
- No test framework dependency: tests are Node test files using Node's built-in runner (`tests/`).

## What the card shows

- Main card for a `climate.*` entity: setpoint, HVAC mode, preset, fan and swing, state icons, power or valve gauge. Three layouts (`display_mode`: `classic`, `compact`, `thin`) and two themes (`flat`, `liquid_glow`).
- Dialogs opened from the card: history (`@kipk/ha-better-history`), sensor more-info, HVAC, preset, fan, swing, boost, lock, auto start/stop, schedule (embeds the ha-chauffage card), and the Regulation dialog.
- Regulation dialog: a declarative dashboard (JSON) per regulation algorithm, rendered by `src/components/eq-regulation-renderer.ts`. Built-in dashboards: `smartpi`, `tpi`, `hysteresis` (`src/data/dashboards/regulation/`). A user can supply its own with `additional_dashboards: custom`. Schema reference for users: `docs/regulation-dashboard.md`.
- The card works with plain Home Assistant climate entities; Versatile Thermostat (VT) extras appear when VT attributes exist (`src/data/vt-state.ts`).

## Related repositories (named, never referenced by path)

| Repository | Relation |
| --- | --- |
| `versatile_thermostat` | Publishes the climate attributes and, for TPI, the Auto TPI learning sensor. |
| `vtherm_smartpi` | SmartPI plugin: publishes the diagnostics entity the SmartPI dashboard reads, and the `vtherm_smartpi.*` services. Its published-path fixture and its diagnostics documentation are the source of truth for `tests/fixtures/smartpi-diagnostics-paths.json`. |
| `vtherm_hysteresis` | Hysteresis plugin: publishes `specific_states.hysteresis`. |
| `ha-better-history` | History chart web component, npm package `@kipk/ha-better-history`, bundled into the card. |
| `load-ha-components` | npm package `@kipk/load-ha-components`, loads HA frontend components lazily. |
| `ha-chauffage` | Optional integration whose schedule card the Schedule dialog embeds. |

## Branch lines

- Each branch line follows one generation of the SmartPI diagnostics contract; a card feature is written on the main line, then ported to the other lines. The built bundle is rebuilt and committed on each branch, never merged (it conflicts and must match the branch sources).
- This line follows the SmartPI 1.0 diagnostics: eight sections, no feed-forward wall power (`feedforward/wall_power_percent`), no emitter-lag tab (`context/data-contract.md`).

## Conventions

- Code, comments, docs, commit messages and this memory: English. UI text: 20 languages in `src/localize/languages/*.json`; embedded dashboards carry their own `fr` and `en` translations.
- Attribute paths: dashboard JSON uses `/` (`.` is also accepted, `src/data/regulation-dashboard-values.ts::normalizeRegulationPath`); the unit map `src/data/attributes.json` uses `.`.
- User documentation: `README.md`, `docs/regulation-dashboard.md`, `CHANGELOG.md`; no other languages.

# Decisions

Adopted and rejected approaches with the reason. Do not re-propose a rejected idea without new evidence. Delete an entry when the code no longer reflects it.

## Adopted

| Decision | Why |
| --- | --- |
| The card is a read-only consumer: it formats what VT and the plugins publish and never recomputes regulation values (Ti, ratios from raw counts, percentages from counts) | One source of truth; a recomputation drifts from the producer. Show the published value; `null` stays `--` |
| Regulation views are declarative JSON dashboards (schema version 1) rendered by one generic renderer, plus a user file for custom dashboards | A new algorithm needs a JSON file and tests, not new components. New formatter fields are optional additions that leave existing dashboards unchanged, so the schema version does not move |
| Built-in dashboards, translations and attribute units are static imports in the single bundle | Synchronous lookup, no fetch, no race at first render, one file for HACS |
| The diagnostics entity is discovered from `specific_states.regulation_diagnostics` of the climate entity; the `diagnostic_entity` option is only a legacy fallback and the editor does not write it | Switching the thermostat's algorithm switches diagnostics without reconfiguring the card |
| One SmartPI dashboard per contract line, requiring `schema_version` 2: no v1 fallbacks, no debug-mode branches, no duplicated history series; when the plugin stops publishing a field the view, its translations and its tests are deleted | Guards for vanished fields keep dead UI and hide contract breaks; the path fixture test is the compatibility net |
| Current values come only from `live/`, chart attributes only from the Recorder-safe `history/` block | History must be reproducible from recorded states; a live value never stands in for a past one |
| Dashboard wording uses two names for delays: dead time (before the room temperature first moves after a command) and emitter lag (mean time the heat takes to reach the room). Texts explain behavior in plain words, without release, bench or internal code names | Users of the card are not the plugin authors |
| Collection gauges show published counts against published targets; no overall learning percentage, no inferred completion | Reaching a target does not mean the model is ready |
| Units are never inferred from path names: ratios use explicit `value_multiplier` and `divide_by` | A silent unit guess misleads when a producer changes scale |
| Temperatures stay physical in HEAT and COOL; terminal success or plateau length is never inferred from an idle state | No hidden interpretation of the producer's state machine |
| The room model is displayed as observation only | The plugin states it does not drive the command; the card mirrors that |
| Regulation actions are click-only, confirmed, disabled while the thermostat is user-locked; destructive plugin services and every action of a custom dashboard always ask | A dashboard is a monitoring view; a mis-click must not change learning or reset state |
| History graphs in dashboards default to 24 h, grow beyond that only through `range_picker`, a `start` value (capped by `max_range`) or an explicit `range` | History responses carry the full attributes of the entity once per chart; bounded fetches keep the dialog fast |
| The history library is bundled statically and registered under a private tag | No separate lazy bundle to version; no clash with other cards |
| Dialogs use `eq-dialog` (native popover top layer) instead of relying on newer Home Assistant shell elements; `ha-dialog` only for the history and schedule dialogs | Works inside popups that clip normal overlays; independent of what the component loader can reach |
| Browser Back closes Equinox dialogs: opening pushes a marked history entry, closing clears the marker without navigating; the Regulation dialog unwinds its own section entries with `history.go(-depth)` | Mobile Back must close the dialog, not leave the dashboard |
| The schedule dialog embeds the ha-chauffage card through its documented element only, shown when the integration is loaded, its element defined and `show_schedule` is not false | Public contract; no dependency on its internals |
| Per-element visibility options (`show_*`) default to true; hiding a selector never deletes its YAML value | Temporary unavailability must not rewrite user configuration |
| Light/dark styling follows the Home Assistant theme (`hass.themes.darkMode`), not the OS | Mobile OS dark with Home Assistant light is common |
| Feature work lands on the main line then is ported to the other SmartPI lines; each line rebuilds and commits its own bundle | The bundle embeds the line's dashboard and cannot be merged |
| Tests use Node's built-in runner with module hooks, no test framework dependency | Keeps the dependency list to Lit and the two helper packages |

## Rejected or removed (do not restore)

- Views of fields SmartPI 1.0 does not publish: setpoint trajectory and filtered setpoint, reference governor and landing fields, feed-forward trim and its twin, slow trim, time-to-setpoint estimate, heating balance, the feed-forward wall power view (`feedforward/wall_power_percent`), the emitter-lag (`tar_learning`) tab.
- `ha-adaptive-popover` and Material list elements for dialogs and menus: use `eq-dialog` and native buttons.
- A separate lazy-loaded history bundle.
- `prefers-color-scheme` media queries for Home Assistant light mode.
- Deriving a CSS variable name from a climate state string (Home Assistant mixes hyphens and underscores).
- Inferring pending, fallback or retained counts of learning samples from other diagnostics; ask the plugin to publish them.
- Reconstructing historical values (integral, gains, ratios, unchanged-temperature errors) from live values; request a recorded leaf instead.

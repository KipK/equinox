# Regulation Dashboard

Equinox can show a **Regulation** entry in the card menu. It opens a dashboard
dialog that explains the current thermostat regulation algorithm with compact
sections, values, statuses, progress bars, history graphs, and optional service
actions.

This page documents the dashboard configuration format used by built-in JSON
dashboards and by `/local/equinox/dash/custom.js`.

## Enable Or Disable Regulation

Set `additional_dashboards` in the Equinox card config:

| Value | Behavior |
| ----- | -------- |
| `auto` | Detects the regulation algorithm from the climate entity and loads a built-in dashboard from `dashboards/regulation/<algorithm>.json`. If no file exists for the detected algorithm, the Regulation menu entry is hidden. |
| `custom` | Always shows the Regulation menu entry and loads `/local/equinox/dash/custom.js`. If the file is missing or invalid, the dialog shows a short error. |
| `disabled` | Hides Regulation completely. |

Example:

```yaml
type: custom:equinox-card
entity: climate.salon
additional_dashboards: auto
```

## Algorithm Detection

In `auto` mode, Equinox reads the algorithm from the climate entity attributes,
in this order:

1. `configuration.proportional_function`
2. `vtherm_over_valve.function`
3. `vtherm_over_climate_valve.valve_regulation.function`
4. `vtherm_over_switch.function`
5. `specific_states.proportional_function`

Algorithm names are normalized with `trim()` and lowercase. Built-in dashboard
filenames may contain only `a-z`, `0-9`, `_`, and `-`.

Built-in dashboards currently include:

- `smartpi.json` — Smart PI regulation dashboard with eight sections covering the current regulation state, command, target approach, model and prediction, learning, FFTrim, protections, and maintenance actions.
- `hysteresis.json` — Hysteresis heat/cool overview using diagnostics published under `specific_states.hysteresis`, including active state, requested power, decision reason, activation/deactivation thresholds, and configured deltas.

### Built-in SmartPI dashboard

The SmartPI dashboard uses these eight sections in this order:

| English / French | Stable section ID | Purpose |
| --- | --- | --- |
| Overview / Synthèse | `overview` | Temperature, user and followed setpoints, applied command and useful current influences |
| Command / Commande | `command` | Requested, limited and applied command, actuator constraints and PI/FF contributions |
| Target approach / Approche de consigne | `anticipation` | Followed setpoint, trajectory profile and command history |
| Model and prediction / Modèle et prévision | `model` | A/B, confidence, delays and the relocated FF3/twin block |
| Learning / Apprentissage | `learning` | A/B acquisition, admission and freezes |
| Equilibrium / FFTrim / Équilibre / FFTrim | `fftrim` | Holding power and integral/trim transfers |
| Protections / Protections | `health` | Guards, holds, governance and calibration |
| Actions / Actions | `actions` | Existing confirmed maintenance commands |

The existing section IDs remain valid for selection, desktop navigation and
the mobile section menu. Overview includes the current trajectory phase.

The built-in definition requires SmartPI diagnostic schema v2. It reads current
controller data directly from `live/...` and its eight historical series from
`history/...`; it does not branch on SmartPI debug mode or reproduce controller
formulas. Published `live/power/*_percent` values are already percentages.
Ratios inside `live/feedforward/fftrim` and trajectory `next_cycle_reference` /
`bumpless_delta` use an explicit `value_multiplier: 100`. Temperatures and
setpoints remain in physical °C coordinates in both HEAT and COOL.
Absent fields remain `--`; `null` never becomes zero, and zero and `false`
remain valid data. Evolving enum values use a neutral fallback that keeps the
raw code visible. Offset-aware ISO dates may use the Home Assistant timezone;
naive ISO dates are displayed without inventing a source timezone.

Target approach shows the user setpoint from climate `temperature`, the measured
indoor temperature from `live/temperature/indoor`, and the filtered reference
followed by P from `live/setpoint/filtered_setpoint`. Trajectory activity and
source use `live/setpoint/trajectory_active` and `live/setpoint/trajectory_source`.
Phase, timing, profile targets and bumpless indicators use
`live/analysis/trajectory`. Details and readiness indicators appear while the
trajectory is active. Its `idle/tracking/release` phase is displayed as published;
`braking_needed=false` alone does not establish that the trajectory has ended.

The section also compares recorded indoor temperature, filtered reference and
climate user setpoint in a °C graph, then calculated and applied commands in a
separate % graph. Both use a 6-hour window. Applied power is an actuator command,
not a measurement of delivered heat. The on-screen note briefly explains the
two graphs.

The eight diagnostic Recorder series are:

- `history/temperature/indoor`
- `history/setpoint/filtered_setpoint`
- `history/power/applied_percent`
- `history/power/command_percent`
- `history/power/pi_percent`
- `history/power/ff_percent`
- `history/model/a`
- `history/model/b`

Command separates the PI/FF/holding contributions and integral value from a
three-column **PI gains** group: `live/control/kp`, `live/control/ki` and
`live/control/ti_min`. Ti is the effective integral time Kp/Ki in minutes,
published by SmartPI. When Ki is non-positive, SmartPI publishes `null` and Ti
renders as `--`; Equinox does not calculate a replacement value.

SmartPI uses a SIMC integral time bounded by four times the closed-loop
horizon before gain limits and governance are applied. The integral corrects
persistent errors over hours and preserves its learned bias during a recovery
while temperature progresses. Near the setpoint, `I:UNWIND(SAT_HI)` and
`I:UNWIND(SAT_LO)` mean opposing integral memory is unwinding despite saturation
caused by the proportional term. Overview and Protections translate these codes;
unknown integral modes keep their raw code with neutral styling.

Learning explains two kinds of measurements: **response (A)** describes how
heating or cooling changes the room temperature; **thermal losses (B)** describes
heat exchange with the outdoors. During initial learning, the system heats or
cools between its configured temperature thresholds while collecting observations.

The two collection bars show measurements against the targets supplied by the
thermostat. They measure collection only: a full bar does not mean that the
measurements are validated or that initial learning is complete. Response
measurements can still wait for the system's response delay to be estimated,
then be reassessed. Some may no longer be usable, so further collection can be
necessary. Equinox does not show an overall completion percentage. The learning
state remains visible when collection reaches its target, and a pause notice
explains when collection has been suspended while regulation uses the current
model.

The **System response delay** group describes how long the whole installation
takes to respond, including the emitter and temperature sensor. It sits next to
the collection indicators. A retained estimate is one useful observation, not
confirmation that the delay has been validated. If the delay is unavailable,
Equinox explains that it cannot tell whether estimation is still in progress;
this alone does not mean learning is blocked. The available diagnostics do not
identify the fallback decision or how many response measurements were discarded
during reassessment, so Equinox does not invent those details.

The collection bars use `live/learning/bootstrap_target_a` and
`live/learning/bootstrap_target_b`; their visibility follows the published
`live/learning/stage`. Initial learning can end with fewer response measurements
than the nominal target if the controller accepts a coherent collection.
Equinox never infers completion from counts, percentages, or the presence of a
delay. A missing target stays unavailable instead of receiving a default.
The learning enable/pause state uses `live/learning/enabled` independently of
the stage; an absent flag does not imply a pause or enabled learning in this section.

The response delay group reads
`live/analysis/learning/response_lag/{lag_s,estimates,episode_median_s,last_reason}`.
It shows the published lag and median active-episode duration as compact durations,
the number of retained estimates, and a translated outcome of the last active
episode. `estimated` means one estimate was retained, not that a lag has been
published. Publication requires a coherent set of estimates; the estimate count
is not a completion percentage. Missing/null durations remain `--`, and zero is
valid. A null lag alone does not establish a blocked learning state: SmartPI can
also resolve its delivered-power model without publishing a lag, and that
resolution flag and episode count are not published in this diagnostic block.
Constant-power initial-learning phases provide the main opportunity to estimate
the delay; a system already regulating with PWM may publish none. For cycle
configuration advice, see the [SmartPI installation guide](https://github.com/KipK/vtherm_smartpi/blob/master/documentation/en/vtherm_smartpi.md).

The learning notes explain that A uses estimated delivered power, that transient
responses and insufficient sensor variation can delay a window, and that A can
change when B is refined without a new A measurement. The learning reason
`skip: response transient (a)` / `(b)` is translated; evolving reasons with
variable details retain their raw value.

Model and prediction places A and B dispersion indicators side by side on their
own compact row, wrapping only when the available width is too narrow.
It also displays a Dead time detection group using
`live/analysis/deadtime/{state,waiting_elapsed_s,heat_last_outcome,cool_last_outcome}`.
The waiting duration is visible only for `WAITING_HEAT_RESPONSE` and
`WAITING_COOL_RESPONSE`. Labels refer to a temperature rise or drop in both HEAT
and COOL: active and passive responses swap when the HVAC mode changes.
`HEATING` and `COOLING` describe detector tracking states and do not by themselves
prove a successful detection. Each retained outcome describes the last wait for
that direction: `detected` is successful, `timeout` is a warning, and `aborted`
is a neutral interruption after a power transition. Missing outcomes remain
`--`; unknown codes remain visible with neutral styling. The active
wait is bounded by 4 h and the passive wait by 12 h, allowing a slow emitter to
release stored heat after power stops. No countdown or timeout is inferred by
Equinox. These live diagnostics are separate from the eight Recorder series,
and an entity can leave them absent.

Overview and Protections translate `I:OVERRIDE(guard_cut)` as **Thermal protection
cut**. Heating is forced off to prevent overheating and resumes after the
temperature falls sufficiently. The learned integral correction is preserved
for that recovery. This protection applies to heating; Equinox does not infer
an equivalent cooling protection. The controller's release margin is the larger
of 0.05 °C and 1.5 observed sensor steps, which avoids rapid off/on switching
around the threshold. Temperature and dead-time observations continue during
the cut. Equinox shows the published state without calculating a release
temperature or countdown; missing states remain `--` and unknown codes remain
visible with neutral styling.

FF3 and thermal-twin statuses are grouped in Model and prediction. FFTrim uses
`live/feedforward/fftrim/{stationary,periodic,transfer,last_result,last_transaction}`.
Its published `live/feedforward/fftrim/command_ownership` namespace includes
`receipts_supported`, `kind`, `alterations` and `rejection_counts`; the built-in
dashboard does not display this block.

In Protections, `live/autocalib/next_check_ts` is labeled **Next automatic retry**:
it is the scheduled re-trigger time, cleared when an attempt starts or a
snapshot is taken. `live/autocalib/last_trigger_ts` reports the actual trigger
time, and `live/autocalib/snapshot_age_h` reports the actual snapshot age.

The configuration and actual renderer methods are covered by
`npm run test:smartpi` (Node 24), including published diagnostic bindings and
documentation examples, trajectory transitions, missing/null/zero values,
unknown enums, HEAT/COOL units, Ti, response lag, detector waits/outcomes, early
initial-learning collection and early publication, pause and unavailable-delay
notices, thermal protection cuts, the eight Recorder paths and desktop/mobile
selection templates. The reference fixture in
`tests/fixtures/smartpi-diagnostics-paths.json` copies the published paths from
vtherm_smartpi and records its source revision and files. Update it from the
publisher when that contract changes. These tests do not paint a browser:
final mobile/desktop and Flat/Liquid Glow appearance needs checking in Home
Assistant.

The `live/learning/enabled` diagnostic controls whether Summary and Actions
show thermal learning as enabled or paused. Actions offers the matching confirmed
`vtherm_smartpi.set_smartpi_learning` service call with `learning_enabled: false`
or `true`; it targets the configured climate entity. Its label and icon follow
the current diagnostic state: enabled learning shows Pause, while paused learning
shows Resume. Missing live data hides both actions.

## Diagnostic Entity Detection

Algorithm plugins can publish a diagnostics entity id on the thermostat climate
entity at `specific_states.regulation_diagnostics`, for example
`sensor.thermostat_salon_smartpi_diagnostics`.

Equinox uses that published entity automatically for the `diagnostic` source and
for `$diagnostic_entity` history/action tokens. This means the card no longer
needs a `diagnostic_entity` YAML field, and changing the thermostat regulation
algorithm can switch diagnostics without reconfiguring the card. Existing
configs that still contain `diagnostic_entity` are kept as a compatibility
fallback when the thermostat has not published the new attribute.

For SmartPI, the resolved entity must expose `schema_version: 2`. The main card
reads calibration state only from `live/control/phase` and
`live/calibration/state`; the built-in graphs read only the Recorder-safe
`history` block.

## Custom Dashboard File

Place a trusted JavaScript file at:

```text
/config/www/equinox/dash/custom.js
```

Home Assistant serves it as:

```text
/local/equinox/dash/custom.js
```

Equinox first tries to import the file as a JavaScript module:

```js
export default {
  schema_version: 1,
  kind: "regulation-dashboard",
  algorithm: "custom",
  title: "Custom Regulation",
  sections: [
    {
      id: "main",
      title: "Summary",
      items: [
        {
          type: "section_note",
          text: "This dashboard is loaded from custom.js.",
          tone: "info"
        }
      ]
    }
  ]
};
```

The non-module fallback is also accepted:

```js
window.EquinoxRegulationDashboard = {
  schema_version: 1,
  kind: "regulation-dashboard",
  title: "Custom Regulation",
  sections: [
    {
      id: "main",
      title: "Summary",
      items: [{ type: "section_note", text: "Loaded from custom.js.", tone: "info" }]
    }
  ]
};
```

`custom.js` is executable JavaScript. Use only code you trust. Equinox never runs
dashboard actions during render, and actions from custom dashboards require
confirmation before calling a Home Assistant service.

## Dashboard Object

Root object:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `schema_version` | yes | `1` | Current schema version. |
| `kind` | yes | `"regulation-dashboard"` | Prevents loading unrelated files. |
| `algorithm` | no | string | Human or technical algorithm id, for example `smartpi` or `custom`. |
| `title` | no | string | Direct dashboard title fallback. |
| `title_key` | no | string | Translation key for the dashboard title. |
| `translations` | no | object | Embedded translation map. Recommended for shared dashboards. |
| `sections` | yes | array | One or more sections. |

Minimal JSON:

```json
{
  "schema_version": 1,
  "kind": "regulation-dashboard",
  "algorithm": "custom",
  "title": "Custom Regulation",
  "sections": [
    {
      "id": "main",
      "title": "Summary",
      "items": []
    }
  ]
}
```

## Sections

Each dashboard contains one or more sections.

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `id` | yes | string | Stable unique id, lowercase letters/numbers plus `_` or `-`. |
| `title` | no | string | Direct section title fallback. |
| `title_key` | no | string | Translation key for section title. |
| `icon` | no | string | Home Assistant icon id, for example `mdi:view-dashboard-outline`. |
| `summary` | no | string | Direct section summary fallback. |
| `summary_key` | no | string | Translation key for section summary. |
| `items` | yes | array | Dashboard blocks rendered in order. |

Desktop dashboards use a side section menu inside the dialog when they contain
multiple sections. Single-section dashboards use the full dialog width without a
reserved navigation column. On mobile, the Regulation menu entry opens the first
dashboard section directly. Multi-section dashboards expose their section list
through a bottom floating Sections button; the section list opens as a bottom
sheet. Browser Back/Forward follows Regulation dialog and section navigation;
opening the section sheet does not add a browser-history entry.

## Translations

Dashboard-specific text can be embedded in the dashboard:

```json
{
  "translations": {
    "en": {
      "sections.main.title": "Summary",
      "metrics.power": "Applied power"
    },
    "fr": {
      "sections.main.title": "Synthese",
      "metrics.power": "Puissance appliquee"
    }
  }
}
```

Resolution order:

1. Home Assistant language normalized to the base language, for example
   `fr-CA` -> `fr`.
2. `en`.
3. Direct fallback field such as `title`, `label`, `text`, or `description`.
4. Technical key.

Use `*_key` fields for built-in or shared dashboards. Direct fields are fine for
simple custom dashboards.

## Data Sources And Paths

Dashboard blocks read values from declarative sources.

| Source | Data |
| ------ | ---- |
| `climate` | The configured `entity` and its attributes. |
| `diagnostic` | The diagnostics entity published by `specific_states.regulation_diagnostics`, falling back to legacy `diagnostic_entity` when needed. |
| `power` | The configured `power_entity`. |
| `humidity` | The configured `humidity_entity`. |
| `temperature` | The configured `temperature_entity`. |
| `config` | The normalized Equinox card config. |

For Home Assistant entities, paths read attributes by default:

```json
{
  "source": "diagnostic",
  "path": "live/model/confidence"
}
```

Use `state`, `attributes`, or `entity_id` as the first path segment to read
those entity fields explicitly:

```json
{
  "source": "climate",
  "path": "state"
}
```

Paths use `/`. Internally, `.` is also accepted. Arrays can be read by index:
`messages/0`.

Missing values render as `--`. Missing values are `undefined`, `null`, an empty
string, `unknown`, and `unavailable`.

## Common Fields

Every block supports:

| Field | Type | Notes |
| ----- | ---- | ----- |
| `type` | string | Block type. |
| `id` | string | Optional stable id. Useful for actions. |
| `visible_if` | object | Optional condition. If false, the block is not rendered. |

Text-like fields usually support both direct text and translated keys:

| Direct field | Translation field |
| ------------ | ----------------- |
| `title` | `title_key` |
| `subtitle` | `subtitle_key` |
| `description` | `description_key` |
| `label` | `label_key` |
| `text` | `text_key` |
| `unit` | `unit_key` |

Tone values:

| Tone | Intended meaning |
| ---- | ---------------- |
| `ok` | Normal or healthy. |
| `info` | Neutral information. |
| `warning` | Needs attention. |
| `danger` | Error or risky state. |
| `muted` | Secondary or unavailable information. |

Reusable value reference:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `source` | yes | source | One of `climate`, `diagnostic`, `power`, `humidity`, `temperature`, or `config`. |
| `path` | no | string | Source path. If omitted, the whole source object is read. |

## Conditions: `visible_if`

Conditions use a small JSON expression format. Variables are read as
`source/path`.

Supported operators:

| Operator | Example |
| -------- | ------- |
| `var` | `{ "var": "diagnostic/live/model/confidence" }` |
| `!` | `{ "!": { "var": "diagnostic/live/model/tau_reliable" } }` |
| `and` | `{ "and": [{ "var": "diagnostic/live/model/tau_reliable" }, { ">": [{ "var": "diagnostic/live/learning/emea_samples_a" }, 10] }] }` |
| `or` | `{ "or": [{ "==": [{ "var": "climate/state" }, "heat"] }, { "==": [{ "var": "climate/state" }, "heat_cool"] }] }` |
| `==` | `{ "==": [{ "var": "diagnostic/live/model/confidence" }, "ab_ok"] }` |
| `!=` | `{ "!=": [{ "var": "climate/state" }, "off"] }` |
| `>` | `{ ">": [{ "var": "diagnostic/live/learning/emea_samples_a" }, 10] }` |
| `>=` | `{ ">=": [{ "var": "diagnostic/live/learning/emea_samples_a" }, 10] }` |
| `<` | `{ "<": [{ "var": "diagnostic/live/learning/emea_samples_a" }, 10] }` |
| `<=` | `{ "<=": [{ "var": "diagnostic/live/learning/emea_samples_a" }, 10] }` |

Truthy values are anything except `false`, `undefined`, `null`, empty string,
and `0`.

## Block: `hero_status`

A prominent status block for a section summary.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"hero_status"` | |
| `title`, `title_key` | no | string | Main line. |
| `subtitle`, `subtitle_key` | no | string | Secondary line. |
| `description`, `description_key` | no | string | Longer explanation. |
| `icon` | no | string | Home Assistant icon. |
| `tone` | no | tone | Defaults visually to an informational style. |

Example:

```json
{
  "type": "hero_status",
  "title_key": "overview.hero.title",
  "subtitle_key": "overview.hero.subtitle",
  "icon": "mdi:chart-bell-curve",
  "tone": "ok"
}
```

## Block: `value`

A single labeled value.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"value"` | |
| `label`, `label_key` | no | string | Value label. |
| `source` | yes | source | Data source. |
| `path` | no | string | Source path. |
| `unit`, `unit_key` | no | string | Appended after non-missing values. |
| `digits` | no | number | Decimal digits for numeric values. Defaults to `0`. |
| `value_multiplier` | no | number | Multiplies a valid numeric value before rounding. Useful for explicit ratio-to-percent conversion. |
| `format` | no | `"number"`, `"duration_s"`, or `"datetime"` | Applies the bounded formatter described below. An absent format keeps the compatible default rendering. |
| `fallback` | no | string | Fallback for missing values. Defaults to `--`. |
| `tone_map` | no | object | Maps raw value strings to tones. |
| `transform` | no | object | Reserved in the type, not currently applied by the renderer. |

Example:

```json
{
  "type": "value",
  "label_key": "metrics.error",
  "source": "diagnostic",
  "path": "live/temperature/error",
  "unit": "deg",
  "digits": 1
}
```

Ratio-to-percent example (the multiplier runs before the two-decimal rounding,
so `0.0001` renders as `0.01 %`):

```json
{
  "type": "value",
  "label": "Trim correction",
  "source": "diagnostic",
  "path": "live/feedforward/fftrim/last_result/correction",
  "format": "number",
  "value_multiplier": 100,
  "unit": "%",
  "digits": 2
}
```

## Block: `metric_grid`

A compact grid of values.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"metric_grid"` | |
| `title`, `title_key` | no | string | Optional group title. |
| `metrics` | yes | array | Metric definitions. |

Metric fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `label`, `label_key` | no | string | Metric label. |
| `source` | yes | source | Data source. |
| `path` | no | string | Source path. |
| `unit`, `unit_key` | no | string | Appended after non-missing values. |
| `digits` | no | number | Decimal digits for numeric values. Defaults to `0`. |
| `value_multiplier` | no | number | Multiplies a valid numeric value before rounding. |
| `format` | no | `"number"`, `"duration_s"`, or `"datetime"` | Uses the same formatter as a `value` block. |
| `fallback` | no | string | Fallback for missing values. |
| `icon` | no | string | Home Assistant icon. |
| `tone_map` | no | object | Maps raw value strings to tones. |

Example:

```json
{
  "type": "metric_grid",
  "title_key": "command.title",
  "metrics": [
    {
      "label_key": "command.next_cycle",
      "source": "diagnostic",
      "path": "live/power/next_cycle_percent",
      "unit": "%",
      "digits": 0
    },
    {
      "label_key": "command.applied",
      "source": "diagnostic",
      "path": "live/power/applied_percent",
      "unit": "%",
      "digits": 0
    }
  ]
}
```

### Value formats

`value` blocks and `metric_grid` metrics share these optional formats:

| Format | Input and output |
| ------ | ---------------- |
| `number` | Requires a finite numeric value (numeric strings are accepted), applies `value_multiplier` first, then rounds with `digits`. |
| `duration_s` | Requires a finite, non-negative number of seconds and displays a localized compact value in seconds, minutes, hours, or days. `digits` is the maximum decimal precision and defaults to `1`. |
| `datetime` | Requires an ISO date-time string and displays a localized short date and time. Offset-aware values use `hass.config.time_zone` when available; ISO strings without an offset are displayed without timezone conversion. |

Formats that provide their own unit (`duration_s` and `datetime`) do not append
`unit` or `unit_key`. Missing values, non-finite numbers, negative durations,
invalid ISO strings, and invalid timezones render the configured fallback or
`--`; units are never appended to a fallback. A non-numeric string is left
unchanged when no explicit `number` format is requested, and a multiplier is
never applied to it.

ISO date example:

```json
{
  "type": "value",
  "label": "Next automatic retry",
  "source": "diagnostic",
  "path": "live/autocalib/next_check_ts",
  "format": "datetime"
}
```

## Block: `status`

A mapped state with label, optional icon, tone, and description.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"status"` | |
| `label`, `label_key` | no | string | Status block label. |
| `source` | yes | source | Data source. |
| `path` | no | string | Source path. |
| `map` | yes | object | Keys are raw source values converted to strings. Use `{}` when only numeric `ranges` are needed. |
| `ranges` | no | array | Ordered numeric ranges used when no exact `map` entry matches. |
| `fallback` | no | object | Entry used when no map key matches. |
| `fallback_show_value` | no | boolean | When the fallback entry is used, displays only the raw source code. Missing sources still render only `--`. |
| `align` | no | `"start"` or `"center"` | Centers compact status content when set to `"center"`. |
| `show_value` | no | boolean | Appends the numeric source value to the mapped label. |
| `value_multiplier` | no | number | Multiplies the displayed value, for example `100` for ratio-to-percent. |
| `value_unit`, `value_unit_key` | no | string | Unit appended to the displayed value. |
| `value_digits` | no | number | Decimal digits for the displayed value. |

Map entry fields:

| Field | Type | Notes |
| ----- | ---- | ----- |
| `label`, `label_key` | string | Displayed mapped label. |
| `tone` | tone | Visual tone. |
| `icon` | string | Home Assistant icon. |
| `description`, `description_key` | string | Optional explanation. |

Range entry fields:

| Field | Type | Notes |
| ----- | ---- | ----- |
| `min` | number | Inclusive lower bound. Omit for no lower bound. |
| `max` | number | Inclusive upper bound. Omit for no upper bound. |
| `label`, `label_key` | string | Displayed mapped label. |
| `tone` | tone | Visual tone. |
| `icon` | string | Home Assistant icon. |
| `description`, `description_key` | string | Optional explanation. |

Example:

```json
{
  "type": "status",
  "label_key": "model.confidence",
  "source": "diagnostic",
  "path": "live/model/confidence",
  "map": {
    "ab_ok": {
      "label_key": "model.confidence.ok",
      "tone": "ok",
      "icon": "mdi:check-circle-outline"
    }
  },
  "fallback": {
    "label_key": "model.confidence.unknown",
    "tone": "muted",
    "icon": "mdi:help-circle-outline"
  }
}
```

Forward-compatible external enum example:

```json
{
  "type": "status",
  "source": "diagnostic",
  "path": "live/governance/regime",
  "map": {
    "near_band": { "label": "Near band", "tone": "ok" }
  },
  "fallback": { "tone": "muted", "icon": "mdi:help-circle-outline" },
  "fallback_show_value": true
}
```

An exact `map` or `ranges` match shows only its mapped label. An unknown value
uses the neutral fallback styling but displays only its raw string or boolean
code. This avoids adding a redundant generic “unknown” label and does not change
the existing `show_value` behavior for numeric statuses.

Numeric range example:

```json
{
  "type": "status",
  "label_key": "model.a_coherence",
  "source": "diagnostic",
  "path": "live/model/a_stability_ratio",
  "map": {},
  "ranges": [
    { "max": 0.15, "label": "Coherent", "tone": "ok" },
    { "min": 0.150000001, "max": 0.25, "label": "Watch", "tone": "warning" },
    { "min": 0.250000001, "label": "Dispersed", "tone": "danger" }
  ],
  "fallback": { "label": "Collecting", "tone": "muted" },
  "align": "center",
  "show_value": true,
  "value_multiplier": 100,
  "value_unit": "%",
  "value_digits": 0
}
```

## Block: `progress`

A progress bar from a current value to a target.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"progress"` | |
| `label`, `label_key` | no | string | Progress label. |
| `value` | yes | value ref | Current value. |
| `target` | yes | value ref or number | Target value. |
| `unit`, `unit_key` | no | string | Appended to value and target. |
| `digits` | no | number | Decimal digits for value/target. Defaults to `0`. |

Example:

```json
{
  "type": "progress",
  "label_key": "learning.history",
  "value": { "source": "diagnostic", "path": "live/learning/emea_samples_a" },
  "target": { "source": "diagnostic", "path": "live/learning/history_target" },
  "unit_key": "units.samples",
  "digits": 0
}
```

## Block: `text`

A short text block. The renderer displays plain text; raw HTML is not supported.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"text"` | |
| `text`, `text_key` | no | string | Text content. |

Example:

```json
{
  "type": "text",
  "text_key": "learning.help"
}
```

## Block: `section_note`

A compact contextual note.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"section_note"` | |
| `text`, `text_key` | no | string | Note content. |
| `tone` | no | tone | Visual tone. |
| `icon` | no | string | Home Assistant icon. |

Example:

```json
{
  "type": "section_note",
  "text_key": "learning.note",
  "tone": "info",
  "icon": "mdi:information-outline"
}
```

## Block: `layout_grid`

A responsive grid for grouping related blocks. The grid itself is unframed; each
child block keeps its own visual surface. Items in the same row share the tallest
item height so their frames remain aligned.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"layout_grid"` | |
| `title`, `title_key` | no | string | Optional heading displayed above the grid. |
| `min_width` | no | number | Minimum responsive column width in pixels. Defaults to `240`. |
| `columns` | no | number | Fixed desktop column count. The grid collapses to one column on narrow screens. |
| `stretch_items` | no | boolean | Defaults to `true`. Set to `false` to keep each child at `min_width`, wrap rows as needed, and center every incomplete row. |
| `center_orphan` | no | boolean | Centers the last item when it is alone on a desktop two-column row. Useful for 3-card groups. |
| `items` | yes | array | Child dashboard blocks. |

For compact status groups that should retain two columns on a mobile dialog,
use `stretch_items: false` with a `min_width` around `140`. Nested pairs inside
a narrower parent card can use a smaller minimum width when their labels remain
readable; wrapping still occurs automatically when the available width is lower.

Example:

```json
{
  "type": "layout_grid",
  "title_key": "model.reliability",
  "min_width": 180,
  "stretch_items": false,
  "items": [
    {
      "type": "status",
      "label_key": "model.tau",
      "source": "diagnostic",
      "path": "live/model/tau_reliable",
      "map": {
        "true": { "label": "Reliable", "tone": "ok" },
        "false": { "label": "Not reliable", "tone": "warning" }
      }
    },
    {
      "type": "status",
      "label_key": "model.deadtime_heat",
      "source": "diagnostic",
      "path": "live/model/deadtime_heat_reliable",
      "map": {
        "true": { "label": "Reliable", "tone": "ok" },
        "false": { "label": "Not reliable", "tone": "warning" }
      }
    }
  ]
}
```

## Block: `history`

A simplified `ha-better-history` graph. Equinox renders it through the private
`<equinox-better-history>` tag.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"history"` | |
| `title`, `title_key` | no | string | Graph title. |
| `range` | no | string | `h`, `d`, or `w`, for example `12h`, `2d`, `1w`. Defaults to `24h`. |
| `series` | yes | array | One or more series. If all series resolve to missing entities, the graph is replaced by a source-missing note. |
| `options` | no | object | Graph control visibility. |

Series fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `entity` | yes | string | Entity id or entity token. |
| `attribute` | no | string | Attribute path. `/` paths are converted for `ha-better-history`. |
| `label`, `label_key` | no | string | Series label. |
| `unit`, `unit_key` | no | string | Series unit. |
| `scale_group` | no | string | Shared scale group passed to `ha-better-history`. |
| `color` | no | string | CSS color. |

Entity tokens:

| Token | Resolves to |
| ----- | ----------- |
| `$climate_entity` | `config.entity` |
| `$diagnostic_entity` | The diagnostics entity published by `specific_states.regulation_diagnostics`, falling back to legacy `config.diagnostic_entity` when needed. |
| `$power_entity` | `config.power_entity` |
| `$humidity_entity` | `config.humidity_entity` |
| `$temperature_entity` | `config.temperature_entity` |

Options:

| Option | Default | Effect |
| ------ | ------- | ------ |
| `tooltip` | `true` | Enables the graph tooltip. |
| `legend` | `true` | Shows the legend. |
| `scales` | `true` | Shows axes/scales. |
| `tools` | `false` | Enables export and line-mode controls and opens the tools panel. |
| `date_picker` | `false` | Shows the date picker. |
| `entity_picker` | `false` | Shows the entity/attribute picker. |
| `range_picker` | `false` | Shows the time range selector and opens the tools panel. |

`debugPerformance` is always disabled by the Regulation renderer.

Example:

```json
{
  "type": "history",
  "title_key": "graphs.command.title",
  "range": "12h",
  "series": [
    {
      "entity": "$diagnostic_entity",
      "attribute": "history/power/command_percent",
      "label_key": "graphs.command.command",
      "unit": "%",
      "scale_group": "power"
    },
    {
      "entity": "$diagnostic_entity",
      "attribute": "history/power/pi_percent",
      "label_key": "graphs.command.pi",
      "unit": "%",
      "scale_group": "power"
    }
  ],
  "options": {
    "tooltip": true,
    "legend": true,
    "scales": true,
    "tools": false,
    "date_picker": false,
    "entity_picker": false,
    "range_picker": false
  }
}
```

## Block: `action`

A user-clicked Home Assistant service call.

Fields:

| Field | Required | Type | Notes |
| ----- | -------- | ---- | ----- |
| `type` | yes | `"action"` | |
| `id` | no | string | Stable action id. Used for pending/error state. |
| `label`, `label_key` | no | string | Button label. Falls back to `service`. |
| `icon` | no | string | Home Assistant icon. |
| `service` | yes | string | `domain.service`, lowercase letters/numbers/underscore. |
| `target` | no | object | Merged into service data after token substitution. |
| `data` | no | object | Merged into service data after token substitution. |
| `confirmation` | no | object | Confirmation text and behavior. |
| `visible_if` | no | condition | Hide action when false. |

`target` and `data` are merged because the Home Assistant frontend service API
used by the card receives one service data object. Put `entity_id` under
`target` or `data`; both forms work after merging.

Confirmation fields:

| Field | Type | Notes |
| ----- | ---- | ----- |
| `enabled` | boolean | When `true`, confirmation is required. Custom dashboards and known destructive actions require confirmation even when this is omitted. |
| `title`, `title_key` | string | Confirmation title. Falls back to the generic Equinox confirmation title. |
| `text`, `text_key` | string | Confirmation body. Falls back to the generic Equinox confirmation text. |

String token substitution is supported anywhere inside `target` or `data`:

| Token | Resolves to |
| ----- | ----------- |
| `$climate_entity` | `config.entity` |
| `$diagnostic_entity` | The diagnostics entity published by `specific_states.regulation_diagnostics`, falling back to legacy `config.diagnostic_entity` when needed. |
| `$power_entity` | `config.power_entity` |
| `$humidity_entity` | `config.humidity_entity` |
| `$temperature_entity` | `config.temperature_entity` |

Confirmation is required when:

- `confirmation.enabled` is `true`;
- the loaded dashboard is custom;
- the service is known destructive.

Known destructive services:

- `vtherm_smartpi.reset_smartpi_learning`
- `vtherm_smartpi.force_smartpi_calibration`
- `vtherm_smartpi.reset_smartpi_integral`

Actions are disabled when the thermostat is locked. Service errors are shown as
a short message in the dialog and logged with details in the browser console.

The built-in SmartPI dashboard Actions section uses two mutually exclusive
actions for `vtherm_smartpi.set_smartpi_learning`, selected from
`diagnostic/live/learning/enabled`: pause sends
`{ "learning_enabled": false }`, while resume sends
`{ "learning_enabled": true }`. Both target `$climate_entity`.

Example:

```json
{
  "type": "action",
  "id": "reset-learning",
  "label_key": "actions.reset_learning",
  "icon": "mdi:restart",
  "service": "vtherm_smartpi.reset_smartpi_learning",
  "target": {
    "entity_id": "$climate_entity"
  },
  "confirmation": {
    "enabled": true,
    "title_key": "actions.reset_learning.confirm_title",
    "text_key": "actions.reset_learning.confirm_text"
  }
}
```

## Full Example

```js
export default {
  schema_version: 1,
  kind: "regulation-dashboard",
  algorithm: "custom",
  title_key: "dashboard.title",
  translations: {
    en: {
      "dashboard.title": "Custom Regulation",
      "sections.main.title": "Summary",
      "hero.title": "Regulation is active",
      "metrics.power": "Power",
      "metrics.state": "Climate state",
      "note": "Missing values are shown as --."
    },
    fr: {
      "dashboard.title": "Regulation personnalisee",
      "sections.main.title": "Synthese",
      "hero.title": "La regulation est active",
      "metrics.power": "Puissance",
      "metrics.state": "Etat du climat",
      "note": "Les valeurs manquantes sont affichees avec --."
    }
  },
  sections: [
    {
      id: "main",
      title_key: "sections.main.title",
      icon: "mdi:view-dashboard-outline",
      items: [
        {
          type: "hero_status",
          title_key: "hero.title",
          tone: "ok",
          icon: "mdi:check-circle-outline"
        },
        {
          type: "metric_grid",
          metrics: [
            {
              label_key: "metrics.state",
              source: "climate",
              path: "state"
            },
            {
              label_key: "metrics.power",
              source: "power",
              path: "state",
              unit: "W",
              digits: 0
            }
          ]
        },
        {
          type: "section_note",
          text_key: "note",
          tone: "muted"
        }
      ]
    }
  ]
};
```

## Schema compatibility

These formatter fields are optional additions to `schema_version: 1`. Built-in
dashboards and existing custom dashboards that omit them retain their previous
rendering; no schema-version change is required.

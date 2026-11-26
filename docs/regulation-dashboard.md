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

- `smartpi.json` — Smart PI regulation dashboard with eight sections covering the current regulation state, command, target approach, learned model, room model, learning, protections, and maintenance actions.
- `hysteresis.json` — Hysteresis heat/cool overview using diagnostics published under `specific_states.hysteresis`, including active state, requested power, decision reason, activation/deactivation thresholds, and configured deltas.

### Built-in SmartPI dashboard

The SmartPI dashboard uses these eight sections in this order:

| English / French | Stable section ID | Purpose |
| --- | --- | --- |
| Overview / Synthèse | `overview` | Temperature, user setpoint, applied command and useful current influences |
| Command / Commande | `command` | Requested, limited and applied command, actuator constraints and PI/FF contributions |
| Target approach / Approche de consigne | `anticipation` | User setpoint, temperature anticipation and command history |
| Model and prediction / Modèle et prévision | `model` | A/B, confidence, dead time and response model |
| Room model / Modèle de pièce | `room_model` | Daily identification, wall tracking, quiet periods and data quality, model comparison, forecasts and forecast accuracy |
| Learning / Apprentissage | `learning` | A/B acquisition, admission and freezes |
| Protections / Protections | `health` | Guards, holds, governance and calibration |
| Actions / Actions | `actions` | Existing confirmed maintenance commands |

The existing section IDs remain valid for selection, desktop navigation and
the mobile section menu.

The built-in definition requires SmartPI diagnostic schema v2. It reads current
controller data directly from `live/...` and its seventeen historical series from
`history/...`; it does not branch on SmartPI debug mode or reconstruct controller
state. The only derived live metrics divide published loss by heating response
to compare the models’ static holding-power ratios. Published `live/power/*_percent` values are already percentages.
Ratios shown in % use an explicit `value_multiplier: 100`. Temperatures and
setpoints remain in physical °C coordinates in both HEAT and COOL.
Absent fields remain `--`; `null` never becomes zero, and zero and `false`
remain valid data. Evolving enum values use a neutral fallback that keeps the
raw code visible. Offset-aware ISO dates may use the Home Assistant timezone;
naive ISO dates are displayed without inventing a source timezone.

Target approach shows the user setpoint from climate `temperature` and the measured
indoor temperature from `live/temperature/indoor`. An Anticipation group reads
`live/analysis/control/{anticipation_c,anticipation_horizon_s,anticipation_horizon_source}`
and `live/temperature/anticipated` (the measured temperature plus the correction).
In the stable phase, SmartPI adds a correction to the measured temperature for the
proportional and integral errors: the distance the room is about to travel during
the time between a command and its effect, at most 1 °C in absolute value, in
heating and in cooling. `anticipation_c` is shown in `°C` and is 0 when the
anticipation is off (outside the stable phase, without horizon or without a rising
or falling slope). `anticipation_horizon_s` is the horizon in use, shown as a compact
duration like the other durations. `anticipation_horizon_source` is shown as a status:
**Response model** (the emitter lag of the response model: dead time plus response
time constant), and without a model **Measurement pulses** (emitter lag kept from the
measurement pulses of the direct start), **Dead time** (the reliable dead time after a start), or **None**; an unknown code stays visible with neutral
styling. A short on-screen note explains the mechanism.

The section also compares the recorded indoor temperature, the recorded anticipated
temperature (`history/temperature/anticipated`) and the climate user setpoint in a
°C graph, then calculated and applied commands in a separate % graph. When the
anticipated curve reaches the setpoint before the measured one, the command drops
ahead of time. Both use
a 6-hour window. Applied power is an actuator command, not a measurement of
delivered heat.

The seventeen diagnostic Recorder series (SmartPI 1.0) are:

- `history/temperature/indoor`
- `history/temperature/anticipated`
- `history/temperature/integral_error`
- `history/control/kp`
- `history/control/ki`
- `history/power/applied_percent`
- `history/power/command_percent`
- `history/power/pi_percent`
- `history/power/ff_percent`
- `history/model/a`
- `history/model/b`
- `history/model/effective_dead_time_s`
- `history/feedforward/source` (text timeline)
- `history/room_model/a`
- `history/room_model/b_eq`
- `history/room_model/forecast_error_1h_c`
- `history/room_model/forecast_error_12h_c`

Command displays `live/feedforward/source`, always the learned A/B model, in
French or English. The holding power comes from that model in every mode; the
room model is observation only. A source change is absorbed by the integral
rather than causing a command jump. The power history overlays FF and PI on the
same percentage axis. `history/feedforward/source` shares that graph's group and
is rendered by ha-better-history as a text ribbon, never a numeric curve.

The six additional series are always published, with `null` for values not
computed. Old recorded periods may lack them. No live values are substituted
for missing history, and the applied power remains a command rather than a
measurement of delivered heat.

#### Room model / Modèle de pièce

The `room_model` section displays `live/room_model/status`, tracking, wall
identification, whether the regulation uses the model
(`live/room_model/used_by_regulation`, always "no": observation only), last
refusal, publication day, last identification day and observed sensor resolution. Known states and refusals have FR/EN explanations;
future values remain visible with neutral styling. A rejected daily fit does
not invalidate the parameters already published.

A **Quiet periods and data** group shows what the identification works from:
`live/room_model/quiet_periods/{count,reason}` (the number of quiet periods in the
catalogue and, when none can be found, why: for example an unknown home
position, so the absence of sun cannot be checked; the reason is hidden when
absent), the start, end and regulated start of the last closed quiet period
(`live/room_model/quiet_periods/last/{start,end,regulated_from}`, local times,
`--` without a period or when the room never regulated at its low setpoint),
`live/room_model/history_h` (hours of recorded history) and
`live/room_model/data_invalid_reason` (why the recorded data are currently
excluded, such as a window, shedding, a temperature jump or a command override;
`--` means the data are valid). Known reasons have FR/EN labels, with
neutral/raw fallbacks for future values.

Identification needs about six days of recorded nights with heating. Valves
are unsupported. Walls need sensor steps of at most 0.015 °C: a 0.1 °C sensor can
still yield a simple room model, but cannot identify the walls. The waiting
note explains this while no model is published; the simple-model note preserves
the sensor explanation once a simple model is in use.

The parameter grid compares `live/room_model/a` with `live/model/a` (°C/min),
`live/room_model/b_eq` with `live/model/b` (min⁻¹), and their holding-power ratios
`100 × b_eq / a` and `100 × b / a` (% of full power per °C). The optional
`divide_by` value reference reads the corresponding heating response; missing,
non-numeric or non-positive denominators remain `--`. `b_air` and `b_wall` are
also displayed: `b_eq = b_air − b_wall` is the static loss, not the total loss
of the air. A history initially covering 24 hours compares the four published
coefficients with one scale for each unit. Ratios are current metrics; their missing historical
series are listed in `dev_tests/smartpi-0.7-history-request.md`.

Forecasts at 1, 2, 6 and 12 hours assume the current heating power is kept.
At every horizon, a comparison card places `forecast_error_c`,
`unchanged_temperature_error_c` and `forecast_checks` together. The error is the
root mean square error over the last seven days, in °C, replaying past forecasts
with actual applied power and measured outdoor temperature. The model is more
accurate than “nothing changes” when its error is lower than the reference;
without checked forecasts there is no evidence to compare. Zero checks and
zero errors remain valid values, while missing scores remain unavailable.
A second graph, also initially covering 24 hours, plots only the recorded 1 h
and 12 h errors; reference errors, check counts and forecast temperatures are
live-only.

Both room-model graphs expose a time-range selector for longer comparisons on
demand. Opening the tab loads 24 hours rather than seven days for each graph.
This is independent of the seven-day rolling window used by SmartPI to compute
the RMSE values. Attribute histories fetch the diagnostic entity’s recorded
attributes, not only the selected leaves: periods recorded in SmartPI debug mode
also contain the full `live` block and can be much heavier. Normal-mode
recordings exclude `live`; switching modes does not shrink existing debug
records. The shorter initial range limits work in either mode without claiming
a measured speedup.

`live/room_model/wall_extra_power_percent` is positive when walls absorb heat
beyond their steady share and negative when they give heat back. It stays
unavailable without identified walls, a precise sensor or reliable tracking.
It is an observation: the regulation does not use it.

`vt-state.ts` reads calibration from schema v2 `live/control/phase` and
`live/calibration/state`, compared without case.

Command separates the PI/FF/holding contributions and integral value from a
three-column **PI gains** group: `live/control/kp`, `live/control/ki` and
`live/control/ti_min`. Ti is the effective integral time Kp/Ki in minutes,
published by SmartPI. When Ki is non-positive, SmartPI publishes `null` and Ti
renders as `--`; Equinox does not calculate a replacement value. The same group
shows the delay read by the gain rule (`live/analysis/control/gain_delay_s`,
**Gain delay**) and the closed-loop time of the rule (`gain_closed_loop_time_s`,
**Closed-loop time (λ)**), both as durations, and a status below it for
`gain_delay_source` (`dead time`: the dead time after a start). All three are
`null` without a reliable dead time (safe gains): the durations render as `--` and
the source status is hidden.

Below the existing power history, Command shows two additional 12-hour graphs:
the integral state in **°C·min**, then **Kp and Ki** together. The gains share a
time axis with separate Y axes because their units differ: Kp is `1/°C`, Ki is
`1/(°C·min)`. They use a dedicated group separate from power and temperature.
The integral is the accumulated temperature error, not an output percentage;
Equinox plots the published state without multiplying it by Ki or by 100.
The same units are available in the general history attribute picker.
On older SmartPI versions or for periods before the upgrade, the three new
Recorder attributes may be absent; Equinox does not substitute live values or
reconstruct past values. Ti remains a live metric because it is not recorded.

SmartPI uses a SIMC integral time bounded by four times the closed-loop
horizon before gain limits and governance are applied. The integral corrects
persistent errors over hours and preserves its learned bias during a recovery
while temperature progresses. If recovery stops moving temperature toward the setpoint,
SmartPI 0.6.2 releases the integral at a reduced rate to close the remaining gap;
Equinox does not infer a release timer from the available diagnostics.
Near the setpoint, `I:UNWIND(SAT_HI)` and
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
measurements can still wait for the response model,
then be reassessed. Some may no longer be usable, so further collection can be
necessary. Equinox does not show an overall completion percentage. The learning
state remains visible when collection reaches its target, and a pause notice
explains when collection has been suspended while regulation uses the current
model.

The collection bars use `live/learning/bootstrap_target_a` and
`live/learning/bootstrap_target_b`; their visibility follows the published
`live/learning/stage`. Initial learning can end with fewer response measurements
than the nominal target if the controller accepts a coherent collection.
Equinox never infers completion from counts, percentages, or the presence of an
emitter lag. A missing target stays unavailable instead of receiving a default.
The learning enable/pause state uses `live/learning/enabled` independently of
the stage; an absent flag does not imply a pause or enabled learning in this section.

`live/learning/block_reason` is shown next to the enable/pause state, only when
SmartPI publishes one: **Heating unavailable**, **Disturbance** or **Pause (service)**.
With the direct start, `live/learning/stage` reads **Measurement pulses**,
`live/model/confidence` `ab_learning` reads like the bootstrap confidence, and
Overview shows a measurement-pulses notice while `live/control/phase` is `Learning`.

The learning notes explain that A uses estimated delivered power, that transient
responses and insufficient sensor variation can delay a window, and that A can
change when B is refined without a new A measurement. The learning reason
`skip: response transient (a)` / `(b)` is translated; evolving reasons with
variable details retain their raw value.

Model and prediction places A and B dispersion indicators side by side on their
own compact row, wrapping only when the available width is too narrow.
Next to the dead time after a start, a **Response model** group reads `live/model/{dead_time_s,response_time_constant_s,response_source,response_confidence}`,
`live/analysis/control/effective_dead_time_s` and
`live/analysis/learning/response_model/prediction_rms_c`: dead time, response time
constant and effective dead time as compact durations, the median prediction error
in °C, the source of the latest accepted event and the response confidence. `live/analysis/learning/response_model/pending_outliers` counts the events kept aside because they are far from the model in force, waiting for a confirming event (events awaiting confirmation); it is hidden while it is 0 or absent. A
seven-day graph reads `history/model/effective_dead_time_s` in seconds. Null values
stay `--`; unknown sources stay raw with neutral styling.
Only the dead time after a start of the active mode is shown: one row, its
reliability and the last wait outcome follow the thermostat mode, read from
`live/model/deadtime_heat_s` and `live/model/deadtime_heat_reliable` in HEAT and
from their `deadtime_cool` mirrors in COOL (SmartPI no longer publishes the dead time
after a stop). It also displays a Dead time detection group using
`live/analysis/deadtime/{state,waiting_elapsed_s}` and the last outcome
`live/analysis/deadtime/heat_last_outcome` (HEAT) or `cool_last_outcome` (COOL).
The waiting duration is visible only for `WAITING_HEAT_RESPONSE` and
`WAITING_COOL_RESPONSE`. Labels refer to a temperature rise or drop in both HEAT
and COOL.
`HEATING` and `COOLING` describe detector tracking states and do not by themselves
prove a successful detection. Each retained outcome describes the last wait for
that direction: `detected` is successful, `timeout` is a warning, and `aborted`
is a neutral interruption after a power transition. Missing outcomes remain
`--`; unknown codes remain visible with neutral styling. No countdown or timeout
is inferred by Equinox. These live diagnostics are separate from the seventeen Recorder series,
and an entity can leave them absent.

Overview and Protections translate `I:OVERRIDE(guard_cut)` as **Thermal protection
cut**. Heating is forced off to prevent overheating and resumes after the
temperature falls sufficiently. During the cut, SmartPI 0.6.2 reduces excess
integral by tracking the forced zero command, while retaining the useful
correction for recovery. This protection applies to heating; Equinox does not infer
an equivalent cooling protection. The controller's release margin is the larger
of 0.05 °C and 1.5 observed sensor steps, which avoids rapid off/on switching
around the threshold. Temperature and dead-time observations continue during
the cut. Equinox shows the published state without calculating a release
temperature or countdown; missing states remain `--` and unknown codes remain
visible with neutral styling.

Protections shows `live/control/mode` (PI regulation, hysteresis, or **Heating cut
above the setpoint** as a warning) and translates the integral hold sources
`calibration_recovery`, `heating_unavailable` and `heating_unavailable_resume`.
It also shows `live/analysis/control/near_band_source`, where the near band comes from
(computed from the model, no response model, no outdoor temperature, heating model not
reliable yet, heating slope too low, reset); an unknown code stays visible with neutral styling.
The Calibration group reads
`live/calibration/{state,pulses_done,result,last_request,last_time}`, the reading
against the values in use (`reading_a`/`in_force_a`, `reading_b`/`in_force_b`,
`reading_lag_s`/`in_force_lag_s`, the latter being the anticipation horizon in use) and `corrected`
(only the heating rate can be corrected). States, results and request
answers use plain FR/EN labels; `corrected` is a list shown as one status, and it
is hidden before any calibration result. A calibration runs only on request.

The configuration and actual renderer methods are covered by
`npm run test:smartpi` (Node 24), including published diagnostic bindings and
documentation examples, anticipation values and horizon sources, missing/null/zero values,
unknown enums, HEAT/COOL units, Ti, response model, calibration, detector waits/outcomes, early
initial-learning collection and early publication, pause notices, the calibration
notice in any letter case, thermal protection cuts, the seventeen Recorder paths, room-model ratios and
forecast comparisons, quiet periods and data quality, source timelines and desktop/mobile
selection templates. The reference fixture in
`tests/fixtures/smartpi-diagnostics-paths.json` copies the published paths from
vtherm_smartpi dev-1.0 and records its source revision and files. The publisher’s
live-path fixture lists `quiet_periods.last` without its three fields, which are
added from the documentation; the room model forecast horizons and the restart
fields are snapshotted from the diagnostics methods.
Update the snapshot from the publisher when that contract changes. These tests do not paint a browser:
final mobile/desktop and Flat/Liquid Glow appearance needs checking in Home
Assistant.

The `live/learning/enabled` diagnostic controls whether Summary and Actions
show A/B learning as enabled or paused; Actions offers the matching confirmed
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
`live/calibration/state`, compared without case: a calibration is active in the
`Calibration` phase or while the state is not `idle`; the built-in graphs read only the Recorder-safe
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
| `lower` | `{ "!=": [{ "lower": { "var": "diagnostic/live/calibration/state" } }, "idle"] }` (lowercases a text value) |
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
| `value_multiplier` | no | number | Multiplies a valid numeric value after optional division, before rounding. Useful for explicit ratio-to-percent conversion. |
| `divide_by` | no | value reference | Optional `{source, path}` denominator. Requires finite numbers and a strictly positive denominator; otherwise renders the fallback. |
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
  "label": "Dispersion of A",
  "source": "diagnostic",
  "path": "live/model/a_stability_ratio",
  "format": "number",
  "value_multiplier": 100,
  "unit": "%",
  "digits": 2
}
```

Holding-power ratio example (the numerator and denominator are both live
published coefficients; this does not create a historical series):

```json
{
  "type": "value",
  "label": "Room static holding power per degree",
  "source": "diagnostic",
  "path": "live/room_model/b_eq",
  "divide_by": { "source": "diagnostic", "path": "live/room_model/a" },
  "value_multiplier": 100,
  "unit": "%/°C",
  "digits": 3
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
| `value_multiplier` | no | number | Multiplies a valid numeric value after optional division, before rounding. |
| `divide_by` | no | value reference | Same optional `{source, path}` division and missing-value rules as `value`. |
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
  "label": "Last calibration",
  "source": "diagnostic",
  "path": "live/calibration/last_time",
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

| `prefix_map` | no | object | Labels for generated codes made of a known prefix and a variable suffix, used when no exact `map` key matches. See below. |

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

Generated codes such as `frozen_reboot` or `pi_mode_I:HOLD(window_resume)` use
`prefix_map`. Its keys are prefixes (the longest match wins). An entry carries the
usual `label`/`label_key`, `tone` and `icon`, where the label places the translated
suffix at `{value}` (or appends it in parentheses without a placeholder), plus two
optional maps of label fields: `suffix_map` for the exact suffix, and, for a suffix
shaped like `KIND(argument)`, `suffix_map` for `KIND` and `argument_map` for
`argument`. A suffix without a label is shown as is; a value without a matching
prefix uses `fallback`.

```json
{
  "type": "status",
  "source": "diagnostic",
  "path": "live/temperature/integral_mode",
  "map": {},
  "prefix_map": {
    "frozen_": {
      "label": "Frozen: {value}",
      "tone": "muted",
      "suffix_map": { "reboot": { "label": "recent restart" } }
    }
  },
  "fallback": { "tone": "muted", "icon": "mdi:help-circle-outline" },
  "fallback_show_value": true
}
```

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
      "label_key": "model.deadtime_start",
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

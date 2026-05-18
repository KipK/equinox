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
diagnostic_entity: sensor.salon_smartpi_diagnostics
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

- `smartpi.json`
- `hysteresis.json`

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

Desktop dashboards use a side section menu inside the dialog. On mobile, a
single-section dashboard opens directly; a multi-section dashboard shows its
sections from the Equinox menu and opens the selected section.

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
| `diagnostic` | The configured `diagnostic_entity` and its attributes. |
| `power` | The configured `power_entity`. |
| `humidity` | The configured `humidity_entity`. |
| `temperature` | The configured `temperature_entity`. |
| `config` | The normalized Equinox card config. |

For Home Assistant entities, paths read attributes by default:

```json
{
  "source": "diagnostic",
  "path": "model/confidence"
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
| `var` | `{ "var": "diagnostic/model/confidence" }` |
| `!` | `{ "!": { "var": "diagnostic/model/ready" } }` |
| `and` | `{ "and": [{ "var": "diagnostic/model/ready" }, { ">": [{ "var": "diagnostic/history/samples" }, 10] }] }` |
| `or` | `{ "or": [{ "==": [{ "var": "climate/state" }, "heat"] }, { "==": [{ "var": "climate/state" }, "heat_cool"] }] }` |
| `==` | `{ "==": [{ "var": "diagnostic/model/confidence" }, "ok"] }` |
| `!=` | `{ "!=": [{ "var": "climate/state" }, "off"] }` |
| `>` | `{ ">": [{ "var": "diagnostic/history/samples" }, 10] }` |
| `>=` | `{ ">=": [{ "var": "diagnostic/history/samples" }, 10] }` |
| `<` | `{ "<": [{ "var": "diagnostic/history/samples" }, 10] }` |
| `<=` | `{ "<=": [{ "var": "diagnostic/history/samples" }, 10] }` |

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
| `fallback` | no | string | Fallback for missing values. Defaults to `--`. |
| `tone_map` | no | object | Maps raw value strings to tones. |
| `transform` | no | object | Reserved in the type, not currently applied by the renderer. |

Example:

```json
{
  "type": "value",
  "label_key": "metrics.error",
  "source": "diagnostic",
  "path": "temperature/error",
  "unit": "deg",
  "digits": 1
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
      "path": "power/next_cycle_percent",
      "unit": "%",
      "digits": 0
    },
    {
      "label_key": "command.applied",
      "source": "diagnostic",
      "path": "power/applied_percent",
      "unit": "%",
      "digits": 0
    }
  ]
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
| `map` | yes | object | Keys are raw source values converted to strings. |
| `fallback` | no | object | Entry used when no map key matches. |

Map entry fields:

| Field | Type | Notes |
| ----- | ---- | ----- |
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
  "path": "model/confidence",
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
  "value": { "source": "diagnostic", "path": "learning/history_samples" },
  "target": { "source": "diagnostic", "path": "learning/history_target" },
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
| `$diagnostic_entity` | `config.diagnostic_entity` |
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
      "attribute": "power/next_cycle_percent",
      "label_key": "graphs.command.next_cycle",
      "unit": "%",
      "scale_group": "power"
    },
    {
      "entity": "$diagnostic_entity",
      "attribute": "power/pi_percent",
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
| `$diagnostic_entity` | `config.diagnostic_entity` |
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

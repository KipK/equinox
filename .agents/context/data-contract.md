# Data contract

Everything the card reads from Home Assistant, with its producer. The card only reads; it calls services only on a user click (listed at the end). A producer-side change is reflected here and in the built-in dashboard JSON in the same change set.

## Entities and sources

| Source token | Entity | Resolution |
| --- | --- | --- |
| `climate` | the configured `entity` (must start with `climate.`, validated in `src/data/config.ts::validateEquinoxConfig`) | config |
| `diagnostic` | the algorithm diagnostics entity | `specific_states.regulation_diagnostics` of the climate entity, else the legacy `diagnostic_entity` config key (`src/data/regulation-dashboard-values.ts::resolveRegulationDiagnosticEntity`) |
| `power`, `humidity`, `temperature` | optional `power_entity`, `humidity_entity`, `temperature_entity` | config |
| `config` | the card config object | - |

- `readRegulationSourceValue` reads a path as an attribute first (entity `attributes`), then on the entity object; paths starting with `state`, `attributes` or `entity_id` address the entity object directly (the TPI dashboard reads `diagnostic/state` and `diagnostic/entity_id`).
- A value is "missing" when `undefined`, `null`, `""`, `"unknown"` or `"unavailable"` (`isMissingRegulationValue`): it renders the fallback (`--`), never `0`.
- `diagnostic_entity` is dropped by the visual editor on save (`src/equinox-card-editor.ts::cleanEditorConfig`) but still honoured when present in YAML.

## Climate entity (standard Home Assistant attributes)

Read in `src/data/climate-state.ts::buildClimateViewModel`:

- State and `hvac_mode`, `hvac_action`, `hvac_modes`, `preset_mode` and `preset_modes`, `fan_mode` and `fan_modes`, `swing_mode` and `swing_modes`, `swing_horizontal_mode` and `swing_horizontal_modes`, `temperature`, `target_temp_low`, `target_temp_high`, `current_temperature`, `humidity`, `min_temp`, `max_temp`, `target_temp_step`, `friendly_name`.
- Fallbacks to VT attributes: HVAC mode from `current_state.hvac_mode`, preset from `current_state.preset`, setpoint from `current_state.target_temperature`, step from `configuration.target_temperature_step` (then 0.5).
- `temperature_entity` overrides `current_temperature` and sets its display decimals from its state text; `humidity_entity` is used only when the climate has no `humidity`.
- `frost` preset in `cool` mode is shown as no preset (VT has no cooling frost preset).
- History dialog and more-info read `current_humidity` first, then `humidity`.

## Versatile Thermostat attributes

Read in `src/data/vt-state.ts::buildVtViewModel`. A climate entity is treated as VT when it has a type flag, `specific_states` or `configuration`; otherwise `vt` is undefined and the card behaves as a plain climate card.

| Meaning | Paths (first defined wins, in this order) |
| --- | --- |
| Thermostat type | `is_over_switch`, `is_over_valve`, `is_over_climate`, or `configuration.type`; valve regulation from `vtherm_over_climate_valve.have_valve_regulation` or `configuration.have_valve_regulation` |
| Requested power (over switch) | `vtherm_over_switch.power_percent`, `vtherm_over_climate.valve_regulation.power_percent`, `power_percent` |
| Valve opening | `vtherm_over_valve.valve_open_percent`, `vtherm_over_climate_valve.valve_regulation.valve_open_percent`, `valve_open_percent` |
| `on_percent` | `vtherm_over_valve.on_percent`, `on_percent` |
| Power manager | `power_manager.{mean_cycle_power,device_power,overpowering_state}` |
| Algorithm name | `configuration.proportional_function`, `vtherm_over_valve.function`, `vtherm_over_climate_valve.valve_regulation.function`, `specific_states.proportional_function` (the regulation resolver adds `vtherm_over_switch.function`, see below) |
| Configured flags | `is_presence_configured`, `is_power_configured`, `is_motion_configured`, `is_window_configured`, `is_window_auto_configured`, `is_safety_configured`, `is_lock_configured`, `is_heating_failure_detection_configured`, `is_repair_incorrect_state_configured`, `is_auto_start_stop_configured` |
| Events | `window_manager.{window_state,window_auto_state}`, `presence_manager.presence_state`, `timed_preset_manager.{is_active,remaining_time_min,preset,original_preset}` |
| Lock | `lock_manager.{is_locked,lock_users,lock_automations,lock_code}`, `specific_states.is_locked` |
| Messages | `specific_states.messages`, `safety_manager.safety_state`, `heating_failure_detection_manager.{heating_failure_state,cooling_failure_state}`, `power_manager.overpowering_state`, plus the auto start/stop reason below |
| Auto start/stop | `auto_start_stop_manager.{auto_start_stop_enable,auto_start_stop_stop_mode}`, reason from `specific_states.hvac_mode_reason`, else `specific_states.hvac_off_reason` (reasons `hvac_off_auto_start_stop`, `hvac_fan_only_auto_start_stop`, `hvac_dry_auto_start_stop`); controls come from the config entities `auto_start_stop_enable_entity` (a `switch`) and `auto_start_stop_stop_mode_entity` (a `select`, options limited to `off`, `fan_only`, `dry`) |
| Auto fan | plugin: object `auto_fan` (`enabled`, `selected_fan_mode`), switch from `auto_fan_enable_entity`; legacy: `vtherm_over_climate.{auto_fan_mode,current_auto_fan_mode}` (`auto_fan_none` means off) |
| Requested state | `requested_state.hvac_mode` (heating event for over-switch when power > 0 and requested mode is `heat`) |

- Two producers publish the same power or valve value at the root and under a namespace. The view model prefers the namespaced path; the sensor more-info dialog (`src/components/eq-sensor-more-info-dialog.ts`) prefers the root path for the history series and falls back to the namespaced ones. Keep the three candidates when adding a series.
- Message keys with severity: `safety_detected`, `heating_failure`, `cooling_failure` are `danger`; `overpowering_detected`, `not_initialized` are `alert`; others `info`.
- The SmartPI calibration message (`smartpi_calibration`) appears only when the algorithm is `smartpi` (diagnostics entity from `specific_states.regulation_diagnostics` only, not the legacy `diagnostic_entity`), the diagnostics entity has `schema_version` 2, and `live.control.phase` lowercased is `calibration` or `live.calibration.state` lowercased is not `idle`.

## Regulation dashboard selection

`src/data/regulation-dashboard-resolver.ts`:

- `additional_dashboards`: `auto` (default), `custom`, `disabled`.
- Algorithm name read from the climate attributes, first non-empty among: `configuration.proportional_function`, `vtherm_over_valve.function`, `vtherm_over_climate_valve.valve_regulation.function`, `vtherm_over_switch.function`, `specific_states.proportional_function`. It is trimmed, lowercased and must match `^[a-z0-9_-]+$`.
- `auto` shows the Regulation menu entry only when a built-in dashboard exists for that name (`src/data/dashboards/index.ts`); `custom` always shows it and loads the user module from the Home Assistant `www` folder (URL `/local/equinox/dash/custom.js`, see `src/data/regulation-dashboard-loader.ts::loadCustomDashboard`).
- A dashboard is valid only with `schema_version` 1, `kind: "regulation-dashboard"`, at least one section, unique lowercase section ids and known block types (`validateRegulationDashboard`).

## SmartPI diagnostics (`src/data/dashboards/regulation/smartpi.json`)

Producer: the `vtherm_smartpi` plugin, sensor entity whose attributes are `schema_version` (must be 2), `live` (current values, nested) and `history` (Recorder-safe leaves). Paths below are relative to `live/`.

- Current values are read only under `live/`; chart attributes only under `history/`. No v1 fallback, no debug-mode branch.
- A publisher field that is absent stays absent in the UI (`--`); `null` means unavailable, `0` and `false` are real values.
- Sections (ids are stable navigation ids): `overview`, `command`, `anticipation`, `model`, `room_model`, `learning`, `health`, `actions`.

| Section | Live paths read |
| --- | --- |
| overview | `temperature/{indoor,error,integral_mode}`, `power/{applied_percent,next_cycle_percent}`, `control/saturation_state`, `governance/regime`, `learning/enabled` |
| command | `power/{command_percent,limited_percent,applied_percent,pi_percent,ff_percent,hold_percent,next_cycle_percent,current_cycle_percent,linear_current_cycle_percent,linear_next_cycle_percent}`, `control/{kp,ki,ti_min,saturation_state,in_deadtime_window}`, `analysis/control/{gain_delay_s,gain_delay_source,gain_closed_loop_time_s}`, `feedforward/source`, `temperature/integral_error` |
| anticipation | `temperature/{indoor,anticipated}`, `analysis/control/{anticipation_c,anticipation_horizon_s,anticipation_horizon_source}`; the setpoint comes from the climate `temperature` |
| model | `model/{a,b,confidence,a_stability_ratio,b_stability_ratio,tau_min,tau_reliable,dead_time_s,deadtime_heat_s,deadtime_heat_reliable,deadtime_cool_s,deadtime_cool_reliable,response_confidence,response_source,response_time_constant_s}`, `analysis/control/effective_dead_time_s`, `analysis/deadtime/{state,waiting_elapsed_s,heat_last_outcome,cool_last_outcome}`, `analysis/learning/response_model/{prediction_rms_c,pending_outliers}`, `feedforward/{deadband_p_mode,deadband_power_source}` |
| room_model | `room_model/{status,tracking,walls,a,b_air,b_eq,b_wall,wall_extra_power_percent,used_by_regulation,sensor_resolution_c,identified_day,last_identification_day,last_refusal_reason,history_h,data_invalid_reason}`, `room_model/quiet_periods/{count,reason,last/start,last/end,last/regulated_from}`, per horizon `1h`, `2h`, `6h`, `12h`: `room_model/{forecast_c,forecast_checks,forecast_error_c,unchanged_temperature_error_c}/<horizon>`, plus `model/{a,b}`; the b/a ratios use `divide_by` on `room_model/a` and `model/a` |
| learning | `learning/{stage,enabled,block_reason,last_reason,history_target,bootstrap_target_a,bootstrap_target_b,emea_samples_a,emea_samples_b,accepted_updates_a,accepted_updates_b,a_drift_state,b_drift_state,learn_b_converged}`, `model/confidence` |
| health | `calibration/{state,automatic,automatic_status,last_request,last_time,pulses_done,result,corrected,reading_a,reading_b,reading_lag_s,in_force_a,in_force_b,in_force_lag_s,interruptions/0/{at,reason}}`, `control/{mode,restart_reason,in_deadband,in_near_band,in_deadtime_window,saturation_state}`, `analysis/control/near_band_source`, `governance/{regime,thermal_update_decision,thermal_update_reason}`, `temperature/{integral_mode,integral_hold_mode,integral_hold_source}` |
| actions | `learning/enabled` (chooses pause or resume) |

History leaves (all 17 Recorder series, under `history/`): `temperature/{indoor,anticipated,integral_error}`, `power/{command_percent,applied_percent,pi_percent,ff_percent}`, `control/{kp,ki}`, `feedforward/source`, `model/{a,b,effective_dead_time_s}`, `room_model/{a,b_eq,forecast_error_1h_c,forecast_error_12h_c}`. The setpoint series is the climate `temperature` attribute. Units for these are in `src/data/attributes.json` (`history.<group>.<name>`); a new history leaf needs a unit entry there.

Behavior rules the dashboard relies on:

- Dead time is published for the active mode only: HEAT publishes the `deadtime_heat_*` and `heat_last_outcome` paths, COOL the `deadtime_cool_*` and `cool_last_outcome` ones. The dashboard shows one row of each, switched by the climate state.
- Calibration states are plain lowercase words (`idle`, `waiting`, `rest`, `full power`, `stop`); compare without case. `calibration/corrected` is a list; its status map is keyed by the comma-joined text (`""` = nothing corrected).
- Direct start: phase `Learning`, stage `measurement pulses`, confidence `ab_learning`, horizon source `measurement pulses`. `learning/bootstrap_status` is deliberately never displayed (a test forbids it).
- Anticipation horizon source codes: `response model`, `dead time`, `measurement pulses`, `none`; unknown codes stay raw and neutral. Near band source codes: `auto_model_aware`, `no response model`, `fallback_no_ext`, `fallback_model`, `fallback_slope_low`, `reset`.
- The room model is observation only: `room_model/used_by_regulation` is always false and the holding source is always the learned model. Do not add views that imply the room model drives the command.
- Learning percentages are never computed from counts: collection can reach its targets while learning is not complete.
- `quiet_periods/last/{start,end,regulated_from}` are published by the plugin but missing from its path fixture; Equinox adds them to its own fixture by hand.

## TPI dashboard (`src/data/dashboards/regulation/tpi.json`)

Producer: Versatile Thermostat. Sections `overview`, `learning`, `actions`.

- Climate paths: `power_percent`, `on_percent`, `configuration/{cycle_min,minimal_activation_delay_sec,minimal_deactivation_delay_sec}`, `specific_states/auto_tpi_continuous_kext`; coefficients and thresholds `tpi_coef_int`, `tpi_coef_ext`, `tpi_threshold_low`, `tpi_threshold_high` read from the block of the thermostat type: `vtherm_over_switch/`, `vtherm_over_valve/` or `vtherm_over_climate_valve/valve_regulation/` (one grid per block, shown by condition).
- Auto TPI learning sensor (the `diagnostic` source, same `specific_states.regulation_diagnostics` path): state `active` or not, attributes `coeff_int_cycles`, `coeff_ext_cycles`, `model_confidence`, `last_learning_status`, `calculated_coef_int`, `calculated_coef_ext`, `heating_cycles_count`, `learning_start_dt`. Without that sensor the learning section shows only a note.
- Learning graph: starts at `learning_start_dt` (default range 7 days, capped at 30 days by `max_range`), room temperature from `temperature_entity` when configured, else the climate `current_temperature` (series `fallback`), plus the setpoint and the two calculated coefficients.

## Hysteresis dashboard (`src/data/dashboards/regulation/hysteresis.json`)

Producer: `vtherm_hysteresis`. Section `main`. Climate paths: `state`, `temperature`, `current_temperature`, `hvac_action`, `specific_states/hysteresis/{is_active,hvac_mode,on_percent,last_reason,activation_threshold,deactivation_threshold,hysteresis_on,hysteresis_off,min_on_percent,max_on_percent}`; the config source `entity` is also read.

## Services called

All through `hass.callService`, on user click, never automatically.

- Card controls (`src/data/actions.ts`): `climate.{set_temperature,set_hvac_mode,set_preset_mode,set_fan_mode,set_swing_mode,set_swing_horizontal_mode}`, `versatile_thermostat.{set_timed_preset,cancel_timed_preset,set_auto_fan_mode,lock,unlock}`, `switch.{turn_on,turn_off}` and the `select_option` action of the `select` domain for the auto start/stop and auto-fan control entities.
- Regulation actions, confirmed (`window.confirm`) when the item sets `confirmation.enabled` (every built-in action does), on a custom dashboard, and always for the services in `DESTRUCTIVE_ACTION_SERVICES` (`eq-regulation-renderer.ts::_requiresConfirmation`); disabled when the thermostat is user-locked: `vtherm_smartpi.set_smartpi_learning` (`learning_enabled` true or false), `vtherm_smartpi.reset_smartpi_learning`, `vtherm_smartpi.force_smartpi_calibration`, `vtherm_smartpi.reset_smartpi_integral`, `versatile_thermostat.set_auto_tpi_mode` (`auto_tpi_mode`, `reinitialise`). Action `target` and `data` are merged into one service data object; `$climate_entity` and the other entity tokens are substituted.

## Producer versions and compatibility

- The card has no producer version check. Compatibility is by shape: missing paths render `--`, unknown enum codes use each status block's `fallback`.
- SmartPI: one dashboard file per branch line, written for the SmartPI diagnostics of that line; it requires `schema_version` 2. A path the plugin stops publishing is removed from the dashboard (with its translations), not guarded.
- VT: attribute shapes differ by thermostat type and VT version, hence the fallback chains above. The Auto TPI sensor needs a VT version that publishes it as `specific_states.regulation_diagnostics`.

## Fixture and refresh

- `tests/fixtures/smartpi-diagnostics-paths.json`: `source` (producer repository, branch, revision, files), `live` (dotted paths), `history` (leaves). `tests/smartpi-dashboard.test.mjs` fails when a dashboard binding, a `visible_if` variable, a documentation example or a test payload names a path not in the fixture. It does not fail on fixture paths the dashboard ignores.
- Refresh from the plugin's published-path fixture and its diagnostics documentation after each producer change; the fixture `source.note` states the paths added by hand.

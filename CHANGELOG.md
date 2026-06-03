# Changelog

All notable changes to Equinox will be documented in this file.

## Next

- Add `display_mode: thin`, a compact control layout with color-coded popup temperature sliders, responsive sensor readings, inline HVAC/preset/fan/swing popups, and horizontal state icons.
- Add new setpoint setter ( legacy +/- setpoint setter can be switched back from the config )
- Some UI improvements
- Keep thin humidity beside temperature when space allows, moving it next to the power icon as a hover-value icon only when fan/swing buttons constrain the sensor row, and reserve only the actual width of present extra buttons.
- Keep thin cards on two lines for wider narrow layouts by delaying the three-line breakpoint.
- Replace native sensor more-info popups and the power hover tooltip with an Equinox sensor dialog showing current values and a 24h `ha-better-history` chart.
- Fix the sensor dialog power request chart by preferring historically recorded root VT power/valve attributes before namespaced fallbacks, and tune the tools icon size.
- Align the sensor more-info dialog more closely with Home Assistant's more-info layout: breadcrumb/title typography, unframed sensor rows, HA state icon color, rounded corners, and a History heading above the chart.
- Move the Regulation dialog close button to the left to match Home Assistant dialog placement.
- Use HA-style rounded corners only for true centered Equinox dialogs, keeping popups and menus on the standard popup shape.
- Make the popup setpoint dialog visually consistent between single-temperature and heat/cool range modes, with borderless slider thumbs and unframed range values.
- Normalize sensor more-info graph colors: temperature, humidity, power request, and valve opening use HA blue, while instant power uses the Equinox boost tone.
- Fix the heat/cool setpoint slider so handles cannot cross and the track shows heat on the left, neutral between setpoints, and cool on the right.
- Keep the main menu popup open while moving from the card to the menu, matching the other floating popups.
- Keep thin-mode humidity displayed as a reading for narrower cards when only one extra selector, such as ventilation, is present.
- Color the normal setpoint slider thumb with the active mode tone to match its filled track.
- Add browser Back/Forward history support for sensor more-info dialogs.
- Fix sensor more-info close so it clears its local browser-history state without navigating to the previous page.

## 0.1.0

### Initial release

- Lovelace card for Home Assistant climate entities (Versatile Thermostat + standard).
- **Climate controls**: HVAC mode selector, temperature setpoint and responsive color-coded `heat_cool` range controls.
- **Preset selector** with Versatile Thermostat and standard preset support.
- **Boost / timed preset dialog** with circular duration slider.
- **Swing mode dialog** for `swing_mode` and `swing_horizontal_mode`.
- **Fan mode selector** with auto/off/speed icons.
- **Lock UI**: PIN pad dialog for VT lock/unlock with code validation.
- **History dialog** powered by `ha-better-history`: multi-series charts, entity/attribute series, no-refetch view zoom, display modes (stair/line/column), export/import, draggable zoom window, live future range, and browser Back/Forward handling.
- **Two visual themes**: `flat` (default) and `liquid_glow` (animated border glow).
- **Two display modes**: `classic` and `compact` (responsive with optional icon-only popups).
- **Primary display**: `setpoint` (temperature emphasis) or `sensors` (sensor values emphasis).
- **Power and humidity info**: optional external sensors with popover details.
- **Responsive layout**: adapts to narrow cards, mobile-friendly.
- **i18n**: 19 languages with runtime translation loading.
- **Light mode fix**: detects HA theme dark mode instead of OS preference.
- **Attribute unit map**: semantic unit resolution for history charts (including `temperature` → °C/°F).
- **Precompressed `.js.gz` files** for gzip-aware Home Assistant deployments.
- **HACS support**: `hacs.json` manifest, GitHub Actions CI/CD, draft release workflow.

## 0.1.1

- updated ha-better-history-component to 0.1.7
  . better UX on mobile
  . improved range selection slider handling on mobile & desktop.
- use private custom-element tag to avoid versionning conflict with other card using history component
- handle browser history
- fix card should default to automatic height
- improve Liquid Glow active heat/cool side glow with a center-out expanding pulse while preserving the Home Assistant card border theme
- Add option to only display border glow when hvac is active ( default checked )
- add editor tabs to hide specific HVAC mode and preset buttons based on the attached climate capabilities

## 0.1.2

- add card background color and opacity options in the visual editor

- update ha-better-history to 0.2.0
  . now we can set units and scale group to attributes from the graph by right click/long press the attributes chips
  . some UI fixes

## 0.1.3

- update ha-better-history to 0.2.1
  . set units and scale group to attributes and entities from the graph by right click/long press the attributes chips

## 0.1.4

- update ha-better-history to 0.2.2
- add card background color and opacity style options

## 0.1.5

- make HVAC and preset selector surfaces follow the configured card background
- make setpoint +/- buttons follow the configured card background
- ha-better-history 0.2.3:
  . fix chart clipping on loading multiple sources
  . add colored dots near scales
  . prevent scale ticks to appear above the chart.
  . allow to manually split/join scales for same unit graphs by dragging colored dots to the wated scale side.
  . auto scale splitting is more conservative
  . prevent splitting when there's 2 different units ( forced to one scale per unit )
  . prevent more than 2 different units per graph

## 0.1.6

- ha-better-history 0.2.5
  . fix race condition when adding multiple attributes at the same time
  . fix legend padding when a segment is displayed under the graph
  . fix long press on chips clearing the popup on release.

- fix menu not working when card is embedded in a dialog window.
- add Hebrew language ( thx @yosef-chai )

## 0.1.7

- introduce Regulation dashboards.
  Dynamically generated dashboards from json files.
  Only available to SmartPI for now.

## 0.1.8

- Rewrote SmartPI regulation wording and layout
- Unify Regulation navigation with Equinox UX
- Added browser history to Regulation section.


## 0.1.9

- Auto-discover Regulation diagnostics from `specific_states.regulation_diagnostics`, removing the need to configure `diagnostic_entity`. ( needs smartPI >= 0.3.3 )
- Mount Equinox dialogs only while active so closed popovers, history, Regulation, lock, and message overlays release their listeners and state.
- Fix: Keep floating menus inside viewport

## 0.1.10

- Align icons and colors with Home Assistant conventions n( thanks @yosef-chai )
- set default theme to glow

## 0.1.11

- improve vtherm-hysteresis regulation dashboard layout and diagnostics
- center orphan regulation grid items
- updated ha-better-history to 0.2.6

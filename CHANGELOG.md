# Changelog

All notable changes to Equinox will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Lovelace card for Home Assistant climate entities (Versatile Thermostat + standard).
- **Climate controls**: HVAC mode selector, temperature setpoint and `heat_cool` low/high range controls.
- **Preset selector** with Versatile Thermostat and standard preset support.
- **Boost / timed preset dialog** with circular duration slider.
- **Swing mode dialog** for `swing_mode` and `swing_horizontal_mode`.
- **Fan mode selector** with auto/off/speed icons.
- **Lock UI**: PIN pad dialog for VT lock/unlock with code validation.
- **History dialog** powered by `ha-better-history`: multi-series charts, entity/attribute series, no-refetch view zoom, display modes (stair/line/column), export/import, draggable zoom window, live future range.
- **Two visual themes**: `flat` (default) and `liquid_glow` (animated border glow).
- **Two display modes**: `classic` and `compact` (responsive with optional icon-only popups).
- **Primary display**: `setpoint` (temperature emphasis) or `sensors` (sensor values emphasis).
- **Power and humidity info**: optional external sensors with popover details.
- **Dynamic dashboards**: auto-detected VT algorithm diagnostic panels.
- **Responsive layout**: adapts to narrow cards, mobile-friendly.
- **i18n**: 19 languages with runtime translation loading.
- **Light mode fix**: detects HA theme dark mode instead of OS preference.
- **Attribute unit map**: semantic unit resolution for history charts (including `temperature` → °C/°F).
- **Precompressed `.js.gz` files** for gzip-aware Home Assistant deployments.
- **HACS support**: `hacs.json` manifest, GitHub Actions CI/CD, draft release workflow.

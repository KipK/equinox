import type { HassEntity, HomeAssistant } from "../types/ha";

export type HistoryValueType = "number" | "boolean" | "string";
export type HistorySourceKind = "entity_state" | "entity_attribute";

export interface HistorySource {
  id: string;
  kind: HistorySourceKind;
  entityId: string;
  label: string;
  path?: string[];
  valueType: HistoryValueType;
}

export interface HistoryPoint {
  time: number;
  value: number | string | boolean;
}

export interface HistorySeries {
  source: HistorySource;
  points: HistoryPoint[];
}

export interface HistoryState {
  entity_id?: string;
  state?: string;
  s?: string;
  last_changed?: string;
  last_updated?: string;
  lu?: number;
  attributes?: Record<string, unknown>;
  a?: Record<string, unknown>;
}

type HistoryResponse = HistoryState[][] | Record<string, HistoryState[]>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readPath(source: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => (isRecord(current) ? current[key] : undefined), source);
}

export function valueType(value: unknown): HistoryValueType | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return "number";
  }

  if (typeof value === "boolean") {
    return "boolean";
  }

  if (typeof value === "string" && value !== "") {
    return "string";
  }

  return undefined;
}

export function entityStateSource(entity: HassEntity): HistorySource | undefined {
  const type = valueType(Number.isFinite(Number(entity.state)) ? Number(entity.state) : entity.state);

  if (!type) {
    return undefined;
  }

  return {
    id: `state:${entity.entity_id}`,
    kind: "entity_state",
    entityId: entity.entity_id,
    label: entity.attributes.friendly_name && typeof entity.attributes.friendly_name === "string" ? entity.attributes.friendly_name : entity.entity_id,
    valueType: type
  };
}

export function attributeSource(entity: HassEntity, path: string[], label?: string): HistorySource | undefined {
  const value = readPath(entity.attributes, path);
  const type = valueType(value);

  if (!type) {
    return undefined;
  }

  return {
    id: `attr:${entity.entity_id}:${path.join(".")}`,
    kind: "entity_attribute",
    entityId: entity.entity_id,
    label: label ?? path.join("."),
    path,
    valueType: type
  };
}

function normalizeValue(value: unknown, type: HistoryValueType): number | string | boolean | undefined {
  if (type === "number") {
    const numberValue = typeof value === "number" ? value : Number(value);

    return Number.isFinite(numberValue) ? numberValue : undefined;
  }

  if (type === "boolean") {
    return typeof value === "boolean" ? value : undefined;
  }

  return typeof value === "string" && value !== "" ? value : undefined;
}

function valueFromState(state: HistoryState, source: HistorySource): number | string | boolean | undefined {
  const attributes = state.attributes ?? state.a ?? {};
  const raw = source.kind === "entity_state" ? state.state ?? state.s : readPath(attributes, source.path ?? []);

  return normalizeValue(raw, source.valueType);
}

function timeFromState(state: HistoryState): number {
  if (typeof state.lu === "number") {
    return state.lu * 1000;
  }

  const timestamp = state.last_changed ?? state.last_updated;

  return timestamp ? Date.parse(timestamp) : Number.NaN;
}

function extendPoints(points: HistoryPoint[], start: Date, end: Date): HistoryPoint[] {
  if (points.length === 0) {
    return points;
  }

  const startTime = start.getTime();
  const endTime = end.getTime();
  const sorted = [...points].sort((left, right) => left.time - right.time);
  const first = sorted[0];
  const last = sorted[sorted.length - 1];

  return [
    ...(first.time > startTime ? [{ time: startTime, value: first.value }] : []),
    ...sorted,
    ...(last.time < endTime ? [{ time: endTime, value: last.value }] : [])
  ];
}

function statesByEntity(history: HistoryResponse, entityIds: string[]): Map<string, HistoryState[]> {
  const result = new Map<string, HistoryState[]>();

  if (Array.isArray(history)) {
    history.forEach((entityStates, index) => {
      const entityId = entityStates[0]?.entity_id ?? entityIds[index];

      if (entityId) {
        result.set(entityId, entityStates);
      }
    });

    return result;
  }

  for (const [entityId, entityStates] of Object.entries(history)) {
    if (Array.isArray(entityStates)) {
      result.set(entityId, entityStates);
    }
  }

  return result;
}

function currentPoint(hass: HomeAssistant, source: HistorySource, start: Date, end: Date): HistoryPoint[] {
  const entity = hass.states[source.entityId];

  if (!entity) {
    return [];
  }

  const state: HistoryState = {
    entity_id: entity.entity_id,
    state: entity.state,
    last_changed: start.toISOString(),
    attributes: entity.attributes
  };
  const value = valueFromState(state, source);

  return value === undefined
    ? []
    : [
        { time: start.getTime(), value },
        { time: end.getTime(), value }
      ];
}

export async function fetchHistory(
  hass: HomeAssistant,
  sources: HistorySource[],
  start: Date,
  end: Date
): Promise<HistorySeries[]> {
  if (!hass.callWS && !hass.callApi) {
    throw new Error("Home Assistant history API is unavailable");
  }

  const entityIds = [...new Set(sources.map((source) => source.entityId))];
  const history = hass.callWS
    ? await hass.callWS<HistoryResponse>({
        type: "history/history_during_period",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        entity_ids: entityIds,
        minimal_response: false,
        no_attributes: false,
        significant_changes_only: false
      })
    : await hass.callApi<HistoryResponse>(
        "GET",
        `history/period/${encodeURIComponent(start.toISOString())}?${new URLSearchParams({
          filter_entity_id: entityIds.join(","),
          end_time: end.toISOString()
        }).toString()}`
      );
  const historyStatesByEntity = statesByEntity(history, entityIds);

  return sources.map((source) => {
    const points = (historyStatesByEntity.get(source.entityId) ?? []).flatMap((state) => {
      const value = valueFromState(state, source);
      const time = timeFromState(state);

      return value !== undefined && Number.isFinite(time) ? [{ time, value }] : [];
    });

    return {
      source,
      points: points.length > 0 ? extendPoints(points, start, end) : currentPoint(hass, source, start, end)
    };
  });
}

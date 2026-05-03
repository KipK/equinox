declare global {
  interface HASSDomEvents {
    "value-changing": { value: unknown };
    "value-changed": { value: unknown };
    "low-changing": { value: unknown };
    "low-changed": { value: unknown };
    "high-changing": { value: unknown };
    "high-changed": { value: unknown };
  }
}

export type ValidHassDomEvent = keyof HASSDomEvents;

export const fireEvent = <HassEvent extends ValidHassDomEvent>(
  node: HTMLElement | Window,
  type: HassEvent,
  detail?: HASSDomEvents[HassEvent],
  options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
): Event => {
  const event = new Event(type, {
    bubbles: options?.bubbles ?? true,
    cancelable: Boolean(options?.cancelable),
    composed: options?.composed ?? true
  });
  (event as Event & { detail: HASSDomEvents[HassEvent] }).detail = detail ?? ({} as HASSDomEvents[HassEvent]);
  node.dispatchEvent(event);

  return event;
};

export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

type Vector = [number, number];
type Matrix = [Vector, Vector];

const rotateVector = ([[a, b], [c, d]]: Matrix, [x, y]: Vector): Vector => [a * x + b * y, c * x + d * y];
const createRotateMatrix = (x: number): Matrix => [
  [Math.cos(x), -Math.sin(x)],
  [Math.sin(x), Math.cos(x)]
];
const addVector = ([a1, a2]: Vector, [b1, b2]: Vector): Vector => [a1 + b1, a2 + b2];
const toRadian = (angle: number): number => (angle / 180) * Math.PI;

type ArcOptions = {
  x: number;
  y: number;
  r: number;
  start: number;
  end: number;
  rotate?: number;
};

export const svgArc = (options: ArcOptions): string => {
  const { x, y, r, start, end, rotate = 0 } = options;
  const t1 = toRadian(start);
  const t2 = toRadian(end);
  const delta = (t2 - t1) % (2 * Math.PI);
  const phi = toRadian(rotate);
  const rotMatrix = createRotateMatrix(phi);
  const [sX, sY] = addVector(rotateVector(rotMatrix, [r * Math.cos(t1), r * Math.sin(t1)]), [x, y]);
  const [eX, eY] = addVector(rotateVector(rotMatrix, [r * Math.cos(t1 + delta), r * Math.sin(t1 + delta)]), [x, y]);
  const fA = delta > Math.PI ? 1 : 0;
  const fS = delta > 0 ? 1 : 0;

  return ["M", sX, sY, "A", r, r, (phi / (2 * Math.PI)) * 360, fA, fS, eX, eY].join(" ");
};

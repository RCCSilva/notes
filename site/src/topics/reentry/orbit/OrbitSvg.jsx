import { R_EARTH, ENTRY_ALT_KM } from './orbit';

// Shared drawing pieces for the orbit lessons. SVG, hand drawn. +y is up in the maths, so we flip it.
export const RD = 52; // Earth radius, in drawing units
export const HALF = 140; // half the side of the picture

/** Distance from the Earth's center (km) -> drawing units. Heights above the surface are stretched by `stretch`, the Earth is not. */
export const makeScale = (stretch) => (r) => RD + ((r - R_EARTH) * stretch * RD) / R_EARTH;

/** A point (km, maths axes) -> drawing coordinates. */
export function toXY(scale, x, y) {
  const r = Math.hypot(x, y);
  const f = scale(r) / r;
  return [x * f, -y * f];
}

export function pathOf(scale, pts) {
  return `M${pts.map(([x, y]) => toXY(scale, x, y).map((n) => n.toFixed(2)).join(',')).join('L')}`;
}

/** Heading (degrees on screen) of a velocity at a state, after stretching. */
export function heading(scale, s) {
  const [x0, y0] = toXY(scale, s.x, s.y);
  const [x1, y1] = toXY(scale, s.x + s.vx * 30, s.y + s.vy * 30);
  return (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
}

/** The picture frame: a dark sky. `label` is the accessible name. */
export function Sky({ label, children }) {
  return (
    <svg className="ob-svg" viewBox={`${-HALF} ${-HALF} ${2 * HALF} ${2 * HALF}`} role="img" aria-label={label}>
      <rect className="ob-sky" x={-HALF} y={-HALF} width={2 * HALF} height={2 * HALF} />
      {children}
    </svg>
  );
}

export function Earth() {
  return (
    <g>
      <circle className="ob-earth" r={RD} />
      <path className="ob-land" d="M-30,-22 q8,-14 20,-10 q6,10 -2,18 q-10,6 -18,-8z M8,8 q14,-6 22,6 q-4,14 -16,12 q-10,-8 -6,-18z M-34,20 q8,-4 10,6 q-6,6 -10,-6z" />
    </g>
  );
}

/** Dashed ring where we say the air starts (ENTRY_ALT_KM, our simplification). */
export function AirRing({ scale, label }) {
  const r = scale(R_EARTH + ENTRY_ALT_KM);
  return (
    <g>
      <circle className="ob-air" r={r} />
      {label && <text className="ob-label ob-label-air" x="0" y={-r - 2} textAnchor="middle">{label}</text>}
    </g>
  );
}

export function Craft({ x, y, angle = 0, className = '' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} className={`ob-craft ${className}`}>
      <path d="M6,0 L-4.5,4.5 L-2.5,0 L-4.5,-4.5Z" />
    </g>
  );
}

/** A marker with a label next to it. */
export function Pin({ x, y, label, dx = 8, dy = -6, anchor = 'start', className = '' }) {
  return (
    <g className={`ob-pin ${className}`}>
      <circle cx={x} cy={y} r="3.4" />
      {label && <text className="ob-label" x={x + dx} y={y + dy} textAnchor={anchor}>{label}</text>}
    </g>
  );
}

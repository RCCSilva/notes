// Ideal two-body orbit around the Earth, in the orbital plane. No React, no drag, burns are instantaneous.
// Sources: research/reentry/00-orbit-basics.md (section 5 formulas, "Simulation spec").
// Units: km, s, km/s. Origin = center of the Earth. Angles in radians unless the name ends in Deg.

/** Earth gravitational parameter GM, km^3/s^2 [S13 Earth Fact Sheet]. */
export const MU = 398600;
/** Earth equatorial radius, km [S13]. Altitude = distance from the center - R_EARTH [S20 slide 95]. */
export const R_EARTH = 6378.137;
/** 1 nautical mile = 1.852 km exactly; 1 ft = 0.3048 m exactly [S21]. */
export const NMI_KM = 1.852;
export const FT_KM = 0.0003048;
/**
 * Where we say "the air starts" (km above the surface). OUR SIMPLIFICATION, not a NASA number
 * (the notes found no single "entry interface" altitude; Gemini IV planned its reentry to begin at 400,000 ft = 121.9 km [S17 p.82]).
 */
export const ENTRY_ALT_KM = 120;

export const nmiToKm = (n) => n * NMI_KM;
export const kmToNmi = (k) => k / NMI_KM;
export const ftsToMs = (f) => f * FT_KM * 1000;
export const msToFts = (m) => m / (FT_KM * 1000);

const TAU = 2 * Math.PI;
const norm = (a) => ((a % TAU) + TAU) % TAU;

/** State (position, velocity) at a given altitude and speed. flightPathDeg: angle above the local horizontal; angleDeg: where around the Earth. */
export function stateFromAltitudeSpeed({ altKm, speedKms, flightPathDeg = 0, angleDeg = 0 }) {
  const r = R_EARTH + altKm;
  const th = (angleDeg * Math.PI) / 180;
  const g = (flightPathDeg * Math.PI) / 180;
  const ux = Math.cos(th), uy = Math.sin(th); // up
  const tx = -Math.sin(th), ty = Math.cos(th); // along the ground, counterclockwise
  const vt = speedKms * Math.cos(g), vr = speedKms * Math.sin(g);
  return { x: r * ux, y: r * uy, vx: vt * tx + vr * ux, vy: vt * ty + vr * uy };
}

export const speedOf = (s) => Math.hypot(s.vx, s.vy);
export const radiusOf = (s) => Math.hypot(s.x, s.y);
/** Energy per unit mass: v^2/2 - mu/r (conserved) [S20 slide 50]. */
export const energy = (s) => (s.vx * s.vx + s.vy * s.vy) / 2 - MU / radiusOf(s);
/** Angular momentum per unit mass h = x vy - y vx (conserved) [S20 slides 51-53]. */
export const angularMomentum = (s) => s.x * s.vy - s.y * s.vx;

/**
 * Orbit elements from a state. If the energy is >= 0 the path is not closed: { bound: false }.
 * a = -mu/(2E), p = h^2/mu, e = sqrt(1 - p/a), rPeri = a(1-e), rApo = a(1+e), T = 2 pi sqrt(a^3/mu).
 * w = direction of the perigee (angle from the +x axis).
 */
export function elements(s) {
  const E = energy(s);
  if (E >= 0) return { bound: false, energy: E };
  const a = -MU / (2 * E);
  const h = angularMomentum(s);
  const p = (h * h) / MU;
  const e = Math.sqrt(Math.max(0, 1 - p / a));
  const r = radiusOf(s);
  const rv = s.x * s.vx + s.y * s.vy;
  const v2 = s.vx * s.vx + s.vy * s.vy;
  const ex = ((v2 - MU / r) * s.x - rv * s.vx) / MU;
  const ey = ((v2 - MU / r) * s.y - rv * s.vy) / MU;
  const w = e > 1e-7 ? Math.atan2(ey, ex) : Math.atan2(s.y, s.x);
  const rPeri = a * (1 - e);
  const rApo = a * (1 + e);
  return {
    bound: true, a, e, p, h, w, energy: E,
    rPeri, rApo,
    periAltKm: rPeri - R_EARTH,
    apoAltKm: rApo - R_EARTH,
    periodS: TAU * Math.sqrt((a * a * a) / MU),
    hitsEarth: rPeri < R_EARTH,
    entersAir: rPeri - R_EARTH < ENTRY_ALT_KM,
  };
}

/** Orbit from perigee and apogee altitudes (km), perigee in the +x direction. */
export function orbitFromApsides(periAltKm, apoAltKm) {
  const rp = R_EARTH + periAltKm;
  const ra = R_EARTH + apoAltKm;
  const a = (rp + ra) / 2;
  return elements(stateAtTrueAnomaly({ a, e: (ra - rp) / (ra + rp), p: a * (1 - ((ra - rp) / (ra + rp)) ** 2), w: 0 }, 0));
}

/** Position and velocity at true anomaly nu (angle from perigee, radians). */
export function stateAtTrueAnomaly(el, nu) {
  const r = el.p / (1 + el.e * Math.cos(nu));
  const th = el.w + nu;
  const h = Math.sqrt(MU * el.p);
  const vr = (MU / h) * el.e * Math.sin(nu);
  const vt = (MU / h) * (1 + el.e * Math.cos(nu));
  const ux = Math.cos(th), uy = Math.sin(th);
  return { x: r * ux, y: r * uy, vx: vr * ux - vt * uy, vy: vr * uy + vt * ux };
}

/** Distance from the center, along direction theta (from the +x axis), on this orbit: r = p / (1 + e cos nu) [S20 slides 63-64]. */
export const radiusAtAngle = (el, theta) => el.p / (1 + el.e * Math.cos(theta - el.w));
export const altitudeAtAngle = (el, theta) => radiusAtAngle(el, theta) - R_EARTH;

/** Speed at distance r on an orbit with semimajor axis a: v = sqrt(mu (2/r - 1/a)) (from the two energy equations; not named, see notes). */
export const speedAtRadius = (a, r) => Math.sqrt(MU * (2 / r - 1 / a));

/** Instantaneous burn along the direction of travel: dvKms > 0 prograde (posigrade), < 0 retrograde. */
export function burn(s, dvKms) {
  const v = speedOf(s);
  const k = (v + dvKms) / v;
  return { ...s, vx: s.vx * k, vy: s.vy * k };
}

/** Burn on an orbit at true anomaly nu. Returns the state at the burn and the orbit before and after. */
export function burnAt(el, nu, dvKms) {
  const state = stateAtTrueAnomaly(el, nu);
  const next = burn(state, dvKms);
  return { state, next, before: el, after: elements(next) };
}

/** Points [x, y] around the whole ellipse (n segments). */
export function sampleOrbit(el, n = 180) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const s = stateAtTrueAnomaly(el, (TAU * i) / n);
    pts.push([s.x, s.y]);
  }
  return pts;
}

/** True anomaly after t seconds, starting from nu0 (Kepler's equation, solved by Newton's method). */
export function trueAnomalyAfter(el, nu0, tS) {
  const { e, a } = el;
  const E0 = 2 * Math.atan2(Math.sqrt(1 - e) * Math.sin(nu0 / 2), Math.sqrt(1 + e) * Math.cos(nu0 / 2));
  const M = E0 - e * Math.sin(E0) + Math.sqrt(MU / (a * a * a)) * tS;
  let E = e < 0.8 ? M : Math.PI;
  for (let i = 0; i < 40; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return norm(2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2)));
}

/** Integrate the equation of motion (acceleration = -mu r / |r|^3 [S20 slide 44]) with RK4 for dtS seconds. */
export function propagate(s, dtS, stepS = 5) {
  const f = (q) => {
    const r3 = Math.hypot(q.x, q.y) ** 3;
    return { x: q.vx, y: q.vy, vx: (-MU * q.x) / r3, vy: (-MU * q.y) / r3 };
  };
  const add = (q, d, k) => ({ x: q.x + d.x * k, y: q.y + d.y * k, vx: q.vx + d.vx * k, vy: q.vy + d.vy * k });
  let cur = s;
  let left = dtS;
  while (left > 1e-9) {
    const h = Math.min(stepS, left);
    const k1 = f(cur);
    const k2 = f(add(cur, k1, h / 2));
    const k3 = f(add(cur, k2, h / 2));
    const k4 = f(add(cur, k3, h));
    cur = {
      x: cur.x + (h / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x),
      y: cur.y + (h / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y),
      vx: cur.vx + (h / 6) * (k1.vx + 2 * k2.vx + 2 * k3.vx + k4.vx),
      vy: cur.vy + (h / 6) * (k1.vy + 2 * k2.vy + 2 * k3.vy + k4.vy),
    };
    left -= h;
  }
  return cur;
}

/** Retrograde burn size (km/s, positive number) at true anomaly nu that brings the perigee altitude down to targetPeriAltKm. Bisection. */
export function retroForPerigee(el, nu, targetPeriAltKm) {
  let lo = 0;
  let hi = speedOf(stateAtTrueAnomaly(el, nu)) * 0.5;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const after = burnAt(el, nu, -mid).after;
    if (after.bound && after.periAltKm > targetPeriAltKm) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

import { describe, it, expect } from 'vitest';
import * as O from '../topics/reentry/orbit/orbit';

// Reference orbits and burns from research/reentry/00-orbit-basics.md ("Simulation spec").
const nmi = O.nmiToKm;

describe('orbit module', () => {
  it('MA-7 insertion: 160.89 km at 7.8385 km/s gives about 266.8 km apogee, perigee at the start, period within 0.3 min', () => {
    const el = O.elements(O.stateFromAltitudeSpeed({ altKm: 160.89, speedKms: 7.8385 }));
    expect(Math.abs(el.apoAltKm - 266.8)).toBeLessThan(2);
    expect(Math.abs(el.periAltKm - 160.89)).toBeLessThan(0.1);
    expect(Math.abs(el.periodS / 60 - 88.533)).toBeLessThan(0.3);
    expect(el.entersAir).toBe(false);
  });

  it('speed at MA-7 perigee is 7.8388 km/s (research) and period is 88.77 min', () => {
    const el = O.orbitFromApsides(nmi(86.87), nmi(144.06));
    expect(O.speedAtRadius(el.a, el.rPeri)).toBeCloseTo(7.8388, 2);
    expect(el.periodS / 60).toBeCloseTo(88.77, 1);
  });

  it('Gemini IV insertion 87.6 x 152.2 nmi: period 88.94 min (NASA 88.90), perigee speed 7.842 km/s', () => {
    const el = O.orbitFromApsides(nmi(87.6), nmi(152.2));
    expect(Math.abs(el.periodS / 60 - 88.9)).toBeLessThan(0.3);
    expect(O.speedAtRadius(el.a, el.rPeri)).toBeCloseTo(7.842, 2);
  });

  it('Gemini IV later periods stay within 0.3 min of the printed ones', () => {
    for (const [p, a, T] of [[90.4, 159.9, 89.08], [86.1, 136.5, 88.53]]) {
      expect(Math.abs(O.orbitFromApsides(nmi(p), nmi(a)).periodS / 60 - T)).toBeLessThan(0.3);
    }
  });

  it('circular sanity values: 200 km -> 7.784 km/s, 88.5 min; 400 km -> 7.669 km/s, 92.6 min', () => {
    const c200 = O.elements(O.stateFromAltitudeSpeed({ altKm: 200, speedKms: Math.sqrt(O.MU / (O.R_EARTH + 200)) }));
    expect(Math.sqrt(O.MU / (O.R_EARTH + 200))).toBeCloseTo(7.784, 3);
    expect(c200.periodS / 60).toBeCloseTo(88.5, 1);
    expect(c200.e).toBeLessThan(1e-6);
    const c400 = O.elements(O.stateFromAltitudeSpeed({ altKm: 400, speedKms: Math.sqrt(O.MU / (O.R_EARTH + 400)) }));
    expect(c400.periodS / 60).toBeCloseTo(92.6, 1);
  });

  it('Gemini VI-A: +4 m/s at perigee of 161 x 259 km gives apogee 272 km (model 272.7), perigee unchanged', () => {
    const { after } = O.burnAt(O.orbitFromApsides(161, 259), 0, 0.004);
    expect(after.apoAltKm).toBeCloseTo(272.7, 0);
    expect(Math.abs(after.apoAltKm - 272)).toBeLessThan(1);
    expect(after.periAltKm).toBeCloseTo(161, 1);
  });

  it('Gemini X: 856 ft/s posigrade at the low point of 206.9 x 208.9 nmi -> about 208.6 x 750.5 nmi (2 percent)', () => {
    const { after } = O.burnAt(O.orbitFromApsides(nmi(206.9), nmi(208.9)), 0, O.ftsToMs(856) / 1000);
    expect(Math.abs(O.kmToNmi(after.apoAltKm) / 750.5 - 1)).toBeLessThan(0.02);
    expect(Math.abs(O.kmToNmi(after.periAltKm) / 206.9 - 1)).toBeLessThan(0.02);
  });

  it('Gemini X: 886 ft/s retrograde at the low point of 208.6 x 750.5 nmi -> about 190.2 x 208.7 nmi (model 190.7 x 208.6)', () => {
    const { after } = O.burnAt(O.orbitFromApsides(nmi(208.6), nmi(750.5)), 0, -O.ftsToMs(886) / 1000);
    expect(Math.abs(O.kmToNmi(after.periAltKm) / 190.2 - 1)).toBeLessThan(0.02);
    expect(Math.abs(O.kmToNmi(after.apoAltKm) / 208.7 - 1)).toBeLessThan(0.02);
    // both sides came down
    expect(after.periAltKm).toBeLessThan(nmi(208.6));
  });

  it('Gemini X: 420 ft/s at the low point of a circular 160.2 nmi orbit needs about 427 ft/s (within 2 percent of NASA 420 -> 413.6 nmi apogee)', () => {
    const circ = O.orbitFromApsides(nmi(160.2), nmi(160.2));
    const { after } = O.burnAt(circ, 0, O.ftsToMs(420) / 1000);
    expect(Math.abs(O.kmToNmi(after.apoAltKm) / 413.6 - 1)).toBeLessThan(0.05);
  });

  it('Mercury sentence: about 1 mile of apogee for 2 ft/s, prograde at perigee of the MA-6 orbit', () => {
    const el = O.orbitFromApsides(nmi(86.9), nmi(140.9));
    const d = O.burnAt(el, 0, O.ftsToMs(2) / 1000).after.apoAltKm - el.apoAltKm;
    expect(d / 1.609344).toBeGreaterThan(0.8);
    expect(d / 1.609344).toBeLessThan(1.4); // research: about 1.1 nmi = 1.3 statute miles
  });

  it('opposite-side rule: prograde at perigee raises apogee only; retrograde at apogee lowers perigee only', () => {
    const el = O.orbitFromApsides(200, 400);
    const up = O.burnAt(el, 0, 0.05).after;
    expect(up.periAltKm).toBeCloseTo(200, 3);
    expect(up.apoAltKm).toBeGreaterThan(400);
    const down = O.burnAt(el, Math.PI, -0.05).after;
    expect(down.apoAltKm).toBeCloseTo(400, 3);
    expect(down.periAltKm).toBeLessThan(200);
  });

  it('a prograde burn leaves the speed change equal to dv, a retrograde burn too', () => {
    const el = O.orbitFromApsides(200, 400);
    const b = O.burnAt(el, 1, -0.03);
    expect(O.speedOf(b.next) - O.speedOf(b.state)).toBeCloseTo(-0.03, 10);
  });

  it('retrofire: a retro burn at apogee can bring the low point under the entry line', () => {
    const el = O.orbitFromApsides(160.88, 266.8);
    const dv = O.retroForPerigee(el, Math.PI, 78.3);
    const after = O.burnAt(el, Math.PI, -dv).after;
    expect(after.periAltKm).toBeCloseTo(78.3, 1);
    expect(after.entersAir).toBe(true);
    expect(el.entersAir).toBe(false);
  });

  it('an orbit with energy >= 0 is not closed', () => {
    const s = O.stateFromAltitudeSpeed({ altKm: 200, speedKms: 11.2 });
    expect(O.elements(s).bound).toBe(false);
  });

  it('radiusAtAngle matches the state at that point; sampleOrbit closes the loop', () => {
    const el = O.orbitFromApsides(200, 700);
    const s = O.stateAtTrueAnomaly(el, 2.2);
    expect(O.radiusAtAngle(el, el.w + 2.2)).toBeCloseTo(Math.hypot(s.x, s.y), 6);
    const pts = O.sampleOrbit(el, 90);
    expect(pts[0][0]).toBeCloseTo(pts[90][0], 6);
    expect(Math.hypot(...pts[0])).toBeCloseTo(O.R_EARTH + 200, 6);
    expect(Math.hypot(...pts[45])).toBeCloseTo(O.R_EARTH + 700, 6);
  });

  it('RK4 keeps energy and angular momentum (tiny drift) over an orbit, and returns after one period', () => {
    const s0 = O.stateAtTrueAnomaly(O.orbitFromApsides(160.88, 266.8), 0);
    const T = O.elements(s0).periodS;
    const s1 = O.propagate(s0, T, 5);
    expect(Math.abs(O.energy(s1) / O.energy(s0) - 1)).toBeLessThan(1e-8);
    expect(Math.abs(O.angularMomentum(s1) / O.angularMomentum(s0) - 1)).toBeLessThan(1e-8);
    expect(Math.hypot(s1.x - s0.x, s1.y - s0.y)).toBeLessThan(1);
  });

  it('trueAnomalyAfter agrees with the integrator', () => {
    const el = O.orbitFromApsides(200, 1500);
    const s0 = O.stateAtTrueAnomaly(el, 0.5);
    const nu = O.trueAnomalyAfter(el, 0.5, 1800);
    const s1 = O.propagate(s0, 1800, 2);
    const s2 = O.stateAtTrueAnomaly(el, nu);
    expect(Math.hypot(s1.x - s2.x, s1.y - s2.y)).toBeLessThan(1);
  });
});

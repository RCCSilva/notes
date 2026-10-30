import { describe, it, expect } from 'vitest';
import * as B from '../topics/mlb/battingStats/stats';
import * as P from '../topics/mlb/pitchingStats/stats';

// Numbers: research/mlb/04-batting-stats.md and 05-pitching-stats.md (MLB Stats API, 2025 regular season).
describe('batting formulas (Rule 9.21)', () => {
  const j = B.JUDGE_2025;
  it('reproduces Aaron Judge 2025', () => {
    const r = B.compute(j);
    expect(r.pa).toBe(679);
    expect(r.singles).toBe(94);
    expect(r.tb).toBe(372);
    expect(B.fmtRate(r.avg)).toBe('.331');
    expect(B.fmtRate(r.obp)).toBe('.457');
    expect(B.fmtRate(r.slg)).toBe('.688');
    expect(r.ops.toFixed(3)).toBe('1.145');
    expect(r.opsExact).toBeCloseTo(1.1442, 4);
    expect(r.problems).toEqual([]);
  });
  it('OBP: sacrifice flies are in the denominator, sacrifice bunts are not', () => {
    const base = { ab: 100, h: 30, d: 0, t: 0, hr: 0, bb: 10, hbp: 0, sf: 0, sh: 0 };
    expect(B.obp(base)).toBeCloseTo(40 / 110, 6);
    expect(B.obp({ ...base, sf: 5 })).toBeCloseTo(40 / 115, 6);
    expect(B.obp({ ...base, sh: 5 })).toBeCloseTo(40 / 110, 6);
    expect(B.plateAppearances({ ...base, sh: 5 })).toBe(115);
  });
  it('hit by pitch counts in both parts of OBP and a walk is not an at-bat', () => {
    expect(B.obp({ ab: 10, h: 2, bb: 0, hbp: 2, sf: 0 })).toBeCloseTo(4 / 12, 6);
    expect(B.avg({ h: 2, ab: 10 })).toBeCloseTo(0.2, 6);
  });
  it('total bases: 1, 2, 3, 4 per hit type', () => {
    expect(B.totalBases({ h: 10, d: 2, t: 1, hr: 1 })).toBe(6 + 4 + 3 + 4);
  });
  it('undefined without at-bats, and invalid inputs are flagged', () => {
    expect(B.avg({ h: 0, ab: 0 })).toBeNull();
    expect(B.fmtRate(null)).toBe('–');
    expect(B.problems({ ab: 5, h: 6, d: 0, t: 0, hr: 0 })).toContain('hitsOverAb');
    expect(B.problems({ ab: 50, h: 5, d: 3, t: 2, hr: 1 })).toContain('extraOverHits');
  });
  it('batting title: 162 x 3.1 = 502.2 -> 502', () => {
    expect(B.qualifyingPA(162)).toBe(502);
  });
  it('the rule’s tie-break example: 165 / 452 = .365', () => {
    expect(B.fmtRate(165 / 452)).toBe('.365');
  });
});

describe('pitching formulas', () => {
  const s = P.SKENES_2025;
  it('reproduces Paul Skenes 2025', () => {
    expect(P.innings(s.inn, s.outs)).toBeCloseTo(187.667, 3);
    expect(P.fmt(P.era(s))).toBe('1.97');
    expect(P.fmt(P.whip(s))).toBe('0.95');
    expect(P.fmt(P.k9(s))).toBe('10.36');
    expect(P.fmt(P.bb9(s))).toBe('2.01');
  });
  it('rule example: 3 earned runs in 9 1/3 innings = 2.89', () => {
    expect(P.fmt(P.era({ inn: 9, outs: 1, er: 3 }))).toBe('2.89');
  });
  it('each out is one third: 5 innings and 1 out is 5 1/3', () => {
    expect(P.innings(5, 1)).toBeCloseTo(5 + 1 / 3, 6);
    expect(P.totalOuts(5, 1)).toBe(16);
  });
  it('no innings: rates are undefined, not infinite', () => {
    expect(P.era({ inn: 0, outs: 0, er: 2 })).toBeNull();
    expect(P.fmt(P.whip({ inn: 0, outs: 0, h: 1, bb: 1 }))).toBe('–');
    expect(P.compute({ inn: 0, outs: 0, er: 0, h: 0, bb: 0, k: 0 }).noInnings).toBe(true);
  });
});

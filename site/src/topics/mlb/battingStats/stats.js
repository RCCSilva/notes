// Batting formulas, as research/mlb/04-batting-stats.md records them from the Official Baseball Rules 2026.
//   AVG = hits / at-bats                                         [S1 R9.21(b), p.155]
//   OBP = (hits + walks + hit-by-pitch) / (at-bats + walks + hit-by-pitch + sacrifice flies)   [S1 R9.21(f), p.155]
//   SLG = total bases / at-bats                                  [S1 R9.21(c), p.155]
//   OPS = OBP + SLG (not defined in Rule 9; the glossary S60 and the MLB feed S69 add the rounded OBP and SLG)
//   Total bases: single 1, double 2, triple 3, home run 4 (only hits count)  [S61]
//   Plate appearances = at-bats + walks + hit-by-pitch + sacrifice bunts + sacrifice flies (+ interference awards, not modeled) [S1 R9.22(a), p.156]
// Sacrifice bunts are not at-bats and are left out of OBP; sacrifice flies are not at-bats but are in the OBP denominator.

export const JUDGE_2025 = { ab: 541, h: 179, d: 30, t: 2, hr: 53, bb: 124, hbp: 7, sf: 7, sh: 0 };

const n = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);
const div = (a, b) => (b > 0 ? a / b : null);

/** Round half up to `digits` decimals, safe against floating-point noise (0.3309 -> 0.331). */
export function round(x, digits = 3) {
  if (x == null) return null;
  const f = 10 ** digits;
  return Math.round(x * f + 1e-9) / f;
}

/** ".331" for numbers below 1, "1.145" otherwise; "–" when undefined. */
export function fmtRate(x, digits = 3) {
  if (x == null) return '–';
  const s = round(x, digits).toFixed(digits);
  return s.startsWith('0.') ? s.slice(1) : s;
}

export function singles({ h, d, t, hr }) { return n(h) - n(d) - n(t) - n(hr); }
export function totalBases({ h, d, t, hr }) { return singles({ h, d, t, hr }) + 2 * n(d) + 3 * n(t) + 4 * n(hr); }
export function plateAppearances({ ab, bb, hbp, sf, sh }) { return n(ab) + n(bb) + n(hbp) + n(sf) + n(sh); }
export function avg({ h, ab }) { return div(n(h), n(ab)); }
export function obp({ h, bb, hbp, ab, sf }) { return div(n(h) + n(bb) + n(hbp), n(ab) + n(bb) + n(hbp) + n(sf)); }
export function slg(s) { return div(totalBases(s), n(s.ab)); }
/** OPS the way MLB prints it: the rounded OBP plus the rounded SLG. */
export function ops(s) {
  const o = obp(s);
  const l = slg(s);
  if (o == null || l == null) return null;
  return round(round(o) + round(l));
}
/** OPS from the unrounded numbers (for comparison). */
export function opsExact(s) {
  const o = obp(s);
  const l = slg(s);
  return o == null || l == null ? null : o + l;
}

/** Problems with the inputs, as codes: 'hitsOverAb' | 'extraOverHits'. */
export function problems(s) {
  const out = [];
  if (n(s.h) > n(s.ab)) out.push('hitsOverAb');
  if (n(s.d) + n(s.t) + n(s.hr) > n(s.h)) out.push('extraOverHits');
  return out;
}

export function compute(s) {
  const bad = problems(s);
  return {
    problems: bad,
    pa: plateAppearances(s),
    singles: bad.length ? null : singles(s),
    tb: bad.length ? null : totalBases(s),
    avg: bad.includes('hitsOverAb') ? null : avg(s),
    obp: obp(s),
    slg: bad.length ? null : slg(s),
    ops: bad.length ? null : ops(s),
    opsExact: bad.length ? null : opsExact(s),
  };
}

/** Plate appearances needed for the batting title: scheduled games x 3.1, rounded (162 x 3.1 = 502.2 -> 502). [S1 R9.22(a), p.156] */
export function qualifyingPA(games) { return Math.round(games * 3.1); }

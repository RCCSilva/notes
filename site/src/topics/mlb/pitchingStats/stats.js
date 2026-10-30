// Pitching formulas, as research/mlb/05-pitching-stats.md records them.
//   Each out is 1/3 of an inning                                  [S1 R9.02(c)(1) Comment, p.123]
//   ERA = earned runs x 9 / innings pitched (fractions included)  [S1 R9.21(e), p.155]
//   WHIP = (walks + hits) / innings pitched                       [S71]
//   K/9 = strikeouts x 9 / innings; BB/9 = walks x 9 / innings    [S90, S91]
// Innings are entered as whole innings + outs (0, 1 or 2), so no notation has to be guessed.

export const SKENES_2025 = { inn: 187, outs: 2, er: 41, h: 136, bb: 42, k: 216 };

const n = (v) => (Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0);

/** Whole innings plus extra outs -> innings as a number (187 and 2 outs = 187.667). */
export function innings(inn, outs) { return n(inn) + Math.min(2, n(outs)) / 3; }
/** Total outs recorded. */
export function totalOuts(inn, outs) { return n(inn) * 3 + Math.min(2, n(outs)); }

const per = (x, ip, mult = 1) => (ip > 0 ? (x * mult) / ip : null);

export function era({ inn, outs, er }) { return per(n(er), innings(inn, outs), 9); }
export function whip({ inn, outs, h, bb }) { return per(n(h) + n(bb), innings(inn, outs)); }
export function k9({ inn, outs, k }) { return per(n(k), innings(inn, outs), 9); }
export function bb9({ inn, outs, bb }) { return per(n(bb), innings(inn, outs), 9); }

export function round(x, digits = 2) {
  if (x == null) return null;
  const f = 10 ** digits;
  return Math.round(x * f + 1e-9) / f;
}
/** "1.97"; "–" when undefined (no innings yet). */
export function fmt(x, digits = 2) { return x == null ? '–' : round(x, digits).toFixed(digits); }

export function compute(s) {
  return { ip: innings(s.inn, s.outs), era: era(s), whip: whip(s), k9: k9(s), bb9: bb9(s), noInnings: totalOuts(s.inn, s.outs) === 0 };
}

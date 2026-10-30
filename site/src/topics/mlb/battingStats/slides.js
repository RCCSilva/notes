import * as V from './visuals';

// S1 = Official Baseball Rules 2026 (Rule 9). Real example: Aaron Judge, 2025 regular season, from the MLB Stats API (S69).
export const BATTING_SLIDES = [
  { id: 'bPa', Visual: V.PaVisual, refs: [['S1', 'R9.02(a)(1)', 121], ['S1', 'R9.22(a)', 156], ['S31'], ['S32'], ['S69']] },
  { id: 'bHit', Visual: V.HitVisual, refs: [['S1', 'R9.05(a)', 127], ['S1', 'R9.05(b)', 128], ['S56']] },
  { id: 'bTotal', Visual: V.TotalBasesVisual, refs: [['S61'], ['S1', 'R9.06(a)', 129], ['S1', 'R9.02(a)(8)', 122], ['S69']] },
  { id: 'bAvg', Visual: V.AvgVisual, refs: [['S1', 'R9.21(b)', 155], ['S57'], ['S69']] },
  { id: 'bSac', Visual: V.SacVisual, refs: [['S1', 'R9.02(a)(1)', 121], ['S1', 'R9.21(f)', 155], ['S65'], ['S66'], ['S21']] },
  { id: 'bObp', Visual: V.ObpVisual, refs: [['S1', 'R9.21(f) + Comment', 155], ['S58'], ['S69']] },
  { id: 'bSlg', Visual: V.SlgVisual, refs: [['S1', 'R9.21(c)', 155], ['S59'], ['S69']] },
  { id: 'bOps', Visual: V.OpsVisual, refs: [['S60'], ['S1', 'R9.21', 155], ['S69']] },
  { id: 'bTitle', Visual: V.TitleVisual, refs: [['S1', 'R9.22(a) + Comment', 156], ['S64']] },
  { id: 'bLine', Visual: V.LineVisual, refs: [['S69']] },
  { id: 'bCalc', Visual: V.BattingCalculator, refs: [['S1', 'R9.21(b),(c),(f)', 155], ['S1', 'R9.22(a)', 156], ['S60'], ['S69']] },
];

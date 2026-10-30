import * as V from './visuals';

// S1 = Official Baseball Rules 2026 (Rule 9). Real example: Paul Skenes, 2025 regular season, from the MLB Stats API (S95).
export const PITCHING_SLIDES = [
  { id: 'pIp', Visual: V.InningsVisual, refs: [['S1', 'R9.02(c)(1) Comment', 123], ['S78']] },
  { id: 'pNotation', Visual: V.NotationVisual, refs: [['S95']] },
  { id: 'pEarned', Visual: V.EarnedVisual, refs: [['S1', 'R9.16', 146], ['S1', 'R9.16(a)', 146], ['S1', 'R9.16(b)-(d)', 147], ['S81'], ['S82']] },
  { id: 'pEarnedEx', Visual: V.EarnedExampleVisual, refs: [['S1', 'R9.16(a) Comment (1)', 146]] },
  { id: 'pUnknown', Visual: V.UnknownVisual, refs: [['S1', 'R9.16(a) Comment (3)', 147], ['S1', 'R9.16(a) Comment (4)', 147]] },
  { id: 'pEra', Visual: V.EraVisual, refs: [['S1', 'R9.21(e) + Comment', 155], ['S1', 'R9.22(b)', 157], ['S70'], ['S95']] },
  { id: 'pWhip', Visual: V.WhipVisual, refs: [['S71'], ['S64'], ['S95']] },
  { id: 'pRates', Visual: V.RatesVisual, refs: [['S90'], ['S91'], ['S19'], ['S20'], ['S95']] },
  { id: 'pWin', Visual: V.WinVisual, refs: [['S1', 'R9.17(a)', 151], ['S1', 'R9.17(b)', 152], ['S1', 'R9.17(d)', 153], ['S72'], ['S73']] },
  { id: 'pSave', Visual: V.SaveVisual, refs: [['S1', 'R9.19', 153], ['S74']] },
  { id: 'pHold', Visual: V.HoldVisual, refs: [['S75'], ['S76'], ['S77'], ['S1', 'R9.02(c)', 122]] },
  { id: 'pLine', Visual: V.SkenesVisual, refs: [['S95']] },
  { id: 'pCalc', Visual: V.PitchingCalculator, refs: [['S1', 'R9.21(e)', 155], ['S1', 'R9.02(c)(1) Comment', 123], ['S71'], ['S90'], ['S91'], ['S95']] },
];

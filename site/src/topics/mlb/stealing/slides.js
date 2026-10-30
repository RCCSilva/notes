import * as V from './visuals';

// Rulebook = S1 (Official Baseball Rules 2026). Glossary-only claims (the disengagement limit, the effect of bigger bases) are marked in the text.
export const STEALING_SLIDES = [
  { id: 'stWhat', Visual: V.StealSafeVisual, refs: [['S1', 'R9.07', 132], ['S48']] },
  { id: 'stWhen', Visual: V.WhenVisual, refs: [['S48'], ['S50']] },
  { id: 'stLead', Visual: V.LeadVisual, refs: [['S53'], ['S50']] },
  { id: 'stCaught', Visual: V.StealOutVisual, refs: [['S1', 'R5.09(b)(4)', 58], ['S1', 'R9.07(h)', 134], ['S49']] },
  { id: 'stCases', Visual: V.CasesVisual, refs: [['S1', 'R9.07(h)', 134], ['S1', 'R9.07(h) Comment', 134], ['S49']] },
  { id: 'stCredit', Visual: V.CreditVisual, refs: [['S1', 'R9.07(a)-(g)', 132], ['S1', 'R9.07(d)-(f)', 133]] },
  { id: 'stIndiff', Visual: V.IndifferenceVisual, refs: [['S1', 'R9.07(g) + Comment', 133], ['S48']] },
  { id: 'stPickoff', Visual: V.PickoffVisual, refs: [['S1', 'R5.07(a)(1) Comment', 48], ['S1', 'R5.07(d)', 50], ['S1', 'R6.02(a)(2)-(3)', 91], ['S50']] },
  { id: 'stLimit', Visual: V.LimitVisual, refs: [['S46'], ['S47'], ['S1', 'R5.06(b)(3)(A)', 41]] },
  { id: 'stBases', Visual: V.BasesVisual, refs: [['S7'], ['S1', 'R2.03', 16]] },
  { id: 'stScore', Visual: V.StealLineVisual, refs: [['S1', 'R9.02(a)(9),(18)', 121], ['S68'], ['S69']] },
  { id: 'stRecord', Visual: V.RecordVisual, refs: [['S55']] },
];

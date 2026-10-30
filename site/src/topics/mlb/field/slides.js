import * as V from './visuals';

// Text lives in mlb/messages/<locale>.js under slides.<id>. refs: [sourceId, locator, pdfPage] (see ../sources.js, research/mlb/*.md).
export const FIELD_SLIDES = [
  { id: 'fIntro', Visual: V.IntroVisual, refs: [['S1', 'R1.01', 13], ['S1', 'R1.05-1.06', 13], ['S1', 'Definitions: INNING', 167]] },
  { id: 'fDiamond', Visual: V.DiamondVisual, refs: [['S1', 'R2.01', 14], ['S1', 'Definitions: A RUN', 169]] },
  { id: 'fOutfield', Visual: V.OutfieldVisual, refs: [['S1', 'R2.01', 14], ['S1', 'R2.01 NOTE (a)', 15], ['S6']] },
  { id: 'fFairFoul', Visual: V.FairFoulVisual, refs: [['S1', 'R2.01', 14], ['S1', 'Definitions: FAIR TERRITORY', 164], ['S1', 'Definitions: FOUL TERRITORY', 165]] },
  { id: 'fMound', Visual: V.MoundVisual, refs: [['S1', 'R2.04', 16], ['S1', 'R2.01', 14], ['S1', 'Appendix 1', 174], ['S6']] },
  { id: 'fPlate', Visual: V.PlateVisual, refs: [['S1', 'R2.02', 15], ['S1', 'R2.03', 16], ['S7']] },
  { id: 'fInnings', Visual: V.InningsVisual, refs: [['S1', 'Definitions: INNING', 167], ['S1', 'R5.01(a)', 30], ['S1', 'R7.01(a)', 104]] },
  { id: 'fEnding', Visual: V.EndingVisual, refs: [['S1', 'R1.05-1.06', 13], ['S1', 'R7.01(b)(1)', 104], ['S1', 'R7.01(e)', 106]] },
  { id: 'fExtra', Visual: V.ExtraVisual, refs: [['S1', 'R7.01(b)(2)', 104], ['S1', 'R7.01(b)(2)(C)', 105], ['S10']] },
];

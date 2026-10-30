import * as V from './leftVisuals';

// Text lives in reentry/messages/<locale>.js under slides.<id>. refs: [sourceId, locator, pdfPage]; "printed" = the manual's own page number.
export const GEMINI_LEFT_SLIDES = [
  { id: 'leftPanel', Visual: V.LeftPanelVisual, refs: [['S6', 'Fig 3-5 sheet 2, printed 3-22', 58], ['S6', 'Fig 4-1, printed 4-2', 67], ['S6', 'printed 4-38', 103], ['S6', 'printed 4-39 to 4-42', 104]] },
  { id: 'leftTypes', Visual: V.LeftTypesVisual, refs: [['S6', 'printed 4-6', 71], ['S6', 'printed 4-42', 107], ['S6', 'printed 4-43', 108]] },
  { id: 'leftSquib', Visual: V.LeftSquibVisual, refs: [['S6', 'printed 4-5, 4-6', 70], ['S6', 'printed 4-6', 71], ['S6', 'printed 4-43', 108], ['S6', 'printed 5-16, 5-17', 134], ['S6', 'printed 5-18, 5-19', 136], ['S6', 'printed 5-19', 137], ['S2', null, 93], ['S2', null, 98]] },
  { id: 'leftGaps', Visual: V.LeftGapsVisual, refs: [['S6', 'Fig 3-5 sheet 2, printed 3-22', 58], ['S6', 'Fig 10-6 sheet 2, printed 10-21', 343], ['S7', 'printed 8-225', 256], ['S8', 'printed 4-45', 119], ['S8', 'printed 4-46', 120]] },
];

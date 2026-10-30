import * as V from './rightVisuals';

// Text lives in reentry/messages/<locale>.js under slides.<id>. refs: [sourceId, locator, pdfPage]; "printed" = the manual's own page number.
export const GEMINI_RIGHT_SLIDES = [
  { id: 'rightPanel', Visual: V.RightPanelVisual, refs: [['S6', 'Fig 3-5 sheet 2, printed 3-22', 58], ['S6', 'printed 5-6, 5-7', 124], ['S6', 'printed 5-7', 125], ['S2', null, 20], ['S2', null, 109]] },
  { id: 'rightPower', Visual: V.RightPowerVisual, refs: [['S6', 'printed 5-3', 121], ['S6', 'Fig 5-4, printed 5-9', 127], ['S6', 'printed 5-16, 5-17', 134], ['S6', 'printed 5-18', 136], ['S6', 'printed 5-19', 137], ['S6', 'printed 5-21', 139], ['S6', 'printed 5-24', 142], ['S2', null, 109], ['S2', null, 111], ['S2', null, 112]] },
  { id: 'rightDocking', Visual: V.RightDockingVisual, refs: [['S7', 'printed 8-238', 269], ['S7', 'printed 8-281', 311], ['S6', 'printed 13-11', 505], ['S6', 'printed 13-15', 509], ['S6', 'printed 13-17, 13-18', 511], ['S6', 'printed 16-25', 664], ['S2', null, 120], ['S2', null, 122]] },
  { id: 'rightSystems', Visual: V.RightSystemsVisual, refs: [['S7', 'printed 8-45', 44], ['S7', 'printed 8-228', 259], ['S7', 'printed 8-373', 402], ['S6', 'printed 10-68', 390], ['S6', 'Fig 5-4, printed 5-9', 127], ['S6', 'printed 5-6, 5-7', 124]] },
  { id: 'rightGaps', Visual: V.RightGapsVisual, refs: [['S6', 'Fig 3-5 sheet 2, printed 3-22', 58], ['S6', 'printed 5-7', 125], ['S6', 'printed 5-19', 137], ['S6', 'printed 16-25', 664]] },
];

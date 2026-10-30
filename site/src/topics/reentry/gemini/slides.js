import * as V from './visuals';

// Text lives in reentry/messages/<locale>.js under slides.<id>. refs: [sourceId, locator, pdfPage].
export const GEMINI_COMM_SLIDES = [
  { id: 'commPanel', Visual: V.FullPanelVisual, refs: [['S2', null, 142], ['S2', null, 143]] },
  { id: 'commOperate', Visual: V.ControlTypesVisual, refs: [['S2', null, 9], ['S2', null, 10]] },
  { id: 'commInsertion', Visual: V.InsertionVisual, refs: [['S2', null, 143]] },
  { id: 'commHf', Visual: V.HfVisual, refs: [['S2', null, 143]] },
];

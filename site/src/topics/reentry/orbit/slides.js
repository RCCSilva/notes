import * as V from './visuals';

// Text lives in reentry/messages/<locale>.js under slides.<id>. refs: [sourceId, locator, page] (page = PDF page; for S10 the chapter, e.g. '3-4').
export const ORBIT_SLIDES = [
  { id: 'orbitWhat', Visual: V.CannonVisual, refs: [['S10', 'How Orbits Work', '3-4'], ['S10', 'Freefall', '3-4'], ['S12', 'Types of orbits']] },
  { id: 'orbitShape', Visual: V.ApsidesVisual, refs: [['S12', 'Types of orbits'], ['S10', 'A Periapsis by Any Other Name', '3-4'], ['S20', 'slides 34, 95', 34], ['S13', 'Earth Fact Sheet'], ['S16', 'Table 3-I, printed 28', 33], ['S17', 'Table 4-III, printed 4-15', 93], ['S19', 'printed 286', 307]] },
  { id: 'orbitBurn', Visual: V.BurnVisual, refs: [['S10', 'The Key to Space Flight', '3-4'], ['S19', 'Gemini VI-A, printed 286', 307], ['S18', 'burn tables', 345], ['S18', 'burn tables', 354], ['S15', 'printed 124', 133], ['S20', 'slides 50, 154', 50]] },
  { id: 'orbitRetro', Visual: V.RetroVisual, refs: [['S15', 'printed 40', 49], ['S15', 'printed 41', 50], ['S10', 'How Orbits Work', '3-4'], ['S17', 'Gemini IV retrofire', 82], ['S15', 'MA-7, printed 13', 22]] },
  { id: 'orbitCatch', Visual: V.CatchUpVisual, refs: [['S19', 'printed 248', 269], ['S19', 'Gemini VI-A, printed 286-287', 307], ['S20', 'Kepler, slides 90-91', 90], ['S17', 'section 7.1.2.4.1', 277]] },
];

import * as V from './visuals';

export const POSITIONS_SLIDES = [
  { id: 'pNine', Visual: V.NineVisual, refs: [['S1', 'R1.01', 13], ['S33'], ['S34'], ['S35'], ['S36'], ['S37'], ['S38'], ['S39'], ['S40'], ['S41']] },
  { id: 'pBattery', Visual: V.BatteryVisual, refs: [['S41'], ['S33'], ['S1', 'Definitions: THE BATTERY', 159], ['S1', 'R5.02(a)(b)', 30]] },
  { id: 'pInfield', Visual: V.InfieldVisual, refs: [['S34'], ['S35'], ['S36'], ['S37'], ['S1', 'Definitions: AN INFIELDER', 166]] },
  { id: 'pOutfield', Visual: V.OutfieldersVisual, refs: [['S38'], ['S39'], ['S40'], ['S1', 'Definitions: AN OUTFIELDER', 168]] },
  { id: 'pStand', Visual: V.StandVisual, refs: [['S1', 'R5.02', 30], ['S1', 'R5.02(a)', 30]] },
  { id: 'pDh', Visual: V.DhVisual, refs: [['S1', 'R5.11(a)(1)', 74], ['S15'], ['S42']] },
];

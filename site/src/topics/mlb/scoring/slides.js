import * as V from './visuals';

export const SCORING_SLIDES = [
  { id: 'sZone', Visual: V.ZoneVisual, refs: [['S1', 'Definitions: THE STRIKE ZONE', 170], ['S5']] },
  { id: 'sBallStrike', Visual: V.BallStrikeVisual, refs: [['S1', 'Definitions: A BALL', 159], ['S1', 'Definitions: A STRIKE', 170]] },
  { id: 'sFoul', Visual: V.FoulVisual, refs: [['S1', 'Definitions: A STRIKE (c)', 170], ['S1', 'Definitions: A FOUL BALL', 165], ['S19']] },
  { id: 'sCount', Visual: V.CountVisual, refs: [['S1', 'R5.05(b)(1)', 38], ['S1', 'Definitions: A BASE ON BALLS', 159], ['S1', 'Definitions: A STRIKE', 170], ['S19']] },
  { id: 'sHits', Visual: V.HitsVisual, refs: [['S1', 'R5.05(a)(1)', 36], ['S22'], ['S23'], ['S24']] },
  { id: 'sHomeRun', Visual: V.HomeRunVisual, refs: [['S1', 'R5.05(a)(5)', 37], ['S25']] },
  { id: 'sWalk', Visual: V.WalkVisual, refs: [['S1', 'R5.05(b)(1)(2)', 38], ['S21']] },
  { id: 'sOther', Visual: V.OtherVisual, refs: [['S1', 'R5.05(a)(2)', 36], ['S1', 'R5.05(b)(3)', 38], ['S1', 'Definitions: ORDINARY EFFORT', 168], ['S26']] },
  { id: 'sRun', Visual: V.RunVisual, refs: [['S1', 'Definitions: A RUN', 169], ['S1', 'R1.04', 13]] },
  { id: 'sRunCounts', Visual: V.RunCountsVisual, refs: [['S1', 'R5.08(a)', 51], ['S1', 'R5.08 Approved Ruling', 52]] },
];

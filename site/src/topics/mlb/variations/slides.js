import * as V from './visuals';

// S1 = Official Baseball Rules 2026. Dropped third strike is in the "outs" lesson: here only the extra details.
export const VARIATIONS_SLIDES = [
  { id: 'vInfield', Visual: V.InfieldFlyVisual, refs: [['S1', 'Definitions: AN INFIELD FLY', 166], ['S1', 'R5.09(a)(5)', 54], ['S17']] },
  { id: 'vInfieldConds', Visual: V.InfieldConditionsVisual, refs: [['S1', 'Definitions: AN INFIELD FLY', 166], ['S1', 'Definitions: ORDINARY EFFORT', 168]] },
  { id: 'vInfieldWhy', Visual: V.InfieldWhyVisual, refs: [['S17'], ['S54'], ['S1', 'Definitions: AN INFIELD FLY', 166]] },
  { id: 'vInfieldRule', Visual: V.InfieldRuleVisual, refs: [['S1', 'Definitions: AN INFIELD FLY', 166], ['S1', 'R5.09(a)(5)', 54]] },
  { id: 'vInfield2012', Visual: V.Infield2012Visual, refs: [['S54'], ['S1', 'Definitions: AN INFIELD FLY, Comment', 166]] },
  { id: 'vFairFly', Visual: V.FairFlyVisual, refs: [['S1', 'Definitions: A FAIR BALL', 163], ['S1', 'Definitions: A FOUL BALL', 165], ['S12'], ['S13']] },
  { id: 'vBounce', Visual: V.BounceVisual, refs: [['S1', 'Definitions: A FAIR BALL, Comment', 163], ['S1', 'Definitions: A FOUL BALL, Comment', 165]] },
  { id: 'vDropped', Visual: V.DroppedExtraVisual, refs: [['S1', 'R5.05(a)(2) Comment', 36], ['S1', 'R5.06(c)(7) Comment', 47], ['S51'], ['S52']] },
  { id: 'vTagUp', Visual: V.TagUpVisual, refs: [['S1', 'Definitions: A CATCH', 160], ['S1', 'R5.09(c)(1) + Comment', 62], ['S1', 'R5.09(b)(5)', 58], ['S45']] },
  { id: 'vTimePlay', Visual: V.TimePlayVisual, refs: [['S1', 'R5.08 Comment', 53], ['S1', 'Definitions: A FORCE PLAY, Comment', 164]] },
  { id: 'vOverrun', Visual: V.OverrunVisual, refs: [['S1', 'R5.09(b)(4) Exception', 58], ['S1', 'R5.09(b)(11)', 61], ['S1', 'R5.09(c)(3)', 62], ['S1', 'R5.09(b)(6)', 59]] },
  { id: 'vPassed', Visual: V.PassedVisual, refs: [['S1', 'R5.06(b)(1)', 40], ['S1', 'Summary of Rule Changes for 2026', 5]] },
  { id: 'vForceTouch', Visual: V.ForceTouchVisual, refs: [['S1', 'R5.09(b)(6) + Comment', 59]] },
  { id: 'vYears', Visual: V.YearsVisual, refs: [['S7'], ['S8'], ['S9'], ['S10'], ['S15'], ['S2', 'Summary of Rule Changes for 2025', 5], ['S1', 'R5.02(c) Penalty', 31], ['S1', 'R2.03', 16]] },
  { id: 'v2026', Visual: V.Changes2026Visual, refs: [['S1', 'Summary of Rule Changes for 2026', 5], ['S1', 'Summary of Rule Changes for 2026', 6]] },
  { id: 'vTimer', Visual: V.TimerVisual, refs: [['S8'], ['S47'], ['S1', 'R5.07(c)', 50]] },
  { id: 'vAuto', Visual: V.AutoRunnerVisual, refs: [['S10'], ['S1', 'R7.01(b)(2)', 104]] },
];

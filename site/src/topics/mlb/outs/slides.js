import * as V from './visuals';

export const OUTS_SLIDES = [
  { id: 'oThree', Visual: V.ThreeOutsVisual, refs: [['S1', 'Definitions: AN OUT', 168], ['S1', 'Definitions: AN INNING', 167], ['S29']] },
  { id: 'oStrikeout', Visual: V.StrikeoutVisual, refs: [['S1', 'R5.09(a)(2) + Comment', 54], ['S19']] },
  { id: 'oDropped', Visual: V.DroppedVisual, refs: [['S1', 'R5.09(a)(3)', 54], ['S1', 'R5.05(a)(2)', 36], ['S1', 'R5.09(a)(10)', 55], ['S19']] },
  { id: 'oFly', Visual: V.FlyoutVisual, refs: [['S1', 'R5.09(a)(1)', 54], ['S1', 'Definitions: A CATCH', 160], ['S27']] },
  { id: 'oGround', Visual: V.GroundoutVisual, refs: [['S1', 'R5.09(a)(10)', 55], ['S28']] },
  { id: 'oTag', Visual: V.TagVisual, refs: [['S1', 'R5.09(b)(4)', 58], ['S1', 'Definitions: A TAG', 170]] },
  { id: 'oForce', Visual: V.ForceVisual, refs: [['S1', 'Definitions: A FORCE PLAY', 164], ['S1', 'R5.09(b)(6)', 59], ['S11']] },
  { id: 'oForceGone', Visual: V.ForceGoneVisual, refs: [['S1', 'Definitions: A FORCE PLAY, Comment', 164], ['S1', 'R5.09(b)(6)', 59]] },
];

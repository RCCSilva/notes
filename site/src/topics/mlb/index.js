import { FIELD_SLIDES } from './field/slides';
import { POSITIONS_SLIDES } from './positions/slides';
import { SCORING_SLIDES } from './scoring/slides';
import { OUTS_SLIDES } from './outs/slides';
import { STEALING_SLIDES } from './stealing/slides';
import { VARIATIONS_SLIDES } from './variations/slides';
import { BATTING_SLIDES } from './battingStats/slides';
import { PITCHING_SLIDES } from './pitchingStats/slides';
import { resolveRef } from './sources';
import Field from './components/field/Field';
import './mlb.css';

// The MLB note. Its card art on the home page is the field.
export default {
  id: 'mlb',
  section: 'sports',
  resolveRef,
  Art: Field,
  lessons: [
    { id: 'field', level: 'basic', slides: FIELD_SLIDES },
    { id: 'positions', level: 'basic', slides: POSITIONS_SLIDES },
    { id: 'scoring', level: 'basic', slides: SCORING_SLIDES },
    { id: 'outs', level: 'basic', slides: OUTS_SLIDES },
    { id: 'stealing', level: 'basic', slides: STEALING_SLIDES },
    { id: 'variations', level: 'intermediate', slides: VARIATIONS_SLIDES },
    { id: 'battingStats', level: 'intermediate', slides: BATTING_SLIDES },
    { id: 'pitchingStats', level: 'intermediate', slides: PITCHING_SLIDES },
    { id: 'special', level: 'advanced' },
    { id: 'advancedMetrics', level: 'advanced' },
  ],
};

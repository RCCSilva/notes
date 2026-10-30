import { BASICS_SLIDES, POSITIONS_SLIDES } from './basics/slides';
import { GAME_SLIDES } from './game/slides';
import { OVERTIME_SLIDES } from './overtime/slides';
import { FOULS_SLIDES, COMMON_FOULS_SLIDES } from './fouls/slides';
import { SEASON_SLIDES } from './season/slides';
import { DEFENSE_TACTICS_SLIDES } from './tactics/slides';
import { DRAFT_SLIDES } from './draft/slides';
import { TRADES_SLIDES, TAGS_SLIDES, CAP_SLIDES, CONTRACTS_SLIDES } from './money/slides';
import { resolveRef } from './sources';
import Field from './components/field/Field';
import './nfl.css';

// The NFL note. Its card art on the home page is the field.
export default {
  id: 'nfl',
  section: 'sports',
  resolveRef,
  Art: Field,
  lessons: [
    { id: 'basics', level: 'basic', slides: BASICS_SLIDES },
    { id: 'game', level: 'basic', slides: GAME_SLIDES },
    { id: 'positions', level: 'basic', slides: POSITIONS_SLIDES },
    { id: 'fouls', level: 'basic', slides: FOULS_SLIDES },
    { id: 'overtime', level: 'basic', slides: OVERTIME_SLIDES },
    { id: 'season', level: 'basic', slides: SEASON_SLIDES },
    { id: 'commonFouls', level: 'intermediate', slides: COMMON_FOULS_SLIDES },
    { id: 'defenseTactics', level: 'intermediate', slides: DEFENSE_TACTICS_SLIDES },
    { id: 'draft', level: 'intermediate', slides: DRAFT_SLIDES },
    { id: 'trades', level: 'intermediate', slides: TRADES_SLIDES },
    { id: 'contracts', level: 'intermediate', slides: CONTRACTS_SLIDES },
    { id: 'strategy', level: 'intermediate' },
    { id: 'matchCoverage', level: 'advanced' },
    { id: 'cap', level: 'advanced', slides: CAP_SLIDES },
    { id: 'tags', level: 'advanced', slides: TAGS_SLIDES },
  ],
};

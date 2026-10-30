import { GEMINI_COMM_SLIDES } from './gemini/slides';
import { GEMINI_LEFT_SLIDES } from './gemini/leftSlides';
import { GEMINI_RIGHT_SLIDES } from './gemini/rightSlides';
import { ORBIT_SLIDES } from './orbit/slides';
import { resolveRef } from './sources';
import './reentry.css';

// Reentry (spaceflight simulator) cockpit panels. PROOF OF CONCEPT: a basic orbits lesson with a burn simulator, the Gemini communication panel and the Gemini left and right switch and circuit breaker panels.
export default {
  id: 'reentry',
  section: 'simulators',
  resolveRef,
  // Ordered by level: basic, intermediate, advanced. Lessons without slides show as "coming soon".
  lessons: [
    { id: 'orbits', level: 'basic', wip: true, slides: ORBIT_SLIDES },
    { id: 'mercury', level: 'basic' },
    { id: 'geminiComm', level: 'intermediate', wip: true, slides: GEMINI_COMM_SLIDES },
    { id: 'geminiLeft', level: 'intermediate', wip: true, slides: GEMINI_LEFT_SLIDES },
    { id: 'geminiRight', level: 'intermediate', slides: GEMINI_RIGHT_SLIDES },
    { id: 'apollo', level: 'advanced' },
    { id: 'orbitMath', level: 'advanced' },
  ],
};

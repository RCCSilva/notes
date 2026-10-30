import nfl from './nfl';
import reentry from './reentry';
import mlb from './mlb';
import { SECTIONS } from './sections';

// All topics. Each topic is self-contained in its folder (lessons, messages, sources, its own components)
// and exports its definition from index.js. A lesson with `slides` is live; without it, it shows as "coming soon".
// Titles and text come from i18n: `<topic>.lessons.<lessonId>.*`. Optional `Art`: the topic card's picture.
export const TOPICS = [nfl, reentry, mlb];

export const findTopic = (id) => TOPICS.find((t) => t.id === id);

// The home groups topics by `topic.section` (an id from sections.js), in section order, keeping registry order inside each.
// A topic with a missing or unknown section is a programming error: throw so tests and the build catch it.
export function groupBySection(topics = TOPICS) {
  for (const topic of topics) {
    if (!SECTIONS.includes(topic.section)) throw new Error(`Topic "${topic.id}" has unknown section "${topic.section}". Known: ${SECTIONS.join(', ')}`);
  }
  return SECTIONS.map((id) => ({ id, topics: topics.filter((t) => t.section === id) })).filter((s) => s.topics.length);
}

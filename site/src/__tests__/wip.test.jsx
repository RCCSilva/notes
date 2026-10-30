// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, within } from '@testing-library/react';
import App from '../App';
import { TOPICS as topics } from '../topics/registry';
import en from '../i18n/messages/en.js';
import es from '../i18n/messages/es.js';
import pt from '../i18n/messages/pt-BR.js';

window.scrollTo = () => Promise.resolve();
window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });

const TEXT = {
  en: ['Under construction', 'This lesson is still being reviewed; it may contain mistakes.'],
  es: ['En construcción', 'Esta lección todavía se está revisando; puede contener errores.'],
  'pt-BR': ['Em construção', 'Esta lição ainda está em revisão; pode conter erros.'],
};
const mlb = topics.find((t) => t.id === 'mlb');
const reentry = topics.find((t) => t.id === 'reentry');
const nfl = topics.find((t) => t.id === 'nfl');

describe('under construction (wip) lessons', () => {
  afterEach(cleanup);

  it('flags exactly the intended lessons', () => {
    expect(mlb.lessons.filter((l) => l.wip).map((l) => l.id)).toEqual(['field', 'positions', 'scoring', 'outs', 'stealing', 'variations', 'battingStats', 'pitchingStats']);
    expect(reentry.lessons.filter((l) => l.wip).map((l) => l.id)).toEqual(['orbits', 'geminiComm', 'geminiLeft']);
    expect(nfl.lessons.some((l) => l.wip)).toBe(false);
  });

  it('message parity', () => {
    for (const m of [es, pt]) {
      expect(typeof m.topic.wip).toBe('string');
      expect(typeof m.topic.wipNote).toBe('string');
    }
    expect([es.topic.wip, pt.topic.wip, en.topic.wip]).toEqual(['En construcción', 'Em construção', 'Under construction']);
  });

  for (const loc of Object.keys(TEXT)) {
    const [badge, note] = TEXT[loc];
    it(`shows the badge in hub, sidebar and lesson page (${loc})`, async () => {
      window.location.hash = `#/${loc}/mlb`;
      let { container } = render(<App />);
      await screen.findByRole('heading', { level: 1 });
      expect(container.querySelectorAll('.lesson .wip-badge').length).toBe(8);
      expect(container.querySelectorAll('.lesson.is-soon .wip-badge').length).toBe(0);
      cleanup();

      window.location.hash = `#/${loc}/mlb/field`;
      ({ container } = render(<App />));
      const sidebar = await screen.findByRole('complementary');
      expect(within(sidebar).getAllByText(badge).length).toBe(8);
      expect(screen.getByRole('note').textContent).toContain(note);
      cleanup();

      window.location.hash = `#/${loc}/reentry/geminiRight`;
      ({ container } = render(<App />));
      const side2 = await screen.findByRole('complementary');
      expect(within(side2).getAllByText(badge).length).toBe(3);
      expect(screen.queryByText(note)).toBeNull();
      expect(container.querySelector('.wip-note')).toBeNull();
      cleanup();

      window.location.hash = `#/${loc}/nfl/basics`;
      ({ container } = render(<App />));
      await screen.findByRole('complementary');
      expect(container.querySelector('.wip-badge, .wip-note')).toBeNull();
    });
  }
});

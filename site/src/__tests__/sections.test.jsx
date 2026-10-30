// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, act, cleanup } from '@testing-library/react';
import App from '../App';
import { TOPICS, groupBySection } from '../topics/registry';
import { SECTIONS } from '../topics/sections';
import en from '../i18n/messages/en';
import es from '../i18n/messages/es';
import ptBR from '../i18n/messages/pt-BR';

window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
window.scrollTo = () => Promise.resolve();

describe('home sections', () => {
  afterEach(cleanup);

  it('groups every topic into a known section, in order', () => {
    const groups = groupBySection();
    expect(groups.map((g) => g.id)).toEqual(['sports', 'simulators']);
    expect(groups[0].topics.map((t) => t.id)).toEqual(['nfl', 'mlb']);
    expect(groups[1].topics.map((t) => t.id)).toEqual(['reentry']);
    expect(groups.flatMap((g) => g.topics).length).toBe(TOPICS.length);
  });

  it('rejects a topic without a known section and hides empty sections', () => {
    expect(() => groupBySection([{ id: 'x' }])).toThrow(/unknown section/);
    expect(() => groupBySection([{ id: 'x', section: 'nope' }])).toThrow(/unknown section/);
    expect(groupBySection([{ id: 'x', section: 'simulators' }]).map((g) => g.id)).toEqual(['simulators']);
  });

  it('has titles and descriptions in en, es and pt-BR for every section', () => {
    for (const m of [en, es, ptBR]) {
      for (const id of SECTIONS) {
        expect(m.home.sections[id].title).toBeTruthy();
        expect(m.home.sections[id].desc).toBeTruthy();
      }
    }
    expect(ptBR.home.sections.sports.title).toBe('Esportes');
    expect(es.home.sections.simulators.title).toBe('Simuladores y juegos');
  });

  it('renders an h2 per section with its topic cards, and URLs stay unchanged', async () => {
    window.location.hash = '#/en';
    render(<App />);
    await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
    const sections = [...document.querySelectorAll('section.home-section')];
    expect(sections.map((s) => s.querySelector('h2').textContent)).toEqual(['Sports', 'Simulators & games']);
    expect([...sections[0].querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual(['#/en/nfl', '#/en/mlb']);
    expect([...sections[1].querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual(['#/en/reentry']);
  });
});

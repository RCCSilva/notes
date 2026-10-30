// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, act, cleanup, screen, fireEvent } from '@testing-library/react';
import axe from 'axe-core';
import App from '../App';
import mlb from '../topics/mlb';
import { resolveRef } from '../topics/mlb/sources';

window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
window.scrollTo = () => Promise.resolve();

async function open(hash) {
  window.location.hash = hash;
  render(<App />);
  await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
}

describe('mlb topic', () => {
  afterEach(cleanup);

  it('is on the home page and the hub lists live and coming-soon lessons in every language', async () => {
    for (const [loc, soon] of [['en', 'Coming soon'], ['es', 'Próximamente'], ['pt-BR', 'Em breve']]) {
      await open(`#/${loc}`);
      expect(document.body.textContent).toMatch(/MLB/);
      cleanup();
      await open(`#/${loc}/mlb`);
      expect(document.querySelectorAll('.lesson').length).toBe(mlb.lessons.length);
      expect(document.querySelectorAll('.lesson.is-soon').length).toBe(mlb.lessons.filter((l) => !l.slides).length);
      expect(document.body.textContent).toMatch(new RegExp(soon, 'i'));
      cleanup();
    }
  });

  it('every lesson has a title and summary in every language, every slide has text', async () => {
    const { default: en } = await import('../topics/mlb/messages/en.js');
    const { default: es } = await import('../topics/mlb/messages/es.js');
    const { default: pt } = await import('../topics/mlb/messages/pt-BR.js');
    for (const m of [en, es, pt]) {
      mlb.lessons.forEach((l) => {
        expect(m.lessons[l.id]?.title, l.id).toBeTruthy();
        expect(m.lessons[l.id]?.summary, l.id).toBeTruthy();
        (l.slides ?? []).forEach((s) => expect(m.slides[s.id]?.title, s.id).toBeTruthy());
      });
    }
    // same keys everywhere
    const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
    expect(keys(es).sort()).toEqual(keys(en).sort());
    expect(keys(pt).sort()).toEqual(keys(en).sort());
  });

  it('source chips: rulebook has no verified URL (not a link); glossary pages link to the exact URL', () => {
    expect(resolveRef(['S1', 'R2.01', 14]).href).toBeNull();
    expect(resolveRef(['S5']).href).toBe('https://www.mlb.com/glossary/rules/strike-zone');
    expect(resolveRef(['S33']).href).toBe('https://www.mlb.com/glossary/positions/catcher');
    expect(resolveRef(['S1', 'R2.01', 14]).label).toMatch(/p\.14/);
  });

  it('positions: tapping a position shows what the glossary says; the slide says the list is built from glossary and rules', async () => {
    await open('#/en/mlb/positions?s=1');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Shortstop' })); });
    expect(document.body.textContent).toMatch(/captain of the infield/);
    expect(document.body.textContent).toMatch(/doesn’t list the nine by name/);
    const hrefs = [...document.querySelectorAll('.slide-refs a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://www.mlb.com/glossary/positions/shortstop');
    expect(document.querySelectorAll('.slide-refs .ref-nolink').length).toBeGreaterThan(0);
  });

  it('count stop motion: 8 frames, back disabled on the first, ends on the walk and forward is disabled', async () => {
    await open('#/en/mlb/scoring?s=4');
    expect(screen.getByText('Frame 1 of 8')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Previous step' }).disabled).toBe(true);
    for (let i = 0; i < 7; i += 1) await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Next step' })); });
    expect(screen.getByText('Frame 8 of 8')).toBeTruthy();
    expect(document.body.textContent).toMatch(/Ball four: the batter goes to first base/);
    expect(screen.getByRole('button', { name: 'Next step' }).disabled).toBe(true);
  });

  it('coming-soon lessons are not routable', async () => {
    await open('#/en/mlb/special');
    expect(document.querySelector('.slide')).toBeNull();
  });

  it('every slide renders with motion on, switching languages, without console errors', { timeout: 120000 }, async () => {
    const errors = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...a) => errors.push(a.join(' ')));
    const reduced = window.matchMedia;
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
    for (const l of mlb.lessons.filter((x) => x.slides)) {
      for (let i = 0; i < l.slides.length; i += 1) {
        window.location.hash = `#/en/mlb/${l.id}?s=${i + 1}`;
        render(<App />);
        await act(async () => { await new Promise((r) => setTimeout(r, 120)); });
        for (const code of ['ES', 'PT', 'EN']) await act(async () => { fireEvent.click(screen.getByRole('button', { name: code })); });
        cleanup();
      }
    }
    window.matchMedia = reduced;
    spy.mockRestore();
    expect(errors.filter((e) => !e.includes('not wrapped in act'))).toEqual([]);
  });

  it('axe: hub and every slide, in pt-BR', { timeout: 120000 }, async () => {
    const found = [];
    const hashes = ['#/pt-BR/mlb', ...mlb.lessons.filter((l) => l.slides).flatMap((l) => l.slides.map((_, i) => `#/pt-BR/mlb/${l.id}?s=${i + 1}`))];
    for (const h of hashes) {
      await open(h);
      const res = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false } } });
      found.push(...res.violations.map((v) => `${h} ${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`));
      cleanup();
    }
    expect(found).toEqual([]);
  });
});

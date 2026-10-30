// @vitest-environment jsdom
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, act, cleanup, screen, fireEvent, within } from '@testing-library/react';
import axe from 'axe-core';
import App from '../App';
import mlb from '../topics/mlb';
import { resolveRef } from '../topics/mlb/sources';
import en from '../topics/mlb/messages/en.js';
import es from '../topics/mlb/messages/es.js';
import pt from '../topics/mlb/messages/pt-BR.js';

window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
window.scrollTo = () => Promise.resolve();

const NEW = ['stealing', 'variations', 'battingStats', 'pitchingStats'];
const lessons = mlb.lessons.filter((l) => NEW.includes(l.id));

async function open(hash) {
  window.location.hash = hash;
  render(<App />);
  await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
}

describe('mlb: stealing, variations, batting and pitching stats', () => {
  afterEach(cleanup);

  it('are live; special and advancedMetrics stay coming soon; the hub orders basic, intermediate, advanced', () => {
    expect(lessons.every((l) => l.slides?.length > 0)).toBe(true);
    expect(mlb.lessons.filter((l) => !l.slides).map((l) => l.id)).toEqual(['special', 'advancedMetrics']);
    const rank = { basic: 0, intermediate: 1, advanced: 2 };
    const levels = mlb.lessons.map((l) => rank[l.level]);
    expect(levels).toEqual([...levels].sort());
  });

  it('every slide has text in en, es and pt-BR with the same keys', () => {
    const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? keys(v, `${p}${k}.`) : [`${p}${k}`]));
    for (const m of [en, es, pt]) {
      for (const l of lessons) {
        expect(m.lessons[l.id].title).toBeTruthy();
        expect(m.lessons[l.id].summary).not.toMatch(/^(Planned|Planeado|Planejado)/);
        for (const s of l.slides) {
          expect(m.slides[s.id]?.title, s.id).toBeTruthy();
          expect(m.slides[s.id]?.body || m.slides[s.id]?.example, s.id).toBeTruthy();
        }
      }
    }
    expect(keys(es).sort()).toEqual(keys(en).sort());
    expect(keys(pt).sort()).toEqual(keys(en).sort());
  });

  it('every slide has source chips, and every ref resolves', () => {
    for (const l of lessons) {
      for (const s of l.slides) {
        expect(s.refs?.length, s.id).toBeGreaterThan(0);
        for (const ref of s.refs) expect(() => resolveRef(ref), `${s.id} ${ref}`).not.toThrow();
      }
    }
    expect(resolveRef(['S69']).href).toMatch(/^https:\/\/statsapi\.mlb\.com\//);
    expect(resolveRef(['S48']).href).toBe('https://www.mlb.com/glossary/standard-stats/stolen-base');
    expect(resolveRef(['S54']).href).toMatch(/mlb\.com\/news\/infield-fly/);
  });

  it('stealing: the glossary-only pickoff limit is labelled as such', async () => {
    const i = lessons.find((l) => l.id === 'stealing').slides.findIndex((s) => s.id === 'stLimit');
    await open(`#/en/mlb/stealing?s=${i + 1}`);
    expect(document.body.textContent).toMatch(/comes from MLB’s glossary only/);
    expect(document.body.textContent).toMatch(/Frame 1 of 4/);
  });

  it('stealing: the steal scene steps to the end and stops (stop motion rules)', async () => {
    await open('#/en/mlb/stealing?s=1');
    expect(screen.getByRole('button', { name: 'Previous step' }).disabled).toBe(true);
    for (let k = 0; k < 3; k += 1) await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Next step' })); });
    expect(screen.getByText('Frame 4 of 4')).toBeTruthy();
    expect(document.body.textContent).toMatch(/a stolen base/);
    expect(screen.getByRole('button', { name: 'Next step' }).disabled).toBe(true);
  });

  it('variations: the pitch timer slide shows both numbers as a conflict', async () => {
    const i = lessons.find((l) => l.id === 'variations').slides.findIndex((s) => s.id === 'vTimer');
    await open(`#/en/mlb/variations?s=${i + 1}`);
    expect(document.body.textContent).toMatch(/12 seconds/);
    expect(document.body.textContent).toMatch(/15 seconds/);
    expect(document.body.textContent).toMatch(/can’t tell which one is used today/);
  });

  it('pitching: the 187.2 notation is labelled as our inference in the Interpretation box', async () => {
    const i = lessons.find((l) => l.id === 'pitchingStats').slides.findIndex((s) => s.id === 'pNotation');
    await open(`#/en/mlb/pitchingStats?s=${i + 1}`);
    expect(document.querySelector('.slide-insight')?.textContent).toMatch(/our inference/);
  });

  it('batting calculator: starts at Judge 2025 and recomputes when the inputs change', async () => {
    const i = lessons.find((l) => l.id === 'battingStats').slides.findIndex((s) => s.id === 'bCalc');
    await open(`#/en/mlb/battingStats?s=${i + 1}`);
    const out = (id) => screen.getByTestId(id).textContent;
    expect([out('out-pa'), out('out-tb'), out('out-avg'), out('out-obp'), out('out-slg'), out('out-ops')]).toEqual(['679', '372', '.331', '.457', '.688', '1.145']);
    await act(async () => { fireEvent.change(screen.getByLabelText('Walks (BB)'), { target: { value: '0' } }); });
    expect(out('out-obp')).toBe('.335');
    expect(out('out-pa')).toBe('555');
    // more hits than at-bats: a warning, no AVG
    await act(async () => { fireEvent.change(screen.getByLabelText('Hits (H)'), { target: { value: '600' } }); });
    expect(screen.getByRole('alert').textContent).toMatch(/cannot be more than at-bats/);
    expect(out('out-avg')).toBe('–');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Judge 2025' })); });
    expect(out('out-avg')).toBe('.331');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Clear' })); });
    expect(out('out-avg')).toBe('–');
    expect(out('out-pa')).toBe('0');
  });

  it('pitching calculator: Skenes 2025, partial innings and the empty state', async () => {
    const i = lessons.find((l) => l.id === 'pitchingStats').slides.findIndex((s) => s.id === 'pCalc');
    await open(`#/en/mlb/pitchingStats?s=${i + 1}`);
    const out = (id) => screen.getByTestId(id).textContent;
    expect([out('out-era'), out('out-whip'), out('out-k9'), out('out-bb9')]).toEqual(['1.97', '0.95', '10.36', '2.01']);
    // 9 1/3 innings, 3 earned runs: the rule's example, 2.89
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Whole innings'), { target: { value: '9' } });
      fireEvent.change(screen.getByLabelText('Extra outs'), { target: { value: '1' } });
      fireEvent.change(screen.getByLabelText('Earned runs (ER)'), { target: { value: '3' } });
    });
    expect(out('out-era')).toBe('2.89');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Clear' })); });
    expect(out('out-era')).toBe('–');
    expect(screen.getByRole('alert').textContent).toMatch(/Enter some innings/);
  });

  it('calculators work in es and pt-BR labels', async () => {
    const i = lessons.find((l) => l.id === 'battingStats').slides.findIndex((s) => s.id === 'bCalc');
    await open(`#/pt-BR/mlb/battingStats?s=${i + 1}`);
    expect(screen.getByLabelText('Vezes ao bate (AB)')).toBeTruthy();
    cleanup();
    const j = lessons.find((l) => l.id === 'pitchingStats').slides.findIndex((s) => s.id === 'pCalc');
    await open(`#/es/mlb/pitchingStats?s=${j + 1}`);
    expect(screen.getByLabelText('Entradas completas')).toBeTruthy();
  });

  it('typing in a calculator field does not change the slide (arrow keys stay in the input)', async () => {
    const i = lessons.find((l) => l.id === 'pitchingStats').slides.findIndex((s) => s.id === 'pCalc');
    await open(`#/en/mlb/pitchingStats?s=${i + 1}`);
    const input = screen.getByLabelText('Hits (H)');
    input.focus();
    await act(async () => { fireEvent.keyDown(input, { key: 'ArrowLeft', bubbles: true }); });
    expect(window.location.hash).toContain(`s=${i + 1}`);
  });

  it('every new slide renders with motion on, switching languages, without console errors', { timeout: 240000 }, async () => {
    const errors = [];
    const spy = vi.spyOn(console, 'error').mockImplementation((...a) => errors.push(a.join(' ')));
    const reduced = window.matchMedia;
    window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
    for (const l of lessons) {
      for (let i = 0; i < l.slides.length; i += 1) {
        window.location.hash = `#/en/mlb/${l.id}?s=${i + 1}`;
        render(<App />);
        await act(async () => { await new Promise((r) => setTimeout(r, 60)); });
        for (const code of ['ES', 'PT', 'EN']) await act(async () => { fireEvent.click(screen.getByRole('button', { name: code })); });
        cleanup();
      }
    }
    window.matchMedia = reduced;
    spy.mockRestore();
    expect(errors.filter((e) => !e.includes('not wrapped in act'))).toEqual([]);
  });

  it('axe: every new slide, in en and pt-BR', { timeout: 300000 }, async () => {
    const found = [];
    for (const loc of ['en', 'pt-BR']) {
      for (const l of lessons) {
        for (let i = 0; i < l.slides.length; i += 1) {
          const h = `#/${loc}/mlb/${l.id}?s=${i + 1}`;
          await open(h);
          const res = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false } } });
          found.push(...res.violations.map((v) => `${h} ${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`));
          cleanup();
        }
      }
    }
    expect(found).toEqual([]);
  });
});

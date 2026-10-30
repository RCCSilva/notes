// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { render, act, cleanup, screen, fireEvent } from '@testing-library/react';
import axe from 'axe-core';
import App from '../App';
import reentry from '../topics/reentry';

window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
window.scrollTo = () => Promise.resolve();

async function open(hash) {
  window.location.hash = hash;
  render(<App />);
  await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
}

describe('reentry topic', () => {
  afterEach(cleanup);

  it('hub says proof of concept in every language', async () => {
    for (const [loc, word] of [['en', /proof of concept/i], ['es', /prueba de concepto/i], ['pt-BR', /prova de conceito/i]]) {
      await open(`#/${loc}/reentry`);
      expect(document.body.textContent).toMatch(word);
      cleanup();
    }
  });

  it('operating a documented control shows its function and source; an undocumented one says unverified', async () => {
    await open('#/en/reentry/geminiComm?s=1');
    const hfAnt = screen.getByRole('button', { name: 'HF ANT: OFF' });
    await act(async () => { fireEvent.click(hfAnt); });
    const now = screen.getByRole('button', { name: 'HF ANT: RET' });
    expect(document.body.textContent).toMatch(/extends in one minute/);
    expect(now.closest('.scene').querySelector('.pn-refs a').getAttribute('href')).toMatch(/ProjectGeminiGameManual\.pdf#page=143/);
    await act(async () => { fireEvent.keyDown(now, { key: 'ArrowUp' }); });
    expect(screen.getByRole('button', { name: 'HF ANT: OFF' })).toBeTruthy();
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'RECORD: OFF' })); });
    expect(document.body.textContent).toMatch(/Function not yet verified/);
  });

  it('a preset moves the switches', async () => {
    await open('#/en/reentry/geminiComm?s=3');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /Set the insertion positions/ })); });
    expect(screen.getByRole('button', { name: 'S-BAND: CMD' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'HF ANT: EXT' })).toBeTruthy();
  });

  it('left panel: breaker toggles, readout shows status and NASA page chip; unverified control says so', async () => {
    await open('#/en/reentry/geminiLeft?s=1');
    expect(document.querySelectorAll('.pn-control[role="button"]')).toHaveLength(42);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'TR256: OPEN' })); });
    expect(screen.getByRole('button', { name: 'TR256: CLOSED' })).toBeTruthy();
    expect(document.body.textContent).toMatch(/CB8-16/);
    const hrefs = [...document.querySelectorAll('.pn-refs a')].map((a) => a.getAttribute('href'));
    expect(hrefs[0]).toMatch(/GeminiManualVol2\.pdf\?download#page=58$/);
    expect(document.body.textContent).toMatch(/printed 4-40/);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'TV: OPEN' })); });
    expect(document.body.textContent).toMatch(/Function not yet verified/);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'PARA CNTL: OPEN' })); });
    expect(document.body.textContent).toMatch(/different spacecraft/);
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'BOOST-INSERT: SAFE' })); });
    expect(screen.getByRole('button', { name: 'BOOST-INSERT: ARM' })).toBeTruthy();
  });

  it('left panel: the pre-launch preset closes breakers and arms the squibs', async () => {
    await open('#/en/reentry/geminiLeft?s=3');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /Pre-launch settings/ })); });
    expect(screen.getByRole('button', { name: 'RETRO ROCKET SQUIBS 3: ARM' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'COAX CNTL: CLOSED' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'LANDING: SAFE' })).toBeTruthy();
  });

  it('orbit simulator: a real preset shows the opposite side rising; retro at the high point lowers the low point; slide chips link to sources', async () => {
    await open('#/en/reentry/orbits?s=3');
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /Gemini VI-A: \+4 m\/s/ })); });
    const status = document.querySelector('.ob-status');
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.textContent).toMatch(/Speeding up: 4 m\/s, at the low point/);
    expect(status.textContent).toMatch(/259 km to 273 km/);
    expect(document.body.textContent).toMatch(/272\.7 km/);
    expect(document.body.textContent).toMatch(/Gemini VI-A, 15 December 1965/);
    // retrograde, at the high point, 60 m/s from the default MA-7 orbit: the low point drops
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Reset' })); });
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'High point' })); });
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: /Slow down \(retrograde\)/ })); });
    expect(screen.getByRole('button', { name: /Slow down \(retrograde\)/ }).getAttribute('aria-pressed')).toBe('true');
    await act(async () => { fireEvent.change(screen.getByLabelText(/Push size/), { target: { value: '100' } }); });
    expect(document.querySelector('.ob-status').textContent).toMatch(/Slowing down: 100 m\/s, at the high point/);
    expect(document.querySelector('.ob-status').textContent).toMatch(/inside the air/);
    const hrefs = [...document.querySelectorAll('.slide-refs a')].map((a) => a.getAttribute('href'));
    expect(hrefs[0]).toMatch(/science\.nasa\.gov\/learn\/basics-of-space-flight\/chapter3-4\//);
    expect(hrefs.some((h) => /sp-4203\.pdf#page=307/.test(h))).toBe(true);
  });

  it('simulate(): opposite-side numbers', async () => {
    const { simulate } = await import('../topics/reentry/orbit/visuals');
    const s = simulate({ start: 'g6a', nu: 0, dir: 1, dv: 4 });
    expect(s.oppBefore).toBeCloseTo(259, 1);
    expect(s.oppAfter).toBeCloseTo(272.7, 0);
    expect(s.after.periAltKm).toBeCloseTo(161, 1);
  });

  it('axe: hub and every slide, in pt-BR', { timeout: 60000 }, async () => {
    const found = [];
    const hashes = ['#/pt-BR/reentry', ...reentry.lessons.filter((l) => l.slides).flatMap((l) => l.slides.map((_, i) => `#/pt-BR/reentry/${l.id}?s=${i + 1}`))];
    for (const h of hashes) {
      await open(h);
      const res = await axe.run(document.body, { rules: { 'color-contrast': { enabled: false } } });
      found.push(...res.violations.map((v) => `${h} ${v.id}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`));
      cleanup();
    }
    expect(found).toEqual([]);
  });
});

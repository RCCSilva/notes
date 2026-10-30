import { describe, it, expect } from 'vitest';
import {
  validatePanel, initialState, operate, applyPreset, presetApplied, positionLabel, keyAction, leverPose, ruleKey,
} from '../topics/reentry/components/panel/panelState';
import { COMM_PANEL, COMM_PRESETS } from '../topics/reentry/gemini/commPanel';

const p = COMM_PANEL;

describe('panel engine state', () => {
  it('the Gemini communication panel definition is valid', () => {
    expect(validatePanel(p)).toEqual([]);
  });
  it('functions are only given where documented: others have none', () => {
    const documented = p.controls.filter((c) => c.fn).map((c) => c.id).sort();
    expect(documented).toEqual(['antSel', 'cBand', 'hfAnt', 'hfSel', 'mode1', 'mode2', 'sBand', 'tm']);
  });
  it('tap cycles and wraps; prev/next stop at the ends; set clamps', () => {
    let s = initialState(p);
    expect(positionLabel(p, s, 'silence')).toBe('NO 1');
    s = operate(p, s, 'silence', 'cycle');
    expect(positionLabel(p, s, 'silence')).toBe('NO 2');
    s = operate(p, s, 'silence', 'cycle');
    expect(positionLabel(p, s, 'silence')).toBe('NO 1');
    expect(operate(p, s, 'silence', 'prev')).toBe(s);
    s = operate(p, s, 'hfAnt', 'next');
    s = operate(p, s, 'hfAnt', 'next');
    expect(positionLabel(p, s, 'hfAnt')).toBe('RET');
    expect(operate(p, s, 'hfAnt', { set: 9 })).toBe(s);
  });
  it('does not mutate the old state and ignores displays and unknown ids', () => {
    const s = initialState(p);
    const n = operate(p, s, 'sBand', 'cycle');
    expect(s.sBand).toBe(0);
    expect(n.sBand).toBe(1);
    expect(operate(p, s, 'uhf1', 'cycle')).toBe(s);
    expect(operate(p, s, 'nope', 'cycle')).toBe(s);
  });
  it('presets set controls by printed label and are detected', () => {
    let s = initialState(p);
    expect(presetApplied(p, s, COMM_PRESETS.insertion)).toBe(false);
    s = applyPreset(p, s, COMM_PRESETS.insertion);
    expect(['sBand', 'cBand', 'hfAnt'].map((id) => positionLabel(p, s, id))).toEqual(['CMD', 'CMD', 'EXT']);
    expect(presetApplied(p, s, COMM_PRESETS.insertion)).toBe(true);
    expect(() => applyPreset(p, s, { sBand: 'XX' })).toThrow();
  });
  it('every preset only names real controls and positions', () => {
    for (const preset of Object.values(COMM_PRESETS)) expect(() => applyPreset(p, initialState(p), preset)).not.toThrow();
  });
  it('keys map to actions', () => {
    expect(keyAction('ArrowUp')).toBe('prev');
    expect(keyAction('ArrowRight')).toBe('next');
    expect(keyAction('Enter')).toBe('cycle');
    expect(keyAction('a')).toBe(null);
  });
  it('lever poses: ends point to the ends, the middle is short', () => {
    const t3 = p.controls.find((c) => c.id === 'hfAnt');
    expect([0, 1, 2].map((i) => leverPose(t3, i))).toEqual([{ angle: 0, scale: 1 }, { angle: 0, scale: 0.3 }, { angle: 180, scale: 1 }]);
    const h = p.controls.find((c) => c.id === 'silence');
    expect([leverPose(h, 0).angle, leverPose(h, 1).angle]).toEqual([-90, 90]);
    expect(ruleKey(h)).toBe('switchH');
    expect(ruleKey(p.controls.find((c) => c.id === 'mode1'))).toBe('selector');
  });
  it('validation catches bad data', () => {
    const bad = { controls: [{ id: 'a', type: 'toggle', label: 'A', states: ['x'], page: 1 }, { id: 'a', type: 'toggle', label: '', states: ['x', 'y'] }] };
    expect(validatePanel(bad).length).toBeGreaterThanOrEqual(3);
  });
});

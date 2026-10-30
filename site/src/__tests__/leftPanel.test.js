import { describe, it, expect } from 'vitest';
import { validatePanel, initialState, operate, applyPreset, presetApplied, positionLabel, leverPose } from '../topics/reentry/components/panel/panelState';
import { LEFT_PANEL, LEFT_PRESETS, BREAKER_IDS, SQUIB_IDS, NOT_FULLY_DOCUMENTED } from '../topics/reentry/gemini/leftPanel';

const p = LEFT_PANEL;

describe('Gemini left switch and circuit breaker panel', () => {
  it('is valid and has the 42 documented cells: 11 + 12 + 11 + 8', () => {
    expect(validatePanel(p)).toEqual([]);
    expect(p.controls).toHaveLength(42);
    const rows = [0, 0, 0, 0];
    const ys = [...new Set(p.controls.map((c) => c.y))].sort((a, b) => a - b);
    expect(ys).toHaveLength(4);
    p.controls.forEach((c) => { rows[ys.indexOf(c.y)] += 1; });
    expect(rows).toEqual([11, 12, 11, 8]);
    expect(BREAKER_IDS).toHaveLength(31);
    expect(SQUIB_IDS).toHaveLength(8);
  });
  it('breakers are 2-state, closed = up; squib switches have ARM above SAFE', () => {
    const b = p.controls.find((c) => c.id === 'tr256');
    expect(b.type).toBe('breaker');
    expect(b.states).toEqual(['CLOSED', 'OPEN']);
    expect(leverPose(b, 0).angle).toBe(0); // up
    expect(leverPose(b, 1).angle).toBe(180);
    const sq = p.controls.find((c) => c.id === 'retroSquib1');
    expect(sq.states).toEqual(['ARM', 'SAFE']);
    expect(leverPose(sq, 0).angle).toBe(0);
    let s = initialState(p);
    expect(positionLabel(p, s, 'tr256')).toBe('OPEN');
    s = operate(p, s, 'tr256', 'cycle');
    expect(positionLabel(p, s, 'tr256')).toBe('CLOSED');
    expect(positionLabel(p, operate(p, s, 'tr256', 'next'), 'tr256')).toBe('OPEN');
  });
  it('controls with no documented function say so: no fn flag, status unverified', () => {
    const unverified = p.controls.filter((c) => c.status === 'unverified').map((c) => c.id).sort();
    expect(unverified).toEqual(['attInd', 'indLtTest', 'tv']);
    for (const c of p.controls) expect(!!c.fn).toBe(c.status !== 'unverified');
  });
  it('flags Vol 1 only, inferred and partial items', () => {
    const by = (st) => p.controls.filter((c) => c.status === st).map((c) => c.id).sort();
    expect(by('vol1')).toEqual(['landSeqCntl1', 'landSeqCntl2', 'paraCntl']);
    expect(by('inferred')).toEqual(['ecsIndLts', 'uhfRelay']);
    expect(by('partial')).toEqual(['attIndLdg', 'landingArm', 'seqLightsTest', 'whipDiplex', 'whipHf', 'whipUhf']);
    expect(NOT_FULLY_DOCUMENTED).toHaveLength(14);
  });
  it('every control has a NASA page ref with a PDF page; the drawing is page 58', () => {
    for (const c of p.controls) {
      expect(c.refs[0]).toEqual(['S6', 'Fig 3-5 sheet 2, printed 3-22', 58]);
      for (const r of c.refs) expect(Number.isInteger(r[2])).toBe(true);
    }
  });
  it('presets only name real controls and positions; pre-launch matches the NASA list', () => {
    for (const preset of Object.values(LEFT_PRESETS)) expect(() => applyPreset(p, initialState(p), preset)).not.toThrow();
    let s = applyPreset(p, initialState(p), LEFT_PRESETS.prelaunch);
    expect(presetApplied(p, s, LEFT_PRESETS.prelaunch)).toBe(true);
    expect(BREAKER_IDS.every((id) => positionLabel(p, s, id) === 'CLOSED')).toBe(true);
    expect(['boostInsertArm', 'retroSquib1', 'retroSquib2', 'retroSquib3', 'retroSquib4'].map((id) => positionLabel(p, s, id))).toEqual(Array(5).fill('ARM'));
    expect(['retroPwrArm', 'retroJettArm', 'landingArm'].map((id) => positionLabel(p, s, id))).toEqual(['SAFE', 'SAFE', 'SAFE']);
    // the three row-3 switches are not breakers: left alone
    expect(positionLabel(p, s, 'seqLightsTest')).toBe('OFF');
    s = applyPreset(p, s, LEFT_PRESETS.afterInsertion);
    expect(positionLabel(p, s, 'boostInsertArm')).toBe('SAFE');
    s = applyPreset(p, s, LEFT_PRESETS.tr256);
    expect(positionLabel(p, s, 'retroPwrArm')).toBe('ARM');
    s = applyPreset(p, s, LEFT_PRESETS.afterRetroFire);
    expect([positionLabel(p, s, 'retroJettArm'), positionLabel(p, s, 'retroPwrArm')]).toEqual(['ARM', 'SAFE']);
  });
  it('validation rejects a breaker that is not 2-state and an unverified control with a function', () => {
    const bad = { controls: [{ id: 'b', type: 'breaker', label: 'B', states: ['a', 'b', 'c'], page: 1 }, { id: 'u', type: 'toggle', label: 'U', states: ['a', 'b'], page: 1, status: 'unverified', fn: true, fnPage: 1 }] };
    expect(validatePanel(bad)).toHaveLength(2);
  });
});

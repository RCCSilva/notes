import { describe, it, expect } from 'vitest';
import { validatePanel, initialState, operate, applyPreset, presetApplied, positionLabel, isOperable } from '../topics/reentry/components/panel/panelState';
import {
  RIGHT_PANEL, RIGHT_PRESETS, LABEL_ONLY_IDS, PARTIAL_IDS, CONFLICT_IDS, NOT_FULLY_DOCUMENTED,
} from '../topics/reentry/gemini/rightPanel';
import { resolveRef } from '../topics/reentry/sources';
import en from '../topics/reentry/messages/en';
import es from '../topics/reentry/messages/es';
import pt from '../topics/reentry/messages/pt-BR';

const p = RIGHT_PANEL;
const c = (id) => p.controls.find((x) => x.id === id);

describe('Gemini right switch and circuit breaker panel (research/reentry/04)', () => {
  it('is valid and has the 41 controls: left block 8 + 9 + 7 + 7, right block 4 + 2 + 2 + 2', () => {
    expect(validatePanel(p)).toEqual([]);
    expect(p.controls).toHaveLength(41);
    const left = p.controls.filter((x) => x.x < 600);
    const right = p.controls.filter((x) => x.x > 600);
    expect([left.length, right.length]).toEqual([31, 10]);
    const rows = (list) => { const ys = [...new Set(list.map((x) => x.y))].sort((a, b) => a - b); return ys.map((y) => list.filter((x) => x.y === y).length); };
    expect(rows(left)).toEqual([8, 9, 7, 7]);
    expect(rows(right)).toEqual([4, 2, 2, 2]);
  });
  it('uses the positions the note records', () => {
    expect(c('mainBatt1').states).toEqual(['ON', 'OFF', 'TEST']);
    expect(c('mainBatt4').states).toEqual(['ON', 'OFF', 'TEST']);
    expect(c('squibBatt3').states).toEqual(['ON', 'OFF', 'UMB']);
    expect(c('busTie1').states).toEqual(['ON', 'OFF']);
    expect(c('bioMedRcdr2').states).toEqual(['CONT', 'OFF']);
    expect(c('rcsHtr').states).toEqual(['ON', 'OFF']);
    expect(c('acPower').states).toEqual(['IGS', 'OFF', 'ACME']);
    expect(c('attInd').states).toEqual(['WITH FDI', 'OFF', 'W/O FDI']);
    expect(c('extLts').states).toEqual(['DOCK', 'OFF', 'EVA']);
    expect(c('busArm').states).toEqual(['DOCK', 'SAFE', 'EXP']);
    expect(c('engine').states).toEqual(['ARM', 'STOP']);
    expect(c('encdr').states).toEqual(['ON', 'OFF']);
    expect(c('indexExtend').states).toEqual(['INDEX EXTEND', 'OFF', 'POD EJECT']);
    // knobs are selectors, 3-position switches are toggles
    expect(['extLts', 'indexExtend', 'busArm'].map((id) => c(id).type)).toEqual(['selector', 'selector', 'selector']);
    expect(c('acPower').type).toBe('toggle');
    expect(c('emerRel').type).toBe('button');
  });
  it('status tags: label-only, partial and conflicts are marked, nothing else is invented', () => {
    expect(LABEL_ONLY_IDS.sort()).toEqual(['agenaCntl', 'agenaPwr', 'agenaSquib1', 'agenaSquib2', 'attInd', 'auxTape', 'rcsHtrsA', 'rcsHtrsB', 'seqInst', 'tapeRcdrPwr']);
    expect(PARTIAL_IDS.sort()).toEqual(['acmeInv', 'busArm', 'calib', 'dcsPwr', 'fcDp', 'fcO2Htr', 'fcO2Reg', 'fuelCell1', 'fuelCell2', 'tapeRcdrCntl']);
    expect(CONFLICT_IDS.sort()).toEqual(['indexExtend', 'squibBatt1', 'squibBatt2', 'squibBatt3']);
    expect(NOT_FULLY_DOCUMENTED).toHaveLength(20);
    for (const x of p.controls) expect(!!x.fn).toBe(x.status !== 'unverified');
  });
  it('corrected labels, and no guard wires or rails in the drawing', () => {
    const labels = p.controls.map((x) => x.label);
    expect(labels).toContain('SEQ INST');
    expect(labels).toContain('ENCDR');
    expect(labels).not.toContain('SEO INST');
    expect(p.texts.map((t) => t.text)).toContain('S/C 9, 12 label:');
    expect(p.texts.map((t) => t.text)).toContain('EVA BARS EXT');
  });
  it('every control cites the drawing (S6 PDF 58) and has integer PDF pages on all refs', () => {
    for (const x of p.controls) {
      expect(x.refs[0]).toEqual(['S6', 'Fig 3-5 sheet 2, printed 3-22', 58]);
      for (const r of x.refs) { expect(Number.isInteger(r[2])).toBe(true); expect(() => resolveRef(r)).not.toThrow(); }
    }
  });
  it('presets only name real controls and positions; after landing the three readings differ', () => {
    for (const preset of Object.values(RIGHT_PRESETS)) expect(() => applyPreset(p, initialState(p), preset)).not.toThrow();
    let s = applyPreset(p, initialState(p), RIGHT_PRESETS.rightPad);
    expect(['mainBatt1', 'mainBatt4', 'squibBatt1', 'squibBatt2'].map((id) => positionLabel(p, s, id))).toEqual(['ON', 'ON', 'UMB', 'UMB']);
    s = applyPreset(p, s, RIGHT_PRESETS.rightPrelaunch);
    expect(['squibBatt1', 'squibBatt2', 'squibBatt3'].map((id) => positionLabel(p, s, id))).toEqual(['ON', 'ON', 'ON']);
    s = applyPreset(p, s, RIGHT_PRESETS.rightAfterInsertion);
    expect(positionLabel(p, s, 'mainBatt2')).toBe('OFF');
    expect(positionLabel(p, s, 'squibBatt1')).toBe('ON');
    s = applyPreset(p, s, RIGHT_PRESETS.rightTr256);
    expect(positionLabel(p, s, 'mainBatt3')).toBe('ON');
    const after = (name) => { const t = applyPreset(p, applyPreset(p, initialState(p), RIGHT_PRESETS.rightPrelaunch), RIGHT_PRESETS[name]); return ['squibBatt1', 'squibBatt2', 'squibBatt3'].map((id) => positionLabel(p, t, id)); };
    expect(after('rightLandingNasa1')).toEqual(['OFF', 'OFF', 'ON']);
    expect(after('rightLandingNasa2')).toEqual(['ON', 'ON', 'ON']);
    expect(after('rightLandingGame')).toEqual(['ON', 'OFF', 'OFF']);
    expect(presetApplied(p, applyPreset(p, initialState(p), RIGHT_PRESETS.rightLandingGame), RIGHT_PRESETS.rightLandingGame)).toBe(true);
  });
  it('text exists in en, es and pt-BR for every documented control, preset and slide', () => {
    const documented = p.controls.filter((x) => x.fn).map((x) => x.id);
    for (const m of [en, es, pt]) {
      for (const id of documented) expect(m.right.fn[id], id).toBeTruthy();
      for (const k of Object.keys(RIGHT_PRESETS)) expect(m.presets[k], k).toBeTruthy();
      for (const sl of ['rightPanel', 'rightPower', 'rightDocking', 'rightSystems', 'rightGaps']) {
        expect(m.slides[sl].title).toBeTruthy(); expect(m.slides[sl].body).toBeTruthy();
      }
      expect(m.status.conflict).toBeTruthy();
      expect(m.lessons.geminiRight.title).toBeTruthy();
    }
  });
  it('the squib battery conflict and the INDEX EXTEND label variants are stated, not resolved', () => {
    expect(en.slides.rightPower.note).toMatch(/disagrees with itself/);
    expect(en.slides.rightPower.insight).toMatch(/do not know which reading is right/);
    expect(en.right.fn.indexExtend).toMatch(/POD EJECT .* or EVA BARS EXT/);
    expect(en.right.fn.busArm).toMatch(/not stated/);
  });
});

describe('covered push button (EMER REL)', () => {
  const panel = { controls: [{ id: 'b', type: 'button', label: 'B', states: ['COVERED', 'PRESSED'], page: 1 }, { id: 'bad', type: 'button', label: 'X', states: ['a', 'b', 'c'], page: 1 }] };
  it('is operable, has exactly 2 states and starts covered', () => {
    expect(isOperable(panel.controls[0])).toBe(true);
    expect(validatePanel(panel)).toEqual(['bad: a button has exactly 2 states']);
    const s0 = initialState(panel);
    expect(positionLabel(panel, s0, 'b')).toBe('COVERED');
    const s1 = operate(panel, s0, 'b', 'cycle');
    expect(positionLabel(panel, s1, 'b')).toBe('PRESSED');
    expect(positionLabel(panel, operate(panel, s1, 'b', 'prev'), 'b')).toBe('COVERED');
  });
});

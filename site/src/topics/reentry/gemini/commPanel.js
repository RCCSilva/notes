// The Gemini lower center panel: communication controls. Layout and printed labels read by eye from
// the picture on p.143 of the game manual (research/reentry/02-gemini-panels.md); positions are our own redraw.
// `fn: true` only where the research documents the function (texts in messages `fn.<id>`).
const P = 143;
const toggle = (id, label, x, y, states, o = {}) => ({ id, type: 'toggle', label, x, y, states, orient: 'v', page: P, ...o });
const display = (id, label, x, y, text) => ({ id, type: 'display', label, x, y, text, page: P });
const mode = (id, x, y) => ({
  id, type: 'selector', label: 'MODE', x, y, states: ['UHF', 'INT', 'HF', 'HF DF'], angles: [-80, -35, 35, 75],
  page: P, fn: true, fnPage: P,
});

export const COMM_PANEL = {
  id: 'gemini-comm',
  width: 460,
  height: 325,
  // static printed text and panel lines
  lines: [[113, 0, 113, 250], [195, 0, 195, 250], [0, 250, 295, 250], [295, 0, 295, 325], [295, 100, 460, 100], [295, 207, 460, 207]],
  texts: [
    { x: 375, y: 12, text: 'BEACON CONTROL', bold: true },
    { x: 335, y: 30, text: 'RESC' }, { x: 370, y: 30, text: 'S-BAND' }, { x: 415, y: 30, text: 'C-BAND' },
    { x: 375, y: 114, text: 'TM CONTROL', bold: true },
    { x: 335, y: 130, text: 'CALIB' }, { x: 380, y: 130, text: 'SBY TM' }, { x: 425, y: 130, text: 'T/M' },
    { x: 335, y: 220, text: 'TAPE PLYBK' }, { x: 380, y: 220, text: 'ANT SEL' }, { x: 425, y: 220, text: 'HF ANT' },
    { x: 60, y: 97, text: 'MODE', bold: true }, { x: 252, y: 97, text: 'MODE', bold: true },
    { x: 95, y: 106, text: 'UHF', anchor: 'start' }, { x: 95, y: 145, text: 'INT', anchor: 'start' }, { x: 95, y: 180, text: 'HF', anchor: 'start' },
    { x: 226, y: 106, text: 'UHF', anchor: 'end' }, { x: 226, y: 145, text: 'INT', anchor: 'end' }, { x: 226, y: 180, text: 'HF', anchor: 'end' },
    { x: 154, y: 17, text: 'UHF', bold: true }, { x: 154, y: 117, text: 'HF', bold: true },
    { x: 181, y: 48, text: 'S', anchor: 'start' }, { x: 181, y: 57, text: 'Q', anchor: 'start' },
    { x: 181, y: 136, text: 'S', anchor: 'start' }, { x: 181, y: 145, text: 'Q', anchor: 'start' },
    { x: 57, y: 306, text: 'SILENCE', bold: true }, { x: 154, y: 306, text: 'KEYING', bold: true }, { x: 250, y: 306, text: 'RECORD', bold: true },
  ],
  controls: [
    mode('mode1', 60, 62),
    display('uhf1', 'UHF thumbwheel (left)', 60, 103, '210'),
    display('int1', 'INT thumbwheel (left)', 60, 142, '210'),
    display('hf1', 'HF thumbwheel (left)', 60, 177, '210'),
    toggle('silence', 'SILENCE', 57, 277, ['NO 1', 'NO 2'], { orient: 'h' }),

    display('uhfSq', 'UHF thumbwheel S Q', 154, 50, '210'),
    toggle('uhfSel', 'UHF', 154, 98, ['NO 1', 'OFF', 'NO 2'], { orient: 'h', initial: 1 }),
    display('hfSq', 'HF thumbwheel S Q', 154, 138, '210'),
    toggle('hfSel', 'HF', 154, 195, ['ADPT', 'OFF', 'RNTY'], { orient: 'h', initial: 1, fn: true, fnPage: P }),
    toggle('keying', 'KEYING', 154, 277, ['VOX', 'PTT', 'CONT INT PTT'], { orient: 'h', initial: 1, wrap: true }),

    mode('mode2', 252, 62),
    display('uhf2', 'UHF thumbwheel (right)', 262, 103, '210'),
    display('int2', 'INT thumbwheel (right)', 262, 142, '210'),
    display('hf2', 'HF thumbwheel (right)', 262, 177, '210'),
    toggle('record', 'RECORD', 250, 277, ['CONT', 'OFF', 'MOM'], { orient: 'h', initial: 1 }),

    toggle('resc', 'RESC', 335, 70, ['ON', 'W/O LT']),
    toggle('sBand', 'S-BAND', 380, 70, ['CONT', 'CMD'], { fn: true, fnPage: P }),
    toggle('cBand', 'C-BAND', 425, 70, ['CONT', 'CMD'], { fn: true, fnPage: P }),
    toggle('calib', 'CALIB', 335, 160, ['NO 1', 'NO 2']),
    toggle('sbyTm', 'SBY TM', 380, 160, ['R/T', 'D/T']),
    toggle('tm', 'T/M', 425, 160, ['R/T & ACQ', 'CMD', 'R/T-D/T'], { initial: 1, fn: true, fnPage: P }),
    toggle('tape', 'TAPE PLYBK', 335, 262, ['CONT', 'CMD', 'RESET'], { initial: 1 }),
    toggle('antSel', 'ANT SEL', 380, 262, ['RNTY', 'ADPT'], { initial: 1, fn: true, fnPage: P }),
    toggle('hfAnt', 'HF ANT', 425, 262, ['EXT', 'OFF', 'RET'], { initial: 1, fn: true, fnPage: P }),
  ],
};

// Groups of settings the manual text names [S2 p.143]: { controlId: printed position }
export const COMM_PRESETS = {
  insertion: { sBand: 'CMD', cBand: 'CMD', hfAnt: 'EXT' },
  useHf: { hfSel: 'RNTY', mode1: 'HF' },
  beforeSeparation: { tm: 'R/T & ACQ', antSel: 'RNTY' },
};

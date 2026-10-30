// The Gemini command pilot's LEFT SWITCH AND CIRCUIT BREAKER PANEL (NASA Fig 3-5 sheet 2, "S/C 8 & UP").
// Layout, grouping and printed labels follow research/reentry/03-gemini-left-panel.md; the positions are our own flat redraw.
// Four rows: 11 breakers, 12 breakers, 8 breakers + 3 switches, 8 squib ARM/SAFE switches (42 cells).
// Breakers: closed = up. Squib switches: ARM above SAFE. Function texts: messages `reentry.left.fn.<id>`.
// status: nasa (documented, Vol II) | partial | vol1 (only in Vol 1, a different spacecraft) | inferred | unverified.
const FIG = 'Fig 3-5 sheet 2, printed 3-22';
const DRAW = [['S6', FIG, 58]];
const S6 = (at, page) => ['S6', at, page];
const S7 = (at, page) => ['S7', at, page];
const S8 = (at, page) => ['S8', at, page];

// [id, printed label (aria), cell lines, status, refs] ; refs = extra source chips beyond the drawing
const brk = (id, label, lines, status, refs = []) => ({ id, label, lines, status, refs, kind: 'breaker' });
const sw = (id, label, lines, states, status, refs = [], o = {}) => ({ id, label, lines, status, refs, kind: 'toggle', states, ...o });

// rows: groups of cells; a group with a title spans its cells; `bottom` puts the title under the row
const ROWS = [
  [
    { cells: [brk('coaxCntl', 'COAX CNTL', ['COAX', 'CNTL'], 'nasa', [S6('printed 9-10', 254)])] },
    { title: 'AUDIO & UHF T/R', cells: [
      brk('audio1', 'AUDIO & UHF T/R 1', ['1'], 'nasa', [S6('printed 9-10', 254), S6('printed 9-9', 253)]),
      brk('audio2', 'AUDIO & UHF T/R 2', ['2'], 'nasa', [S6('printed 9-10', 254), S6('printed 9-9', 253)]),
    ] },
    { cells: [brk('uhfRelay', 'UHF RELAY', ['UHF', 'RELAY'], 'inferred', [S6('printed 9-11', 255)])] },
    { cells: [brk('toneVox', 'TONE VOX', ['TONE', 'VOX'], 'nasa', [S6('printed 9-9', 253)])] },
    { cells: [brk('tv', 'TV', ['TV'], 'unverified')] },
    { cells: [brk('hfTr', 'HF/T/R', ['HF/T/R'], 'nasa', [S6('printed 9-12', 256), S6('printed 9-13', 257)])] },
    { cells: [brk('antCntl', 'ANT CNTL', ['ANT', 'CNTL'], 'nasa', [S6('printed 9-11', 255)])] },
    { title: 'WHIP ANTENNAS', cells: [
      brk('whipHf', 'WHIP ANTENNAS HF', ['HF'], 'partial', [S6('printed 9-12', 256), S6('printed 9-13', 257)]),
      brk('whipUhf', 'WHIP ANTENNAS UHF', ['UHF'], 'partial', [S6('printed 9-12', 256), S6('printed 9-13', 257)]),
      brk('whipDiplex', 'WHIP ANTENNAS DIPLEX', ['DIPLEX'], 'partial', [S6('printed 9-12', 256), S6('printed 9-13', 257)]),
    ] },
  ],
  [
    { cells: [brk('electTimer', 'ELECT TIMER', ['ELECT', 'TIMER'], 'nasa', [S6('printed 4-39', 104)])] },
    { cells: [brk('eventTimer', 'EVENT TIMER', ['EVENT', 'TIMER'], 'nasa', [S6('printed 4-39', 104)])] },
    { title: 'BOOST CUTOFF', cells: [
      brk('boostCutoff1', 'BOOST CUTOFF 1', ['1'], 'nasa', [S6('printed 4-39, 4-40', 104), S6('printed 4-40', 105)]),
      brk('boostCutoff2', 'BOOST CUTOFF 2', ['2'], 'nasa', [S6('printed 4-40', 105)]),
    ] },
    { title: 'RETRO', cells: [
      brk('retroAuto', 'RETRO AUTO', ['AUTO'], 'nasa', [S6('printed 4-40', 105)]),
      brk('retroMan', 'RETRO MAN', ['MAN'], 'nasa', [S6('printed 4-40', 105)]),
    ] },
    { cells: [brk('tr256', 'TR256', ['TR256'], 'nasa', [S6('printed 4-40', 105)])] },
    { cells: [brk('ecsIndLts', 'ECS IND LTS', ['ECS', 'IND LTS'], 'inferred', [S6('Fig 10-6 sheet 2, printed 10-21', 343)])] },
    { cells: [brk('indLtTest', 'IND LT TEST', ['IND', 'LT TEST'], 'unverified')] },
    { title: 'SEQ LIGHTS', cells: [
      brk('seqLightsPwr', 'SEQ LIGHTS PWR', ['PWR'], 'nasa', [S6('printed 4-40', 105)]),
      brk('seqLightsCntl', 'SEQ LIGHTS CNTL', ['CNTL'], 'nasa', [S6('printed 4-41', 106)]),
    ] },
    { cells: [brk('paraCntl', 'PARA CNTL', ['PARA', 'CNTL'], 'vol1', [S8('printed 4-45', 119)])] },
  ],
  [
    { title: 'ATT IND CNTL', cells: [
      brk('attIndRetro', 'ATT IND CNTL RETRO', ['RETRO'], 'nasa', [S6('printed 4-41', 106)]),
      brk('attIndLdg', 'ATT IND CNTL LDG', ['LDG'], 'partial', [S7('printed 8-225', 256), S8('printed 4-45', 119)]),
    ] },
    { title: 'BOOST-INSERT', cells: [
      brk('boostInsCntl1', 'BOOST INSERT CNTL 1', ['CNTL 1'], 'nasa', [S6('printed 4-41', 106)]),
      brk('boostInsCntl2', 'BOOST INSERT CNTL 2', ['CNTL 2'], 'nasa', [S6('printed 4-41', 106)]),
    ] },
    { title: 'RETRO SEQ', cells: [
      brk('retroSeqCntl1', 'RETRO SEQ CNTL 1', ['CNTL 1'], 'nasa', [S6('printed 4-41, 4-42', 106)]),
      brk('retroSeqCntl2', 'RETRO SEQ CNTL 2', ['CNTL 2'], 'nasa', [S6('printed 4-42', 107)]),
    ] },
    { title: 'LANDING SEQ', cells: [
      brk('landSeqCntl1', 'LANDING SEQ CNTL 1', ['CNTL 1'], 'vol1', [S8('printed 4-46', 120)]),
      brk('landSeqCntl2', 'LANDING SEQ CNTL 2', ['CNTL 2'], 'vol1', [S8('printed 4-46', 120)]),
    ] },
    { title: 'SEQ LIGHTS', cells: [
      sw('seqLightsTest', 'SEQ LIGHTS TEST', [], ['AMBER', 'OFF', 'RED & GREEN'], 'partial', [S6('printed 4-42', 107), S8('printed 4-46', 120)], { initial: 1 }),
      sw('seqLightsBright', 'SEQ LIGHTS BRIGHT / DIM', [], ['BRIGHT', 'DIM'], 'nasa', [S6('printed 4-42', 107)]),
    ] },
    { title: 'ATT IND', cells: [sw('attInd', 'ATT IND', [], ['WITH FDI', 'W/O FDI'], 'unverified')] },
  ],
  [
    { title: 'BOOST-INSERT', bottom: true, cells: [sw('boostInsertArm', 'BOOST-INSERT', [], ['ARM', 'SAFE'], 'nasa', [S6('printed 4-42, 4-43', 107), S6('printed 4-6', 71), S6('printed 5-16, 5-17', 134)], { squib: true })] },
    { title: 'RETRO', bottom: true, cells: [
      sw('retroPwrArm', 'RETRO PWR', ['PWR'], ['ARM', 'SAFE'], 'nasa', [S6('printed 4-43', 108), S6('printed 5-18, 5-19', 136)], { squib: true }),
      sw('retroJettArm', 'RETRO JETT', ['JETT'], ['ARM', 'SAFE'], 'nasa', [S6('printed 4-43', 108), S6('printed 5-19', 137)], { squib: true }),
    ] },
    { title: 'LANDING', bottom: true, cells: [sw('landingArm', 'LANDING', [], ['ARM', 'SAFE'], 'partial', [S6('printed 5-19', 137), S6('printed 9-13', 257), S8('printed 4-48', 122)], { squib: true })] },
    { title: 'RETRO ROCKET SQUIBS', bottom: true, cells: [1, 2, 3, 4].map((n) => (
      sw(`retroSquib${n}`, `RETRO ROCKET SQUIBS ${n}`, [String(n)], ['ARM', 'SAFE'], 'nasa', [S6('printed 4-43', 108), S6('printed 4-6', 71), S6('printed 5-18', 136)], { squib: true }))) },
  ],
];

const W = 640, M = 12, ROW_Y = [6, 84, 162, 240], PITCH = 78;
const build = () => {
  const lines = [];
  const texts = [];
  const controls = [];
  ROWS.forEach((groups, r) => {
    const n = groups.reduce((a, g) => a + g.cells.length, 0);
    const cw = (W - 2 * M) / n;
    const y0 = ROW_Y[r];
    const last = r === ROWS.length - 1;
    const h = last ? 100 : PITCH - 4;
    lines.push([M, y0 - 2, W - M, y0 - 2], [M, y0 - 2 + h, W - M, y0 - 2 + h], [M, y0 - 2, M, y0 - 2 + h], [W - M, y0 - 2, W - M, y0 - 2 + h]);
    let col = 0;
    groups.forEach((g, gi) => {
      const x1 = M + col * cw;
      const span = g.cells.length;
      const top = g.bottom ? y0 : y0 + (g.title ? 12 : 0);
      if (gi > 0) lines.push([x1, y0 - 2, x1, y0 - 2 + h]);
      if (g.title && !g.bottom) {
        lines.push([x1, y0 + 10, x1 + span * cw, y0 + 10]);
        texts.push({ x: x1 + (span * cw) / 2, y: y0 + 7, text: g.title, size: 6.4, bold: true });
        for (let k = 1; k < span; k += 1) lines.push([x1 + k * cw, top, x1 + k * cw, y0 - 2 + h]);
      }
      if (g.bottom) {
        lines.push([x1, y0 + 84, x1 + span * cw, y0 + 84]);
        texts.push({ x: x1 + (span * cw) / 2, y: y0 + 94, text: g.title, size: 6.4, bold: true });
        for (let k = 1; k < span; k += 1) lines.push([x1 + k * cw, y0 - 2, x1 + k * cw, y0 + 84]);
      }
      g.cells.forEach((c, k) => {
        const cx = x1 + (k + 0.5) * cw;
        const baseY = g.bottom ? y0 + 14 : g.title ? y0 + 20 : y0 + 12;
        c.lines.forEach((ln, li) => texts.push({ x: cx, y: baseY + li * 8, text: ln, size: 6.2 }));
        controls.push({
          id: c.id, type: c.kind, label: c.label, x: cx, y: y0 + (r === 2 ? 44 : g.bottom ? 52 : 50),
          states: c.states ?? ['CLOSED', 'OPEN'], orient: 'v', quiet: c.kind === 'breaker',
          initial: c.initial ?? 1, page: 58, status: c.status, fn: c.status !== 'unverified', fnPage: c.refs[0]?.[2] ?? 58,
          refs: [...DRAW, ...c.refs],
        });
      });
      col += span;
    });
  });
  return { lines, texts, controls };
};

const { lines, texts, controls } = build();

export const LEFT_PANEL = {
  id: 'gemini-left', width: W, height: 346, minWidth: 820, rules: false, fnPrefix: 'reentry.left.fn', lines, texts, controls,
};

// Control ids by role, for slides and presets
export const BREAKER_IDS = controls.filter((c) => c.type === 'breaker').map((c) => c.id);
export const SQUIB_IDS = ['boostInsertArm', 'retroPwrArm', 'retroJettArm', 'landingArm', 'retroSquib1', 'retroSquib2', 'retroSquib3', 'retroSquib4'];
export const NOT_FULLY_DOCUMENTED = controls.filter((c) => c.status !== 'nasa').map((c) => c.id);

const allSquibs = (label) => Object.fromEntries(['retroSquib1', 'retroSquib2', 'retroSquib3', 'retroSquib4'].map((id) => [id, label]));
// Only settings the research documents [S6 PDF 70-71, 107-108, 134-137; S2 pp.93, 98, 112]. The squib sequence, not a checklist.
export const LEFT_PRESETS = {
  // top three rows of breakers closed; BOOST-INSERT and the four RETRO ROCKET SQUIBS to ARM; RETRO and LANDING to SAFE
  prelaunch: {
    ...Object.fromEntries(BREAKER_IDS.map((id) => [id, 'CLOSED'])),
    boostInsertArm: 'ARM', ...allSquibs('ARM'), retroPwrArm: 'SAFE', retroJettArm: 'SAFE', landingArm: 'SAFE',
  },
  // BOOST-INSERT to SAFE after insertion [S6]; the four retro squib switches to SAFE after insertion is game manual only [S2 pp.93, 98]
  afterInsertion: { boostInsertArm: 'SAFE', ...allSquibs('SAFE') },
  // RETRO PWR and the four RETRO ROCKET SQUIBS to ARM at Tr-256
  tr256: { retroPwrArm: 'ARM', ...allSquibs('ARM') },
  // RETRO JETT to ARM after the retro rockets fire; RETRO PWR to SAFE after retro/adapter separation
  afterRetroFire: { retroJettArm: 'ARM', retroPwrArm: 'SAFE' },
  // landing squib buses armed after the retrograde squib buses are disarmed; LANDING to ARM during re-entry
  landing: { landingArm: 'ARM' },
};

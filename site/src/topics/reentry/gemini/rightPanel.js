// The Gemini pilot's RIGHT SWITCH AND CIRCUIT BREAKER PANEL (NASA Fig 3-5 sheet 2, "S/C 8 & UP"; the game's "far-right" panel).
// Layout, grouping and labels follow research/reentry/04-gemini-right-panel.md; the geometry is our own flat redraw.
// 41 controls: a left block of 4 rows (8 + 9 + 7 + 7 = 31) and a right block of 4 groups (4 + 2 + 2 + 2 = 10).
// The drawing does not say which cells are breakers or switches, so unlabelled cells are neutral UP / DOWN toggles.
// NOT drawn: the guard wires of the game photo and the two vertical rails of the NASA drawing (purpose not stated).
// status: nasa (documented) | partial | unverified (label only) | conflict (sources disagree). Function texts: `reentry.right.fn.<id>`.
const DRAW = ['S6', 'Fig 3-5 sheet 2, printed 3-22', 58];
const S6 = (at, page) => ['S6', at, page];
const S7 = (at, page) => ['S7', at, page];
const S9 = (at, page) => ['S9', at, page];
const S2 = (page) => ['S2', null, page];

const UD = ['UP', 'DOWN'];
// A cell with a control. c = null: a blank cell. lines: printed text in the cell.
const cell = (c, lines = [], w = 1) => ({ c, lines, w });
const mk = (type, id, label, status, refs, o = {}) => ({ type, id, label, status, refs, ...o });
const brk = (id, label, status, refs = [], o = {}) => mk('breaker', id, label, status, refs, { states: UD, quiet: true, ...o });
const tog = (id, label, states, status, refs = [], o = {}) => mk('toggle', id, label, status, refs, { states, ...o });
const knob = (id, label, states, status, refs = [], o = {}) => mk('selector', id, label, status, refs, { states, angles: [0, 90, 180], ...o });

const POWER = {
  main: [S6('printed 5-3', 121), S6('printed 5-16 to 5-19', 134), S6('Fig 5-4, printed 5-9', 127), S6('printed 5-21, 5-22', 139), S6('printed 5-24, 5-25', 142), S2(109)],
  squib: [S6('printed 5-3', 121), S6('printed 5-16, 5-17', 134), S6('printed 5-19', 137), S6('Fig 5-4, printed 5-9', 127), S6('printed 5-22', 140), S2(110), S2(111), S2(112)],
};
const FC = [S6('printed 5-7', 125), S6('Fig 5-4, printed 5-9', 127)];

const mains = [1, 2, 3, 4].map((n) => cell(tog(`mainBatt${n}`, `MAIN BATTERIES ${n}`, ['ON', 'OFF', 'TEST'], 'nasa', POWER.main, { initial: 1 }), [String(n)]));
const squibs = [1, 2, 3].map((n) => cell(tog(`squibBatt${n}`, `SQUIB BATTERIES ${n}`, ['ON', 'OFF', 'UMB'], 'conflict', POWER.squib, { initial: 1 }), [String(n)]));

// rows of groups; a group may have a title (spans its cells). Left block: 9 units per row.
const LEFT_ROWS = [
  [
    { cells: [cell(null)] },
    { cells: [cell(brk('auxTape', 'AUX TAPE', 'unverified'), ['AUX', 'TAPE'])] },
    { cells: [cell(brk('seqInst', 'SEQ INST', 'unverified'), ['SEQ', 'INST'])] },
    { cells: [cell(brk('calib', 'CALIB', 'partial', [S6('printed 10-37', 359)]), ['CALIB'])] },
    { cells: [cell(brk('bioMedInst', 'BIO MED INST', 'nasa', [S6('printed 10-68', 390)]), ['BIO MED', 'INST'])] },
    { cells: [cell(brk('dcsPwr', 'DCS PWR', 'partial', [S6('printed 9-8, 9-9', 252)]), ['DCS', 'PWR'])] },
    { title: 'FC O2 & H2', cells: [
      cell(brk('fcO2Reg', 'FC O2 & H2 REG', 'partial', [S6('printed 5-7', 125)]), ['REG']),
      cell(brk('fcO2Htr', 'FC O2 & H2 HTR', 'partial', [S6('printed 5-7', 125)]), ['HTR']),
    ] },
    { cells: [cell(brk('scanHtr', 'SCAN HTR', 'nasa', [S7('printed 8-202', 233), S7('printed 8-228', 259)]), ['SCAN', 'HTR'])] },
  ],
  [
    { cells: [cell(brk('radarPwr', 'RADAR PWR', 'nasa', [S7('printed 8-238', 269), S9('printed 8-216', 217)]), ['RADAR', 'PWR'])] },
    { cells: [cell(brk('acmeInv', 'ACME INV', 'partial', [S7('printed 8-42', 41), S7('printed 8-21', 20)]), ['ACME', 'INV'])] },
    { title: 'RCS HTRS', cells: [cell(brk('rcsHtrsA', 'RCS HTRS A', 'unverified'), ['A']), cell(brk('rcsHtrsB', 'RCS HTRS B', 'unverified'), ['B'])] },
    { title: 'TAPE RCDR', cells: [
      cell(brk('tapeRcdrPwr', 'TAPE RCDR PWR', 'unverified'), ['PWR']),
      cell(brk('tapeRcdrCntl', 'TAPE RCDR CNTL', 'partial', [S6('printed 9-13', 257)]), ['CNTL']),
    ] },
    { title: 'FUEL CELL', cells: [
      cell(brk('fuelCell1', 'FUEL CELL CNTL 1', 'partial', FC), ['CNTL 1']),
      cell(brk('fuelCell2', 'FUEL CELL CNTL 2', 'partial', FC), ['CNTL 2']),
    ] },
    { cells: [cell(brk('fcDp', 'FC ΔP', 'partial', [S6('printed 5-7', 125), S6('printed 5-20', 138)]), ['FC ΔP'])] },
  ],
  [
    { cells: [cell(tog('attInd', 'ATT IND', ['WITH FDI', 'OFF', 'W/O FDI'], 'unverified', [], { initial: 1 }), ['ATT IND'], 2)] },
    { cells: [cell(tog('acPower', 'AC POWER', ['IGS', 'OFF', 'ACME'], 'nasa', [S7('printed 8-45', 44), S7('printed 8-55', 54), S7('printed 8-228', 259)], { initial: 1 }), ['AC POWER'], 2)] },
    { title: 'BIO MED RCDR', cells: [
      cell(tog('bioMedRcdr1', 'BIO MED RCDR 1', ['CONT', 'OFF'], 'nasa', [S6('printed 10-68', 390)], { initial: 1 }), ['1']),
      cell(tog('bioMedRcdr2', 'BIO MED RCDR 2', ['CONT', 'OFF'], 'nasa', [S6('printed 10-68', 390)], { initial: 1 }), ['2']),
    ] },
    { cells: [cell(tog('rcsHtr', 'RCS HTR', ['ON', 'OFF'], 'nasa', [S7('printed 8-373', 402), S7('printed 8-373', 403)], { initial: 1 }), ['RCS HTR'])] },
    { title: 'BUS TIE', cells: [
      cell(tog('busTie1', 'BUS TIE 1', ['ON', 'OFF'], 'nasa', [S6('printed 5-18', 136), S6('Fig 5-4, printed 5-9', 127), S2(111)], { initial: 1 }), ['1']),
      cell(tog('busTie2', 'BUS TIE 2', ['ON', 'OFF'], 'nasa', [S6('printed 5-18', 136), S6('Fig 5-4, printed 5-9', 127), S2(111)], { initial: 1 }), ['2']),
    ] },
  ],
  [
    { title: 'MAIN BATTERIES', cells: mains },
    { title: 'SQUIB BATTERIES', cells: squibs },
  ],
];

const RIGHT_ROWS = [
  [{ title: 'AGENA CONTROL', cells: [
    cell(brk('agenaPwr', 'AGENA CONTROL PWR', 'unverified'), ['PWR']),
    cell(brk('agenaSquib1', 'AGENA CONTROL SQUIB 1', 'unverified'), ['SQUIB', '1']),
    cell(brk('agenaSquib2', 'AGENA CONTROL SQUIB 2', 'unverified'), ['SQUIB', '2']),
    cell(brk('agenaCntl', 'AGENA CONTROL CNTL', 'unverified'), ['CNTL']),
  ] }],
  [
    { cells: [cell(tog('encdr', 'ENCDR', ['ON', 'OFF'], 'nasa', [S7('printed 8-281', 311), S7('printed 8-282', 312), S7('printed 8-274', 304), S2(58)], { initial: 1 }), ['ENCDR'], 2)] },
    { cells: [cell(knob('extLts', 'EXT LTS', ['DOCK', 'OFF', 'EVA'], 'nasa', [S6('printed 13-11', 505), S6('printed 16-25', 664), S2(120)], { initial: 1 }), ['EXT LTS'], 2)] },
  ],
  [
    { cells: [cell(mk('button', 'emerRel', 'EMER REL', 'nasa', [S6('printed 13-17', 511), S6('printed 13-18', 512), S2(122), S2(123)], { states: ['COVERED', 'PRESSED'], quiet: true }), ['EMER REL'], 2)] },
    { cells: [cell(knob('indexExtend', 'INDEX EXTEND', ['INDEX EXTEND', 'OFF', 'POD EJECT'], 'conflict', [S6('Detail J, Fig 3-5 sheet 2', 58), S6('printed 13-11', 505), S6('printed 16-25', 664), S7('printed 8-293', 323), S2(120)], { initial: 1 }), ['S/C 9, 12 label:', 'EVA BARS EXT'], 2)] },
  ],
  [
    { cells: [cell(tog('engine', 'ENGINE', ['ARM', 'STOP'], 'nasa', [S6('printed 13-15', 509), S2(123), S2(127)], { initial: 1 }), ['ENGINE'], 2)] },
    { cells: [cell(knob('busArm', 'BUS ARM', ['DOCK', 'SAFE', 'EXP'], 'partial', [S6('Fig 5-4, printed 5-9', 127), S6('printed 13-11', 505), S6('printed 5-18', 136)], { initial: 1 }), ['BUS ARM'], 2)] },
  ],
];

const ROW_Y = [6, 94, 182, 270], PITCH = 88, BOX = 86, CTL_Y = 54;
const buildBlock = (rows, x0, width, units, out) => {
  const u = width / units;
  rows.forEach((groups, r) => {
    const y0 = ROW_Y[r];
    const top = y0 - 2, bot = y0 - 2 + BOX;
    out.lines.push([x0, top, x0 + width, top], [x0, bot, x0 + width, bot], [x0, top, x0, bot], [x0 + width, top, x0 + width, bot]);
    let col = 0;
    groups.forEach((g, gi) => {
      const gu = g.cells.reduce((a, c) => a + c.w, 0);
      const gx = x0 + col * u;
      const gw = gu * u;
      if (gi > 0) out.lines.push([gx, top, gx, bot]);
      if (g.title) {
        out.lines.push([gx, y0 + 10, gx + gw, y0 + 10]);
        out.texts.push({ x: gx + gw / 2, y: y0 + 7, text: g.title, size: 6.4, bold: true });
      }
      let cx0 = gx;
      g.cells.forEach((c, k) => {
        const cw = c.w * u;
        const cx = cx0 + cw / 2;
        if (k > 0) out.lines.push([cx0, g.title ? y0 + 10 : top, cx0, bot]);
        c.lines.forEach((ln, li) => out.texts.push({ x: cx, y: y0 + (g.title ? 20 : 12) + li * 8, text: ln, size: ln.length > 11 ? 5.4 : 6.2 }));
        if (c.c) {
          const k2 = c.c;
          out.controls.push({
            id: k2.id, type: k2.type, label: k2.label, x: cx, y: y0 + CTL_Y, states: k2.states, angles: k2.angles, orient: 'v',
            quiet: !!k2.quiet, initial: k2.initial ?? 0, page: 58, status: k2.status, fn: k2.status !== 'unverified', fnPage: k2.refs[0]?.[2] ?? 58,
            refs: [DRAW, ...k2.refs],
          });
        }
        cx0 += cw;
      });
      col += gu;
    });
  });
};

const lay = { lines: [], texts: [], controls: [] };
buildBlock(LEFT_ROWS, 12, 576, 9, lay);
buildBlock(RIGHT_ROWS, 604, 160, 4, lay);
// The right block has 4 cells in its first row but 2 in the others: every group spans the full 4 units.
export const RIGHT_PANEL = {
  id: 'gemini-right', width: 776, height: 360, minWidth: 880, rules: false, fnPrefix: 'reentry.right.fn',
  lines: lay.lines, texts: lay.texts, controls: lay.controls,
};

const ids = (st) => RIGHT_PANEL.controls.filter((c) => st.includes(c.status)).map((c) => c.id);
export const MAIN_IDS = ['mainBatt1', 'mainBatt2', 'mainBatt3', 'mainBatt4'];
export const SQUIB_BATT_IDS = ['squibBatt1', 'squibBatt2', 'squibBatt3'];
export const POWER_IDS = [...MAIN_IDS, ...SQUIB_BATT_IDS, 'busTie1', 'busTie2'];
export const DOCKING_IDS = ['radarPwr', 'encdr', 'extLts', 'indexExtend', 'emerRel', 'engine', 'busArm'];
export const SYSTEMS_IDS = ['acPower', 'scanHtr', 'rcsHtr', 'bioMedInst', 'bioMedRcdr1', 'bioMedRcdr2', 'fuelCell1', 'fuelCell2'];
export const LABEL_ONLY_IDS = ids(['unverified']);
export const PARTIAL_IDS = ids(['partial']);
export const CONFLICT_IDS = ids(['conflict']);
export const NOT_FULLY_DOCUMENTED = [...LABEL_ONLY_IDS, ...PARTIAL_IDS];

const all = (ids2, label) => Object.fromEntries(ids2.map((id) => [id, label]));
// Only settings the note documents [S6 PDF 121, 134-143; S2 pp.109-112]. Settings the sources give, not a checklist.
export const RIGHT_PRESETS = {
  // main batteries ON (redundancy at launch); squib batteries 1 and 2 on UMB so ground power feeds the squib buses
  rightPad: { ...all(MAIN_IDS, 'ON'), squibBatt1: 'UMB', squibBatt2: 'UMB' },
  // the crew sets the squib batteries ON before launch; they stay ON to landing
  rightPrelaunch: { ...all(MAIN_IDS, 'ON'), ...all(SQUIB_BATT_IDS, 'ON') },
  // main batteries OFF after insertion, to conserve them
  rightAfterInsertion: all(MAIN_IDS, 'OFF'),
  // main batteries back ON at Tr-256: no automatic switching
  rightTr256: all(MAIN_IDS, 'ON'),
  // after landing: three readings, shown side by side because they disagree
  rightLandingNasa1: { squibBatt1: 'OFF', squibBatt2: 'OFF' },
  rightLandingNasa2: { ...all(MAIN_IDS, 'ON'), squibBatt1: 'ON' },
  rightLandingGame: { squibBatt1: 'ON', squibBatt2: 'OFF', squibBatt3: 'OFF' },
};

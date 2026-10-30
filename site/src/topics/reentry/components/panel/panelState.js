// Plain state logic for the panel engine (no React). A panel is data:
//   { id, width, height, texts: [{ x, y, text, size?, anchor?, bold? }], controls: [control] }
// A control:
//   { id, type: 'toggle' | 'breaker' | 'selector' | 'display', x, y, label, page,
//     button: a covered push button, states ['COVERED', 'PRESSED'] (no lever; the cover shows while COVERED),
//     breaker: a 2-state circuit breaker toggle, states ['CLOSED', 'OPEN'] (closed = up); `quiet: true` hides state labels,
//     status?: 'nasa' | 'partial' | 'vol1' | 'inferred' | 'unverified' | 'conflict' (how well the research documents it),
//     refs?: [[sourceId, locator, pdfPage]] source chips for the readout (default: the game manual pages),
//     states: [printed position labels, in physical order: top→bottom or left→right],
//     orient?: 'v' | 'h' (toggle), angles?: [deg per state] (selector), initial?: index,
//     fn?: true when the manual documents the function (text: messages `fn.<id>`), fnPage?,
//     wrap?: stack long labels }
// State = { [controlId]: index of the current position }.

export const isOperable = (c) => c.type === 'toggle' || c.type === 'breaker' || c.type === 'selector' || c.type === 'button';

export function validatePanel(panel) {
  const problems = [];
  const seen = new Set();
  for (const c of panel.controls) {
    if (seen.has(c.id)) problems.push(`${c.id}: duplicate id`);
    seen.add(c.id);
    if (!c.label) problems.push(`${c.id}: no label`);
    if (!c.page) problems.push(`${c.id}: no source page`);
    if (isOperable(c)) {
      if (!Array.isArray(c.states) || c.states.length < 2) problems.push(`${c.id}: needs 2+ states`);
      if ((c.initial ?? 0) >= (c.states?.length ?? 0)) problems.push(`${c.id}: initial out of range`);
      if (c.type === 'breaker' && c.states?.length !== 2) problems.push(`${c.id}: a breaker has exactly 2 states`);
      if (c.type === 'button' && c.states?.length !== 2) problems.push(`${c.id}: a button has exactly 2 states`);
      if (c.type === 'selector' && c.angles?.length !== c.states?.length) problems.push(`${c.id}: one angle per state`);
      if (c.refs && !c.refs.every((r) => Array.isArray(r) && r[0] && r[2])) problems.push(`${c.id}: refs need [source, locator, page]`);
      if (c.status && !['nasa', 'partial', 'vol1', 'inferred', 'unverified', 'conflict'].includes(c.status)) problems.push(`${c.id}: unknown status`);
      if (c.status === 'unverified' && c.fn) problems.push(`${c.id}: unverified control cannot have a documented function`);
      if (c.fn && !c.fnPage) problems.push(`${c.id}: documented function without a page`);
    }
  }
  return problems;
}

export const findControl = (panel, id) => panel.controls.find((c) => c.id === id);

export function initialState(panel) {
  const state = {};
  for (const c of panel.controls) if (isOperable(c)) state[c.id] = c.initial ?? 0;
  return state;
}

/**
 * action: 'cycle' (next, wrapping: a tap), 'next' / 'prev' (one step, stops at the ends),
 * or { set: index }. Returns a new state; the old one is untouched.
 */
export function operate(panel, state, id, action) {
  const c = findControl(panel, id);
  if (!c || !isOperable(c)) return state;
  const last = c.states.length - 1;
  const cur = state[id];
  let next = cur;
  if (action === 'cycle') next = cur >= last ? 0 : cur + 1;
  else if (action === 'next') next = Math.min(last, cur + 1);
  else if (action === 'prev') next = Math.max(0, cur - 1);
  else if (action && typeof action.set === 'number') next = Math.max(0, Math.min(last, action.set));
  return next === cur ? state : { ...state, [id]: next };
}

export const positionLabel = (panel, state, id) => findControl(panel, id)?.states?.[state[id]];

/** Put several controls at positions given by their printed labels: { controlId: 'CMD' }. */
export function applyPreset(panel, state, preset) {
  let next = state;
  for (const [id, label] of Object.entries(preset)) {
    const c = findControl(panel, id);
    const i = c?.states?.indexOf(label) ?? -1;
    if (i < 0) throw new Error(`preset: ${id} has no position "${label}"`);
    next = operate(panel, next, id, { set: i });
  }
  return next;
}

/** True when every control in the preset is at its position. */
export const presetApplied = (panel, state, preset) =>
  Object.entries(preset).every(([id, label]) => positionLabel(panel, state, id) === label);

/** Keyboard: arrows move one position (up/left = first positions, down/right = last), Enter/Space = tap. */
export function keyAction(key) {
  if (key === 'ArrowUp' || key === 'ArrowLeft') return 'prev';
  if (key === 'ArrowDown' || key === 'ArrowRight') return 'next';
  if (key === 'Enter' || key === ' ') return 'cycle';
  return null;
}

/**
 * How a toggle lever (or a selector pointer) is drawn for a position:
 * a pointer drawn pointing up, rotated by `angle` degrees and shortened by `scale`.
 * The middle position of a 3-position toggle is a short lever, as seen from the front.
 */
export function leverPose(c, index) {
  if (c.type === 'selector') return { angle: c.angles[index], scale: 1 };
  const last = c.states.length - 1;
  const [first, end] = c.orient === 'h' ? [-90, 90] : [0, 180];
  if (index === 0) return { angle: first, scale: 1 };
  if (index === last) return { angle: end, scale: 1 };
  return { angle: 0, scale: 0.3 };
}

/** The rule "how the game operates it" for a control: a messages key under `rule.` */
export const ruleKey = (c) => (c.type === 'selector' ? 'selector' : c.orient === 'h' ? 'switchH' : 'switchV');
export const rulePage = (c) => (c.type === 'selector' ? 10 : 9);

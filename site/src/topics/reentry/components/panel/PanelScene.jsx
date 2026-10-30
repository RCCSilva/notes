import { useMemo, useReducer, useState } from 'react';
import { useI18n } from '../../../../i18n/I18n';
import { StillScene, Hint } from '../../../../components/scene/Scene';
import { resolveRef } from '../../sources';
import {
  initialState, operate, applyPreset, presetApplied, positionLabel, keyAction, leverPose, isOperable, ruleKey, rulePage,
} from './panelState';
import './panel.css';

const reducer = (panel) => (state, a) => (a.preset ? applyPreset(panel, state, a.preset) : operate(panel, state, a.id, a.action));

function Labels({ c, index }) {
  const last = c.states.length - 1;
  const out = [];
  c.states.forEach((s, i) => {
    let x = 0, y = 0, anchor = 'middle';
    if (c.type === 'selector') {
      const a = (c.angles[i] * Math.PI) / 180;
      x = Math.sin(a) * 27; y = -Math.cos(a) * 24 + 3;
      anchor = x < -3 ? 'end' : x > 3 ? 'start' : 'middle';
    } else if (c.orient === 'h') {
      if (i === 0) { x = -15; y = 3; anchor = 'end'; } else if (i === last) { x = 15; y = 3; anchor = 'start'; } else { y = -13; }
    } else if (i === 0) { y = -19; } else if (i === last) { y = 25; } else { x = -13; y = 3; anchor = 'end'; }
    const words = c.wrap && i === last ? s.split(' ') : [s];
    out.push(
      <text key={s} className={`pn-state ${i === index ? 'is-now' : ''}`} x={x} y={words.length > 1 ? y - 3 : y} textAnchor={anchor}>
        {words.map((w, k) => <tspan key={k} x={x} dy={k === 0 ? 0 : 8}>{w}</tspan>)}
      </text>,
    );
  });
  return out;
}
function Control({ c, index, selected, dim, onOperate, onSelect }) {
  const pose = leverPose(c, index);
  const name = `${c.label}: ${c.states[index]}`;
  const act = (action) => { onSelect(c.id); onOperate(c.id, action); };
  return (
    <g
      className={`pn-control is-${c.type} ${selected ? 'is-selected' : ''} ${dim ? 'is-dim' : ''}`}
      transform={`translate(${c.x} ${c.y})`}
      role="button"
      tabIndex={0}
      aria-label={name}
      onClick={() => act('cycle')}
      onContextMenu={(e) => { e.preventDefault(); act('prev'); }}
      onFocus={() => onSelect(c.id)}
      onKeyDown={(e) => {
        const a = keyAction(e.key);
        if (a) { e.preventDefault(); act(a); }
      }}
    >
      <rect className="pn-hit" x="-22" y="-26" width="44" height="52" />
      {c.type === 'selector' ? <circle className="pn-knob" r="13" /> : c.type === 'breaker' ? (
        <polygon className="pn-nut" points="-9,0 -4.5,-7.8 4.5,-7.8 9,0 4.5,7.8 -4.5,7.8" />
      ) : (
        <rect className="pn-slot" x={c.orient === 'h' ? -15 : -5} y={c.orient === 'h' ? -5 : -15} width={c.orient === 'h' ? 30 : 10} height={c.orient === 'h' ? 10 : 30} rx="5" />
      )}
      <g className="pn-lever" style={{ transform: `rotate(${pose.angle}deg) scaleY(${pose.scale})` }}>
        <line x1="0" y1="0" x2="0" y2={c.type === 'selector' ? -13 : -12} />
        {c.type !== 'selector' && <circle cy="-12" r="4.2" />}
      </g>
      {c.type === 'selector' && <circle className="pn-cap" r="3" />}
      {!c.quiet && (
        <g aria-hidden="true">
          <Labels c={c} index={index} />
        </g>
      )}
      <title>{name}</title>
    </g>
  );
}

function Readout({ panel, state, selectedId }) {
  const { t } = useI18n();
  const c = panel.controls.find((x) => x.id === selectedId);
  if (!c) return <div className="pn-readout" aria-live="polite"><p>{t('reentry.panel.pickOne')}</p></div>;
  const chipOf = (r, key) => {
    const ref = resolveRef(r);
    return <a key={key} href={ref.href} target="_blank" rel="noreferrer" title={ref.title}>{ref.label}</a>;
  };
  const chip = (page, key) => chipOf(['S2', null, page], key);
  const fnPrefix = panel.fnPrefix ?? 'reentry.fn';
  const showRule = panel.rules !== false;
  return (
    <div className="pn-readout" aria-live="polite">
      <p className="pn-r-head">
        <strong>{c.label}</strong>
        {isOperable(c) && <span>{t('reentry.panel.position')}: <b>{positionLabel(panel, state, c.id)}</b></span>}
      </p>
      {c.status && <p className={`pn-status is-${c.status}`}>{t(`reentry.status.${c.status}`)}</p>}
      {c.fn
        ? <p>{t(`${fnPrefix}.${c.id}`)}</p>
        : <p className="pn-unverified">{t('reentry.panel.unverified')}</p>}
      {showRule && isOperable(c) && (
        <p className="pn-rule"><span>{t('reentry.panel.inGame')}:</span> {t(`reentry.rule.${ruleKey(c)}`)}</p>
      )}
      <p className="pn-refs">
        <span>{t('ui.deck.source')}:</span>
        {c.refs ? c.refs.map((r, i) => chipOf(r, `r${i}`)) : (
          <>
            {chip(c.page, 'label')}
            {c.fn && c.fnPage !== c.page && chip(c.fnPage, 'fn')}
            {showRule && isOperable(c) && chip(rulePage(c), 'rule')}
          </>
        )}
      </p>
    </div>
  );
}

/**
 * A panel (data) as an interactive still scene. highlight: control ids this slide is about.
 * presets: [preset ids] shown as buttons that set several controls at once (values from COMM_PRESETS-like maps).
 */
export default function PanelScene({ panel, highlight = [], presets = [], presetData = {} }) {
  const { t } = useI18n();
  const [state, dispatch] = useReducer(useMemo(() => reducer(panel), [panel]), panel, initialState);
  const [selectedId, setSelected] = useState(null);
  const hl = new Set(highlight);

  const footer = (
    <>
      {presets.length > 0 && (
        <div className="pn-presets">
          {presets.map((id) => (
            <button key={id} type="button" className="pn-preset" onClick={() => dispatch({ preset: presetData[id] })}>
              {presetApplied(panel, state, presetData[id]) && <span aria-hidden="true">✓ </span>}{t(`reentry.presets.${id}`)}
            </button>
          ))}
        </div>
      )}
      <Readout panel={panel} state={state} selectedId={selectedId} />
    </>
  );

  return (
    <StillScene className="pn-scene" header={<Hint>{t('reentry.panel.hint')}</Hint>} footer={footer}>
      <div className="pn-scroll">
        <svg className="pn-svg" style={panel.minWidth ? { minWidth: panel.minWidth } : undefined} viewBox={`-6 -6 ${panel.width + 12} ${panel.height + 12}`} role="group" aria-label={t(`reentry.panel.names.${panel.id}`)}>
          <rect className="pn-face" x="-6" y="-6" width={panel.width + 12} height={panel.height + 12} rx="6" />
          {panel.lines.map(([x1, y1, x2, y2], i) => <line key={i} className="pn-line" x1={x1} y1={y1} x2={x2} y2={y2} />)}
          {panel.texts.map((tx, i) => (
            <text key={i} className={`pn-text ${tx.bold ? 'is-bold' : ''}`} x={tx.x} y={tx.y} style={tx.size ? { fontSize: tx.size } : undefined} textAnchor={tx.anchor ?? 'middle'} aria-hidden="true">{tx.text}</text>
          ))}
          {panel.controls.map((c) => (c.type === 'display' ? (
            <g key={c.id} className="pn-control is-display" transform={`translate(${c.x} ${c.y})`} role="img" aria-label={`${c.label}: ${c.text.split('').join(' ')}`}>
              <rect className="pn-disp" x="-22" y="-10" width="44" height="20" rx="3" />
              {c.text.split('').map((d, i) => <text key={i} x={-13 + i * 13} y="4" textAnchor="middle">{d}</text>)}
            </g>
          ) : (
            <Control
              key={c.id}
              c={c}
              index={state[c.id]}
              selected={selectedId === c.id}
              dim={hl.size > 0 && !hl.has(c.id)}
              onOperate={(id, action) => dispatch({ id, action })}
              onSelect={setSelected}
            />
          )))}
        </svg>
      </div>
    </StillScene>
  );
}

import { useI18n } from '../../../../i18n/I18n';
import { HOME, FIRST, SECOND, THIRD } from './geometry';

/** A player token (feet coordinates). side: 'def' | 'off'. r = radius in feet (bigger than a real player so it can be read). */
export function Token({ x, y, label, r = 7, side = 'def', active = false, dim = false, onSelect, name }) {
  const btn = Boolean(onSelect);
  return (
    <g
      className={`mt mt-${side}${active ? ' is-active' : ''}${dim ? ' is-dim' : ''}${btn ? ' is-btn' : ''}`}
      transform={`translate(${x} ${y})`}
      onClick={onSelect}
      onKeyDown={btn ? (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelect()) : undefined}
      tabIndex={btn ? 0 : undefined}
      role={btn ? 'button' : undefined}
      aria-label={btn ? name : undefined}
      aria-pressed={btn ? active : undefined}
    >
      <circle r={r} />
      <text className="mt-label" style={{ fontSize: r * (label.length > 2 ? 0.8 : 1) }}>{label}</text>
    </g>
  );
}

/** The ball. z (0-1) lifts it (fly balls); r in feet (drawn bigger than real so it can be seen). */
export function Ball({ x, y, z = 0, r = 3 }) {
  const lift = z * r * 6;
  return (
    <g>
      {z > 0 && <ellipse className="mb-shadow" cx={x} cy={y} rx={r} ry={r * 0.5} />}
      <g transform={`translate(${x} ${y - lift})`}>
        <circle className="mb-ball" r={r * (1 + z * 0.6)} />
        <path className="mb-stitch" d={`M${-r * 0.5} ${-r * 0.6} q${r * 0.4} ${r * 0.6} 0 ${r * 1.2} M${r * 0.5} ${-r * 0.6} q${-r * 0.4} ${r * 0.6} 0 ${r * 1.2}`} />
      </g>
    </g>
  );
}

/** A text label in feet units. */
export function Label({ x, y, size = 10, children }) {
  return <text className="mf-label" x={x} y={y} style={{ fontSize: size }}>{children}</text>;
}

/** A dimension line with a label above its middle. */
export function Dimension({ a, b, size = 9, children, dy = -5, dx = 0 }) {
  return (
    <g className="mf-dim">
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      <circle cx={a[0]} cy={a[1]} r={1.4} /><circle cx={b[0]} cy={b[1]} r={1.4} />
      <Label x={(a[0] + b[0]) / 2 + dx} y={(a[1] + b[1]) / 2 + dy} size={size}>{children}</Label>
    </g>
  );
}

/** "Home", "1st", "2nd", "3rd" next to the bases (infield view sizes by default). */
export function BaseLabels({ size = 8, ids = ['home', 'first', 'second', 'third'] }) {
  const { t } = useI18n();
  const at = {
    home: [HOME[0], HOME[1] + size * 2.2],
    first: [FIRST[0] + size * 2.6, FIRST[1]],
    second: [SECOND[0], SECOND[1] - size * 1.6],
    third: [THIRD[0] - size * 2.6, THIRD[1]],
  };
  return ids.map((id) => <Label key={id} x={at[id][0]} y={at[id][1]} size={size}>{t(`mlb.common.${id}`)}</Label>);
}

/** A red X marking an out. */
export function OutMark({ x, y, r = 5 }) {
  return (
    <g>
      <path className="mf-out" d={`M${x - r} ${y - r} L${x + r} ${y + r} M${x + r} ${y - r} L${x - r} ${y + r}`} />
    </g>
  );
}

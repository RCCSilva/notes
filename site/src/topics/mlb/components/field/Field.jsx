import { useId } from 'react';
import { useI18n } from '../../../../i18n/I18n';
import {
  HOME, FIRST, SECOND, THIRD, MOUND, MOUND_DIAMETER, GRASS_LINE_R, RUBBER, BASE, BAG_CENTERS,
  fenceD, FENCE_ENDS, plateShape, VIEWS, PATH,
} from './geometry';
import './field.css';

const rect = (x, y, w, h) => `${x} ${y} ${w} ${h}`;

/**
 * A baseball field drawn in SVG, to scale in feet (see geometry.js). Positions and distances are true;
 * bases and home plate are drawn `markScale` times bigger than real so they stay visible (1 = true size).
 *
 * - view:       'full' | 'infield' | [x, y, w, h] in feet
 * - highlight:  part ids to emphasise: 'infield' | 'outfield' | 'foul' | 'bases' | 'mound' | 'lines' | 'fence'
 * - interactive: tokens inside are buttons: a group, not a flat image
 * - children:   overlays in the same feet coordinates
 */
export default function Field({ view = 'full', highlight = [], markScale = 1, title, interactive = false, className = '', children }) {
  const { t } = useI18n();
  const clip = `mlb-clip-${useId().replace(/\W/g, '')}`;
  const box = Array.isArray(view) ? view : VIEWS[view];
  const on = (id) => (highlight.includes(id) ? ' is-hl' : '');
  const [lx, ly] = [FENCE_ENDS[0], FENCE_ENDS[1]];
  const wedge = `M0 0 L${lx[0]} ${lx[1]} ${fenceD.replace(/^M\S+ \S+ /, '')} Z`;
  const bag = (c, key) => (
    <rect key={key} className="mf-base" x={-BASE / 2} y={-BASE / 2} width={BASE} height={BASE}
      transform={`translate(${c[0]} ${c[1]}) rotate(45) scale(${markScale})`} />
  );
  const plate = plateShape(markScale);

  return (
    <svg
      className={`mlb-field ${highlight.length ? 'has-hl' : ''} ${className}`}
      viewBox={rect(...box)}
      role={interactive ? 'group' : 'img'}
      aria-label={title ?? t('mlb.field')}
    >
      <defs>
        <clipPath id={clip}><path d={wedge} /></clipPath>
      </defs>
      <rect className={`mf-foul part${on('foul')}`} x={box[0] - 400} y={box[1] - 400} width={box[2] + 800} height={box[3] + 800} />
      <path className={`mf-grass part${on('outfield')}`} d={wedge} />
      <g clipPath={`url(#${clip})`}>
        <circle className={`part mf-dirt${on('infield')}`} cx={MOUND[0]} cy={MOUND[1]} r={GRASS_LINE_R} />
      </g>
      <path className={`mf-fence part${on('fence')}`} d={fenceD} />
      <g className={`part${on('lines')}`}>
        <line className="mf-chalk" x1={0} y1={0} x2={lx[0]} y2={lx[1]} />
        <line className="mf-chalk" x1={0} y1={0} x2={FENCE_ENDS[1][0]} y2={FENCE_ENDS[1][1]} />
        <polyline className="mf-path" points={PATH.slice(1, 4).map((p) => p.join(',')).join(' ')} />
      </g>
      <g className={`part${on('mound')}`}>
        <circle className="mf-mound" cx={MOUND[0]} cy={MOUND[1]} r={MOUND_DIAMETER / 2} />
        <rect className="mf-rubber" x={MOUND[0] - (RUBBER[0] / 2) * markScale} y={MOUND[1] - (RUBBER[1] / 2) * markScale}
          width={RUBBER[0] * markScale} height={RUBBER[1] * markScale} />
      </g>
      <g className={`part${on('bases')}`}>
        {BAG_CENTERS.map(bag)}
        <polygon className="mf-plate" points={plate.map((p) => p.join(',')).join(' ')} />
      </g>
      {children}
    </svg>
  );
}

import { useI18n } from '../../../i18n/I18n';
import { StillScene, FluidScene, StopMotionScene, StateLine } from '../../../components/scene/Scene';
import { clamp01, lerp, along } from '../../../components/motion';
import Field from '../components/field/Field';
import { Token, Ball, Label, BaseLabels, OutMark } from '../components/field/pieces';
import { PATH, HOME, FIRST, SECOND, THIRD, BAG_CENTERS } from '../components/field/geometry';
import CountBoard from '../components/CountBoard';
import ZoneSvg from '../components/ZoneSvg';

const dot = (color) => <i style={{ background: color }} />;

export function ZoneVisual() {
  const { t } = useI18n();
  return <StillScene header={t('mlb.v.zone.head')}><ZoneSvg landmarks /></StillScene>;
}

export function BallStrikeVisual() {
  const { t } = useI18n();
  return (
    <StillScene
      header={t('mlb.v.ballStrike.head')}
      footer={<span className="mlb-key"><span>{dot('#5fd38d')}{t('mlb.common.ball')}</span><span>{dot('#ffd24a')}{t('mlb.common.strike')}</span></span>}
    >
      <ZoneSvg>
        <g fontSize="13" fontWeight="700">
          <circle cx="90" cy="176" r="9" fill="#5fd38d" /><text x="90" y="181" fill="#102" style={{ fill: '#102' }}>{t('mlb.v.ballStrike.b')}</text>
          <circle cx="90" cy="112" r="9" fill="#ffd24a" /><text x="90" y="117" style={{ fill: '#102' }}>{t('mlb.v.ballStrike.s')}</text>
          <path d="M180 60 q50 20 0 80" fill="none" stroke="#e9e9e9" strokeWidth="3" strokeDasharray="4 3" />
          <circle cx="205" cy="100" r="9" fill="#ffd24a" /><text x="205" y="105" style={{ fill: '#102' }}>{t('mlb.v.ballStrike.s')}</text>
        </g>
        <g fontSize="11">
          <text x="200" y="176" style={{ textAnchor: 'middle' }}>{t('mlb.v.ballStrike.swing')}</text>
          <text x="200" y="190" style={{ textAnchor: 'middle' }}>{t('mlb.v.ballStrike.swing2')}</text>
        </g>
      </ZoneSvg>
    </StillScene>
  );
}

export function FoulVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.foul.head')}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {[[0, 1, 'a'], [2, 2, 'b']].map(([from, to, k]) => (
          <div key={k}>
            <p className="mc-result" style={{ color: 'inherit' }}>{t(`mlb.v.foul.${k}`)}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <CountBoard strikes={from} />
              <span aria-hidden="true">→</span>
              <CountBoard strikes={to} />
            </div>
          </div>
        ))}
      </div>
    </StillScene>
  );
}

/** Pitch by pitch from 0 balls and 0 strikes to a walk. Captions: mlb.v.count.steps = [{ chip, caption }]. */
const COUNT = [[0, 0], [1, 0], [1, 1], [1, 2], [1, 2], [2, 2], [3, 2], [4, 2]];
export function CountVisual({ replay }) {
  const { tm } = useI18n();
  const steps = tm('mlb.v.count.steps');
  return (
    <StopMotionScene
      frames={COUNT.length}
      replay={replay}
      interval={2400}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === COUNT.length - 1} />}
    >
      {(i) => <CountBoard balls={COUNT[i][0]} strikes={COUNT[i][1]} />}
    </StopMotionScene>
  );
}

export function HitsVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.hits.head')}>
      <Field view="infield" markScale={2.5}>
        <Label x={FIRST[0] + 24} y={FIRST[1]} size={9}>{t('mlb.v.hits.single')}</Label>
        <Label x={SECOND[0]} y={SECOND[1] - 14} size={9}>{t('mlb.v.hits.double')}</Label>
        <Label x={THIRD[0] - 24} y={THIRD[1]} size={9}>{t('mlb.v.hits.triple')}</Label>
        <Label x={HOME[0]} y={HOME[1] + 20} size={9}>{t('mlb.v.hits.homer')}</Label>
      </Field>
    </StillScene>
  );
}

const FLIGHT = 2600;
const TROT = 9000;
export function HomeRunVisual() {
  const { t } = useI18n();
  const target = [70, -425];
  return (
    <FluidScene
      duration={FLIGHT + TROT}
      header={(ms) => <StateLine chip={ms < FLIGHT ? t('mlb.v.homer.flight') : t('mlb.v.homer.trot')} caption={ms < FLIGHT ? t('mlb.v.homer.flightCap') : t('mlb.v.homer.trotCap')} highlight={ms >= FLIGHT + TROT} />}
    >
      {(ms) => {
        const p = clamp01(ms / FLIGHT);
        const run = clamp01((ms - 500) / (FLIGHT + TROT - 500));
        const rp = along(PATH, run);
        return (
          <Field markScale={3}>
            <Ball x={lerp(0, target[0], p)} y={lerp(0, target[1], p)} z={Math.sin(Math.PI * p)} r={5} />
            <Token x={rp[0]} y={rp[1]} r={9} side="off" label={t('mlb.tok.batter')} />
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function WalkVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.walk.head')}>
      <Field view="infield" markScale={2.5}>
        <BaseLabels size={8} ids={['first']} />
        <Token x={BAG_CENTERS[0][0] - 10} y={BAG_CENTERS[0][1] + 2} r={7} side="off" label={t('mlb.tok.batter')} />
        <Token x={-9} y={-2} r={5} side="off" dim label={t('mlb.tok.batter')} />
        <Label x={FIRST[0] - 30} y={FIRST[1] + 28} size={8}>{t('mlb.v.walk.free')}</Label>
      </Field>
    </StillScene>
  );
}

export function OtherVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.other.head')}>
      <Field view="infield" markScale={2.5}>
        <BaseLabels size={8} ids={['first']} />
        <Token x={BAG_CENTERS[0][0] - 10} y={BAG_CENTERS[0][1] + 2} r={7} side="off" label={t('mlb.tok.batter')} />
        <Label x={FIRST[0] - 30} y={FIRST[1] + 28} size={8}>{t('mlb.v.other.safe')}</Label>
      </Field>
    </StillScene>
  );
}

const RUN_MS = 8800;
export function RunVisual() {
  const { t } = useI18n();
  return (
    <FluidScene
      duration={RUN_MS}
      header={(ms) => {
        const n = Math.min(4, Math.floor(clamp01(ms / (RUN_MS - 400)) * 4 + 0.001));
        return <StateLine chip={t('mlb.v.run.touched', { n })} caption={n === 4 ? t('mlb.v.run.done') : t('mlb.v.run.cap')} highlight={n === 4} />;
      }}
    >
      {(ms) => {
        const p = clamp01(ms / (RUN_MS - 400));
        const done = p >= 1;
        const rp = along(PATH, p);
        const touched = [p >= 0.25, p >= 0.5, p >= 0.75];
        return (
          <Field view="infield" markScale={2.5}>
            <BaseLabels size={8} />
            {BAG_CENTERS.map((c, i) => touched[i] && <circle key={i} cx={c[0]} cy={c[1]} r={5} fill="#ffe066" opacity="0.8" />)}
            <Token x={rp[0]} y={rp[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            {done && <Label x={0} y={-40} size={13}>{t('mlb.v.run.score')}</Label>}
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function RunCountsVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.runCounts.head')} footer={<CountBoard outs={3} />}>
      <Field view="infield" markScale={2.5}>
        <BaseLabels size={8} />
        <Token x={THIRD[0] + 12} y={THIRD[1] + 8} r={7} side="off" label={t('mlb.tok.runner')} />
        <path className="mf-arrow" d={`M${THIRD[0] + 20} ${THIRD[1] + 22} L-6 -6`} stroke="#ffe066" strokeDasharray="6 5" />
        <Label x={THIRD[0] + 4} y={THIRD[1] + 34} size={8}>{t('mlb.v.runCounts.noRun')}</Label>
        <Token x={FIRST[0] - 24} y={FIRST[1] + 24} r={7} side="off" label={t('mlb.tok.batter')} />
        <OutMark x={FIRST[0] - 24} y={FIRST[1] + 24} r={9} />
        <Label x={FIRST[0] - 5} y={FIRST[1] + 44} size={8}>{t('mlb.v.runCounts.third')}</Label>
      </Field>
    </StillScene>
  );
}

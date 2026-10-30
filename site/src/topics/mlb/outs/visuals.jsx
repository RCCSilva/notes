import { useI18n } from '../../../i18n/I18n';
import { StillScene, FluidScene, StopMotionScene, StateLine } from '../../../components/scene/Scene';
import { clamp01, lerp, along, seg } from '../../../components/motion';
import Field from '../components/field/Field';
import { Token, Ball, Label, BaseLabels, OutMark } from '../components/field/pieces';
import { HOME, FIRST, SECOND, THIRD, MOUND } from '../components/field/geometry';
import CountBoard from '../components/CountBoard';

const SS = [-26, -104];
const FIRSTMAN = [70, -79];
const SECONDMAN = [22, -104];
const THIRDMAN = [-57, -75];
const BATTER = [-9, -2];
const CATCHER = [0, 16];
const pt = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const FLD = { view: 'infield', markScale: 2.5 };

export function ThreeOutsVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.three.head')}>
      <div style={{ display: 'grid', gap: '0.6rem', justifyItems: 'center' }}>
        <CountBoard outs={0} />
        <CountBoard outs={2} />
        <CountBoard outs={3} />
        <p className="mc-result" style={{ color: 'inherit' }}>{t('mlb.v.three.end')}</p>
      </div>
    </StillScene>
  );
}

const PITCH = 2000;
const LAND = 800;
export function StrikeoutVisual() {
  const { t } = useI18n();
  return (
    <FluidScene
      duration={3 * PITCH + 600}
      header={(ms) => {
        const n = Math.min(3, Math.floor((ms + PITCH - LAND) / PITCH));
        return <StateLine chip={t('mlb.v.strikeout.strike', { n: Math.max(0, n) })} caption={n >= 3 ? t('mlb.v.strikeout.out') : t('mlb.v.strikeout.cap')} highlight={n >= 3} />;
      }}
      footer={(ms) => <CountBoard strikes={Math.max(0, Math.min(3, Math.floor((ms + PITCH - LAND) / PITCH)))} />}
    >
      {(ms) => {
        const k = Math.min(2, Math.floor(ms / PITCH));
        const p = clamp01((ms - k * PITCH) / LAND);
        const strikes = Math.max(0, Math.min(3, Math.floor((ms + PITCH - LAND) / PITCH)));
        const bp = p < 1 ? pt(MOUND, [0, -4], p) : [0, 8];
        return (
          <Field {...FLD}>
            <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
            <Token x={CATCHER[0]} y={CATCHER[1]} r={7} label={t('mlb.pos.C.abbr')} />
            <Token x={BATTER[0] - 8} y={BATTER[1]} r={7} side="off" label={t('mlb.tok.batter')} />
            {strikes >= 3 && <OutMark x={BATTER[0] - 8} y={BATTER[1]} r={9} />}
            <Ball x={bp[0]} y={bp[1]} r={3} />
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function DroppedVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.dropped.steps');
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 2} />}
    >
      {(i) => (
        <Field {...FLD}>
          <BaseLabels size={8} ids={['first']} />
          <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
          <Token x={CATCHER[0] + (i > 0 ? 12 : 0)} y={CATCHER[1]} r={7} label={t('mlb.pos.C.abbr')} />
          <Token x={FIRSTMAN[0]} y={FIRSTMAN[1]} r={7} label={t('mlb.pos.1B.abbr')} />
          {i === 0 && <Ball x={14} y={22} r={3} />}
          {i === 1 && <Ball x={20} y={20} r={3} />}
          {i === 2 && <Ball x={FIRST[0] - 5} y={FIRST[1] + 8} r={3} />}
          {(() => { const b = i === 0 ? [BATTER[0] - 8, BATTER[1]] : pt(HOME, FIRST, i === 1 ? 0.4 : 0.9); return <Token x={b[0]} y={b[1] + (i ? 6 : 0)} r={7} side="off" label={t('mlb.tok.batter')} />; })()}
          {i === 2 && <OutMark x={FIRST[0] - 14} y={FIRST[1] + 14} r={9} />}
        </Field>
      )}
    </StopMotionScene>
  );
}

const FLY = 3000;
export function FlyoutVisual() {
  const { t } = useI18n();
  const land = [62, -255];
  return (
    <FluidScene
      duration={FLY + 2200}
      header={(ms) => <StateLine chip={ms < FLY ? t('mlb.v.fly.air') : t('mlb.v.fly.caught')} caption={ms < FLY ? t('mlb.v.fly.airCap') : t('mlb.v.fly.out')} highlight={ms >= FLY} />}
    >
      {(ms) => {
        const p = clamp01(ms / FLY);
        const cf = pt([0, -300], land, seg(ms, 400, FLY - 200));
        const caught = ms >= FLY;
        return (
          <Field markScale={3}>
            <Token x={cf[0]} y={cf[1]} r={13} label={t('mlb.pos.CF.abbr')} />
            <Token x={-14} y={-2} r={9} side="off" label={t('mlb.tok.batter')} />
            {caught && <OutMark x={-14} y={-2} r={12} />}
            <Ball x={lerp(0, land[0], p)} y={lerp(0, land[1], p)} z={Math.sin(Math.PI * p)} r={5} />
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function GroundoutVisual() {
  const { t } = useI18n();
  return (
    <FluidScene
      duration={5200}
      header={(ms) => <StateLine chip={ms < 3000 ? t('mlb.v.ground.race') : t('mlb.v.ground.out')} caption={ms < 3000 ? t('mlb.v.ground.cap') : t('mlb.v.ground.capOut')} highlight={ms >= 3000} />}
    >
      {(ms) => {
        const roll = clamp01(ms / 1300);
        const thr = clamp01((ms - 1700) / 1000);
        const ball = ms < 1700 ? pt(HOME, SS, roll) : pt(SS, [FIRST[0] - 3, FIRST[1]], thr);
        const run = pt(HOME, FIRST, clamp01((ms - 300) / 3400));
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first']} />
            <Token x={SS[0]} y={SS[1]} r={7} label={t('mlb.pos.SS.abbr')} />
            <Token x={FIRSTMAN[0] - 4} y={FIRSTMAN[1] + 6} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={run[0] + (ms < 400 ? -8 : 0)} y={run[1]} r={7} side="off" label={t('mlb.tok.batter')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {ms >= 3000 && <OutMark x={FIRST[0] - 12} y={FIRST[1] + 14} r={9} />}
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function TagVisual() {
  const { t } = useI18n();
  const meet = along([SECOND, THIRD], 0.7);
  return (
    <FluidScene
      duration={4600}
      header={(ms) => <StateLine chip={ms < 2300 ? t('mlb.v.tag.run') : t('mlb.v.tag.out')} caption={ms < 2300 ? t('mlb.v.tag.cap') : t('mlb.v.tag.capOut')} highlight={ms >= 2300} />}
    >
      {(ms) => {
        const rp = along([SECOND, THIRD], 0.7 * clamp01(ms / 2300));
        const f = pt(THIRDMAN, [meet[0] + 7, meet[1] + 5], seg(ms, 600, 2300));
        const thr = clamp01(ms / 700);
        const ball = ms < 700 ? pt(SS, THIRDMAN, thr) : [f[0] + 4, f[1] - 4];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['second', 'third']} />
            <Token x={rp[0]} y={rp[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Token x={f[0]} y={f[1]} r={7} label={t('mlb.pos.3B.abbr')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {ms >= 2300 && <OutMark x={rp[0]} y={rp[1]} r={9} />}
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function ForceVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.force.steps');
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 2} />}
    >
      {(i) => {
        const runner = i === 0 ? FIRST : pt(FIRST, SECOND, i === 1 ? 0.55 : 0.8);
        const batter = i === 0 ? [BATTER[0] - 8, BATTER[1]] : pt(HOME, FIRST, i === 1 ? 0.4 : 0.7);
        const ss = i === 2 ? [SECOND[0] - 9, SECOND[1] + 5] : SS;
        const ball = i === 0 ? [-26, -80] : i === 1 ? SS : [SECOND[0] - 5, SECOND[1] + 3];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second']} />
            <Token x={ss[0]} y={ss[1]} r={7} label={t('mlb.pos.SS.abbr')} />
            <Token x={batter[0]} y={batter[1]} r={6} side="off" label={t('mlb.tok.batter')} />
            <Token x={runner[0] + (i === 0 ? -9 : 0)} y={runner[1] + (i === 0 ? 4 : 0)} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {i === 2 && <OutMark x={runner[0]} y={runner[1]} r={9} />}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

export function ForceGoneVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.forceGone.steps');
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 1} />}
    >
      {(i) => {
        const runner = pt(FIRST, SECOND, i === 0 ? 0.15 : i === 1 ? 0.5 : 0.65);
        const batter = pt(HOME, FIRST, i === 0 ? 0.5 : 0.92);
        const firstman = i === 0 ? FIRSTMAN : [FIRST[0] - 7, FIRST[1] - 3];
        const second = i === 2 ? pt(SECONDMAN, [runner[0] - 8, runner[1] - 6], 0.8) : SECONDMAN;
        const ball = i === 0 ? FIRSTMAN : i === 1 ? [FIRST[0] - 3, FIRST[1] + 1] : [second[0] + 4, second[1] - 4];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second']} />
            <Token x={firstman[0]} y={firstman[1]} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={second[0]} y={second[1]} r={7} label={t('mlb.pos.2B.abbr')} />
            <Token x={batter[0] - (i > 0 ? 8 : 0)} y={batter[1] + (i > 0 ? 8 : 0)} r={6} side="off" label={t('mlb.tok.batter')} />
            {i >= 1 && <OutMark x={batter[0] - 8} y={batter[1] + 8} r={8} />}
            <Token x={runner[0]} y={runner[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {i === 2 && <Label x={runner[0] + 26} y={runner[1] + 4} size={8}>{t('mlb.v.forceGone.tag')}</Label>}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

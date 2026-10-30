import { useI18n } from '../../../i18n/I18n';
import { StillScene, StopMotionScene, StateLine } from '../../../components/scene/Scene';
import { lerp } from '../../../components/motion';
import Field from '../components/field/Field';
import { Token, Ball, Label, BaseLabels, OutMark } from '../components/field/pieces';
import { HOME, FIRST, SECOND, THIRD, MOUND } from '../components/field/geometry';
import Checklist from '../components/Checklist';
import CountBoard from '../components/CountBoard';

const SS = [-26, -104];
const THIRDMAN = [-57, -75];
const FIRSTMAN = [70, -79];
const BATTER = [-17, -2];
const CATCHER = [0, 16];
const pt = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const FLD = { view: 'infield', markScale: 2.5 };
const AT_FIRST = [FIRST[0] - 9, FIRST[1] + 4];
const AT_SECOND = [SECOND[0] + 9, SECOND[1] + 5];
const AT_THIRD = [THIRD[0] + 9, THIRD[1] + 4];
const P = (t) => <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />;

/* ---------- the infield fly ---------- */

export function InfieldFlyVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.if.head')}>
      <Field {...FLD}>
        <BaseLabels size={8} ids={['first', 'second', 'third']} />
        {P(t)}
        <Token x={SS[0]} y={SS[1]} r={7} label={t('mlb.pos.SS.abbr')} />
        <Token x={AT_FIRST[0]} y={AT_FIRST[1]} r={7} side="off" label={t('mlb.tok.runner')} />
        <Token x={AT_SECOND[0]} y={AT_SECOND[1]} r={7} side="off" label={t('mlb.tok.runner')} />
        <Token x={BATTER[0]} y={BATTER[1]} r={6} side="off" label={t('mlb.tok.batter')} />
        <Ball x={-26} y={-128} z={0.9} r={4} />
        <Label x={-26} y={-150} size={10}>{t('mlb.v.if.call')}</Label>
      </Field>
    </StillScene>
  );
}

export function InfieldConditionsVisual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.ifc.head')} footer={<span>{t('mlb.v.ifc.foot')}</span>}>
      <Checklist items={tm('mlb.v.ifc.items')} />
    </StillScene>
  );
}

export function InfieldWhyVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.ifw.steps');
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 2} />}
    >
      {(i) => {
        const r1 = i === 2 ? pt(FIRST, SECOND, 0.5) : AT_FIRST;
        const r2 = i === 2 ? pt(SECOND, THIRD, 0.5) : AT_SECOND;
        const ball = i === 0 ? [-26, -126] : i === 1 ? [-24, -96] : [THIRD[0] + 4, THIRD[1] + 2];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second', 'third']} />
            {P(t)}
            <Token x={SS[0] + 14} y={SS[1] + 4} r={7} label={t('mlb.pos.SS.abbr')} />
            <Token x={THIRDMAN[0]} y={THIRDMAN[1]} r={7} label={t('mlb.pos.3B.abbr')} />
            <Token x={r1[0]} y={r1[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Token x={r2[0]} y={r2[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} z={i === 0 ? 0.9 : 0} r={3} />
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

export function InfieldRuleVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.ifr.steps');
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 1} />}
    >
      {(i) => {
        const r1 = i === 2 ? pt(FIRST, SECOND, 0.4) : AT_FIRST;
        const r2 = i === 2 ? pt(SECOND, THIRD, 0.4) : AT_SECOND;
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second', 'third']} />
            {P(t)}
            <Token x={SS[0]} y={SS[1]} r={7} label={t('mlb.pos.SS.abbr')} />
            <Token x={r1[0]} y={r1[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Token x={r2[0]} y={r2[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Token x={BATTER[0]} y={BATTER[1]} r={6} side="off" label={t('mlb.tok.batter')} />
            {i >= 1 && <OutMark x={BATTER[0]} y={BATTER[1]} r={9} />}
            <Ball x={-26} y={i === 0 ? -128 : -110} z={i === 0 ? 0.9 : 0.5} r={4} />
            {i === 0 && <Label x={-26} y={-150} size={10}>{t('mlb.v.if.call')}</Label>}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

/** NL Wild Card Game, 5 Oct 2012 [S54]. Positions are schematic. */
export function Infield2012Visual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.if12.head')} footer={<span>{t('mlb.v.if12.foot')}</span>}>
      <Field view={[-135, -300, 270, 335]} markScale={3}>
        <Label x={-60} y={-270} size={11}>{t('mlb.v.if12.grass')}</Label>
        <Token x={-48} y={-232} r={9} label={t('mlb.pos.SS.abbr')} />
        <Token x={-100} y={-245} r={9} label={t('mlb.pos.LF.abbr')} />
        <Ball x={-74} y={-238} r={4} />
        <Label x={-74} y={-218} size={10}>{t('mlb.v.if12.drop')}</Label>
        <Token x={AT_SECOND[0]} y={AT_SECOND[1]} r={8} side="off" label={t('mlb.tok.runner')} />
        <Token x={AT_THIRD[0]} y={AT_THIRD[1]} r={8} side="off" label={t('mlb.tok.runner')} />
        <Token x={BATTER[0]} y={BATTER[1]} r={7} side="off" label={t('mlb.tok.batter')} />
        <OutMark x={BATTER[0]} y={BATTER[1]} r={10} />
      </Field>
    </StillScene>
  );
}

/* ---------- fair, foul ---------- */

export function FairFlyVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.ff.head')}>
      <Field {...FLD}>
        <Label x={-14} y={-142} size={12}>{t('mlb.common.fair')}</Label>
        <Label x={-92} y={-30} size={11}>{t('mlb.common.foul')}</Label>
        <Token x={-47} y={-72} r={7} label={t('mlb.pos.3B.abbr')} />
        <Ball x={-86} y={-52} z={0.7} r={4} />
        <Label x={-86} y={-82} size={9}>{t('mlb.v.ff.ball')}</Label>
      </Field>
    </StillScene>
  );
}

export function BounceVisual() {
  const { t } = useI18n();
  const arrow = (d) => <path className="mf-arrow" d={d} stroke="#ffe066" strokeDasharray="5 4" />;
  return (
    <StillScene header={t('mlb.v.bounce.head')}>
      <Field {...FLD}>
        <BaseLabels size={8} ids={['first']} />
        <circle cx={30} cy={-40} r={3} fill="#fff" />
        {arrow('M30 -40 Q46 -52 66 -34')}
        <Label x={80} y={-20} size={9}>{t('mlb.v.bounce.a')}</Label>
        <circle cx={66} cy={-86} r={3} fill="#fff" />
        {arrow('M66 -86 Q86 -92 98 -70')}
        <Label x={70} y={-102} size={9}>{t('mlb.v.bounce.b')}</Label>
      </Field>
    </StillScene>
  );
}

export function DroppedExtraVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.dr.head')} footer={<span>{t('mlb.v.dr.foot')}</span>}>
      <Field {...FLD}>
        <circle cx={0} cy={-4} r={24} fill="none" stroke="#ffe066" strokeWidth="2.5" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        <Label x={0} y={-34} size={9}>{t('mlb.v.dr.circle')}</Label>
        <Token x={CATCHER[0]} y={CATCHER[1]} r={7} label={t('mlb.pos.C.abbr')} />
        <Token x={-40} y={-6} r={7} side="off" label={t('mlb.tok.batter')} />
        <OutMark x={-40} y={-6} r={10} />
        <Label x={-40} y={14} size={9}>{t('mlb.v.dr.out')}</Label>
      </Field>
    </StillScene>
  );
}

/* ---------- tag up, overrun, force ---------- */

const TAG_VIEW = { view: [-130, -270, 260, 305], markScale: 3 };
export function TagUpVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.tag.steps');
  const LF = [-30, -235];
  return (
    <StopMotionScene
      frames={4}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 3} />}
    >
      {(i) => {
        const runner = i < 2 ? AT_THIRD : i === 2 ? pt(THIRD, HOME, 0.55) : [HOME[0] - 8, HOME[1] + 9];
        const ball = i === 0 ? [-30, -212] : i === 1 ? LF : i === 2 ? pt(LF, HOME, 0.45) : pt(LF, HOME, 0.8);
        return (
          <Field {...TAG_VIEW}>
            <BaseLabels size={9} ids={['third']} />
            <Token x={LF[0]} y={LF[1]} r={9} label={t('mlb.pos.LF.abbr')} />
            <Token x={CATCHER[0]} y={CATCHER[1]} r={8} label={t('mlb.pos.C.abbr')} />
            <Token x={runner[0]} y={runner[1]} r={8} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} z={i === 0 ? 0.9 : 0} r={4} />
            {i === 1 && <circle cx={THIRD[0]} cy={THIRD[1]} r={9} fill="#ffe066" opacity="0.7" />}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

export function TimePlayVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.time.steps');
  const RF = [104, -112];
  return (
    <StopMotionScene
      frames={4}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 3} />}
      footer={(i) => <CountBoard outs={[2, 2, 2, 3][i]} />}
    >
      {(i) => {
        const jones = i === 0 ? AT_THIRD : i === 1 ? pt(THIRD, HOME, 0.45) : [HOME[0] - 8, HOME[1] + 9];
        const smith = i === 0 ? pt(FIRST, SECOND, 0.3) : i === 1 ? pt(FIRST, SECOND, 0.18) : i === 2 ? pt(FIRST, SECOND, 0.07) : AT_FIRST;
        const ball = i === 0 ? RF : i === 1 ? pt(RF, FIRST, 0.25) : i === 2 ? pt(RF, FIRST, 0.7) : [FIRST[0] + 2, FIRST[1] - 12];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'third']} />
            <Token x={FIRSTMAN[0]} y={FIRSTMAN[1]} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={RF[0] - 4} y={RF[1] - 6} r={7} label={t('mlb.pos.RF.abbr')} />
            <Token x={BATTER[0]} y={BATTER[1]} r={6} side="off" dim label={t('mlb.tok.batter')} />
            <OutMark x={BATTER[0]} y={BATTER[1]} r={9} />
            <Token x={jones[0]} y={jones[1]} r={7} side="off" label={t('mlb.v.time.jones')} />
            <Token x={smith[0]} y={smith[1]} r={7} side="off" label={t('mlb.v.time.smith')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {i >= 2 && <Label x={HOME[0] + 30} y={HOME[1] + 10} size={9}>{i === 2 ? t('mlb.v.time.score') : t('mlb.v.time.counts')}</Label>}
            {i === 3 && <OutMark x={smith[0]} y={smith[1]} r={9} />}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

export function OverrunVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.over.steps');
  const beyond = [FIRST[0] + 12, FIRST[1] - 2];
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 2} />}
    >
      {(i) => {
        const runner = i === 0 ? pt(HOME, FIRST, 0.8) : i === 1 ? beyond : [FIRST[0] - 4, FIRST[1] + 4];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first']} />
            <Token x={FIRSTMAN[0] - 12} y={FIRSTMAN[1] + 4} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={runner[0]} y={runner[1]} r={7} side="off" label={t('mlb.tok.batter')} />
            <Ball x={FIRSTMAN[0] - 18} y={FIRSTMAN[1] + 10} r={3} />
            {i === 2 && <Label x={FIRST[0] - 30} y={FIRST[1] + 30} size={9}>{t('mlb.v.over.safe')}</Label>}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

export function PassedVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.passed.head')} footer={<span>{t('mlb.v.passed.foot')}</span>}>
      <Field {...FLD}>
        <BaseLabels size={8} ids={['first']} />
        <Token x={FIRST[0] + 16} y={FIRST[1] + 6} r={7} side="off" label={t('mlb.tok.runner')} />
        <path className="mf-arrow" d={`M${FIRST[0] + 8} ${FIRST[1] + 14} Q${FIRST[0] - 2} ${FIRST[1] + 26} ${FIRST[0] - 8} ${FIRST[1] + 8}`} stroke="#ffe066" strokeDasharray="6 5" />
        <Label x={FIRST[0] + 4} y={FIRST[1] + 40} size={9}>{t('mlb.v.passed.retouch')}</Label>
        <Label x={FIRST[0] + 40} y={FIRST[1] - 14} size={9}>{t('mlb.common.foul')}</Label>
      </Field>
    </StillScene>
  );
}

export function ForceTouchVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.ft.steps');
  return (
    <StopMotionScene
      frames={3}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 2} />}
      footer={(i) => <CountBoard balls={[3, 4, 4][i]} />}
    >
      {(i) => {
        const runner = i === 0 ? pt(FIRST, SECOND, 0.35) : [SECOND[0] - 8, SECOND[1] - 8];
        const ss = i === 0 ? SS : [SECOND[0] - 6, SECOND[1] + 8];
        const ball = i === 0 ? [CATCHER[0], CATCHER[1] - 6] : i === 1 ? pt(CATCHER, SECOND, 0.6) : [runner[0] + 4, runner[1] + 5];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second']} />
            <Token x={CATCHER[0]} y={CATCHER[1]} r={7} label={t('mlb.pos.C.abbr')} />
            <Token x={ss[0]} y={ss[1]} r={7} label={t('mlb.pos.SS.abbr')} />
            <Token x={BATTER[0]} y={BATTER[1] + (i > 0 ? -4 : 0)} r={6} side="off" dim label={t('mlb.tok.batter')} />
            <Token x={runner[0]} y={runner[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {i === 2 && <OutMark x={runner[0]} y={runner[1]} r={9} />}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

/* ---------- modern rule changes ---------- */

export function YearsVisual() {
  const { t, tm } = useI18n();
  const years = tm('mlb.v.years.list');
  return (
    <StillScene header={t('mlb.v.years.head')}>
      <div className="mx-years">
        {years.map((y) => (
          <div className="mx-year" key={y.year}><b>{y.year}</b><span>{y.text}</span></div>
        ))}
      </div>
    </StillScene>
  );
}

export function Changes2026Visual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.c26.head')}>
      <div className="mx-chips">{tm('mlb.v.c26.list').map((x) => <span key={x}>{x}</span>)}</div>
    </StillScene>
  );
}

export function TimerVisual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.timer.head')}>
      <div className="mx-cards">
        <div className="mx-card">
          <h3>{t('mlb.v.timer.glossary')}</h3>
          <ul>{tm('mlb.v.timer.g').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="mx-card">
          <h3>{t('mlb.v.timer.rulebook')}</h3>
          <ul>{tm('mlb.v.timer.r').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </StillScene>
  );
}

export function AutoRunnerVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.auto.head')}>
      <Field {...FLD}>
        <BaseLabels size={8} ids={['second']} />
        <Token x={AT_SECOND[0]} y={AT_SECOND[1]} r={7} side="off" label={t('mlb.tok.runner')} />
        <Label x={AT_SECOND[0] + 34} y={AT_SECOND[1] + 18} size={9}>{t('mlb.v.auto.label')}</Label>
      </Field>
    </StillScene>
  );
}

import { useI18n } from '../../../i18n/I18n';
import { StillScene, FluidScene, StopMotionScene, StateLine } from '../../../components/scene/Scene';
import { lerp, seg } from '../../../components/motion';
import Field from '../components/field/Field';
import { Token, Ball, Label, BaseLabels, OutMark } from '../components/field/pieces';
import { FIRST, SECOND, THIRD, MOUND } from '../components/field/geometry';
import StatTable from '../components/StatTable';
import Checklist from '../components/Checklist';

const FIRSTMAN = [70, -79];
const SS = [-26, -104];
const BATTER = [-17, -2];
const CATCHER = [0, 16];
const pt = (a, b, p) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const FLD = { view: 'infield', markScale: 2.5 };
const AT_FIRST = [FIRST[0] - 9, FIRST[1] + 4];
const AT_THIRD = [THIRD[0] + 9, THIRD[1] + 4];

/** A steal of second in four frames. out = false: safe (stolen base). out = true: tagged out (caught stealing). */
export function StealVisual({ out = false, replay }) {
  const { t, tm } = useI18n();
  const steps = tm(out ? 'mlb.v.steal.out.steps' : 'mlb.v.steal.safe.steps');
  return (
    <StopMotionScene
      frames={4}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 3} />}
    >
      {(i) => {
        const p = [0.08, 0.3, 0.62, 1][i];
        const runner = i === 0 ? pt(FIRST, SECOND, p) : i === 3 ? [SECOND[0] + 9, SECOND[1] + 6] : pt(FIRST, SECOND, p);
        const ss = i >= 2 ? [SECOND[0] - 12, SECOND[1] + 6] : SS;
        const ball = i === 0 ? [MOUND[0] + 4, MOUND[1] + 2] : i === 1 ? [CATCHER[0], CATCHER[1] - 6] : i === 2 ? pt(CATCHER, SECOND, 0.55) : out ? [runner[0] - 5, runner[1] + 1] : pt(CATCHER, SECOND, 0.88);
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second']} />
            <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
            <Token x={CATCHER[0]} y={CATCHER[1]} r={7} label={t('mlb.pos.C.abbr')} />
            <Token x={BATTER[0]} y={BATTER[1]} r={6} side="off" dim label={t('mlb.tok.batter')} />
            <Token x={FIRSTMAN[0]} y={FIRSTMAN[1]} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={ss[0]} y={ss[1]} r={7} label={t('mlb.pos.SS.abbr')} />
            <Token x={runner[0]} y={runner[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {i === 3 && out && <OutMark x={runner[0]} y={runner[1]} r={9} />}
            {i === 3 && !out && <Label x={runner[0] + 24} y={runner[1] + 20} size={8}>{t('mlb.v.steal.safeTag')}</Label>}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}
export const StealSafeVisual = (props) => <StealVisual {...props} />;
export const StealOutVisual = (props) => <StealVisual out {...props} />;

export function WhenVisual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.when.head')}>
      <Checklist items={tm('mlb.v.when.items')} />
    </StillScene>
  );
}

export function LeadVisual() {
  const { t } = useI18n();
  const lead = pt(FIRST, SECOND, 0.12);
  return (
    <StillScene header={t('mlb.v.lead.head')}>
      <Field {...FLD}>
        <BaseLabels size={8} ids={['first', 'second']} />
        <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
        <Token x={FIRSTMAN[0]} y={FIRSTMAN[1]} r={7} label={t('mlb.pos.1B.abbr')} />
        <line x1={FIRST[0]} y1={FIRST[1]} x2={lead[0]} y2={lead[1]} stroke="#ffe066" strokeWidth="3" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
        <Token x={lead[0] - 6} y={lead[1] + 2} r={7} side="off" label={t('mlb.tok.runner')} />
        <Label x={lead[0] + 18} y={lead[1] + 14} size={9}>{t('mlb.v.lead.label')}</Label>
      </Field>
    </StillScene>
  );
}

export function CasesVisual() {
  const { t, tm } = useI18n();
  const yes = tm('mlb.v.cases.yes');
  const no = tm('mlb.v.cases.no');
  return (
    <StillScene header={t('mlb.v.cases.head')}>
      <div className="mx-cards">
        <div className="mx-card">
          <h3>{t('mlb.v.cases.yesTitle')}</h3>
          <ul>{yes.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="mx-card is-bad">
          <h3>{t('mlb.v.cases.noTitle')}</h3>
          <ul>{no.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </StillScene>
  );
}

export function CreditVisual() {
  const { t, tm } = useI18n();
  const rows = tm('mlb.v.credit.rows');
  return (
    <StillScene header={t('mlb.v.credit.head')}>
      <StatTable caption={t('mlb.v.credit.head')} head={[t('mlb.v.credit.case'), t('mlb.v.credit.sb')]} rows={rows} />
    </StillScene>
  );
}

export function IndifferenceVisual() {
  const { t } = useI18n();
  const mid = pt(FIRST, SECOND, 0.5);
  return (
    <StillScene header={t('mlb.v.indiff.head')}>
      <Field {...FLD}>
        <BaseLabels size={8} ids={['first', 'second', 'third']} />
        <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
        <Token x={CATCHER[0]} y={CATCHER[1]} r={7} label={t('mlb.pos.C.abbr')} />
        <Token x={AT_THIRD[0]} y={AT_THIRD[1]} r={7} side="off" label={t('mlb.tok.runner')} />
        <Token x={AT_FIRST[0]} y={AT_FIRST[1]} r={7} side="off" label={t('mlb.tok.runner')} />
        <path className="mf-arrow" d={`M${AT_FIRST[0] - 4} ${AT_FIRST[1] - 8} L${SECOND[0] + 12} ${SECOND[1] + 8}`} stroke="#ffe066" strokeDasharray="6 5" />
        <Label x={mid[0] + 26} y={mid[1] - 2} size={8}>{t('mlb.v.indiff.label')}</Label>
      </Field>
    </StillScene>
  );
}

const PICK = 4600;
export function PickoffVisual() {
  const { t } = useI18n();
  return (
    <FluidScene
      duration={PICK}
      header={(ms) => <StateLine chip={ms < 1500 ? t('mlb.v.pickoff.throw') : t('mlb.v.pickoff.back')} caption={ms < 1500 ? t('mlb.v.pickoff.throwCap') : t('mlb.v.pickoff.backCap')} highlight={ms >= 1500} />}
    >
      {(ms) => {
        const home1B = [FIRST[0] + 2, FIRST[1] - 12];
        const ball = ms < 1000 ? pt([MOUND[0] + 4, MOUND[1] + 2], home1B, seg(ms, 100, 1000)) : home1B;
        const lead = pt(FIRST, SECOND, 0.14);
        const run = ms < 700 ? lead : pt(lead, AT_FIRST, seg(ms, 700, 1500));
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first']} />
            <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
            <Token x={FIRSTMAN[0] + 3} y={FIRSTMAN[1] - 6} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={run[0]} y={run[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
          </Field>
        );
      }}
    </FluidScene>
  );
}

export function LimitVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.limit.steps');
  return (
    <StopMotionScene
      frames={4}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 3} />}
    >
      {(i) => {
        const runner = i === 3 ? pt(FIRST, SECOND, 0.7) : i === 0 ? AT_FIRST : pt(FIRST, SECOND, 0.12);
        const ball = i === 0 ? [MOUND[0] + 4, MOUND[1] + 2] : [FIRST[0] + 2, FIRST[1] - 12];
        return (
          <Field {...FLD}>
            <BaseLabels size={8} ids={['first', 'second']} />
            <Token x={MOUND[0]} y={MOUND[1] + 11} r={7} label={t('mlb.pos.P.abbr')} />
            <Token x={FIRSTMAN[0] + 3} y={FIRSTMAN[1] - 6} r={7} label={t('mlb.pos.1B.abbr')} />
            <Token x={runner[0]} y={runner[1]} r={7} side="off" label={t('mlb.tok.runner')} />
            <Ball x={ball[0]} y={ball[1]} r={3} />
            {i === 3 && <Label x={runner[0] + 28} y={runner[1] + 4} size={9}>{t('mlb.v.limit.balk')}</Label>}
          </Field>
        );
      }}
    </StopMotionScene>
  );
}

/** The bases before and after 2023, to scale: 15 and 18 inches. [S7; S1 R2.03, p.16] */
export function BasesVisual() {
  const { t } = useI18n();
  const k = 6;
  return (
    <StillScene header={t('mlb.v.bases.head')} footer={<span>{t('mlb.v.bases.foot')}</span>}>
      <svg className="mx-sq" viewBox="0 0 320 170" role="img" aria-label={t('mlb.v.bases.alt')}>
        <rect className="mx-sq-bg" x="0" y="0" width="320" height="170" rx="12" />
        <rect x={35} y={20 + (18 - 15) * k} width={15 * k} height={15 * k} />
        <rect x={185} y={20} width={18 * k} height={18 * k} />
        <text x={35 + 45} y={150}>{t('mlb.v.bases.old')}</text>
        <text x={185 + 54} y={150}>{t('mlb.v.bases.new')}</text>
      </svg>
    </StillScene>
  );
}

export function StealLineVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.line.head')}>
      <StatTable
        caption={t('mlb.v.line.head')}
        head={[t('mlb.v.line.what'), t('mlb.v.line.n')]}
        rows={[[t('mlb.v.line.sb'), '12'], [t('mlb.v.line.cs'), '5'], [t('mlb.v.line.att'), '17'], [t('mlb.v.line.pct'), '70.6%']]}
      />
    </StillScene>
  );
}

export function RecordVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.record.head')}>
      <div className="mx-card" style={{ textAlign: 'center' }}>
        <p className="mx-big">{t('mlb.v.record.date')}</p>
        <p>{t('mlb.v.record.who')}</p>
      </div>
    </StillScene>
  );
}

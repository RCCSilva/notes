import { useI18n } from '../../../i18n/I18n';
import { StillScene, Legend } from '../../../components/scene/Scene';
import Field from '../components/field/Field';
import { Label, Dimension, BaseLabels, Token } from '../components/field/pieces';
import InningsTable from '../components/InningsTable';
import { HOME, FIRST, SECOND, THIRD, MOUND, FENCE_ENDS, FENCE_CENTER, FENCE_LINES, plateShape, BASE } from '../components/field/geometry';

export function IntroVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.intro.head')}>
      <Field markScale={3} />
    </StillScene>
  );
}

export function DiamondVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.diamond.head')}>
      <Field view="infield" highlight={['infield', 'bases', 'lines']} markScale={2.5}>
        <BaseLabels size={8} />
        <Dimension a={[HOME[0] + 14, HOME[1] + 14]} b={[FIRST[0] + 14, FIRST[1] + 14]} size={9} dy={0} dx={18}>90 ft</Dimension>
      </Field>
    </StillScene>
  );
}

export function OutfieldVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.outfield.head')} footer={t('mlb.v.outfield.foot')}>
      <Field highlight={['outfield', 'fence']} markScale={3}>
        <Label x={0} y={-180} size={18}>{t('mlb.common.outfield')}</Label>
        <Dimension a={HOME} b={[0, -FENCE_CENTER]} size={14} dx={36} dy={0}>{`${FENCE_CENTER} ft`}</Dimension>
        <Dimension a={[0, 0]} b={FENCE_ENDS[1]} size={14} dx={34} dy={20}>{`${FENCE_LINES} ft`}</Dimension>
      </Field>
    </StillScene>
  );
}

export function FairFoulVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.fairFoul.head')}>
      <Field markScale={3}>
        <Label x={0} y={-230} size={22}>{t('mlb.common.fair')}</Label>
        <Label x={-200} y={-90} size={20}>{t('mlb.common.foul')}</Label>
        <Label x={200} y={-90} size={20}>{t('mlb.common.foul')}</Label>
        <Label x={0} y={40} size={14}>{t('mlb.common.foul')}</Label>
      </Field>
    </StillScene>
  );
}

export function MoundVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.mound.head')} footer={t('mlb.v.mound.foot')}>
      <Field view="infield" highlight={['mound']} markScale={2.5}>
        <Dimension a={[14, HOME[1] - 4]} b={[14, MOUND[1]]} size={8} dy={0} dx={24}>{'60 ft 6 in'}</Dimension>
      </Field>
    </StillScene>
  );
}

/** Home plate and a base, side by side at true size (feet). */
export function PlateVisual() {
  const { t } = useI18n();
  const pts = plateShape(1).map(([x, y]) => `${x + 2.6},${y + 2.7}`).join(' ');
  const f = 0.26;
  return (
    <StillScene header={t('mlb.v.plate.head')} footer={t('mlb.v.plate.foot')}>
      <svg className="mlb-field mz" style={{ maxWidth: 620 }} viewBox="0 0 10 3.6" role="img" aria-label={t('mlb.v.plate.alt')}>
        <rect x="0" y="0" width="10" height="3.6" fill="var(--mlb-dirt)" rx="0.15" />
        <polygon className="mf-plate" points={pts} style={{ strokeWidth: 1.5 }} />
        <rect className="mf-base" x={6.5} y={1.3} width={BASE} height={BASE} style={{ strokeWidth: 1.5 }} />
        <g fill="#fff" fontFamily="var(--font-body)" fontWeight="700" fontSize={f} textAnchor="middle" stroke="rgb(0 0 0 / 0.5)" strokeWidth="0.05" paintOrder="stroke">
          <text x="2.6" y="1.1">17 in</text>
          <text x="3.55" y="1.8" textAnchor="start">8½ in</text>
          <text x="1.55" y="2.25" textAnchor="end">12 in</text>
          <text x="2.6" y="3.3">{t('mlb.common.plate')}</text>
          <text x="7.25" y="1.1">18 in</text>
          <text x="7.25" y="3.3">{t('mlb.common.base')}</text>
        </g>
        <text x="2.6" y="0.35" fill="#fff" fontFamily="var(--font-body)" fontSize={f} textAnchor="middle">{t('mlb.v.plate.pitcher')}</text>
      </svg>
    </StillScene>
  );
}

export function InningsVisual() {
  const { t } = useI18n();
  return <StillScene header={t('mlb.v.innings.head')} footer={t('mlb.v.innings.foot')}><InningsTable /></StillScene>;
}

export function EndingVisual() {
  const { t } = useI18n();
  return <StillScene header={t('mlb.v.ending.head')}><InningsTable extra /></StillScene>;
}

export function ExtraVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.extra.head')}>
      <Field view="infield" markScale={2.5}>
        <BaseLabels size={8} ids={['home', 'first', 'third']} />
        <Token x={SECOND[0]} y={SECOND[1] + 11} r={7} side="off" label={t('mlb.tok.runner')} />
        <Label x={SECOND[0]} y={SECOND[1] - 14} size={8}>{t('mlb.v.extra.on2')}</Label>
      </Field>
    </StillScene>
  );
}

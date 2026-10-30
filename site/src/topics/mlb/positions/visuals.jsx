import { useState } from 'react';
import { useI18n } from '../../../i18n/I18n';
import { StillScene, Hint } from '../../../components/scene/Scene';
import Field from '../components/field/Field';
import { Token } from '../components/field/pieces';
import { POSITIONS } from './data';

const R_FULL = 15;

function Nine({ active, onSelect, only, dimOthers = false, r = R_FULL, view = 'full' }) {
  const { t } = useI18n();
  const fieldProps = view === 'full' ? { markScale: 3 } : { markScale: 2.5 };
  return (
    <Field view={view} interactive={Boolean(onSelect)} {...fieldProps}>
      {POSITIONS.filter((p) => (only ? only.includes(p.group) : true)).map((p) => (
        <Token
          key={p.id}
          x={p.xy[0]}
          y={p.xy[1]}
          r={r}
          label={t(`mlb.pos.${p.id}.abbr`)}
          name={t(`mlb.pos.${p.id}.name`)}
          active={active === p.id}
          dim={Boolean(active) && active !== p.id && dimOthers}
          onSelect={onSelect ? () => onSelect(p.id) : undefined}
        />
      ))}
    </Field>
  );
}

export function NineVisual() {
  const { t } = useI18n();
  const [sel, setSel] = useState(null);
  return (
    <StillScene
      header={<Hint>{t('mlb.v.nine.hint')}</Hint>}
      footer={
        <div className="mp-card" aria-live="polite">
          {sel ? (<><strong>{t(`mlb.pos.${sel}.name`)}</strong>{t(`mlb.pos.${sel}.desc`)}</>) : t('mlb.v.nine.pick')}
        </div>
      }
    >
      <Nine active={sel} onSelect={(id) => setSel(id === sel ? null : id)} dimOthers />
    </StillScene>
  );
}

export function BatteryVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.battery.head')}>
      <Nine only={['battery']} view="infield" r={8} />
    </StillScene>
  );
}

export function InfieldVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.infielders.head')}>
      <Nine only={['infield']} view="infield" r={8} />
    </StillScene>
  );
}

export function OutfieldersVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.outfielders.head')}>
      <Nine only={['outfield']} />
    </StillScene>
  );
}

export function StandVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.stand.head')} footer={t('mlb.v.stand.foot')}>
      <Nine r={13} />
    </StillScene>
  );
}

export function DhVisual() {
  const { t } = useI18n();
  const yes = t('mlb.v.dh.yes');
  const no = t('mlb.v.dh.no');
  const rows = [['pitcher', no, yes], ['dh', yes, no], ['others', yes, yes]];
  return (
    <StillScene header={t('mlb.v.dh.head')}>
      <div className="mi-wrap">
        <table className="mi-table">
          <caption className="sr-only">{t('mlb.v.dh.head')}</caption>
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">{t('mlb.v.dh.who')}</span></th>
              <th scope="col">{t('mlb.v.dh.bats')}</th>
              <th scope="col">{t('mlb.v.dh.fields')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, a, b]) => (
              <tr key={k} className={k === 'dh' ? 'is-hl' : ''}>
                <th scope="row">{t(`mlb.v.dh.${k}`)}</th><td>{a}</td><td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StillScene>
  );
}

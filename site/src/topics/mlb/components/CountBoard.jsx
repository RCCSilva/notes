import { useI18n } from '../../../i18n/I18n';

/** Lights for balls (4), strikes (3) and/or outs (3). Pass only the counters you want to show. */
export default function CountBoard({ balls, strikes, outs }) {
  const { t } = useI18n();
  const row = (key, n, max, cls) => (
    <div className="mc-row">
      <span>{t(`mlb.common.${key}`)}</span>
      <span aria-hidden="true">{Array.from({ length: max }, (_, i) => <i key={i} className={i < n ? cls : ''} />)}</span>
      <span className="sr-only">{n}</span>
    </div>
  );
  return (
    <div className="mc-board" role="group" aria-label={t('mlb.common.count')}>
      {balls != null && row('balls', balls, 4, 'on-ball')}
      {strikes != null && row('strikes', strikes, 3, 'on-strike')}
      {outs != null && row('outs', outs, 3, 'on-out')}
    </div>
  );
}

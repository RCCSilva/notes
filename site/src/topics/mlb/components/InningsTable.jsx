import { useI18n } from '../../../i18n/I18n';

/** Nine innings, each with a turn for the visitors then one for the home team. extra: add a column for extra innings. */
export default function InningsTable({ extra = false }) {
  const { t } = useI18n();
  const cols = Array.from({ length: 9 }, (_, i) => i + 1);
  return (
    <div className="mi-wrap">
      <table className="mi-table">
        <caption className="sr-only">{t('mlb.v.innings.alt')}</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">{t('mlb.common.team')}</span></th>
            {cols.map((c) => <th scope="col" key={c}>{c}</th>)}
            {extra && <th scope="col" className="is-hl">10+</th>}
          </tr>
        </thead>
        <tbody>
          {['visitors', 'homeTeam'].map((side, r) => (
            <tr key={side}>
              <th scope="row">{t(`mlb.common.${side}`)}</th>
              {cols.map((c) => <td key={c}>{t(`mlb.v.innings.turn${r + 1}`)}</td>)}
              {extra && <td className="is-hl">{t('mlb.v.innings.ifTied')}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

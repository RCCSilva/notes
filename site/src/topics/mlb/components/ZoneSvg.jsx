import { useI18n } from '../../../i18n/I18n';

/**
 * The strike zone seen from the pitcher: a simple batter, the zone over the plate. SCHEMATIC (heights not to scale).
 * Drawn zone follows the rule: top = halfway between the shoulders and the top of the pants, bottom = the hollow under the kneecap.
 * landmarks: label the top and bottom. children: markers in the same 360x230 coordinates.
 */
export default function ZoneSvg({ landmarks = false, children }) {
  const { t } = useI18n();
  return (
    <svg className="mz" viewBox="0 0 360 230" role="img" aria-label={t('mlb.v.zone.alt')}>
      <rect className="mz-bg" x="0" y="0" width="360" height="230" rx="10" />
      {/* batter: head, shoulders, torso, legs */}
      <g stroke="#e9e9e9" strokeWidth="5" strokeLinecap="round" fill="none">
        <circle cx="90" cy="24" r="11" fill="#e9e9e9" stroke="none" />
        <path d="M62 46 L118 46 M90 46 L90 106 M90 106 L74 192 M90 106 L106 192" />
      </g>
      <rect className="mz-zone" x="48" y="76" width="84" height="74" />
      <path className="mz-plate" d="M48 198 H132 V208 H48 Z" />
      {landmarks && (
        <g fontSize="11" stroke="none">
          <path d="M132 76 H150 M132 150 H150" stroke="#ffe066" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="154" y="73" style={{ textAnchor: 'start' }}>{t('mlb.v.zone.top1')}</text>
          <text x="154" y="86" style={{ textAnchor: 'start' }}>{t('mlb.v.zone.top2')}</text>
          <text x="154" y="147" style={{ textAnchor: 'start' }}>{t('mlb.v.zone.bottom1')}</text>
          <text x="154" y="160" style={{ textAnchor: 'start' }}>{t('mlb.v.zone.bottom2')}</text>
        </g>
      )}
      {children}
    </svg>
  );
}

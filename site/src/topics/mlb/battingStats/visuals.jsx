import { useState } from 'react';
import { useI18n } from '../../../i18n/I18n';
import { StillScene } from '../../../components/scene/Scene';
import Fraction from '../components/Fraction';
import StatTable from '../components/StatTable';
import { JUDGE_2025, compute, fmtRate, qualifyingPA, round } from './stats';

const J = JUDGE_2025;
const fr = (x) => fmtRate(x);

/** Plate appearances = at-bats + the turns that are not at-bats. Aaron Judge, 2025 [S69]. */
export function PaVisual() {
  const { t } = useI18n();
  const parts = [
    { key: 'ab', n: J.ab, color: '#1d4f91' },
    { key: 'bb', n: J.bb, color: '#c8442a' },
    { key: 'hbp', n: J.hbp, color: '#b98457' },
    { key: 'sf', n: J.sf, color: '#6b4fa0' },
  ];
  const total = parts.reduce((s, p) => s + p.n, 0);
  return (
    <StillScene header={t('mlb.v.bat.pa.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <div role="img" aria-label={t('mlb.v.bat.pa.alt', { pa: total, ab: J.ab, bb: J.bb, hbp: J.hbp, sf: J.sf })}>
        <div className="mx-bar-stack">
          {parts.map((p) => <span key={p.key} style={{ width: `${Math.max(4, (p.n / total) * 100)}%`, background: p.color }}>{p.n > 40 ? p.n : ''}</span>)}
        </div>
        <div className="mx-seg">
          {parts.map((p) => <span key={p.key}><i style={{ background: p.color }} />{t(`mlb.v.bat.pa.${p.key}`)} {p.n}</span>)}
          <span><b>{t('mlb.v.bat.pa.total', { pa: total })}</b></span>
        </div>
      </div>
    </StillScene>
  );
}

export function HitVisual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.bat.hit.head')}>
      <div className="mx-cards">
        <div className="mx-card">
          <h3>{t('mlb.v.bat.hit.yes')}</h3>
          <ul>{tm('mlb.v.bat.hit.yesList').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="mx-card is-bad">
          <h3>{t('mlb.v.bat.hit.no')}</h3>
          <ul>{tm('mlb.v.bat.hit.noList').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </StillScene>
  );
}

export function TotalBasesVisual() {
  const { t } = useI18n();
  const s = compute(J);
  return (
    <StillScene header={t('mlb.v.bat.tb.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <StatTable
        caption={t('mlb.v.bat.tb.head')}
        head={[t('mlb.v.bat.tb.hit'), t('mlb.v.bat.tb.count'), t('mlb.v.bat.tb.each'), t('mlb.v.bat.tb.bases')]}
        rows={[
          [t('mlb.v.bat.tb.single'), s.singles, 1, s.singles],
          [t('mlb.v.bat.tb.double'), J.d, 2, J.d * 2],
          [t('mlb.v.bat.tb.triple'), J.t, 3, J.t * 3],
          [t('mlb.v.bat.tb.homer'), J.hr, 4, J.hr * 4],
          [t('mlb.v.bat.tb.total'), J.h, '', s.tb],
        ]}
        highlight={[4]}
      />
    </StillScene>
  );
}

export function AvgVisual() {
  const { t } = useI18n();
  const s = compute(J);
  return (
    <StillScene header={t('mlb.v.bat.avg.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <Fraction name="AVG" aria={t('mlb.v.bat.avg.aria', { h: J.h, ab: J.ab, r: fr(s.avg) })}
        top={[{ k: t('mlb.v.bat.k.h'), v: J.h }]} bottom={[{ k: t('mlb.v.bat.k.ab'), v: J.ab }]} result={fr(s.avg)} />
    </StillScene>
  );
}

export function SacVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.bat.sac.head')}>
      <StatTable
        caption={t('mlb.v.bat.sac.head')}
        head={[t('mlb.v.bat.sac.what'), t('mlb.v.bat.sac.ab'), t('mlb.v.bat.sac.obp')]}
        rows={[
          [t('mlb.v.bat.sac.sf'), t('mlb.v.bat.sac.no'), t('mlb.v.bat.sac.in')],
          [t('mlb.v.bat.sac.sh'), t('mlb.v.bat.sac.no'), t('mlb.v.bat.sac.out')],
          [t('mlb.v.bat.sac.bb'), t('mlb.v.bat.sac.no'), t('mlb.v.bat.sac.in')],
          [t('mlb.v.bat.sac.hbp'), t('mlb.v.bat.sac.no'), t('mlb.v.bat.sac.in')],
        ]}
      />
    </StillScene>
  );
}

export function ObpVisual() {
  const { t } = useI18n();
  const s = compute(J);
  return (
    <StillScene header={t('mlb.v.bat.obp.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <Fraction name="OBP" aria={t('mlb.v.bat.obp.aria', { top: J.h + J.bb + J.hbp, bottom: J.ab + J.bb + J.hbp + J.sf, r: fr(s.obp) })}
        top={[{ k: t('mlb.v.bat.k.h'), v: J.h }, { k: t('mlb.v.bat.k.bb'), v: J.bb }, { k: t('mlb.v.bat.k.hbp'), v: J.hbp }]}
        bottom={[{ k: t('mlb.v.bat.k.ab'), v: J.ab }, { k: t('mlb.v.bat.k.bb'), v: J.bb }, { k: t('mlb.v.bat.k.hbp'), v: J.hbp }, { k: t('mlb.v.bat.k.sf'), v: J.sf }]}
        result={fr(s.obp)} />
    </StillScene>
  );
}

export function SlgVisual() {
  const { t } = useI18n();
  const s = compute(J);
  return (
    <StillScene header={t('mlb.v.bat.slg.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <Fraction name="SLG" aria={t('mlb.v.bat.slg.aria', { tb: s.tb, ab: J.ab, r: fr(s.slg) })}
        top={[{ k: t('mlb.v.bat.k.tb'), v: s.tb }]} bottom={[{ k: t('mlb.v.bat.k.ab'), v: J.ab }]} result={fr(s.slg)} />
    </StillScene>
  );
}

export function OpsVisual() {
  const { t } = useI18n();
  const s = compute(J);
  return (
    <StillScene header={t('mlb.v.bat.ops.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <div className="mx-frac" role="img" aria-label={t('mlb.v.bat.ops.aria', { o: fr(s.obp), l: fr(s.slg), r: s.ops.toFixed(3) })}>
        <span className="mx-name">OPS =</span>
        <span className="mx-term"><small>OBP</small> <b>{fr(s.obp)}</b></span>
        <span className="mx-op">+</span>
        <span className="mx-term"><small>SLG</small> <b>{fr(s.slg)}</b></span>
        <span className="mx-name">=</span>
        <span className="mx-res">{s.ops.toFixed(3)}</span>
      </div>
    </StillScene>
  );
}

export function TitleVisual() {
  const { t } = useI18n();
  const need = qualifyingPA(162);
  return (
    <StillScene header={t('mlb.v.bat.title.head')} footer={<span>{t('mlb.v.bat.title.foot')}</span>}>
      <div className="mx-frac" role="img" aria-label={t('mlb.v.bat.title.aria', { need })}>
        <span className="mx-term"><b>162</b> <small>{t('mlb.v.bat.title.games')}</small></span>
        <span className="mx-op">×</span>
        <span className="mx-term"><b>3.1</b></span>
        <span className="mx-name">=</span>
        <span className="mx-term"><b>{round(162 * 3.1, 1)}</b></span>
        <span className="mx-name">→</span>
        <span className="mx-res">{need} {t('mlb.v.bat.title.pa')}</span>
      </div>
    </StillScene>
  );
}

export function LineVisual() {
  const { t } = useI18n();
  const rows = [
    ['G', 152], ['PA', 679], ['AB', 541], ['H', 179], ['2B', 30], ['3B', 2], ['HR', 53], ['BB', 124], ['HBP', 7], ['SF', 7],
    ['K', 160], ['TB', 372], ['R', 137], ['RBI', 114], ['SB', 12], ['CS', 5], ['AVG', '.331'], ['OBP', '.457'], ['SLG', '.688'], ['OPS', '1.145'],
  ];
  return (
    <StillScene header={t('mlb.v.bat.line.head')} footer={<span>{t('mlb.v.bat.src')}</span>}>
      <div className="mx-out" role="list" aria-label={t('mlb.v.bat.line.head')}>
        {rows.map(([k, v]) => <div key={k} role="listitem"><small>{k}</small><b>{v}</b></div>)}
      </div>
    </StillScene>
  );
}

const FIELDS = ['ab', 'h', 'd', 't', 'hr', 'bb', 'hbp', 'sf', 'sh'];
const toNum = (v) => (v === '' ? 0 : Number(v));

/** Type the counts, see the rates. Formulas: Rule 9.21 (see stats.js). */
export function BattingCalculator() {
  const { t } = useI18n();
  const [raw, setRaw] = useState(() => Object.fromEntries(FIELDS.map((f) => [f, String(J[f])])));
  const s = Object.fromEntries(FIELDS.map((f) => [f, toNum(raw[f])]));
  const r = compute(s);
  const set = (f) => (e) => setRaw((o) => ({ ...o, [f]: e.target.value.replace(/[^0-9]/g, '') }));
  const fill = (src) => setRaw(Object.fromEntries(FIELDS.map((f) => [f, String(src[f])])));
  return (
    <StillScene header={t('mlb.v.bat.calc.head')}>
      <div className="mx-calc">
        <div className="mx-inputs">
          {FIELDS.map((f) => (
            <label key={f}>
              {t(`mlb.v.bat.calc.${f}`)}
              <input type="text" inputMode="numeric" value={raw[f]} onChange={set(f)} />
            </label>
          ))}
        </div>
        <div className="mx-actions">
          <button type="button" onClick={() => fill(J)}>{t('mlb.v.bat.calc.judge')}</button>
          <button type="button" onClick={() => fill(Object.fromEntries(FIELDS.map((f) => [f, 0])))}>{t('mlb.v.bat.calc.clear')}</button>
        </div>
        {r.problems.map((p) => <p key={p} className="mx-msg is-warn" role="alert">{t(`mlb.v.bat.calc.err.${p}`)}</p>)}
        <div className="mx-out" aria-live="polite">
          <div><small>{t('mlb.v.bat.calc.pa')}</small><b data-testid="out-pa">{r.pa}</b></div>
          <div><small>{t('mlb.v.bat.k.tb')}</small><b data-testid="out-tb">{r.tb ?? '–'}</b></div>
          <div><small>AVG</small><b data-testid="out-avg">{fr(r.avg)}</b></div>
          <div><small>OBP</small><b data-testid="out-obp">{fr(r.obp)}</b></div>
          <div><small>SLG</small><b data-testid="out-slg">{fr(r.slg)}</b></div>
          <div><small>OPS</small><b data-testid="out-ops">{r.ops == null ? '–' : r.ops.toFixed(3)}</b></div>
        </div>
        <p className="mx-msg">{t('mlb.v.bat.calc.foot')}</p>
      </div>
    </StillScene>
  );
}

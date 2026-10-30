import { useState } from 'react';
import { useI18n } from '../../../i18n/I18n';
import { StillScene, StopMotionScene, StateLine } from '../../../components/scene/Scene';
import Field from '../components/field/Field';
import { Token, Label, BaseLabels, OutMark } from '../components/field/pieces';
import { FIRST } from '../components/field/geometry';
import Fraction from '../components/Fraction';
import StatTable from '../components/StatTable';
import Checklist from '../components/Checklist';
import CountBoard from '../components/CountBoard';
import { SKENES_2025 as S, compute, fmt } from './stats';

const IP = '187⅔';

export function InningsVisual() {
  const { t } = useI18n();
  const boxes = [3, 3, 3, 3, 3, 1];
  return (
    <StillScene header={t('mlb.v.pit.ip.head')} footer={<span>{t('mlb.v.pit.ip.foot')}</span>}>
      <div className="mx-inns" role="img" aria-label={t('mlb.v.pit.ip.alt')}>
        {boxes.map((n, i) => (
          <span key={i} className="mx-inn">
            {[0, 1, 2].map((d) => <i key={d} className={d < n ? 'on' : ''} />)}
          </span>
        ))}
      </div>
      <p className="mc-result" style={{ marginTop: '0.6rem' }}>5⅓</p>
    </StillScene>
  );
}

export function NotationVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.pit.not.head')} footer={<span>{t('mlb.v.pit.src')}</span>}>
      <div className="mx-frac" role="img" aria-label={t('mlb.v.pit.not.aria')}>
        <span className="mx-term"><small>{t('mlb.v.pit.not.feed')}</small> <b>187.2</b></span>
        <span className="mx-name">=</span>
        <span className="mx-term"><b>187</b> <small>{t('mlb.v.pit.not.inn')}</small></span>
        <span className="mx-op">+</span>
        <span className="mx-term"><b>2</b> <small>{t('mlb.v.pit.not.outs')}</small></span>
        <span className="mx-name">=</span>
        <span className="mx-res">{IP}</span>
      </div>
    </StillScene>
  );
}

export function EarnedVisual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.pit.er.head')}>
      <div className="mx-cards">
        <div className="mx-card">
          <h3>{t('mlb.v.pit.er.yes')}</h3>
          <ul>{tm('mlb.v.pit.er.yesList').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="mx-card is-bad">
          <h3>{t('mlb.v.pit.er.no')}</h3>
          <ul>{tm('mlb.v.pit.er.noList').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </StillScene>
  );
}

/** Rulebook example R9.16(a) Comment (1): three runs, none earned. */
export function EarnedExampleVisual({ replay }) {
  const { t, tm } = useI18n();
  const steps = tm('mlb.v.pit.ex.steps');
  return (
    <StopMotionScene
      frames={4}
      replay={replay}
      header={(i) => <StateLine chip={steps[i].chip} caption={steps[i].caption} highlight={i === 3} />}
      footer={(i) => <CountBoard outs={[2, 2, 2, 3][i]} />}
    >
      {(i) => (
        <Field view="infield" markScale={2.5}>
          <BaseLabels size={8} ids={['first', 'home']} />
          {i === 1 && <Token x={FIRST[0] - 9} y={FIRST[1] + 4} r={7} side="off" label={t('mlb.v.pit.ex.charlie')} />}
          {i === 2 && <Token x={FIRST[0] - 9} y={FIRST[1] + 4} r={7} side="off" label={t('mlb.v.pit.ex.charlie')} />}
          {i === 3 && (
            <>
              <Token x={FIRST[0] - 9} y={FIRST[1] + 4} r={7} side="off" label={t('mlb.v.pit.ex.charlie')} />
              <OutMark x={FIRST[0] - 9} y={FIRST[1] + 4} r={9} />
            </>
          )}
          {i >= 2 && <Label x={0} y={-40} size={13}>{t('mlb.v.pit.ex.runs', { n: 3 })}</Label>}
          {i === 3 && <Label x={0} y={-24} size={11}>{t('mlb.v.pit.ex.earned')}</Label>}
        </Field>
      )}
    </StopMotionScene>
  );
}

export function UnknownVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.pit.un.head')}>
      <StatTable
        caption={t('mlb.v.pit.un.head')}
        head={[t('mlb.v.pit.un.case'), t('mlb.v.pit.un.runs'), t('mlb.v.pit.un.earned')]}
        rows={[
          [t('mlb.v.pit.un.a'), '2', '0'],
          [t('mlb.v.pit.un.b'), '2', '1'],
        ]}
      />
    </StillScene>
  );
}

export function EraVisual() {
  const { t } = useI18n();
  const r = fmt(compute(S).era);
  return (
    <StillScene header={t('mlb.v.pit.era.head')} footer={<span>{t('mlb.v.pit.src')}</span>}>
      <Fraction name="ERA" times="9" aria={t('mlb.v.pit.era.aria', { er: S.er, ip: IP, r })}
        top={[{ k: t('mlb.v.pit.k.er'), v: S.er }]} bottom={[{ k: t('mlb.v.pit.k.ip'), v: IP }]} result={r} />
    </StillScene>
  );
}

export function WhipVisual() {
  const { t } = useI18n();
  const r = fmt(compute(S).whip);
  return (
    <StillScene header={t('mlb.v.pit.whip.head')} footer={<span>{t('mlb.v.pit.src')}</span>}>
      <Fraction name="WHIP" aria={t('mlb.v.pit.whip.aria', { bb: S.bb, h: S.h, ip: IP, r })}
        top={[{ k: t('mlb.v.pit.k.bb'), v: S.bb }, { k: t('mlb.v.pit.k.h'), v: S.h }]} bottom={[{ k: t('mlb.v.pit.k.ip'), v: IP }]} result={r} />
    </StillScene>
  );
}

export function RatesVisual() {
  const { t } = useI18n();
  const c = compute(S);
  return (
    <StillScene header={t('mlb.v.pit.rate.head')} footer={<span>{t('mlb.v.pit.src')}</span>}>
      <div className="mx-stack-col">
        <Fraction name="K/9" times="9" aria={t('mlb.v.pit.rate.kAria', { k: S.k, ip: IP, r: fmt(c.k9) })}
          top={[{ k: t('mlb.v.pit.k.k'), v: S.k }]} bottom={[{ k: t('mlb.v.pit.k.ip'), v: IP }]} result={fmt(c.k9)} />
        <Fraction name="BB/9" times="9" aria={t('mlb.v.pit.rate.bbAria', { bb: S.bb, ip: IP, r: fmt(c.bb9) })}
          top={[{ k: t('mlb.v.pit.k.bb'), v: S.bb }]} bottom={[{ k: t('mlb.v.pit.k.ip'), v: IP }]} result={fmt(c.bb9)} />
      </div>
    </StillScene>
  );
}

export function WinVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.pit.win.head')} footer={<span>{t('mlb.v.pit.win.foot')}</span>}>
      <div className="mx-inns" role="img" aria-label={t('mlb.v.pit.win.alt')}>
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className={`mx-inn ${i < 5 ? 'is-need' : ''}`}><b>{i + 1}</b></span>
        ))}
      </div>
    </StillScene>
  );
}

export function SaveVisual() {
  const { t, tm } = useI18n();
  return (
    <StillScene header={t('mlb.v.pit.sv.head')}>
      <div className="mx-stack-col">
        <Checklist items={tm('mlb.v.pit.sv.all')} />
        <div className="mx-card">
          <h3>{t('mlb.v.pit.sv.one')}</h3>
          <ul>{tm('mlb.v.pit.sv.opts').map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </div>
    </StillScene>
  );
}

export function HoldVisual() {
  const { t } = useI18n();
  return (
    <StillScene header={t('mlb.v.pit.hold.head')}>
      <StatTable
        caption={t('mlb.v.pit.hold.head')}
        head={[t('mlb.v.pit.hold.stat'), t('mlb.v.pit.hold.what')]}
        rows={[
          [t('mlb.v.pit.hold.svo'), t('mlb.v.pit.hold.svoT')],
          [t('mlb.v.pit.hold.bs'), t('mlb.v.pit.hold.bsT')],
          [t('mlb.v.pit.hold.hld'), t('mlb.v.pit.hold.hldT')],
        ]}
      />
    </StillScene>
  );
}

export function SkenesVisual() {
  const { t } = useI18n();
  const rows = [
    ['W-L', '10-10'], ['IP', IP], ['ER', 41], ['H', 136], ['BB', 42], ['K', 216],
    ['ERA', '1.97'], ['WHIP', '0.95'], ['K/9', '10.36'], ['BB/9', '2.01'], ['K/BB', '5.14'],
  ];
  return (
    <StillScene header={t('mlb.v.pit.line.head')} footer={<span>{t('mlb.v.pit.src')}</span>}>
      <div className="mx-out" role="list" aria-label={t('mlb.v.pit.line.head')}>
        {rows.map(([k, v]) => <div key={k} role="listitem"><small>{k}</small><b>{v}</b></div>)}
      </div>
    </StillScene>
  );
}

const FIELDS = ['inn', 'outs', 'er', 'h', 'bb', 'k'];
const toNum = (v) => (v === '' ? 0 : Number(v));

/** ERA, WHIP, K/9 and BB/9 from the counts (formulas in stats.js). */
export function PitchingCalculator() {
  const { t } = useI18n();
  const [raw, setRaw] = useState(() => Object.fromEntries(FIELDS.map((f) => [f, String(S[f])])));
  const s = Object.fromEntries(FIELDS.map((f) => [f, toNum(raw[f])]));
  const c = compute(s);
  const set = (f) => (e) => setRaw((o) => ({ ...o, [f]: e.target.value.replace(/[^0-9]/g, '') }));
  const fill = (src) => setRaw(Object.fromEntries(FIELDS.map((f) => [f, String(src[f])])));
  return (
    <StillScene header={t('mlb.v.pit.calc.head')}>
      <div className="mx-calc">
        <div className="mx-inputs">
          <label>
            {t('mlb.v.pit.calc.inn')}
            <input type="text" inputMode="numeric" value={raw.inn} onChange={set('inn')} />
          </label>
          <label>
            {t('mlb.v.pit.calc.outs')}
            <select value={Math.min(2, s.outs)} onChange={(e) => setRaw((o) => ({ ...o, outs: e.target.value }))}>
              <option value="0">0</option><option value="1">1 (⅓)</option><option value="2">2 (⅔)</option>
            </select>
          </label>
          {['er', 'h', 'bb', 'k'].map((f) => (
            <label key={f}>
              {t(`mlb.v.pit.calc.${f}`)}
              <input type="text" inputMode="numeric" value={raw[f]} onChange={set(f)} />
            </label>
          ))}
        </div>
        <div className="mx-actions">
          <button type="button" onClick={() => fill(S)}>{t('mlb.v.pit.calc.skenes')}</button>
          <button type="button" onClick={() => fill(Object.fromEntries(FIELDS.map((f) => [f, 0])))}>{t('mlb.v.pit.calc.clear')}</button>
        </div>
        {c.noInnings && <p className="mx-msg is-warn" role="alert">{t('mlb.v.pit.calc.none')}</p>}
        <div className="mx-out" aria-live="polite">
          <div><small>{t('mlb.v.pit.calc.ip')}</small><b data-testid="out-ip">{c.ip.toFixed(2)}</b></div>
          <div><small>ERA</small><b data-testid="out-era">{fmt(c.era)}</b></div>
          <div><small>WHIP</small><b data-testid="out-whip">{fmt(c.whip)}</b></div>
          <div><small>K/9</small><b data-testid="out-k9">{fmt(c.k9)}</b></div>
          <div><small>BB/9</small><b data-testid="out-bb9">{fmt(c.bb9)}</b></div>
        </div>
        <p className="mx-msg">{t('mlb.v.pit.calc.foot')}</p>
      </div>
    </StillScene>
  );
}

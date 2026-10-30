import { useMemo, useState } from 'react';
import { useI18n } from '../../../i18n/I18n';
import { StillScene, FluidScene, StopMotionScene, StateLine } from '../../../components/scene/Scene';
import * as O from './orbit';
import { Sky, Earth, AirRing, Craft, Pin, makeScale, toXY, pathOf, heading, RD } from './OrbitSvg';
import './orbit.css';

const nf = (locale, n, d = 0, max = d) => new Intl.NumberFormat(locale, { maximumFractionDigits: max, minimumFractionDigits: d }).format(n);
const deg = (r) => (r * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
const nmi = O.nmiToKm;

/* ------------------------------------------------------------------ (a) falling around the Earth */

const CANNON_ALT = 1500; // schematic: the cannon is drawn high so the picture is readable (not to scale)
const SHOTS = [
  { f: 0.55, color: '#ff6b6b', key: 'slow' },
  { f: 0.8, color: '#ffd24a', key: 'fast' },
  { f: 1, color: '#5fd38d', key: 'orbit' },
];
const FRAMES = 180;
let shotCache;
/** Paths of the three shots, computed with the same integrator as the rest of the lesson. A shot stops where it hits the ground. */
export function cannonShots() {
  if (shotCache) return shotCache;
  const r = O.R_EARTH + CANNON_ALT;
  const vc = Math.sqrt(O.MU / r);
  const dt = (2 * Math.PI * Math.sqrt((r * r * r) / O.MU)) / FRAMES;
  shotCache = SHOTS.map(({ f }) => {
    let s = O.stateFromAltitudeSpeed({ altKm: CANNON_ALT, speedKms: f * vc, angleDeg: 90 });
    const pts = [[s.x, s.y]];
    for (let i = 0; i < FRAMES; i++) {
      s = O.propagate(s, dt, 10);
      if (O.radiusOf(s) <= O.R_EARTH) {
        const k = O.R_EARTH / O.radiusOf(s);
        pts.push([s.x * k, s.y * k]);
        break;
      }
      pts.push([s.x, s.y]);
    }
    return pts;
  });
  return shotCache;
}

export function CannonVisual({ replay }) {
  const { t } = useI18n();
  const scale = makeScale(1);
  const shots = cannonShots();
  const top = scale(O.R_EARTH + CANNON_ALT);
  return (
    <FluidScene
      duration={9000}
      replay={replay}
      header={t('reentry.orbit.cannon.head')}
      footer={
        <span className="ob-key">
          {SHOTS.map((s) => <span key={s.key}><i style={{ background: s.color }} />{t(`reentry.orbit.cannon.${s.key}`)}</span>)}
        </span>
      }
    >
      {(tm) => {
        const idx = Math.round((tm / 9000) * FRAMES);
        return (
          <Sky label={t('reentry.orbit.cannon.label')}>
            <Earth />
            <path d={`M-9,${-RD + 1} L0,${-top} L9,${-RD + 1}Z`} fill="#6b5b4b" stroke="#a89880" strokeWidth="0.8" />
            {SHOTS.map((s, k) => {
              const pts = shots[k].slice(0, Math.min(idx, shots[k].length - 1) + 1);
              const [x, y] = toXY(scale, ...pts[pts.length - 1]);
              return (
                <g key={s.key}>
                  <path className="ob-trail" d={pathOf(scale, pts)} stroke={s.color} />
                  <circle className="ob-ball" cx={x} cy={y} r="3.2" fill={s.color} />
                </g>
              );
            })}
            <text className="ob-label ob-label-soft" x="-130" y="-124">{t('reentry.orbit.cannon.notToScale')}</text>
          </Sky>
        );
      }}
    </FluidScene>
  );
}

/* ------------------------------------------------------------------ (b) apogee and perigee */

// Numbers as printed in the NASA documents (research 00-orbit-basics.md section 2).
const MISSIONS = [
  { id: 'ma6', peri: nmi(86.9), apo: nmi(140.9), printed: { lo: 86.9, hi: 140.9, unit: 'nmi' } },
  { id: 'ma7', peri: nmi(86.87), apo: nmi(144.06), printed: { lo: 86.87, hi: 144.06, unit: 'nmi' } },
  { id: 'g4', peri: nmi(87.6), apo: nmi(152.2), printed: { lo: 87.6, hi: 152.2, unit: 'nmi' } },
  { id: 'g6a', peri: 161, apo: 259, printed: { lo: 161, hi: 259, unit: 'km' } },
];

export function ApsidesVisual() {
  const { t, locale } = useI18n();
  const [id, setId] = useState('ma7');
  const m = MISSIONS.find((x) => x.id === id);
  const el = useMemo(() => O.orbitFromApsides(m.peri, m.apo), [m]);
  const stretch = 8;
  const scale = makeScale(stretch);
  const [px, py] = toXY(scale, el.rPeri, 0);
  const [ax, ay] = toXY(scale, -el.rApo, 0);
  const vP = O.speedAtRadius(el.a, el.rPeri);
  const vA = O.speedAtRadius(el.a, el.rApo);
  const n = (v, d) => nf(locale, v, d);
  return (
    <StillScene
      header={t('reentry.orbit.apsides.head')}
      footer={
        <>
          <table className="ob-table">
            <caption>{t('reentry.orbit.apsides.calc')}</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{t('reentry.orbit.apsides.point')}</span></th>
                <th scope="col">{t('reentry.orbit.apsides.colAlt')}</th>
                <th scope="col">{t('reentry.orbit.apsides.colCenter')}</th>
                <th scope="col">{t('reentry.orbit.apsides.colSpeed')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">{t('reentry.orbit.perigee')}</th><td>{n(el.periAltKm, 1)}</td><td>{n(el.rPeri, 1)}</td><td>{n(vP, 2)}</td></tr>
              <tr><th scope="row">{t('reentry.orbit.apogee')}</th><td>{n(el.apoAltKm, 1)}</td><td>{n(el.rApo, 1)}</td><td>{n(vA, 2)}</td></tr>
            </tbody>
          </table>
          <p className="ob-small">
            {t('reentry.orbit.apsides.period', { min: n(el.periodS / 60, 1) })} {t('reentry.orbit.apsides.radius', { r: n(O.R_EARTH, 3) })}
          </p>
        </>
      }
    >
      <div className="ob-panel">
        <div className="ob-row" role="group" aria-labelledby="ob-pick">
          <span className="ob-name" id="ob-pick">{t('reentry.orbit.apsides.pick')}</span>
          <div className="ob-seg">
            {MISSIONS.map((x) => (
              <button key={x.id} className="ob-btn" aria-pressed={x.id === id} onClick={() => setId(x.id)}>
                {t(`reentry.orbit.missions.${x.id}`)}
              </button>
            ))}
          </div>
          <p className="ob-small">
            {t('reentry.orbit.apsides.printed', { lo: nf(locale, m.printed.lo, 0, 2), hi: nf(locale, m.printed.hi, 0, 2), unit: m.printed.unit === 'km' ? 'km' : t('reentry.orbit.nmi') })}
          </p>
        </div>
      </div>
      <Sky label={t('reentry.orbit.apsides.label', { name: t(`reentry.orbit.missions.${m.id}`) })}>
        <path className="ob-orbit" d={pathOf(scale, O.sampleOrbit(el, 240))} />
        <Earth />
        {/* altitude (yellow) is the part above the surface; the whole line is the distance from the center */}
        <line className="ob-line" x1="0" y1="0" x2={px} y2={py} />
        <line className="ob-line" x1="0" y1="0" x2={ax} y2={ay} />
        <line className="ob-line-alt" x1={RD} y1="0" x2={px} y2={py} />
        <line className="ob-line-alt" x1={-RD} y1="0" x2={ax} y2={ay} />
        <Pin x={px} y={py} label={t('reentry.orbit.perigee')} dx={0} dy={-9} anchor="middle" />
        <Pin x={ax} y={ay} label={t('reentry.orbit.apogee')} dx={0} dy={-9} anchor="middle" />
        <text className="ob-label ob-label-soft" x="0" y="4" textAnchor="middle">{t('reentry.orbit.earth')}</text>
        <text className="ob-label ob-label-soft" x="-132" y="-124">{t('reentry.orbit.stretched', { k: stretch })}</text>
        <text className="ob-label" x="132" y="130" textAnchor="end" style={{ fill: '#ffd24a' }}>{t('reentry.orbit.apsides.yellow')}</text>
      </Sky>
    </StillScene>
  );
}

/* ------------------------------------------------------------------ (c) the burn simulator */

const mk = (peri, apo) => O.orbitFromApsides(peri, apo);
export const STARTS = {
  ma7: { el: mk(160.88, 266.8), stretch: 6 },
  g6a: { el: mk(161, 259), stretch: 12 },
  g10a: { el: mk(nmi(206.9), nmi(208.9)), stretch: 3 },
  g10b: { el: mk(nmi(208.6), nmi(750.5)), stretch: 3 },
};
// Real burns (research 00-orbit-basics.md section 3). dv in m/s: 856 ft/s = 261 m/s, 886 ft/s = 270 m/s.
export const PRESETS = [
  { id: 'gemVIA', start: 'g6a', nu: 0, dir: 1, dv: 4 },
  { id: 'gemXup', start: 'g10a', nu: 0, dir: 1, dv: 261 },
  { id: 'gemXdown', start: 'g10b', nu: 0, dir: -1, dv: 270 },
];
const DEFAULT = { start: 'ma7', nu: 0, dir: 1, dv: 60, preset: null };

/** Everything the simulator shows, from its inputs. Plain function, easy to test. */
export function simulate({ start, nu, dir, dv }) {
  const el = STARTS[start].el;
  const r = O.burnAt(el, rad(nu), (dir * dv) / 1000);
  const opp = el.w + rad(nu) + Math.PI;
  return {
    before: el,
    after: r.after,
    state: r.state,
    next: r.next,
    oppBefore: O.altitudeAtAngle(el, opp),
    oppAfter: r.after.bound ? O.altitudeAtAngle(r.after, opp) : null,
    oppAngle: opp,
  };
}

export function BurnVisual() {
  const { t, locale } = useI18n();
  const [st, setSt] = useState(DEFAULT);
  const sim = useMemo(() => simulate(st), [st]);
  const { before, after, state } = sim;
  const scale = makeScale(STARTS[st.start].stretch);
  const n = (v, d = 0) => nf(locale, v, d);
  const km = (v) => `${n(v, 1)} km · ${n(O.kmToNmi(v), 1)} ${t('reentry.orbit.nmi')}`;
  const burning = st.dv > 0;
  const bPos = toXY(scale, state.x, state.y);
  const hd = heading(scale, state);
  const aim = st.dir > 0 ? hd : hd + 180;
  const oppOld = toXY(scale, ...[Math.cos(sim.oppAngle), Math.sin(sim.oppAngle)].map((c) => c * (O.R_EARTH + sim.oppBefore)));
  const oppNew = after.bound && burning ? toXY(scale, ...[Math.cos(sim.oppAngle), Math.sin(sim.oppAngle)].map((c) => c * (O.R_EARTH + sim.oppAfter))) : null;
  const set = (patch) => setSt((s) => ({ ...s, ...patch, preset: patch.preset ?? null }));

  const where = st.nu === 0 ? t('reentry.orbit.sim.atLow') : st.nu === 180 ? t('reentry.orbit.sim.atHigh') : t('reentry.orbit.sim.atDeg', { deg: st.nu });
  let status;
  if (!burning) status = t('reentry.orbit.sim.noBurn');
  else if (!after.bound) status = t('reentry.orbit.sim.escape');
  else {
    status = t('reentry.orbit.sim.result', {
      action: t(st.dir > 0 ? 'reentry.orbit.sim.actUp' : 'reentry.orbit.sim.actDown'),
      dv: st.dv,
      where,
      from: n(sim.oppBefore),
      to: n(sim.oppAfter),
    });
  }
  const inAir = burning && after.bound && after.entersAir;
  const preset = PRESETS.find((p) => p.id === st.preset);

  return (
    <StillScene
      header={t('reentry.orbit.sim.head')}
      footer={
        <>
          <table className="ob-table">
            <caption>{t('reentry.orbit.sim.calc')}</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{t('reentry.orbit.apsides.point')}</span></th>
                <th scope="col">{t('reentry.orbit.sim.before')}</th>
                <th scope="col">{t('reentry.orbit.sim.after')}</th>
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">{t('reentry.orbit.apogee')}</th><td>{km(before.apoAltKm)}</td><td className={st.nu === 0 ? 'is-hl' : ''}>{after.bound ? km(after.apoAltKm) : '—'}</td></tr>
              <tr><th scope="row">{t('reentry.orbit.perigee')}</th><td>{km(before.periAltKm)}</td><td className={st.nu === 180 ? 'is-hl' : ''}>{after.bound ? km(after.periAltKm) : '—'}</td></tr>
              <tr><th scope="row">{t('reentry.orbit.period')}</th><td>{n(before.periodS / 60, 1)} min</td><td>{after.bound ? `${n(after.periodS / 60, 1)} min` : '—'}</td></tr>
              <tr><th scope="row">{t('reentry.orbit.sim.opposite')}</th><td>{n(sim.oppBefore, 1)} km</td><td className="is-hl">{after.bound ? `${n(sim.oppAfter, 1)} km` : '—'}</td></tr>
            </tbody>
          </table>
          <p className="ob-small">{t('reentry.orbit.sim.ideal')}</p>
        </>
      }
    >
      <Sky label={t('reentry.orbit.sim.label')}>
        <path className="ob-old" d={pathOf(scale, O.sampleOrbit(before, 240))} />
        {burning && after.bound && <path className="ob-new" d={pathOf(scale, O.sampleOrbit(after, 240))} />}
        <Earth />
        <AirRing scale={scale} label={t('reentry.orbit.airLine', { km: O.ENTRY_ALT_KM })} />
        {burning && after.bound && (
          <>
            <line className="ob-line" x1={bPos[0]} y1={bPos[1]} x2={(oppNew ?? oppOld)[0]} y2={(oppNew ?? oppOld)[1]} />
            <Pin x={oppOld[0]} y={oppOld[1]} className="is-old" />
            <Pin x={oppNew[0]} y={oppNew[1]} className="is-hl" label={t('reentry.orbit.sim.oppositeSide')} dx={0} dy={-8} anchor="middle" />
          </>
        )}
        <Craft x={bPos[0]} y={bPos[1]} angle={hd} className="is-hot" />
        {burning && (
          <g transform={`translate(${bPos[0]} ${bPos[1]}) rotate(${aim})`}>
            <path className="ob-arrow" d="M8,0 L22,0 M17,-4 L22,0 L17,4" />
          </g>
        )}
        <text className="ob-label ob-label-soft" x="-132" y="-124">{t('reentry.orbit.stretched', { k: STARTS[st.start].stretch })}</text>
      </Sky>
      <div className="ob-panel">
        <div className="ob-row">
          <label htmlFor="ob-where">{t('reentry.orbit.sim.whereLabel')}: <span className="ob-val">{where}</span></label>
          <input id="ob-where" type="range" min="0" max="360" step="1" value={st.nu} onChange={(e) => set({ nu: Number(e.target.value) })} aria-valuetext={where} />
          <div className="ob-seg">
            <button className="ob-btn" onClick={() => set({ nu: 0 })}>{t('reentry.orbit.sim.goLow')}</button>
            <button className="ob-btn" onClick={() => set({ nu: 180 })}>{t('reentry.orbit.sim.goHigh')}</button>
          </div>
        </div>
        <div className="ob-row" role="group" aria-labelledby="ob-dir">
          <span className="ob-name" id="ob-dir">{t('reentry.orbit.sim.dirLabel')}</span>
          <div className="ob-seg">
            <button className="ob-btn" aria-pressed={st.dir > 0} onClick={() => set({ dir: 1 })}>{t('reentry.orbit.sim.prograde')}</button>
            <button className="ob-btn" aria-pressed={st.dir < 0} onClick={() => set({ dir: -1 })}>{t('reentry.orbit.sim.retrograde')}</button>
          </div>
        </div>
        <div className="ob-row">
          <label htmlFor="ob-dv">{t('reentry.orbit.sim.dvLabel')}: <span className="ob-val">{st.dv} m/s</span> <span className="ob-small">({n(O.msToFts(st.dv))} ft/s)</span></label>
          <input id="ob-dv" type="range" min="0" max="300" step="1" value={st.dv} onChange={(e) => set({ dv: Number(e.target.value) })} />
        </div>
        <div className="ob-row" role="group" aria-labelledby="ob-presets">
          <span className="ob-name" id="ob-presets">{t('reentry.orbit.sim.presets')}</span>
          <div className="ob-seg">
            {PRESETS.map((p) => (
              <button key={p.id} className="ob-btn" aria-pressed={st.preset === p.id} onClick={() => setSt({ start: p.start, nu: p.nu, dir: p.dir, dv: p.dv, preset: p.id })}>
                {t(`reentry.orbit.presets.${p.id}.name`)}
              </button>
            ))}
            <button className="ob-btn" onClick={() => setSt(DEFAULT)}>{t('reentry.orbit.sim.reset')}</button>
          </div>
          {preset && <p className="ob-preset-note">{t(`reentry.orbit.presets.${preset.id}.note`)}</p>}
          {!preset && <p className="ob-preset-note">{t('reentry.orbit.sim.startOrbit', { peri: n(before.periAltKm, 1), apo: n(before.apoAltKm, 1) })}</p>}
        </div>
        <p className={`ob-status ${inAir ? 'is-air' : ''}`} role="status" aria-live="polite">
          {status}{inAir ? ` ${t('reentry.orbit.sim.inAir', { alt: n(after.periAltKm), line: O.ENTRY_ALT_KM })}` : ''}
        </p>
      </div>
    </StillScene>
  );
}

/* ------------------------------------------------------------------ (d) retrofire */

const RETRO_ORBIT = mk(160.88, 266.8); // Mercury MA-7 insertion orbit [S16]
const RETRO_TARGET_PERI_KM = 42.3 * O.NMI_KM; // Gemini IV theoretical perigee after its retro burn, 42.3 nmi [S17 p.82]
export const RETRO_DV_MS = O.retroForPerigee(RETRO_ORBIT, Math.PI, RETRO_TARGET_PERI_KM) * 1000; // COMPUTED, ours
export const retroBurn = () => O.burnAt(RETRO_ORBIT, Math.PI, -RETRO_DV_MS / 1000);

export function RetroVisual() {
  const { t, locale } = useI18n();
  const scale = makeScale(10);
  const r = useMemo(retroBurn, []);
  const n = (v, d = 0) => nf(locale, v, d);
  const apo = toXY(scale, ...[Math.cos(Math.PI), Math.sin(Math.PI)].map((c) => c * RETRO_ORBIT.rApo));
  const peri = toXY(scale, r.after.rPeri, 0);
  const hd = heading(scale, r.state);
  return (
    <StopMotionScene
      frames={3}
      interval={2800}
      header={(i) => <StateLine chip={t(`reentry.orbit.retro.chip${i}`)} caption={t(`reentry.orbit.retro.cap${i}`, { dv: n(RETRO_DV_MS), peri: n(r.after.periAltKm) })} highlight={i === 2} />}
      footer={<p className="ob-small">{t('reentry.orbit.retro.computed', { dv: n(RETRO_DV_MS) })}</p>}
    >
      {(i) => (
        <Sky label={t(`reentry.orbit.retro.label${i}`)}>
          <path className={i === 2 ? 'ob-old' : 'ob-orbit'} d={pathOf(scale, O.sampleOrbit(RETRO_ORBIT, 240))} />
          {i === 2 && <path className="ob-new" d={pathOf(scale, O.sampleOrbit(r.after, 240))} />}
          <Earth />
          <AirRing scale={scale} label={t('reentry.orbit.airLine', { km: O.ENTRY_ALT_KM })} />
          <Pin x={apo[0]} y={apo[1]} label={t('reentry.orbit.apogee')} dx={0} dy={-8} anchor="middle" />
          {i >= 1 && (
            <g transform={`translate(${apo[0]} ${apo[1]}) rotate(${hd + 180})`}>
              <path className="ob-arrow" d="M8,0 L24,0 M19,-4 L24,0 L19,4" />
            </g>
          )}
          <Craft x={apo[0]} y={apo[1]} angle={hd} className={i === 1 ? 'is-hot' : ''} />
          {i === 2 && <Pin x={peri[0]} y={peri[1]} className="is-hl" label={t('reentry.orbit.retro.lowPoint')} dx={10} dy={-4} />}
          <text className="ob-label ob-label-soft" x="-132" y="-124">{t('reentry.orbit.stretched', { k: 10 })}</text>
        </Sky>
      )}
    </StopMotionScene>
  );
}

/* ------------------------------------------------------------------ (e) catching up */

const LOW = 200;
const HIGH = 400;
// Circular orbits; periods from the research's COMPUTED sanity values (88.5 and 92.6 min).
const circ = (alt) => O.elements(O.stateFromAltitudeSpeed({ altKm: alt, speedKms: Math.sqrt(O.MU / (O.R_EARTH + alt)) }));

export function CatchUpVisual({ replay }) {
  const { t, locale } = useI18n();
  const lo = useMemo(() => circ(LOW), []);
  const hi = useMemo(() => circ(HIGH), []);
  const scale = makeScale(6);
  const span = hi.periodS * 3; // simulated time: three laps of the higher orbit
  const lag0 = rad(60); // the lower craft starts 60 degrees behind
  const n = (v, d = 0) => nf(locale, v, d);
  return (
    <FluidScene
      duration={9000}
      replay={replay}
      header={(tm) => {
        const T = (tm / 9000) * span;
        const gap = deg(lag0 - (2 * Math.PI * T) / lo.periodS + (2 * Math.PI * T) / hi.periodS);
        return <StateLine chip={t('reentry.orbit.catch.gap', { deg: n(Math.max(0, gap)) })} caption={t('reentry.orbit.catch.periods', { lo: n(lo.periodS / 60, 1), hi: n(hi.periodS / 60, 1) })} highlight={gap < 20} />;
      }}
      footer={
        <>
          <span className="ob-key">
            <span><i style={{ background: '#ffb347' }} />{t('reentry.orbit.catch.low', { km: LOW })}</span>
            <span><i style={{ background: '#9fd0ff' }} />{t('reentry.orbit.catch.high', { km: HIGH })}</span>
          </span>
          <p className="ob-small">{t('reentry.orbit.catch.note')}</p>
        </>
      }
    >
      {(tm) => {
        const T = (tm / 9000) * span;
        const aLo = Math.PI / 2 - lag0 + (2 * Math.PI * T) / lo.periodS;
        const aHi = Math.PI / 2 + (2 * Math.PI * T) / hi.periodS;
        const at = (alt, a) => toXY(scale, ...[Math.cos(a), Math.sin(a)].map((c) => c * (O.R_EARTH + alt)));
        const pLo = at(LOW, aLo);
        const pHi = at(HIGH, aHi);
        return (
          <Sky label={t('reentry.orbit.catch.label')}>
            <circle className="ob-orbit" r={scale(O.R_EARTH + HIGH)} />
            <circle className="ob-new" r={scale(O.R_EARTH + LOW)} />
            <Earth />
            <circle cx={pHi[0]} cy={pHi[1]} r="4.5" fill="#9fd0ff" stroke="#0d1626" strokeWidth="0.8" />
            <circle cx={pLo[0]} cy={pLo[1]} r="4.5" fill="#ffb347" stroke="#0d1626" strokeWidth="0.8" />
            <text className="ob-label ob-label-soft" x="-132" y="-124">{t('reentry.orbit.stretched', { k: 6 })} · {t('reentry.orbit.catch.speeded')}</text>
          </Sky>
        );
      }}
    </FluidScene>
  );
}

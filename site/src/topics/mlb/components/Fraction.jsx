/**
 * A formula drawn as a fraction, with the numbers filled in: NAME = top / bottom = result.
 * top / bottom: [{ k: 'H', v: '179' }, ...] (added together). times: an optional factor before the top, e.g. '9'.
 * aria: the whole formula as a sentence for screen readers (translated by the caller).
 */
export default function Fraction({ name, aria, top, bottom, times, result }) {
  const side = (parts) => parts.map((p, i) => (
    <span key={p.k} className="mx-term">
      {i > 0 && <span className="mx-op">+</span>}
      <small>{p.k}</small> <b>{p.v}</b>
    </span>
  ));
  return (
    <div className="mx-frac" role="img" aria-label={aria}>
      <span className="mx-name">{name} =</span>
      <span className="mx-stack">
        <span className="mx-top">{times && <span className="mx-op">{times} ×</span>}{side(top)}</span>
        <span className="mx-bar" />
        <span className="mx-bot">{side(bottom)}</span>
      </span>
      <span className="mx-name">=</span>
      <span className="mx-res">{result}</span>
    </div>
  );
}

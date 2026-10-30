/** A list of conditions that must all be true. */
export default function Checklist({ items }) {
  return (
    <ul className="mx-check">
      {items.map((it) => (
        <li key={it}><span aria-hidden="true">✓</span> {it}</li>
      ))}
    </ul>
  );
}

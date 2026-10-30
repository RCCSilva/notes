/** A small dark table. head: column titles (all non-empty); rows: arrays of cells; the first cell of each row is its header. */
export default function StatTable({ caption, head, rows, highlight = [] }) {
  return (
    <div className="mi-wrap">
      <table className="mi-table mx-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>{head.map((h) => <th scope="col" key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={r[0]} className={highlight.includes(ri) ? 'is-hl' : ''}>
              <th scope="row">{r[0]}</th>
              {r.slice(1).map((c, ci) => <td key={ci}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BrandList({ items, selected, onSelect }) {
  return (
    <div className="list-group">
      {items.map((item) => {
        const active =
          selected?.brand === item.brand && selected?.number === item.number;
        return (
          <button
            key={`${item.brand}-${item.number}`}
            type="button"
            className={`list-group-item list-group-item-action${active ? " active" : ""}`}
            onClick={() => onSelect(item)}
          >
            <div className="fw-semibold">{item.brand}</div>
            <small className={active ? "" : "text-muted"}>
              {item.number} — {item.name}
            </small>
          </button>
        );
      })}
    </div>
  );
}

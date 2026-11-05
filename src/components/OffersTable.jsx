const formatPrice = (price) =>
  price == null
    ? "—"
    : price.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleString("ru-RU", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "—";

export default function OffersTable({ offers }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Производитель</th>
            <th>Артикул</th>
            <th>Наименование</th>
            <th className="text-end">Цена</th>
            <th className="text-end">Остаток</th>
            <th>Отгрузка</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.key}>
              <td>
                {offer.brand}
                {offer.isOriginal && (
                  <span className="badge text-bg-primary ms-2">Искомая</span>
                )}
              </td>
              <td>{offer.number}</td>
              <td>{offer.name}</td>
              <td className="text-end text-nowrap">
                {formatPrice(offer.price)}
              </td>
              <td className={`text-end${offer.stock > 0 ? "" : " text-muted"}`}>
                {offer.stock}
              </td>
              <td className="text-nowrap">{formatDate(offer.shipmentDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

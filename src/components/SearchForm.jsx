export default function SearchForm({ value, onChange }) {
  return (
    <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="article" className="form-label fw-semibold">
        Артикул детали
      </label>
      <input
        id="article"
        type="search"
        className="form-control form-control-lg"
        placeholder="Например, 0189"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <div className="form-text">Минимум 3 символа</div>
    </form>
  );
}

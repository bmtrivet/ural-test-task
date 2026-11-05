function getMessage(error) {
  switch (error?.status) {
    case "API_ERROR":
      return String(error.data);
    case "FETCH_ERROR":
      return "Сеть недоступна. Проверьте подключение и повторите попытку.";
    case "PARSING_ERROR":
      return "Сервер вернул некорректный ответ.";
    case "TIMEOUT_ERROR":
      return "Сервер не ответил вовремя.";
    default:
      return typeof error?.status === "number"
        ? `Ошибка сервера: ${error.status}`
        : "Неизвестная ошибка";
  }
}

export default function ErrorAlert({ error, onRetry }) {
  return (
    <div
      className="alert alert-danger d-flex justify-content-between align-items-center gap-2"
      role="alert"
    >
      <span>{getMessage(error)}</span>
      {onRetry && (
        <button
          type="button"
          className="btn btn-sm btn-outline-danger"
          onClick={onRetry}
        >
          Повторить
        </button>
      )}
    </div>
  );
}

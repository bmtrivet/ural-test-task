import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";

export default function QueryView({ query, idleText, emptyText, children }) {
  if (query.isUninitialized) {
    return <p className="text-muted">{idleText}</p>;
  }
  if (query.isFetching) {
    return <Loader />;
  }
  if (query.isError) {
    return <ErrorAlert error={query.error} onRetry={query.refetch} />;
  }
  if (!query.data?.length) {
    return <div className="alert alert-info">{emptyText}</div>;
  }
  return children(query.data);
}

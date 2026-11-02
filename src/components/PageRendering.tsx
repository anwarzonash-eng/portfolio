import WebsiteLoader from "./WebsiteLoader";
import EmptyState from "./EmptyState"; // 👈 new component

const PageRendering = ({ props }) => {
  const { list, loading, error, actualPage, loaderHeight } = props;

  if (loading) {
    return <WebsiteLoader height={loaderHeight} />;
  }

  if (!list || list.length === 0) {
    return <EmptyState message={error || "No data found."} />;
  }

  return <>{actualPage}</>;
};

export default PageRendering;

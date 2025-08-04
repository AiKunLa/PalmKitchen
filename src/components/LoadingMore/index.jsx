import { Loading } from "react-vant";
import { useIntersectObs } from "@/hooks/useIntersectObs";

export const LoadingMore = (props) => {
  const { loadMore, loading } = props;
  const target = useIntersectObs(loadMore);
  return (
    <div ref={target}>
       {loading && <Loading type="spinner" style={{ textAlign: "center" }} />}
    </div>
  );
};

export default LoadingMore;

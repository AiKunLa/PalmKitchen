import styles from "./topDetail.module.css";
import { ArrowLeft, Ellipsis } from "@react-vant/icons";
import { Search } from "react-vant";
import { useNavigate } from "react-router-dom";

export default function TopDetail({ type = 1 }) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // navigate("/search");
  };

  const handleBackClick = (e) => {
    // 返回上一页
    navigate(-1);
  };

  const handleMsgClick = (e) => {
    // e.stopPropagation();
  };

  return (
    <>
      <div className={styles.topNav}>
        <ArrowLeft className={styles.menuIcon} onClick={handleBackClick} />
        <div className={styles.searchContainer} onClick={handleSearchClick}>
          {/* <Search
            className={styles.searchBar}
            placeholder="搜索菜谱"
            shape="round"
          /> */}
        </div>
        {type === 3 ? (
          ""
        ) : (
          <Ellipsis className={styles.bellIcon} onClick={handleMsgClick} />
        )}
      </div>
    </>
  );
}

export { TopDetail };

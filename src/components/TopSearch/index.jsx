import styles from "./topSearch.module.css";
import { WapNav, ChatO } from "@react-vant/icons";
import { Search } from "react-vant";
import { useNavigate } from "react-router-dom";

export default function TopSearch({ type = 1 }) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleMenuClick = (e) => {
    // e.stopPropagation();
  };

  const handleMsgClick = (e) => {
    // e.stopPropagation();
  };

  return (
    <>
      <div className={styles.topNav}>
        <WapNav className={styles.menuIcon} onClick={handleMenuClick} />
        <div className={styles.searchContainer} onClick={handleSearchClick}>
          <Search
            className={styles.searchBar}
            placeholder="搜索菜谱"
            shape="round"
          />
        </div>
        {type === 3 ? (
          ""
        ) : (
          <ChatO className={styles.bellIcon} onClick={handleMsgClick} />
        )}
      </div>
    </>
  );
}

export { TopSearch };

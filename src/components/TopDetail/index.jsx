import styles from "./topDetail.module.css";
import { ArrowLeft, Ellipsis, Passed } from "@react-vant/icons";
import { useNavigate } from "react-router-dom";
export default function TopDetail({ type = 1, children, handleAction }) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // navigate("/search");
  };

  const handleBackClick = () => {
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
          {children ? children : ""}
        </div>

        {type === 3 ? (
          <Passed className={styles.bellIcon} onClick={handleAction} />
        ) : (
          <Ellipsis className={styles.bellIcon} onClick={handleMsgClick} />
        )}
      </div>
    </>
  );
}

export { TopDetail };

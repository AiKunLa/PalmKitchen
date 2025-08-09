import styles from "./topSearch.module.css";
import {
  WapNav,
  ChatO,
  SettingO,
  UserCircleO,
  GoodsCollectO,
  ManagerO,
  ClockO,
  ShoppingCartO,
} from "@react-vant/icons";

import { Cell, Popup, Search, Button } from "react-vant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthoStore } from "@/store/useAuthoStore";

export default function TopSearch({ type = 1 }) {
  const { doLogout, isAuthenticated } = useAuthoStore();
  const navigate = useNavigate();

  const [leftBarVisible, setLeftBarVisible] = useState(false);
  const [loginOutVisible, setLoginOutVisible] = useState(false);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleMsgClick = (e) => {
    e.stopPropagation();
    navigate("/login");
  };

  return (
    <>
      <Popup
        visible={leftBarVisible}
        style={{ width: "40%", height: "100%" }}
        position="left"
        onClose={() => setLeftBarVisible(false)}
      >
        <Cell
          clickable={true}
          icon={<ClockO />}
          className={styles.cell}
          title="历史记录"
        />

        <Cell
          clickable={true}
          icon={<ShoppingCartO />}
          className={styles.cell}
          title="购物车"
        />
        <Cell
          clickable={true}
          icon={<GoodsCollectO />}
          className={styles.cell}
          title="收藏"
        />

        <Cell
          clickable={true}
          icon={<ManagerO />}
          className={styles.cell}
          title="个人中心"
          onClick={() => navigate("/account")}
        />
        <Cell
          clickable={true}
          className={styles.cell}
          icon={<SettingO />}
          title="设置"
          onClick={() => navigate("/setting")}
        />
        <Cell
          clickable={true}
          icon={<UserCircleO />}
          className={styles.cell}
          title={isAuthenticated ? "退出登录" : "登录"}
          onClick={() => {
            if (isAuthenticated) {
              setLoginOutVisible(true);
            } else {
              navigate("/login");
            }
          }}
        />
      </Popup>

      <Popup
        visible={loginOutVisible}
        onClose={() => setLoginOutVisible(false)}
        style={{ width: "80%", maxWidth: "300px" }}
      >
        <div className={styles.popupContent}>
          <h3 className={styles.popupTitle}>确定要退出登录吗？</h3>
          <div className={styles.popupButtons}>
            <Button
              className={styles.cancelButton}
              onClick={() => setLoginOutVisible(false)}
            >
              取消
            </Button>
            <Button
              className={styles.confirmButton}
              onClick={() => {
                doLogout();
                setLoginOutVisible(false);
              }}
            >
              确定
            </Button>
          </div>
        </div>
      </Popup>

      <div className={styles.topNav}>
        <WapNav
          className={styles.menuIcon}
          onClick={() => setLeftBarVisible(true)}
        />

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

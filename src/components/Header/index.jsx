import { Search, Tabs } from "react-vant";
import { WapNav, ChatO } from "@react-vant/icons";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { useState, useEffect } from "react";

const tabs = [
  { title: "关注", path: "/home/follow" },
  { title: "推荐", path: "/home" },
  { title: "减脂", path: "/home/weightloss" },
  { title: "分类", path: "/home/category" },
];

export default function Header() {
  const [active, setActive] = useState(1); // 默认推荐是索引1
  const navigate = useNavigate();
  const location = useLocation();

  // 根据当前路径同步 active 状态
  useEffect(() => {
    const path = location.pathname; // 完整路径，如 /home/weightloss
    const index = tabs.findIndex((tab) => tab.path === path);
    if (index !== -1) {
      setActive(index);
    } else {
      // 可选：如果路径不匹配任何 tab，重置为推荐页
      // navigate('/home'); // 取消自动跳转避免干扰
      setActive(1); // 保持 UI 显示“推荐”高亮
    }
  }, [location.pathname]);

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
    <div className={styles.header}>
      <div className={styles.topNav}>
        <WapNav className={styles.menuIcon} onClick={handleMenuClick} />
        <div className={styles.searchContainer} onClick={handleSearchClick}>
          <Search
            className={styles.searchBar}
            placeholder="搜索菜谱"
            shape="round"
          />
        </div>
        <ChatO className={styles.bellIcon} onClick={handleMsgClick} />
      </div>

      {/* 分类标签栏 */}
      <div className={styles.categoryBar}>
        <Tabs
          value={active} 
          onChange={(index) => {
            setActive(index);
            navigate(tabs[index].path); // 路由跳转
          }}
        >
          {tabs.map((item, index) => (
            <Tabs.TabPane key={item.path} title={item.title} />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
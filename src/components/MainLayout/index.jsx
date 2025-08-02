import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tabbar } from "react-vant";
import { WapHome, ShopO, AddSquare, StarO, UserO } from "@react-vant/icons";

const tabs = [
  { icon: <WapHome />, title: "首页", path: "/home" },
  { icon: <ShopO />, title: "商店", path: "/shop" },
  { icon: <AddSquare />, title: "拍照查询", path: "/camera" },
  { icon: <StarO />, title: "收藏", path: "/collection" },
  { icon: <UserO />, title: "我", path: "/account" },
];

export default function MainLayout() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 获取当前路径
    const path = location.pathname === "/" ? "/home" : location.pathname;
    // 查找路径对应的tab索引
    const index = tabs.findIndex((tab) => path.startsWith(tab.path));
    // 确保默认选中首页  保证高亮与路径对应
    setActive(index > -1 ? index : 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen" style={{ paddingBottom: "50px" }}>
      <div className="flex-1">
        <Outlet />
      </div>
      <Tabbar activeColor='#f44336' inactiveColor='#000'
        value={active}
        onChange={(index) => {
          setActive(index);
          navigate(tabs[index].path);
        }}
        style={{ position: 'fixed', bottom: 0 }}
      >
        {tabs.map((tab, index) => (
          <Tabbar.Item key={index} icon={tab.icon}>
            {tab.title}
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  );
}

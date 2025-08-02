import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import useTitle from "@/hooks/useTitle";
import { Outlet } from "react-router-dom";


export default function Home() {
  useTitle("首页");

  return (
    <div className={styles.container}>
      {/* 顶部导航栏 */}
      <Header />

      {/* 内容区 */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

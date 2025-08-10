import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog } from "react-vant";

import styles from "./login.module.css";
import TopDetail from "@/components/TopDetail";
import { useAuthoStore } from "@/store/useAuthoStore";
import GlobalLoading from "@/components/GlobalLoading";
import { useTitle } from "@/hooks/useTitle";

export default function Login() {
  useTitle("用户登录");
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [isNull, setIsNull] = useState(false);

  const { doLogin, isAuthenticated, isLoading } = useAuthoStore();

  // 监听登录状态变化
  useEffect(() => {
    if (isAuthenticated) {
      // 获取重定向路径
      const searchParams = new URLSearchParams(location.search);
      const redirectPath = searchParams.get("redirect") || "/home";
      navigate(redirectPath);
    }
  }, [isAuthenticated, navigate, location.search]);

  const handleLogin = async () => {
  
    if (!agreed || !username || !password) {
      setIsNull(true);
      return;
    }

    try {
      setLoginError("");
      await doLogin(username, password);
      // 登录成功后会触发 isAuthenticated 变化，由 useEffect 处理重定向
      if(!isAuthenticated){
        setLoginError("登录失败，请检查账号密码");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  // if(isLoading) return <GlobalLoading />;

  return (
    <div className={styles.container}>
      {isLoading && <GlobalLoading />}
      <div className={styles.header}>
        <TopDetail />
      </div>
      <main className={styles.content}>
        <h1 className={styles.title}>登录</h1>
        <input
          type="text"
          placeholder="输入账号"
          className={styles.inputField}
          value={username}
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className={styles.error}>
          {!username && isNull && "请输入账号"}
        </div>

        <input
          type="password"
          placeholder="输入密码"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.error}>
          {!password && isNull && "请输入密码"}
        </div>

        <button className={styles.loginButton} onClick={handleLogin}>
          登录
        </button>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label
            className={styles.checkboxLabel}
            style={{ color: agreed || !isNull ? "black" : "red" }}
          >
            {agreed ? "已同意" : "未同意"} 服务协议和隐私保护指引
          </label>
        </div>
      </main>

      <footer className={styles.bottomNav}>
        <div className={styles.navItem}>
          <div className={styles.navIcon}></div>
          <span>手机号登录</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}></div>
          <span>其他方式登录</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}></div>
          <span>注册</span>
        </div>
        <div className={styles.navItem}>
          <div className={styles.navIcon}></div>
          <span>更多</span>
        </div>
      </footer>
    </div>
  );
}

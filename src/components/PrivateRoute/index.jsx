import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthoStore } from "@/store/useAuthoStore";
import { useEffect } from "react";
/**
 * 路由守卫
 * 既可以作为路由容器使用，也可以作为包装组件来使用
 * @param {*} param0
 * @returns
 */
export const PrivateRoute = ({ redirectPath = "/login", children }) => {
  const { isAuthenticated, checkAccessToken } = useAuthoStore();
  const location = useLocation();
  // 检测本地的accessToken是否过期 如果过期了 则刷新accessToken并 将isAuthenticated设置为true
  // 若accessToken和refreshToken都过期了 则跳转到登录页

  // 若isAuthenticated 已经为true 则不用检查  这里可以设置一个检查的时间
  useEffect(() => {
    checkAccessToken();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // 将路径传递给登录页
    return (
      <Navigate
        to={{
          pathname: redirectPath,
          search: `redirect=${encodeURIComponent(
            location.pathname + location.search
          )}`,
        }}
        replace
      />
    );
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;

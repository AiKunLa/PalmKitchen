import { create } from "zustand";
import { login, getAccessToken, refreshAccessToken } from "@/api/login";
import { TokenUtil } from "@/utils/tokenUtils";
import { useAccountStore } from "@/store/useAccountStore";

/**
 * 认证状态管理
 */
export const useAuthoStore = create((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  changeAuth: (auth) => {
    set({ isAuthenticated: auth });
  },

  /**
   * 登录
   * @param {*} data 登录凭证
   */
  doLogin: async (username, password) => {
    if(get().isLoading) return;
    try {
      set({ isLoading: true });
      const res = await login(username, password);
      const { verify_code } = res.data;

      const tokenRes = await getAccessToken(verify_code);

      const { access_token, refresh_token  } = tokenRes.data;
      TokenUtil.setAccessToken(access_token);
      TokenUtil.setRefreshToken(refresh_token);
      // 登录成功后获取用户信息
      await useAccountStore.getState().getAccount();

      set({ isAuthenticated: true, isLoading: false });

    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
      console.log(error);
    }
  },

  /**
   * 检查 accessToekn 是否有效
   */
  checkAccessToken: async () => {
    try {
      const accessToekn = TokenUtil.isAccessTokenExpired();
      // 若accessToken 无效
      if (!accessToekn) {
        // 若accessToken 无效 则尝试刷新accessToken
        const refreshToken = TokenUtil.getRefreshToken();
        // 若refreshToken 无效或者过期 则直接返回
        if (!refreshToken) {
          set({ isAuthenticated: false });
          return;
        }
        const res = await refreshAccessToken(refreshToken);
        const access_token = res.data.access_token;
        TokenUtil.setAccessToken(access_token);
        set({ isAuthenticated: true });
      } else {
        set({ isAuthenticated: true });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 退出登录
   */
  doLogout: () => {
    TokenUtil.clearToken();
    set({ isAuthenticated: false });
  },
}));

export default useAuthoStore;

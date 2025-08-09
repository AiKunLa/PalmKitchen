import { LocalStorageUtil } from "./localStorageUtil";
import { jwtDecode } from "jwt-decode";

export const TokenUtil = {
  ACCESS_TOKEN_KEY: "accessToken",
  REFRESH_TOKEN_KEY: "refreshToken",

  /**
   * 存储accessToken
   * @param {*} accessToken accessToken凭证

   */
  setAccessToken(accessToken) {
    // 存储accessToken时 同时存储过期时间
    const expires = jwtDecode(accessToken).exp * 1000;
    LocalStorageUtil.set(this.ACCESS_TOKEN_KEY, accessToken, expires);
  },
  /**
   * 获取accessToken
   * @returns accessToken
   */
  getAccessToken() {
    return LocalStorageUtil.get(this.ACCESS_TOKEN_KEY);
  },
  /**
   * 存储refreshToken
   * @param {*} refreshToken
   */
  setRefreshToken(refreshToken) {
    LocalStorageUtil.set(this.REFRESH_TOKEN_KEY, refreshToken);
  },
  /**
   * 获取refreshToken
   * @returns refreshToken
   */
  getRefreshToken() {
    return LocalStorageUtil.get(this.REFRESH_TOKEN_KEY);
  },
  /**
   * 清除accessToken与refreshToken
   */
  clearToken() {
    LocalStorageUtil.remove(this.ACCESS_TOKEN_KEY);
    LocalStorageUtil.remove(this.REFRESH_TOKEN_KEY);
  },

  /**
   * 判定access_token是否过期
   * @returns true 过期 false 未过期
   */
  isAccessTokenExpired() {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return null;
    }
    const expires = jwtDecode(accessToken).exp * 1000;
    return Date.now() > expires ? null : accessToken;
  },

  /**
   * 判定refresh_token是否过期
   * @returns true 过期 false 未过期
   */
  isRefreshTokenExpired() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return null;
    }
    const expires = jwtDecode(refreshToken).exp * 1000;
    return Date.now() > expires ? null : expires;
  },
};

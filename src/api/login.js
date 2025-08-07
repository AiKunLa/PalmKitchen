import instance from "@/api/config";

/**
 * 登录接口
 * @param {*} data
 * @returns authCode 登录凭证 用于获取accessToken
 */
export const login = (username, password) => {
  return instance.post("/login", { username, password });
};

/**
 * 获取accessToken 与 refreshToken 接口
 * @param {*} data
 * @returns accessToken凭证 与 refreshToken凭证
 */
export const getAccessToken = (verify_code) => {
  return instance.post("/access_token", { verify_code });
};

/**
 * 刷新accessToken 接口
 * @param {*} refreshToken
 * @returns 刷新后的accessToken凭证
 */
export const refreshAccessToken = (refresh_token) => {
  return instance.post("/refresh_token", { refresh_token });
};

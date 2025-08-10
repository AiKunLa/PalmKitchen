import instance from "@/api/config";
// 替换导入语句
import { SignJWT, jwtVerify } from "jose";
const userTable = [
  {
    userId: 1,
    username: "admin",
    password: "123456",
  },
  {
    userId: 2,
    username: "user",
    password: "123456",
  },
];

const APP_ID = "project_name_id";
const APP_SECRET = "your_app_secret";
const JWT_SECRET = "your_jwt_secret";

// 定义加密的密钥 加盐

// 定义一个对象 用于存储一次性code 相对于redis
const tempCodes = {};

// 生成一次性code 用于后续获取token
export const generateVerifyCode = (username, password) => {
  const user = userTable.find(
    (item) => item.username === username && item.password === password
  );
  // 验证用户名和密码

  if (!user) {
    return {
      code: 1,
      msg: "用户名或密码错误",
    };
  }

  // 生成一次性code 用于后续获取token
  const verify_code = Math.random().toString(36).substring(2, 6);
  // 存储code 用于后续验证
  tempCodes[verify_code] = {
    userId: user.userId,
    expiresAt: Date.now() + 600000,
  };

  return {
    code: 0,
    msg: "success",
    data: {
      verify_code,
    },
  };
};


// 生成accessToken与refreshToken

export const generateAccessTokenAndRefreshToken = async (verify_code) => {
  const codeData = tempCodes[verify_code];
  if (!codeData || Date.now() > codeData.expiresAt) {
    return { code: 1, msg: '无效code', data: null };
  }

  delete tempCodes[verify_code];

  // 使用jose生成accessToken
  const access_token = await new SignJWT({ userId: codeData.userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(new TextEncoder().encode(JWT_SECRET));

  // 生成refreshToken
  const refresh_token = await new SignJWT({ userId: codeData.userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(JWT_SECRET));

  return { code: 0, msg: 'success', data: { access_token, refresh_token } };
};

// 修改验证token的函数
export const generateRefreshAccessToken = async (refresh_token) => {
  try {
    const { payload } = await jwtVerify(
      refresh_token,
      new TextEncoder().encode(JWT_SECRET)
    );
    const newAccessToken = await new SignJWT({ userId: payload.userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(JWT_SECRET));

    return { code: 0, msg: 'success', data: { accessToken: newAccessToken } };
  } catch (error) {
    return { code: 1, msg: '无效refreshToken', data: null };
  }
};

/**
 * 登录接口
 * @param {*} data
 * @returns authCode 登录凭证 用于获取accessToken
 */
export const login = (username, password) => {
  if (import.meta.env.PROD) {
    return generateVerifyCode(username, password);
  }
  return instance.post("/login", { username, password });
};

/**
 * 获取accessToken 与 refreshToken 接口
 * @param {*} data
 * @returns accessToken凭证 与 refreshToken凭证
 */
export const getAccessToken = (verify_code) => {
   if (import.meta.env.PROD) {
    return generateAccessTokenAndRefreshToken(verify_code);
  }
  return instance.post("/access_token", { verify_code });
};

/**
 * 刷新accessToken 接口
 * @param {*} refreshToken
 * @returns 刷新后的accessToken凭证
 */
export const refreshAccessToken = (refresh_token) => {
   if (import.meta.env.PROD) {
    return generateRefreshAccessToken(refresh_token);
  }
  return instance.post("/refresh_token", { refresh_token });
};

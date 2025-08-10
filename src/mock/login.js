import jwt from "jsonwebtoken";

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

// 获取accessToken 与 refreshToken
export const generateAccessTokenAndRefreshToken = (verify_code) => {
  const codeData = tempCodes[verify_code];
  // 验证code是否过期 或 是否不存在
  if (!codeData || Date.now() > codeData.expiresAt) {
    return {
      code: 1,
      msg: "无效code",
      data: null,
    };
  }

  // 删除code
  delete tempCodes[verify_code];

  // 生成accessToken
  const access_token = jwt.sign({ userId: codeData.userId }, JWT_SECRET, {
    expiresIn: "2h",
  });

  // 生成 refreshToken
  const refresh_token = jwt.sign({ userId: codeData.userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    code: 0,
    msg: "success",
    data: {
      access_token,
      refresh_token,
    },
  };
};

export const generateRefreshAccessToken = (refresh_token) => {

  try {
    const decoded = jwt.verify(refresh_token, JWT_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return {
      code: 0,
      msg: "success",
      data: {
        accessToken: newAccessToken,
      },
    };
  } catch (error) {
    return {
      code: 1,
      msg: "无效refreshToken",
      data: null,
    };
  }
};


export const loginPage = [
  {
    url: "/api/login",
    method: "POST",
    timeout: 1000,
    response: (req) => {
      const { username, password } = req.body;
      const data = generateVerifyCode(username, password);
      return data;
    },
  },

  //  用 code 换取 access_token
  {
    url: "/api/access_token",
    method: "POST",
    timeout: 1000,
    response: (req) => {
      const { verify_code } = req.body;
      const data = generateAccessTokenAndRefreshToken(verify_code);
      return data;
    },
  },

  {
    url: "/api/refresh_token",
    method: "POST",
    timeout: 1000,
    response: (req) => {
      const { refresh_token } = req.body;
      const data = generateRefreshAccessToken(refresh_token);
      return data;
    },
  },
];

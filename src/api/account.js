import instance from "./config";
import { TokenUtil } from "@/utils/tokenUtils";
import { jwtVerify } from "jose";
import Mock from "mockjs";
const JWT_SECRET = "your_jwt_secret";


export const getAccountInfoMock = (userId) => {
  return {
    userId: Number(userId),
    username: Mock.Random.cname(), // 随机中文姓名
    gender: Mock.Random.integer(0, 1), // 0: 女, 1: 男
    joinTime: Mock.Random.date("yyyy-MM-dd"), // 随机日期
    homeAddress: `${Mock.Random.province()} ${Mock.Random.city()}`, // 随机地址
    occupation: Mock.Random.cword(2, 4), // 随机职业
    ip: `${Mock.Random.province()}`, // 随机IP属地
    signature: Mock.Random.ctitle(5, 15), // 随机签名(5-15字)
    avatar: Mock.Random.image("120x120", Mock.Random.color(), "#fff", "头像"), // 随机头像
    // 粉丝数
    fansCount: Mock.Random.integer(0, 10000),
    // 关注数
    followCount: Mock.Random.integer(0, 10000),
  };
};
export const generateAccountInfo = async (accessToken) => {
  try {
    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(JWT_SECRET)
    );
    if (!payload) {
      return {
        status: 401,
        code: 1,
        msg: "token无效",
        data: null,
      };
    }

    const { userId } = payload;
    return {
      code: 0,
      msg: "success",
      data: getAccountInfoMock(userId),
    };
  } catch (error) {
    return {
      status: 500,
      code: 1,
      msg: "服务器错误",
      data: null,
    };
  }
};

export const getAccountInfo = async () => {
  if (import.meta.env.PROD) {
    const data = await generateAccountInfo(TokenUtil.getAccessToken());
    return data;
  }
  const res = await instance.get("/account/getInfo");
  return res;
};

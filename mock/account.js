import Mock from "mockjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret";
const getAccountInfo = (userId) => {
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

export const account = [
  {
    url: "/api/account/getInfo",
    method: "get",
    timeout: 1000,
    response: (req) => {
      try {
        // 判定token是否有效
        const token = req.headers.authorization.split(" ")[1];
        console.log(token, "token");

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded, "decoded");
        if (!decoded) {
          return {
            status: 401,
            code: 1,
            msg: "token无效",
            data: null,
          };
        }
        const { userId } = decoded;

        return {
          code: 0,
          msg: "success",
          data: getAccountInfo(userId),
        };
      } catch (error) {
        return {
          status: 500,
          code: 1,
          msg: "服务器错误",
          data: null,
        };
      }
    },
  },
];

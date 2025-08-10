import Mock from "mockjs";

/**
 * 模拟获取菜谱列表数据
 * @param {*} page 
 * @param {*} pageSize 
 * @returns 
 */
export const getRecipes = (page, pageSize = 8) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    id: `${page}-${i}`, // 作为索引的id
    title: Mock.Random.ctitle(4, 8),
    image: Mock.Random.image("300x400", Mock.Random.color(), "#fff", "img"),
    author: Mock.Random.cname(),
  }));
};

export const home = [
  {
    url: "/api/getRecipes",
    method: "GET",
    timeout: 1000,
    response: (req) => {
      const page = Number(req.query.page) || 1;
      return {
        code: 0,
        msg: "success",
        data: getRecipes(page),
      };
    },
  },
];

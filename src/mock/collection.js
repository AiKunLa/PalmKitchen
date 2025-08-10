import Mock from "mockjs";

export const getCollectionRecipes = (page, pageSize = 8) => {

  return Array.from({ length: pageSize }, (_, i) => ({
    id: `${page}-${i}`, // 作为索引的id
    title: Mock.Random.ctitle(4, 8),
    image: Mock.Random.image("300x400", Mock.Random.color(), "#fff", "img"),
    author: Mock.Random.cname(),
    rating: Mock.Random.float(1.0, 10.0, 1, 1),
    cookedCount: Mock.Random.integer(0, 10000),
  }));
};

export const collection = [
  {
    url: "/api/collection",
    method: "get",
    timeout: 1000,
    response: (req) => {
      const page = Number(req.query.page) || 1;
      return {
        code: 0,
        msg: "success",
        data: getCollectionRecipes(page),
      };
    },
  },
];

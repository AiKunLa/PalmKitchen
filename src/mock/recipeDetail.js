import Mock from "mockjs";

export const getRecipeDetail = (recipeId) => ({
  id: recipeId,
  title: Mock.Random.ctitle(4, 8),
  image: Mock.Random.image("400x400", Mock.Random.color(), "#fff", "img"),
  rating: Mock.Random.float(3.0, 5.0, 1, 1),
  // 随机生成三个整数 最后这三个整数和为100
  rates: (() => {
    // 生成第一个随机数 (1-98之间)
    const num1 = Mock.Random.integer(1, 98);
    // 生成第二个随机数 (1到(99-num1)之间)
    const num2 = Mock.Random.integer(1, 99 - num1);
    // 第三个随机数 = 100 - num1 - num2
    const num3 = 100 - num1 - num2;
    return [num1, num2, num3];
  })(),

  reviewCount: Mock.Random.integer(100, 1000),
  author: {
    name: Mock.Random.cname(),
    avatar: Mock.Random.image(),
  },
  description: Mock.Random.cparagraph(),
  ingredients: Array.from(
    { length: Mock.Random.integer(5, 10) },
    (_, index) => ({
      id: index + 1,
      name: Mock.Random.cword(2, 4),
      amount: Mock.Random.pick(["少量", "适量", "多量"]),
    })
  ),
});

export const getComments = (recipeId, page, pageSize = 8) => {
  return Array.from({ length: pageSize }, (_, index) => ({
    id: `${recipeId}-${page}-${index}`,
    user: { name: Mock.Random.cname(), avatar: Mock.Random.image("120x120", Mock.Random.color(), "#fff", "头像") },
    date: Mock.Random.date(),
    content: Mock.Random.cparagraph(),
    likes: Mock.Random.integer(0, 100),
    isAuthor: Mock.Random.boolean(),
  }));
};

export const recipeDetail = [
  {
    url: "/api/recipeDetail",
    method: "get",
    timeout: 1000,
    response: (req) => {
      const recipeId = Number(req.query.recipeId);
      // 查询id
      return {
        code: 0,
        msg: "success",
        data: getRecipeDetail(recipeId),
      };
    },
  },
  {
    url: "/api/recipeComments",
    method: "get",
    timeout: 1000,
    response: (req) => {
      const { recipeId, page } = req.query;
      return {
        code: 0,
        msg: "success",
        data: getComments(recipeId, page),
      };
    },
  },
];

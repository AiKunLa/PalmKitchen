import Mock from "mockjs";

const getNewProduct = (page, pageSize = 6) => {
  return Array.from({ length: pageSize }, (_, index) => ({
    id: `new-${page}-${index}`,
    name: Mock.Random.ctitle(4, 8),
    image: Mock.Random.image("200x200", Mock.Random.color(), "#fff", "img"),
    price: Mock.Random.float(10, 100, 2, 2),
    originalPrice: Mock.Random.float(10, 100, 2, 2),
    status: `${Mock.Random.integer(1, 10)}天后下架`,
    tag: Mock.Random.pick(["新品", "热销", "推荐", "补贴价"]),
  }));
};

const getRankProduct = (page, pageSize = 8) => {
  return Array.from({ length: pageSize }, (_, index) => ({
    id: `rank-${page}-${index}`,
    name: Mock.Random.ctitle(4, 8),
    image: Mock.Random.image("200x200", Mock.Random.color(), "#fff", "img"),
    price: Mock.Random.float(10, 100, 2, 2),
    salesCount: Mock.Random.integer(1, 1000),
  }));
};

export const product = [
  {
    url: "/api/product/getNewProduct",
    method: "get",
    timeout: 1000,
    response: (req) => {
      const page = Number(req.query.page) || 1;
      return {
        code: 0,
        msg: "success",
        data: getNewProduct(page),
      };
    },
  },
  {
    url: "/api/product/getRankProduct",
    method: "get",
    timeout: 1000,
    response: (req) => {
      console.log(req.query.page);
      const page = Number(req.query.page) || 1;
      return {
        code: 0,
        msg: "success",
        data: getRankProduct(page),
      };
    },
  },
];

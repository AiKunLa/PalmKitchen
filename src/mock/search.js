import Mock from "mockjs";

export const getRecentSearches = () => {
  return Array.from({ length: Mock.Random.integer(4, 10) }, () =>
    Mock.Random.ctitle(2, 5)
  );
};

export const getSuggestedSearches = () => {
  return Array.from({ length: Mock.Random.integer(4, 10) }, () =>
    Mock.Random.ctitle(2, 5)
  );
};

export const getSearchResults = (page, pageSize = 8, query) => {
  return Array.from({ length: pageSize }, (_, i) => ({
    id: `${page}-${i}`, // 作为索引的id
    title: query
      ? `${Mock.Random.cword(2)}${query}${Mock.Random.cword(2)}`
      : Mock.Random.ctitle(4, 8),

    image: Mock.Random.image("300x400", Mock.Random.color(), "#fff", "img"),
    author: Mock.Random.cname(),
    rating: Mock.Random.float(1.0, 10.0, 1, 1),
    cookedCount: Mock.Random.integer(0, 10000),
  }));
};
export const search = [
  {
    url: "/api/getRecentSearches",
    method: "get",
    response: () => {
      return {
        code: 0,
        msg: "success",
        data: getRecentSearches(),
      };
    },
  },
  {
    url: "/api/getSuggestedSearches",
    method: "get",
    response: () => {
      return {
        code: 0,
        msg: "success",
        data: getSuggestedSearches(),
      };
    },
  },
  {
    url: "/api/search",
    method: "get",
    response: (req) => {
      const query = req.query.query;
      const page = Number(req.query.page) || 1;
      return {
        code: 0,
        msg: "success",
        data: getSearchResults(page, 8, query),
      };
    },
  },
];

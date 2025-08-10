import instance from "@/api/config";
import {
  getRecentSearches as getRecentSearchesMock,
  getSuggestedSearches as getSuggestedSearchesMock,
  getSearchResults as getSearchResultsMock,
} from "@/mock/search";

const isProd = import.meta.env.PROD;

export const getRecentSearches = () => {
  if (isProd) {
    return {
      code: 0,
      msg: "success",
      data: getRecentSearchesMock(),
    };
  }
  return instance.get("/getRecentSearches");
};

export const getSuggestedSearches = () => {
  if (isProd) {
    return {
      code: 0,
      msg: "success",
      data: getSuggestedSearchesMock(),
    };
  }
  return instance.get("/getSuggestedSearches");
};

export const search = (query, page = 1) => {
  if (isProd) {
    return {
      code: 0,
      msg: "success",
      data: getSearchResultsMock(page, 8, query),
    };
  }
  return instance.get("/search", {
    params: {
      query,
      page,
    },
  });
};

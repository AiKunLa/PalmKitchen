import instance from "@/api/config";

export const getRecentSearches = () => {
  return instance.get("/getRecentSearches");
};

export const getSuggestedSearches = () => {
  return instance.get("/getSuggestedSearches");
};

export const search = (query, page = 1) => {
  return instance.get("/search", {
    params: {
      query,
      page,
    },
  });
};
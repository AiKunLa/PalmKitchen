import instance from "@/api/config";

export const getRecipeDetail = async (recipeId) => {
  const res = await instance.get("/recipeDetail", {
    params: {
      recipeId,
    },
  });
  return res;
};

export const getRecipeComments = async (recipeId, page) => { 
  const res = await instance.get("/recipeComments", {
    params: {
      recipeId,
      page,
    },
  });
  return res;
};

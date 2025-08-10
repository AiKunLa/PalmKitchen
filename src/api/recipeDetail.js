import instance from "@/api/config";
import { getRecipeDetail as getRecipeDetailMock, getComments as getCommentsMock } from "@/mock/recipeDetail";

export const getRecipeDetail = async (recipeId) => {
  if (import.meta.env.PROD) {
    return {
      code: 0,
      msg: "success",
      data: getRecipeDetailMock(recipeId),
    };
  }

  const res = await instance.get("/recipeDetail", {
    params: {
      recipeId,
    },
  });
  return res;
};

export const getRecipeComments = async (recipeId, page) => { 
  if (import.meta.env.PROD) {
    return {
      code: 0,
      msg: "success",
      data: getCommentsMock(recipeId, page),
    };
  }

  const res = await instance.get("/recipeComments", {
    params: {
      recipeId,
      page,
    },
  });
  return res;
};

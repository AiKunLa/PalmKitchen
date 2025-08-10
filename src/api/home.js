import instance from "./config";
import { getRecipes as getRecipesMock } from "@/mock/home";


/**
 * 获取菜谱列表
 * @param {number} page 页码
 * @returns
 */
export const getRecipes = async (page) => {
  if (import.meta.env.PROD) {
    return {
      code: 0,
      msg: "success",
      data: getRecipesMock(page),
    };
  }

  return instance.get("/getRecipes", {
    params: {
      page,
    },
  });
};

import instance from "./config";

/**
 * 获取菜谱列表
 * @param {number} page 页码
 * @returns 
 */
export const getRecipes = async (page) => {
  return instance.get("/getRecipes", {
    params: {
      page,
    },
  });
};
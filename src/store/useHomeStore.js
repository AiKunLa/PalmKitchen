import { create } from "zustand";
import { getRecipes } from "@/api/home";

export const useHomeStore = create((set, get) => ({
  recipes: [],
  page: 1,
  loading: false,

  /**
   * 获取更多菜谱
   * @returns 
   */
  fetchMoreRecipes: async () => {
    // 若正在加载 则不请求
    if (get().loading) return;
    set({ loading: true });
    try {
      const newRecipes = await getRecipes(get().page);
      set((state) => ({
        recipes: [...state.recipes, ...newRecipes.data],
        page: state.page + 1,
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
}));

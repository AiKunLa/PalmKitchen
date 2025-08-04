import { create } from "zustand";
import { getRecipeDetail, getRecipeComments } from "@/api/recipeDetail";

export const useRecipeDetailStore = create((set, get) => ({
  recipeDetail: {
    id: "",
    title: "",
    image: "/loading.gif",
    rating: 0,
    rates: [],
    reviewCount: 0,
    author: {
      name: "",
      avatar: "",
    },
    description: "",
    ingredients: [],
  },
  loading: false,

  comments: [],
  commentLoading: false,
  page: 1,
  fetchRecipeDetail: async (recipeId) => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const res = await getRecipeDetail(recipeId);
      set({ recipeDetail: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchMoreComments: async () => {
    if (get().commentLoading) return;
    set({ commentLoading: true });
    try {
      console.log('//////////////////')
      const res = await getRecipeComments(get().recipeDetail.id, get().page);
      console.log(res.data);
      set({ comments: [...get().comments, ...res.data], page: get().page + 1 });
    } catch (error) {
      console.log(error);
    } finally {
      set({ commentLoading: false });
    }
  },

  clearComments: () => {
    set({ comments: [], page: 1 });
  },

}));

export default useRecipeDetailStore;

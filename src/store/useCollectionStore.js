import { create } from "zustand";
import { getCollectionRecipes } from "@/api/collection";

const useCollectionStore = create((set, get) => ({
  collection: [],
  page: 1,
  loading: false,
  fetchMoreCollection: async () => {
    if (get().loading) return;
    set({ loading: true });
    try {
      const newRecipes = await getCollectionRecipes(get().page);
      set((state) => ({
        collection: [...state.collection, ...newRecipes.data],
        page: state.page + 1,
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useCollectionStore;
export { useCollectionStore };

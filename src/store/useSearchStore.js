import { create } from "zustand";
import { getRecentSearches, getSuggestedSearches, search } from "@/api/search";

export const useSearchStore = create((set, get) => ({
  recentSearches: [],
  suggestedSearches: [],

  searchResults: [],
  searchLoading: false,
  searchQuery: "",
  searchPage: 1,

  // 重置搜索状态
  resetSearch: () => {
    set({
      searchPage: 1,
      searchResults: [],
      searchLoading: false,
    });
  },
  // 获取最近搜索
  fetchRecentSearches: async () => {
    if (get().recentSearches.length > 0) return;

    const { data } = await getRecentSearches();
    set({ recentSearches: data });
  },
  // 获取建议搜索
  fetchSuggestedSearches: async () => {
    if (get().suggestedSearches.length > 0) return;

    const { data } = await getSuggestedSearches();
    set({ suggestedSearches: data });
  },
  // 获取搜索结果
  fetchSearchResults: async () => {
    if (get().searchQuery.trim() === "") return;

    if (get().searchLoading) return;

    set({ searchLoading: true });

    const { data } = await search(get().searchQuery, get().searchPage);

    set({
      searchResults: [...get().searchResults, ...data],
      searchLoading: false,
      searchPage: get().searchPage + 1,
    });
  },

  // 设置搜索查询
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // 清空最近搜索
  clearRecentSearches: () => {
    set({ recentSearches: [] });
  },

  // 更新最近搜索
  updateRecentSearches: (query) => {
    // 若最近搜索中已存在该查询 则将其移动到数组头部
    if (get().recentSearches.includes(query)) {
      const index = get().recentSearches.indexOf(query);
      const newRecentSearches = [...get().recentSearches];
      newRecentSearches.splice(index, 1);
      set({ recentSearches: [query, ...newRecentSearches] });
      return;
    }
    set({ recentSearches: [query, ...get().recentSearches] });
  },
}));

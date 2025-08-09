import { create } from "zustand";
import { getNewProduct, getRankProduct } from "@/api/product";

export const useShopStore = create((set, get) => ({
  newProducts: [],
  rankProducts: [],

  newProductsPage: 1,
  rankProductsPage: 1,

  newProductsLoading: false,
  rankProductsLoading: false,
  fetchNewProducts: async () => {
    if (get().newProductsLoading) return;
    set({ newProductsLoading: true });
    try {
      // 若请求失败则重复请求
      const res = await getNewProduct();
      set((state) => ({
        ...state,
        newProducts: res.data,
        newProductsPage: 1,
        newProductsLoading: false,
      }));
    } catch (error) {
      set({ newProductsLoading: false });
    }
  },
  fetchMoreRanKProducts: async () => {
    if (get().rankProductsLoading) return;
    set({ rankProductsLoading: true });
    try {
      // 若newProducts 为空 则先获取newProducts
      // if (get().newProducts.length === 0) {
      //   await get().fetchNewProducts();
      // }
      
      const res = await getRankProduct(get().rankProductsPage);
      set((state) => ({
        ...state,
        rankProducts: [...state.rankProducts, ...res.data],
        rankProductsPage: state.rankProductsPage + 1,
        rankProductsLoading: false,
      }));
    } catch (error) {
      set({ rankProductsLoading: false });
    }
  },
}));

export default useShopStore;

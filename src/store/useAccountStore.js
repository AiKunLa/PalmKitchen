import { create } from "zustand";
import { getAccountInfo } from "@/api/account";

export const useAccountStore = create((set, get) => ({
  account: {
    userId: 1,
    username: "哇咔咔86",
    gender: 1,
    joinTime: "2025-01-01",
    homeAddress: "北京,东城",
    occupation: "教师",
    ip: "江西",
    signature: "全都是土豆",
    avatar: "/avatar.png",
    fansCount: 1,
    followCount: 10,
  },

  getAccount: async () => {
    const res = await getAccountInfo();
    console.log(res);
    set({ account: res.data });
  },
}));

export default useAccountStore;

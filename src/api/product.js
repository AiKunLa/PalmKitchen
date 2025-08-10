import instance from "@/api/config";
import { getNewProduct as getNewProductMock, getRankProduct as getRankProductMock } from "@/mock/product";

export const getNewProduct = async () => {
  if (import.meta.env.PROD) {
    return {
      code: 0,
      msg: "success",
      data: getNewProductMock(),
    };
  }
  const res = await instance.get("/product/getNewProduct");
  return res;
};

export const getRankProduct = async (page) => {
  if (import.meta.env.PROD) {
    return {
      code: 0,
      msg: "success",
      data: getRankProductMock(page),
    };
  }
  const res = await instance.get("/product/getRankProduct", {
    params: {
      page,
    }
  });
  return res;
};

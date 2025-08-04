import instance from "@/api/config";

export const getNewProduct = async () => {
  const res = await instance.get("/product/getNewProduct");
  return res;
};

export const getRankProduct = async (page) => {
  const res = await instance.get("/product/getRankProduct", {
    params: {
      page,
    }
  });
  return res;
};

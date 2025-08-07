import instance from "./config";

export const getAccountInfo = async () => {
  const res = await instance.get("/account/getInfo");
  return res;
};

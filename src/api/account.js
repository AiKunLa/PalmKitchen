import instance from "./config";


export const getAccountInfo = async (userId) => {
    const res = await instance.get("/account/getInfo", {
        params: {
            userId,
        }
    })
    return res;
}
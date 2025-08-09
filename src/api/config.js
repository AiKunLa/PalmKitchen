import axios from "axios";
import { TokenUtil } from "@/utils/tokenUtils";

const instance = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5173/api',
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  // 请求拦截器中获取token
  const token = TokenUtil.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 响应拦截
instance.interceptors.response.use((response) => {
  const data = response.data;
  if (data.status === 401) {
    // 处理401错误，例如重新登录
    TokenUtil.removeToken();
    // 可以跳转到登录页面或显示登录提示
    window.location.href = "/login";
    
  }
  return data;
});

export default instance;

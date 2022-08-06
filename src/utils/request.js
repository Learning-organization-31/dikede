import axios from "axios";
import store from "@/store";
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});
//请求拦截器
request.interceptors.request.use((config) => {
  //添加token
  const token = store.state.user.userInfo.token;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;

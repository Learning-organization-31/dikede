import { getUserInfo, userLogin } from "@/api/user";
import { Message } from "element-ui";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    userInfo: {},
    //控制登录按钮
    isLoading: false,
    //用户详细信息
    userInfoDetailed: {},
  },
  mutations: {
    //登陆成功,添加登陆成功数据
    LOGIN(state, payload) {
      state.userInfo = payload;
      state.userInfoDetailed = {};
    },
    //控制登录按钮状态
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload;
    },
    //setUserInfo
    SET_USER_INFO(state, payload) {
      state.userInfoDetailed = payload;
    },
  },
  actions: {
    //登录发请求
    async login(context, payload) {
      try {
        const res = await userLogin(payload);
        if (res.success === false) {
          Message.error(res.msg);
        } else {
          context.commit("LOGIN", res);
          router.push("/");
          Message.success("登陆成功");
        }
      } catch (error) {
        Message.error("系统繁忙,请稍后重试");
      } finally {
        //登录按钮结束状态
        context.commit("SET_IS_LOADING", false);
      }
    },
    //获取用户详细信息
    async setUserInfo(context) {
      const res = await getUserInfo(context.state.userInfo.userId);
      context.commit("SET_USER_INFO", res);
    },
  },
  getters: {},
};

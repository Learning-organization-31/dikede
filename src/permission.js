import router from "@/router/index";
import store from "@/store";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const whiteList = ["/404", "/login"];

router.beforeEach((to, from, next) => {
  //加载进度条
  nprogress.start();
  //获取token
  const token = store.state.user.userInfo.token;

  if (token) {
    //如果没有用户详细信息就发起请求获取用户详细信息
    if (!store.state.user.userInfoDetailed.userId) {
      store.dispatch("user/setUserInfo");
    }
    //如果是登陆状态,并且跳转的是登录页,跳转至首页
    if (to.path === "/login") {
      next("/");
    } else {
      //登陆状态,放行
      next();
    }
  } else {
    //如果是未登陆状态,并且跳转的是白名单,跳转至白名单
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      //如果是未登陆状态,并且跳转的不是白名单,放行
      next("/login");
    }
  }
  //结束加载进度条
  nprogress.done();
});

//后置首位
router.afterEach(() => {
  //结束加载进度条
  nprogress.done();
});

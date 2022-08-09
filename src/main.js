import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import * as echarts from "echarts";



import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";


import * as directives from "@/directives";

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// 如果想要中文版 element-ui，按如下方式声明


Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;





// 注册全局自定义事件
for (let k in directives) {
  Vue.directive(k, directives[k]);
}


new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

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

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;



new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

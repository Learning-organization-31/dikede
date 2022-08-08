import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import task from "./modules/task";

import vm from "./modules/vm";

import region from "./modules/region";
import node from "./modules/node";

import createVuexPersisted from "vuex-persistedstate";
import partner from "./modules/partner";
import operation from "./modules/operation";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    task,
    vm,
    operation,
    region,
    node,
    partner,
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer(state) {
        return {
          user: {
            userInfo: state.user.userInfo,
          },
        };
      },
    }),
  ],
});

export default store;

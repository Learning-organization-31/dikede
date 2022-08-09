import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import task from './modules/task'
import policy from './modules/policy'
import createVuexPersisted from 'vuex-persistedstate'
import vm from './modules/vm'
import people from './modules/people'
import region from './modules/region'
import node from './modules/node'
import partner from './modules/partner'
import operation from './modules/operation'
import report from './modules/report'
import sku from './modules/sku'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    task,
    partner,
    policy,
    people,
    vm,
    operation,
    region,
    node,
    sku,
    order,
    report,
  },
  getters,
  plugins: [
    createVuexPersisted({
      reducer(state) {
        return {
          user: {
            userInfo: state.user.userInfo,
          },
        }
      },
    }),
  ],
})

export default store

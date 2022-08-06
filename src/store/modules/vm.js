import { getVmListApi } from "@/api/vm/index";

export default {
  namespaced: true,
  state: {
    vmList: {}, // 售货机列表
  },
  mutations: {
    // 更新售货机列表
    updateVmList(state, payload) {
      state.vmList = payload;
    },
  },
  actions: {
    // 获取售货机列表
    async getVmList(context, payload) {
      const data = await getVmListApi(payload);
      context.commit("updateVmList", data);
    },
  },
};

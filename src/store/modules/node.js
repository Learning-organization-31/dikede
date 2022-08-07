import { nodeSearch } from "@/api/node";

export default {
  namespaced: true,
  state: {
    //搜索点位条件
    nodeSearchCondition: {
      pageIndex: 1,
      pageSize: 10,
      name: "",
      regionId: "",
    },
    //点位列表
    nodeAllList: {},
  },

  mutations: {
    //修改点位列表
    SET_NODE_LIST(state, payload) {
      state.nodeAllList = payload;
      console.log(state.nodeAllList);
    },
  },

  actions: {
    //获取点位列表
    async getNodeList(context, payload) {
      const res = await nodeSearch(payload);
      context.commit("SET_NODE_LIST", res);
    },
  },

  getters: {},
};

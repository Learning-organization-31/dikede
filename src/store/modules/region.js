import { getRegionList } from "@/api/region";

export default {
  namespaced: true,
  state: {
    //区域搜搜条件
    regionSearch: {
      pageIndex: 1,
      pageSize: 10,
      name: "",
    },
    //区域列表
    regionList: {},
  },

  mutations: {
    //修改区域列表
    SET_REGION_LIST(state, payload) {
      state.regionList = payload;
      console.log(state.regionList);
    },
  },

  actions: {
    //获取区域列表
    async getRegionList(context, payload) {
      const res = await getRegionList(payload);
      context.commit("SET_REGION_LIST", res);
    },
  },

  getters: {},
};

import { partnerSearch } from "@/api/partner";
export default {
  namespaced: true,
  state: {
    //搜索合作商所需条件
    partnerSearchCondition: {
      pageIndex: 1,
      pageSize: 10,
      name: "",
    },
    //合作商列表
    partnerList: {},
  },

  mutations: {
    // 修改合作商列表
    SET_PARTNER_LIST(state, payload) {
      state.partnerList = payload;
      console.log(state.partnerList);
    },
  },

  actions: {
    //获取合作商列表
    async partnerSearch(context, payload) {
      const res = await partnerSearch(payload);
      context.commit("SET_PARTNER_LIST", res);
    },
  },

  getters: {},
};

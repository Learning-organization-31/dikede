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
    loading: false,
  },

  mutations: {
    // 修改合作商列表
    SET_PARTNER_LIST(state, payload) {
      state.partnerList = payload;
    },
    //修改合作商所需条件的名字
    SET_NAME(state, payload) {
      state.partnerSearchCondition.name = payload;
    },
    //修改页码
    SET_PAGE_INDEX(state, payload) {
      if (payload === 1) {
        state.partnerSearchCondition.pageIndex =
          state.partnerSearchCondition.pageIndex + 1;
      } else if (payload === -1) {
        state.partnerSearchCondition.pageIndex =
          state.partnerSearchCondition.pageIndex - 1;
      } else {
        state.partnerSearchCondition.pageIndex = 1;
      }
    },
  },

  actions: {
    //获取合作商列表
    async partnerSearch(context, payload) {
      context.state.loading = true;
      const res = await partnerSearch(payload);
      context.commit("SET_PARTNER_LIST", res);
      context.state.loading = false;
    },
  },

  getters: {
    //计算出上一页按钮是否禁用
    lastDisabled(state) {
      return state.partnerList.pageIndex <= 1;
    },
    //计算出下一页按钮是否禁用
    rightDisabled(state) {
      return (
        state.partnerList.pageIndex ==
        Math.ceil((state.partnerList.totalCount - 0) / 10)
      );
    },
  },
};

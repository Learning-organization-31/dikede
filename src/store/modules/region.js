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
    loading: false,
  },

  mutations: {
    //修改整个区域列表
    SET_REGION_LIST(state, payload) {
      state.regionList = payload;
    },
    //修改区域列表中的name
    SET_REGION_LIST_NAME(state, payload) {
      state.regionSearch.name = payload;
    },
    //修改区域搜索中的页数
    SET_PAGE_INDEX(state, payload) {
      if (payload === 1) {
        state.regionSearch.pageIndex = state.regionSearch.pageIndex + 1;
      } else if (payload === -1) {
        state.regionSearch.pageIndex = state.regionSearch.pageIndex - 1;
      } else state.regionSearch.pageIndex = 1;
    },
  },

  actions: {
    //获取区域列表
    async getRegionList(context, payload) {
      context.state.loading = true;
      const res = await getRegionList(payload);
      context.commit("SET_REGION_LIST", res);
      context.state.loading = false;
    },
  },

  getters: {
    //计算出来上一页是否禁用
    lastDisabled(state) {
      return state.regionList.pageIndex <= 1;
    },
    //计算出来下一页是否禁用
    rightDisabled(state) {
      return (
        state.regionList.pageIndex ==
        Math.ceil((state.regionList.totalCount - 0) / 10)
      );
    },
  },
};

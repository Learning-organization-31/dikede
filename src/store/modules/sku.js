import { getSkuList } from "@/api/sku";

export default {
  namespaced: true,
  state: {
    //搜索所需数据
    params: {
      pageIndex: 1,
      pageSize: 10,
      skuName: "",
    },
    loading: false,
    //存储商品数据列表
    skuList: {},
  },

  mutations: {
    //修改商品列表数据
    SET_SKU_LIST(state, payload) {
      state.skuList = payload;
    },
    //点击搜索修改名
    SET_PARAMS_SKU_NAME(state, payload) {
      state.params.skuName = payload;
    },
    //修改params里面的pageIndex
    SET_PAGE_INDEX(state, payload) {
      if (payload === 1) {
        state.params.pageIndex = state.params.pageIndex + 1;
      } else if (payload === -1) {
        state.params.pageIndex = state.params.pageIndex - 1;
      } else {
        state.params.pageIndex = 1;
      }
    },
  },

  actions: {
    //获取商品数据
    async getSkuListFn(context, payload) {
      context.state.loading = true;
      try {
        const res = await getSkuList(payload);
        context.commit("SET_SKU_LIST", res);
      } catch (error) {
        console.log(error);
      } finally {
        context.state.loading = false;
      }
    },
  },

  getters: {
    //计算上一页是否禁用
    lastDisabled(state) {
      return state.skuList.pageIndex <= 1;
    },
    //计算下一页是否禁用
    rightDisabled(state) {
      return (
        state.skuList.pageIndex ==
        Math.ceil((state.skuList.totalCount - 0) / 10)
      );
    },
  },
};

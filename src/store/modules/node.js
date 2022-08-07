import { nodeSearch } from "@/api/node";

export default {
  namespaced: true,
  state: {
    loading: false,
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
    },
    //点击查询修改name的值和regionId的值
    SET_NAME_AND_REGIONID(state, payload) {
      state.nodeSearchCondition.name = payload[0];
      state.nodeSearchCondition.regionId = payload[1];
    },
    //修改pageIndex页数
    SET_PAGE_INDEX(state, payload) {
      if (payload === 1) {
        state.nodeSearchCondition.pageIndex =
          state.nodeSearchCondition.pageIndex + 1;
      } else if (payload === -1) {
        state.nodeSearchCondition.pageIndex =
          state.nodeSearchCondition.pageIndex - 1;
      } else {
        state.nodeSearchCondition.pageIndex = 1;
      }
    },
  },

  actions: {
    //获取点位列表
    async getNodeList(context, payload) {
      context.state.loading = true;
      const res = await nodeSearch(payload);
      context.commit("SET_NODE_LIST", res);
      context.state.loading = false;
    },
  },

  getters: {
    //控制上一页是否显示
    lastDisabled(state) {
      return state.nodeAllList.pageIndex <= 1;
    },
    //控制下一页是否显示
    rightDisabled(state) {
      return (
        state.nodeAllList.pageIndex ==
        Math.ceil((state.nodeAllList.totalCount - 0) / 10)
      );
    },
  },
};

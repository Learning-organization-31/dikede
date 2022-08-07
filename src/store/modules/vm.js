import {
  getNodeListApi,
  getorderAmountApi,
  getorderCountApi,
  getrepairCountApi,
  getskuCollectApi,
  getsupplyCountApi,
  getVmListApi,
  getVmTypeListApi,
} from "@/api/vm/index";

export default {
  namespaced: true,
  state: {
    vmList: {}, // 售货机列表
    VmTypeList: {}, // 售货机类型列表
    orderCount: "", // 售货机商品订单总数
    orderAmount: "", // 售货机商品收入
    supplyCount: "", // 售货机补货次数
    repairCount: "", // 售货机维修次数
    skuCollect: [], // 售货机商品销量
    NodeList: {}, // 点位列表
  },
  mutations: {
    // 更新售货机列表
    updateVmList(state, payload) {
      state.vmList = payload;
    },
    // 更新售货机类型列表
    updateVmTypeList(state, payload) {
      state.VmTypeList = payload;
    },
    // 更新售货机商品订单总数
    updateorderCount(state, payload) {
      state.orderCount = payload;
    },
    // 更新售货机商品收入
    updateorderAmount(state, payload) {
      state.orderAmount = payload;
    },
    // 更新售货机补货次数
    updatesupplyCount(state, payload) {
      state.supplyCount = payload;
    },
    // 更新售货机维修次数
    updaterepairCount(state, payload) {
      state.repairCount = payload;
    },
    // 更新售货机商品销量
    updateskuCollect(state, payload) {
      state.skuCollect = payload;
    },
    updateNodeList(state, payload) {
      state.NodeList = payload;
    },
  },
  actions: {
    // 获取售货机列表
    async getVmList(context, payload) {
      const data = await getVmListApi(payload);
      context.commit("updateVmList", data);
    },

    // 获取售货机类型列表
    async getVmTypeList(context, payload) {
      const data = await getVmTypeListApi(payload);
      context.commit("updateVmTypeList", data);
    },

    // 获取售货机商品订单总数
    async getorderCount(context, innerCode) {
      const data = await getorderCountApi(innerCode);
      context.commit("updateorderCount", data);
    },

    // 获取售货机商品收入
    async getorderAmount(context, innerCode) {
      const data = await getorderAmountApi(innerCode);
      context.commit("updateorderAmount", data);
    },

    // 获取售货机补货次数
    async getsupplyCount(context, innerCode) {
      const data = await getsupplyCountApi(innerCode);
      context.commit("updatesupplyCount", data);
    },

    // 获取售货机维修次数
    async getrepairCount(context, innerCode) {
      const data = await getrepairCountApi(innerCode);
      context.commit("updaterepairCount", data);
    },

    // 获取售货机商品销量
    async getskuCollect(context, innerCode) {
      const data = await getskuCollectApi(innerCode);
      context.commit("updateskuCollect", data);
    },

    // 获取点位
    async getNodeList(context) {
      const data = await getNodeListApi();
      context.commit("updateNodeList", data);
    },
  },
};

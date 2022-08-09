import {
  getbusinessTopListApi,
  getNodeListApi,
  getorderAmountApi,
  getorderCountApi,
  getPolicyListApi,
  getrepairCountApi,
  getskuCollectApi,
  getskuSearchApi,
  getsupplyCountApi,
  getVmchannelListApi,
  getVmListApi,
  getVmPolicyApi,
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
    PolicyList: [], // 策略列表
    VmPolicy: {}, // 售货机策略
    VmchannelList: [], // 售货机货道详情
    businessTopList: [], // 圈下销量前10的商品(补货推荐)
    skuSearchList: {}, // 商品搜索列表
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
    // 更新点位列表
    updateNodeList(state, payload) {
      state.NodeList = payload;
    },
    // 更新策略列表
    updatePolicyList(state, payload) {
      state.PolicyList = payload;
    },
    // 更新售货机策略
    updateVmPolicy(state, payload) {
      state.VmPolicy = payload;
    },
    // 更新售货机货道详情
    updateVmchannelList(state, payload) {
      state.VmchannelList = payload;
    },
    // 更新商圈下销量前10的商品(补货推荐)
    updatebusinessTopList(state, payload) {
      state.businessTopList = payload;
    },
    // 更新商品搜索
    updateskuSearchList(state, payload) {
      state.skuSearchList = payload;
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

    // 获取策略管理列表
    async getPolicyList(context, params) {
      const data = await getPolicyListApi(params);
      context.commit("updatePolicyList", data);
    },

    // 查询售货机策略
    async getVmPolicy(context, innerCode) {
      const data = await getVmPolicyApi(innerCode);
      context.commit("updateVmPolicy", data);
    },

    // 获取售货机货道详情
    async getVmchannelList(context, innerCode) {
      const data = await getVmchannelListApi(innerCode);
      context.commit("updateVmchannelList", data);
    },

    // 获取商圈下销量前10的商品(补货推荐)
    async getbusinessTopList(context, businessId) {
      const data = await getbusinessTopListApi(businessId);
      context.commit("updatebusinessTopList", data);
    },

    // 商品搜索
    async getskuSearchList(context, payload) {
      const data = await getskuSearchApi(payload);
      context.commit("updateskuSearchList", data);
    },
  },
};

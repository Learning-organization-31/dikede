export default {
  namespaced: true,
  state: {
    //控制工单配置弹窗显示隐藏
    businessIsShow: false,
    //控制运营工单新增按钮弹窗的显示隐藏
    addDialogIsShow: false,
    //控制详情弹窗的显示隐藏
    infoDialogIsShow: false,
    //控制查看详情补货详情弹窗显示隐藏
    detailInfoIsShow: false,
    //控制新增补货详情弹窗的显示隐藏
    channelDialogIsShow: false,
    //补货详情,点击重新创建时跳转至新增的补货清单数据
    detailInfoList: [],
  },
  mutations: {
    //修改状态
    SET_BUSINESS_IS_SHOW(state, payload) {
      state.businessIsShow = payload;
    },
    //修改运营工单新增按钮
    SET_ADD_DIALOG_IS_SHOW(state, payload) {
      state.addDialogIsShow = payload;
    },
    //修改详情弹窗的显示隐藏
    SET_INFO_DIALOG_IS_SHOW(state, payload) {
      state.infoDialogIsShow = payload;
    },
    //修改补货详情弹窗的显示隐藏
    SET_DETAIL_INFO_IS_SHOW(state, payload) {
      state.detailInfoIsShow = payload;
    },
    //修改新增补货详情弹弹窗的显示隐藏
    SET_CHANNEL_DIALOG_IS_SHOW(state, payload) {
      state.channelDialogIsShow = payload;
    },
    //修改补货清单数据
    SET_DETAIL_INFO_LIST(state, payload) {
      state.detailInfoList = payload;
    },
  },
  actions: {
    //修改状态
    setBusinessIsShow(context, payload) {
      context.commit("SET_BUSINESS_IS_SHOW", payload);
    },
    //修改运营工单新增按钮
    setAddDialogIsShow(context, payload) {
      context.commit("SET_ADD_DIALOG_IS_SHOW", payload);
    },
    //修改详情弹窗的显示隐藏
    setInfoDialogIsShow(context, payload) {
      context.commit("SET_INFO_DIALOG_IS_SHOW", payload);
    },
    //修改补货详情弹窗的显示隐藏
    setDetailInfoIsShow(context, payload) {
      context.commit("SET_DETAIL_INFO_IS_SHOW", payload);
    },
    //修改新增补货详情弹窗的显示隐藏
    setChannelDialogIsShow(context, payload) {
      context.commit("SET_CHANNEL_DIALOG_IS_SHOW", payload);
    },
    //修改补货清单数据
    setDetailInfoList(context, payload) {
      context.commit("SET_DETAIL_INFO_LIST", payload);
    },
  },
};

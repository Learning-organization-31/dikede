const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  policyList: (state) => state.policy.policyList,
  policyItemList: (state) => state.policy.policyItemList,
  orderList: (state) => state.order.orderList,
  partnersList: (state) => state.report.partnersList,
  partnerNameList: (state) => state.report.partnerNameList,
}
export default getters

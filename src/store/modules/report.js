import { getPartnersList, getPartnerNameList } from '@/api/report'

export default {
  namespaced: true,
  state: {
    partnersList: {},
    partnerNameList: {},
  },
  mutations: {
    setPartnersList(state, payload) {
      state.partnersList = payload
    },
    setPartnerNameList(state, payload) {
      state.partnerNameList = payload
    },
  },
  actions: {
    async setPartnersList(context, payload) {
      const res = await getPartnersList(payload[0], payload[1])
      context.commit('setPartnersList', res)
    },
    async setPartnerNameList(context, payload) {
      if (payload[4]) {
        const val = context.state.partnersList.currentPageRecords
        const num = val.findIndex((ele) => {
          return ele.id === payload[4]
        })
        payload[4] = val[num].name
      }

      const res = await getPartnerNameList(
        payload[0],
        payload[1],
        payload[2],
        payload[3],
        payload[4]
      )
      res.currentPageRecords.forEach((ele) => {
        ele.ratio = ele.ratio + '%'
        ele.orderTotalMoney = '+' + ele.orderTotalMoney / 100
        ele.totalBill = '+' + ele.totalBill / 100
      })
      context.commit('setPartnerNameList', res)
    },
  },
}

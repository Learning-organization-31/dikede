import {
  getPolicyList,
  getPolicyItemList,
  deletePolicyItem,
  addPolicyItem,
} from '@/api/policy'
import dayjs from 'dayjs'
export default {
  namespaced: true,
  state: {
    policyList: {},
    policyItemList: {},
  },
  mutations: {
    setPolicyList(state, payload) {
      state.policyList = payload
    },
    setPolicyItemList(state, payload) {
      state.policyItemList = payload
    },
  },
  actions: {
    async setPolicyList(context, payload) {
      const res = await getPolicyList(
        payload[0],
        payload[1],
        payload[2] ? payload[2] : ''
      )
      console.log(res)
      res.currentPageRecords.forEach((ele) => {
        //     ele.createTime = ele.createTime.replace(/T/gi, ' ')
        //     ele.createTime = ele.createTime.replace(/-/gi, '.')
        ele.createTime = dayjs(ele.createTime).format('YYYY.MM.DD HH:mm:ss')
      })
      context.commit('setPolicyList', res)
    },
    async setPolicyItemList(context, payload) {
      const res = await getPolicyItemList(
        payload?.[0],
        payload?.[1],
        payload?.[2]
      )
      console.log(res)
      context.commit('setPolicyItemList', res)
    },
    async delPolicyItem(context, payload) {
      console.log(payload)
      const res = await deletePolicyItem(payload)
      console.log(res)
    },
    async addPolicyItemFn(context, payload) {
      const res = await addPolicyItem(payload)
      console.log(res)
    },
  },
}

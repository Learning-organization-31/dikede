import {
  getPolicyList,
  getPolicyItemList,
  deletePolicyItem,
  addPolicyItem,
  editPolicyItem,
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

      context.commit('setPolicyItemList', res)
    },
    async delPolicyItem(context, payload) {
      await deletePolicyItem(payload)
    },
    async addPolicyItemFn(context, payload) {
      await addPolicyItem(payload)
    },
    async editPolicyItemFn(context, payload) {
      await editPolicyItem(payload[0], payload[1])
    },
  },
}

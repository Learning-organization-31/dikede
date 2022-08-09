import { getOrderList } from '@/api/order'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    orderList: {},
  },
  mutations: {
    setGetOrderList(state, payload) {
      state.orderList = payload
    },
  },
  actions: {
    async setGetOrderList(context, payload) {
      const res = await getOrderList(
        payload?.[0],
        payload?.[1],
        payload?.[2],
        payload?.[3],
        payload?.[4]
      )
      res.currentPageRecords.forEach((ele) => {
        ele.amount = (ele.amount / 100).toFixed(2)

        if (ele.status === 0) ele.status = '未支付'
        else if (ele.status === 1) ele.status = '支付完成'
        else if (ele.status === 2) ele.status = '出货成功'
        else if (ele.status === 3) ele.status = '出货失败'

        if (ele.payType == 1) ele.payType = '支付宝支付'
        if (ele.payType == 2) ele.payType = '微信支付'

        ele.createTime = dayjs(ele.createTime).format('YYYY.MM.DD HH:mm:ss')
        ele.updateTime = dayjs(ele.updateTime).format('YYYY.MM.DD HH:mm:ss')

        ele.addr = ele.addr.split('-')[3]
          ? ele.addr.split('-')[3]
          : ele.addr.split('-')[1]
      })
      context.commit('setGetOrderList', res)
    },
  },
}

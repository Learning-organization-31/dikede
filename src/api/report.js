import request from '@/utils/request'

export const getPartnersList = (pageIndex, pageSize) => {
  return request({
    url: 'api/user-service/partner/search',
    method: 'GET',
    params: {
      pageIndex,
      pageSize,
    },
  })
}

export const getPartnerNameList = (
  start,
  end,
  pageIndex,
  pageSize,
  partnerName
) => {
  return request({
    url: '/api/order-service/report/partnerCollect',
    method: 'GET',
    params: {
      start,
      end,
      pageIndex,
      pageSize,
      partnerName,
    },
  })
}
//销售量总数
export const getOrdersTotal = (start, end, partnerId) => {
  return request({
    url: '/api/order-service/report/orderCount',
    method: 'GET',
    params: {
      start,
      end,
      partnerId,
    },
  })
}

//分成总数
export const getOrdersTotalBill = (start, end, partnerId) => {
  return request({
    url: '/api/order-service/report/totalBill',
    method: 'GET',
    params: {
      start,
      end,
      partnerId,
    },
  })
}

//销售额总数
export const getOrdersTotalMoney = (start, end, partnerId) => {
  return request({
    url: '/api/order-service/report/orderAmount',
    method: 'GET',
    params: {
      start,
      end,
      partnerId,
    },
  })
}

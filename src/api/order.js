import request from '@/utils/request'

export const getOrderList = (
  pageIndex,
  pageSize,
  orderNo,
  startDate,
  endDate
) => {
  return request({
    url: '/api/order-service/order/search',
    method: 'GET',
    params: {
      pageIndex,
      pageSize,
      orderNo,
      startDate,
      endDate,
    },
  })
}

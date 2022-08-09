import request from "@/utils/request";

/**
 * 获取一定时间范围内的订单总数
 * @param {Object} params
 * @returns
 */
export const getOrderCount = (params) => {
  return request({
    url: "/api/order-service/report/orderCount",
    method: "GET",
    params,
  });
};

/**
 * 获取一定时间范围之内的收入
 * @param {Object} params
 * @returns
 */
export const getAmount = (params) => {
  return request({
    url: "/api/order-service/report/orderAmount",
    method: "GET",
    params,
  });
};

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param {Object} params
 * @returns
 */
export const getTaskReportInfo = (params) => {
  return request({
    url:
      "/api/task-service/task/taskReportInfo/" +
      params.start +
      "/" +
      params.end,
    method: "GET",
  });
};

/**
 * 获取当时工单汇总信息(人员统计头部信息)
 * @param {Object} params
 * @returns
 */
export const getSkuTop = (params) => {
  return request({
    url:
      "/api/order-service/report/skuTop/" +
      params.topValue +
      "/" +
      params.start +
      "/" +
      params.end,
    method: "GET",
  });
};

/**
 * 获取销售额统计
 * @param {Object} params
 * collectType:1为俺日统计2为月
 * @returns
 */
export const getAmountCollect = (params) => {
  let str = "";
  if (params.collectType) {
    str =
      "/api/order-service/report/amountCollect/" +
      params.collectType +
      "/" +
      params.start +
      "/" +
      params.end;
  } else {
    str =
      "/api/order-service/report/amountCollect/" +
      params.start +
      "/" +
      params.end;
  }
  return request({
    url: str,
    method: "GET",
  });
};

/**
 * 根据地区汇总销售额数据(销售量分布)
 * @param {Object} params
 * collectType:1为俺日统计2为月
 * @returns
 */
export const getRegionCollect = (params) => {
  return request({
    url:
      "/api/order-service/report/regionCollect/" +
      params.start +
      "/" +
      params.end,
    method: "GET",
  });
};

// 合作商点位汇总统计
export const getNodeCollectApi = () => {
  return request({
    url: "/api/vm-service/node/nodeCollect",
  });
};

// 获取点位总数
export const getNodeCountApi = () => {
  return request({
    url: "/api/vm-service/node/count",
  });
};

// 获取合作商总数
export const getPartnerCountApi = () => {
  return request({
    url: "/api/user-service/partner/count",
  });
};

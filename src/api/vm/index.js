import request from "@/utils/request";

import {
  getCurrentMonthFirst,
  getCurrentNow,
  getCurrentNowNoTitle,
  getCurrentMonthOne,
} from "@/utils/home";

// 搜索售货机(售货机列表)
export const getVmListApi = (params) => {
  return request({
    url: "/api/vm-service/vm/search",
    params,
  });
};

// 售货机类型列表(搜索)
export const getVmTypeListApi = (params) => {
  return request({
    url: "/api/vm-service/vmType/search",
    params: { pageSize: 10000, ...params },
  });
};

// 获取一定时间范围之内的订单总数
export const getorderCountApi = (innerCode) => {
  return request({
    url: "/api/order-service/report/orderCount",
    params: {
      start: getCurrentMonthFirst(),
      end: getCurrentNow(),
      innerCode,
    },
  });
};

// 获取一定时间范围之内的收入
export const getorderAmountApi = (innerCode) => {
  return request({
    url: "/api/order-service/report/orderAmount",
    params: {
      start: getCurrentMonthFirst(),
      end: getCurrentNow(),
      innerCode,
    },
  });
};

// 获取售货机补货次数
export const getsupplyCountApi = (innerCode) => {
  const start = getCurrentMonthOne();
  const end = getCurrentNowNoTitle();
  return request({
    url: `/api/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
  });
};

// 获取售货机维修次数
export const getrepairCountApi = (innerCode) => {
  const start = getCurrentMonthOne();
  const end = getCurrentNowNoTitle();
  return request({
    url: `/api/task-service/task/repairCount/${innerCode}/${start}/${end}`,
  });
};

// 获取售货机商品销量
export const getskuCollectApi = (innerCode) => {
  const start = getCurrentMonthOne();
  const end = getCurrentNowNoTitle();
  return request({
    url: `/api/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
  });
};

// 获取点位
export const getNodeListApi = () => {
  return request({
    url: "/api/vm-service/node/search",
    params: { pageSize: 10000 },
  });
};

// 新增售货机
export const addvmServeApi = (data) => {
  return request({
    url: "/api/vm-service/vm",
    method: "POST",
    data,
  });
};

// 获取策略管理列表
export const getPolicyListApi = (params) => {
  return request({
    url: "/api/vm-service/policy",
    params,
  });
};

// 应用策略
export const updatePolicyApi = (data) => {
  return request({
    url: "/api/vm-service/vm/applyPolicy",
    method: "PUT",
    data,
  });
};

// 查询售货机策略
export const getVmPolicyApi = (innerCode) => {
  return request({
    url: "/api/vm-service/policy/vmPolicy/" + innerCode,
  });
};

// 取消售货机策略
export const cancelVmPolicyApi = (innerCode, policyId) => {
  return request({
    url: `/api/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: "PUT",
  });
};

// 修改售货机点位
export const exitVmNodeApi = (id, nodeId) => {
  return request({
    url: `/api/vm-service/vm/${id}/${nodeId}`,
    method: "PUT",
  });
};

// 售货机类型详情
export const getVmServeDeilApi = (typeId) => {
  return request({
    url: "/api/vm-service/vmType/" + typeId,
  });
};

// 获取售货机货道详情
export const getVmchannelListApi = (innerCode) => {
  return request({
    url: "/api/vm-service/channel/channelList/" + innerCode,
  });
};

// 获取商圈下销量前10的商品(补货推荐)
export const getbusinessTopListApi = (businessId) => {
  return request({
    url: "/api/vm-service/sku/businessTop10/" + businessId,
  });
};

// 商品搜索
export const getskuSearchApi = (params) => {
  return request({
    url: "/api/vm-service/sku/search",
    params: {
      pageSize: 10,
      ...params,
    },
  });
};

// 货道配置
export const channelConfigApi = (data) => {
  return request({
    url: "/api/vm-service/channel/channelConfig",
    method: "PUT",
    data,
  });
};

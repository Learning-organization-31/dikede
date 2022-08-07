import request from "@/utils/request";
import dayjs from "dayjs";

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
    params,
  });
};

// 获取一定时间范围之内的订单总数
export const getorderCountApi = (innerCode) => {
  return request({
    url: "/api/order-service/report/orderCount",
    params: {
      start: "2022-08-01 00:00:00",
      end: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      innerCode,
    },
  });
};

// 获取一定时间范围之内的收入
export const getorderAmountApi = (innerCode) => {
  return request({
    url: "/api/order-service/report/orderAmount",
    params: {
      start: "2022-08-01 00:00:00",
      end: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      innerCode,
    },
  });
};

// 获取售货机补货次数
export const getsupplyCountApi = (innerCode) => {
  const start = "2022-08-01";
  const end = dayjs().format("YYYY-MM-DD");
  return request({
    url: `/api/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
  });
};

// 获取售货机维修次数
export const getrepairCountApi = (innerCode) => {
  const start = "2022-08-01";
  const end = dayjs().format("YYYY-MM-DD");
  return request({
    url: `/api/task-service/task/repairCount/${innerCode}/${start}/${end}`,
  });
};

// 获取售货机商品销量
export const getskuCollectApi = (innerCode) => {
  const start = "2022-08-01";
  const end = dayjs().format("YYYY-MM-DD");
  return request({
    url: `/api/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
  });
};

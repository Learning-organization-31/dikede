import request from "@/utils/request";

/**
 * 获取点位
 * @param {Object} params
 * @returns
 */
export const nodeSearch = (params) => {
  return request({
    url: "/api/vm-service/node/search",
    method: "GET",
    params,
  });
};

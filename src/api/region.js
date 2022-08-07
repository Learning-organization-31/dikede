import request from "@/utils/request";

/**
 * 获取区域列表
 * @param {Object} params 
 * @returns 
 */
export const getRegionList = (params) => {
  return request({
    url: "/api/vm-service/region/search",
    method: "GET",
    params,
  });
};

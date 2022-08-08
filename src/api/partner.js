import request from "@/utils/request";

/**
 * 获取所有合作商
 * @param {Object} params
 * @returns
 */
export const partnerSearch = (params) => {
  return request({
    url: "/api/user-service/partner/search",
    method: "GET",
    params,
  });
};

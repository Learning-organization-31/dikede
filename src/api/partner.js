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

/**
 * 初始化合作商密码
 * @param {String} id
 * @returns
 */
export const initPassword = (id) => {
  return request({
    url: "/api/user-service/partner/resetPwd/" + id,
    method: "PUT",
  });
};

/**
 * 新增合作商
 * @param {Object} data
 * @returns
 */
export const addPartner = (data) => {
  return request({
    url: "/api/user-service/partner",
    method: "POST",
    data,
  });
};

/**
 * 修改合作商
 * @param {Object} data
 * @returns
 */
export const setPartner = (data) => {
  return request({
    url: "/api/user-service/partner/" + data.id,
    method: "PUT",
    data,
  });
};

/**
 * 删除合作商
 * @param {String} id
 * @returns
 */
export const clearPartner = (id) => {
  return request({
    url: "/api/user-service/partner/" + id,
    method: "DELETE",
  });
};

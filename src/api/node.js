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

/**
 * 获取点位详情
 * @param {String} id
 * @returns
 */
export const getNodeInfo = (id) => {
  return request({
    url: "/api/vm-service/node/vmList/" + id,
    method: "GET",
  });
};

/**
 * 获取所有商圈列表
 * @returns
 */
export const getBusinessType = () => {
  return request({
    url: "/api/vm-service/businessType",
    method: "GET",
  });
};

/**
 * 获取所有合作商
 * @param {Object} params
 * @returns
 */
export const getPartnerList = (params) => {
  return request({
    url: "/api/user-service/partner/search",
    method: "GET",
    params,
  });
};

/**
 * 新增点位
 * @param {Object} data
 * @returns
 */
export const addNodeFn = (data) => {
  return request({
    url: "/api/vm-service/node",
    method: "POST",
    data,
  });
};

/**
 * 删除点位
 * @param {String} id
 * @returns
 */
export const removeNodeFn = (id) => {
  return request({
    rul: "/api/vm-service/node/" + id,
    method: "DELETE",
  });
};

/**
 * 修改点位
 * @param {String} id
 * @returns
 */
export const setNodeFn = (data) => {
  return request({
    url: "/api/vm-service/node/" + data.id,
    method: "PUT",
    data
  });
};

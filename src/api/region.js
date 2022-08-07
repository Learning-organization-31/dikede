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

/**
 * 新增区域
 * @param {Object} data
 * regionName：区域名称
 * remark：备注
 * @returns
 */
export const createRegion = (data) => {
  return request({
    url: "/api/vm-service/region",
    method: "POST",
    data,
  });
};

/**
 * 修改区域
 * @param {Object} data
 * @returns
 */
export const setRegion = (data) => {
  return request({
    url: "/api/vm-service/region/" + data.id,
    method: "PUT",
    data,
  });
};

/**
 * 删除区域
 * @param {String} id
 * @returns
 */
export const removeRegion = (id) => {
  return request({
    url: "/api/vm-service/region/" + id,
    method: "DELETE",
  });
};

import request from "@/utils/request";

/**
 * 获取所有商品
 * @param {Object} params
 * @returns
 */
export const getSkuList = (params) => {
  return request({
    url: "/api/vm-service/sku/search",
    method: "GET",
    params,
  });
};

/**
 * 新增商品
 * @param {Object} data
 * @returns
 */
export const addSkuVm = (data) => {
  return request({
    url: "/api/vm-service/sku",
    method: "POST",
    data,
  });
};

/**
 * 修改商品
 * @param {Object} data
 * @returns
 */
export const setSkuVm = (data) => {
  return request({
    url: "/api/vm-service/sku/" + data.skuId,
    method: "PUT",
    data,
  });
};

/**
 * 上传文件
 * @param {String} fileName
 * @returns
 */
export const fileUp = (data) => {
  return request({
    url: "/api/vm-service/sku/upload",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

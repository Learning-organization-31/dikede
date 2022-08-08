import request from "@/utils/request";

/**
 * 获取所有商品类型
 * @param {Object} params
 * @returns
 */
export const skuGetSearch = (params) => {
  return request({
    url: "/api/vm-service/skuClass/search",
    method: "GET",
    params,
  });
};

/**
 * 新增商品类型
 * @param {String} className
 * @returns
 */
export const addSkuClass = (className) => {
  return request({
    url: "/api/vm-service/skuClass",
    method: "POST",
    data: {
      className,
    },
  });
};

/**
 * 修改商品类型
 * @param {Object} data
 * @returns
 */
export const setSkuClass = (data) => {
  return request({
    url: "/api/vm-service/skuClass/" + data.classId,
    method: "PUT",
    data,
  });
};

/**
 * 删除商品类型
 * @param {String} id
 * @returns
 */
export const removeSkuClass = (id) => {
  return request({
    url: "/api/vm-service/skuClass/" + id,
    method: "DELETE",
  });
};

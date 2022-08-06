import request from "@/utils/request";

/**
 *  获取验证码
 * @param {Number} clientToken 随机数
 * @returns primise
 */
export const getFileUpload = (clientToken) => {
  return request({
    url: `/api/user-service/user/imageCode/${clientToken}`,
    method: "GET",
    responseType: "blob",
  });
};

/**
 * 登录
 * @param {Object} data 登录所需得数据
 * @returns promise
 */
export const userLogin = (data) => {
  return request({
    url: "/api/user-service/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
};

/**
 * 获取用户信息
 * @param {Number} id
 * @returns
 */
export const getUserInfo = (id) => {
  return request({
    url: "/api/user-service/user/" + id,
  });
};

/**
 * 根据售货机获取运营人员列表
 * @param {Number} innerCode 设备编号
 * @returns
 */
export const getOperatorList = (innerCode) => {
  return request({
    url: `/api/user-service/user/operatorList/${innerCode}`,
    method: "GET",
  });
};

import request from "@/utils/request";

/**
 * 获取工单列表
 * @param {Object} params
 * @returns
 */
export const getTaskService = (params) => {
  return request({
    url: "/api/task-service/task/search",
    method: "GET",
    params,
  });
};

/**
 * 获取工单类型列表
 * @returns promise
 */
export const getAllTaskStatus = () => {
  return request({
    url: "/api/task-service/task/allTaskStatus",
    method: "GET",
  });
};

/**
 *  获取工单配置警戒线
 * @returns promise
 */
export const getSupplyAlertValue = () => {
  return request({
    url: "/api/task-service/task/supplyAlertValue",
  });
};

/**
 * 设置工单配置警戒线
 * @param {Number} alertValue 警戒值
 * @returns promise
 */
export const setSupplyAlertValue = (alertValue) => {
  return request({
    url: "/api/task-service/task/autoSupplyConfig",
    method: "POST",
    data: {
      alertValue,
    },
  });
};

/**
 * 创建新工单
 * @param {Object} data
 * @returns promise
 */
export const createService = (data) => {
  return request({
    url: "/api/task-service/task/create",
    method: "POST",
    data,
  });
};

/**
 * 获取所有工单类型
 * @returns promise
 */
export const taskType = () => {
  return request({
    url: "/api/task-service/taskType/list",
    method: "GET",
  });
};

/**
 * 获取工单详情
 * @param {String} taskId
 * @returns promise
 */
export const getTaskInfo = (taskId) => {
  return request({
    url: `/api/task-service/task/taskInfo/${taskId}`,
    method: "GET",
  });
};

/**
 * 获取补货工单详情
 * @param {Number} id 工单id
 * @returns
 */
export const getDetailInfo = (id) => {
  return request({
    url: `/api/task-service/taskDetails/${id}`,
    method: "GET",
  });
};

/**
 * 取消工单
 * @param {Number} id 工单id
 * @returns
 */
export const removeWork = (taskId) => {
  return request({
    url: `/api/task-service/task/cancel/${taskId}`,
    method: "POST",
    data: {
      taskId,
    },
  });
};

/**
 * 获取售货机货道详情
 * @param {Number} innerCode 工单编号
 * @returns 
 */
export const getChannelList = (innerCode) => {
  return request({
    url: "/api/vm-service/channel/channelList/" + innerCode,
    method: "GET",
  });
};

import request from "@/utils/request";
/**
 * 
 * @param {人员信息列表} params 
 * @returns promise
 */
export function getPeopleListApi(params) {
    return request({
      url: '/api/user-service/user/search',
      method: 'GET',
      params
    })
  }
  //人员工作量列表
  export function getWorkPeopleListApi(params) {
    return request({
      url: '/api/user-service/user/searchUserWork',
      method: 'GET',
      params
    })
  } 


  //工单汇总信息(人员统计头部信息)
  export function getPeopleCountApi(data) {
    return request({
      url: `/api/task-service/task/taskReportInfo/${start}/${end}`,
      method: 'GET',
      data
    })
  }
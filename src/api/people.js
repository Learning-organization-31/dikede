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

  //编辑修改人员信息
  export function editPeopleApi(data,id) {
    return request({
      url: '/api/user-service/user/'+ id,
      method:'PUT',
      data
    })
  }

  //删除人员列表
  export function delPeopleApi(id) {
    return request({
      url: '/api/user-service/user/'+ id,
      method: 'DELETE',
    })
  }

  //新增人员
  export function addPeopleApi(data) {
    return request({
      url: '/api/user-service/user',
      method: 'POST',
      data
    })
  }

  //角色名称
  export function rolePeopleApi(data) {
    return request({
      url: '/api/user-service/role',
      method: 'GET',
      data
    })
  }

  //区域列表
  export function areaPeopleApi(params) {
    return request({
      url: '/api/vm-service/region/search',
      method: 'GET',
      params
    })
  }

  //获取用户信息
  export function getPeopleInfoApi(id) {
    return request({
      url: '/api/user-service/user/'+id,
      method: 'GET',
    })
  }

  //获取人员排名详情
  export function getInformationApi(params) {
    return request({
      url: '/api/task-service/task/userWork',
      method: 'GET',
      params
    })
  }

  //获取当时工单汇总信息
  export function getCountApi() {
    return request({
      url: `/api/task-service/task/taskReportInfo/2022-08-09%2000:00:00/2022-08-09%2023:59:59`,
      method: 'GET',
    })
  }
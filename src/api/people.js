import request from "@/utils/request";

export function getPeopleListApi(params) {
    return request({
      url: '/api/user-service/user/search',
      method: 'GET',
      params
    })
  }
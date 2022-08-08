import request from '@/utils/request'

export const getPolicyList = (pageIndex, pageSize, policyName) => {
  return request({
    url: '/api/vm-service/policy/search',
    params: {
      pageIndex,
      pageSize,
      policyName,
    },
  })
}

export const getPolicyItemList = (innerCode, pageIndex, pageSize) => {
  return request({
    url: '/api/vm-service/policy/vmList/' + innerCode,
    params: {
      pageIndex,
      pageSize,
    },
  })
}

export const deletePolicyItem = (innerCode) => {
  return request({
    url: '/api/vm-service/policy/' + innerCode,
    method: 'DELETE',
  })
}

export const addPolicyItem = (data) => {
  return request({
    url: '/api/vm-service/policy',
    method: 'POST',
    data,
  })
}

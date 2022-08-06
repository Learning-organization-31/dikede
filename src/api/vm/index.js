import request from "@/utils/request";

// 搜索售货机(售货机列表)
export const getVmListApi = (params) => {
  return request({
    url: "/api/vm-service/vm/search",
    params,
  });
};

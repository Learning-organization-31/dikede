import request from "@/utils/request";

// 新增售货机类型
export const addvmTypeApi = (data) => {
  return request({
    url: "/api/vm-service/vmType",
    method: "POST",
    data,
  });
};

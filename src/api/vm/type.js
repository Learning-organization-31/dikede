import request from "@/utils/request";

// 新增售货机类型
export const addvmTypeApi = (data) => {
  return request({
    url: "/api/vm-service/vmType",
    method: "POST",
    data,
  });
};

// 售货机类型详情
export const getvmTypeDeilApi = (typeId) => {
  return request({
    url: "/api/vm-service/vmType/" + typeId,
  });
};

// 售货机类型修改
export const exitvmTypeApi = (data) => {
  return request({
    url: "/api/vm-service/vmType/" + data.typeId,
    method: "PUT",
    data,
  });
};

// 售货机类型删除
export const delvmTypeApi = (typeId) => {
  return request({
    url: "/api/vm-service/vmType/" + typeId,
    method: "DELETE",
  });
};

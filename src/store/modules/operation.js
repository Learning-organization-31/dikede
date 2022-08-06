import { getTaskService, getAllTaskStatus } from "@/api/task";
import dayjs from "dayjs";

export default {
  namespaced: true,
  state: {
    taskSearch: {
      pageIndex: 1,
      pageSize: 10,
      // 工单编号
      taskCode: "",
      //工单状态
      status: "",
      isRepair: true,
    },
    //运维工单数据
    MaintenanceList: {},
    //用于渲染工单列表的数据
    mainList: [],
    //所有工单类型列表
    typeList: [],
  },
  mutations: {
    //修改运维工单数据
    SET_MAIN_TENANCE_LIST(state, payload) {
      state.MaintenanceList = payload[0];
      state.mainList = payload[1];
    },
    //修改工单类型列表
    SET_ALL_TASK_STATUS(state, payload) {
      state.typeList = payload;
    },
    //修改工单编号,工单数据
    SET_TASK_SEARCH_CODE_AND_STATUS(state, payload) {
      state.taskSearch.taskCode = payload[0];
      state.taskSearch.status = payload[1];
    },
    //修改页数
    SET_TASK_SEARCH_PAGE_SIZE(state, payload) {
      if (payload === 1) {
        state.taskSearch.pageIndex = state.taskSearch.pageIndex + 1;
      } else if (payload === -1) {
        state.taskSearch.pageIndex = state.taskSearch.pageIndex - 1;
      } else {
        state.taskSearch.pageIndex = 1;
      }
    },
  },
  actions: {
    // 获取运维工单数据
    async getMaintenance(context) {
      try {
        const res = await getTaskService(context.state.taskSearch);
        const arr = initList(res);
        context.commit("SET_MAIN_TENANCE_LIST", [res, arr]);
      } catch (error) {
        console.log(error);
      }
    },
    //获取所有工单类型列表
    async getAllTaskStatus(context) {
      const res = await getAllTaskStatus();
      context.commit("SET_ALL_TASK_STATUS", res);
    },
  },
  getters: {
    //计算出运维工单的左边按钮是否禁用
    lastDisabled(state) {
      return state.taskSearch.pageIndex <= 1;
    },
    //计算出运维工单的右边按钮是否禁用
    rightDisabled(state) {
      console.log;
      return (
        state.taskSearch.pageIndex ==
        Math.ceil((state.MaintenanceList.totalCount - 0) / 10)
      );
    },
  },
};

//初始化列表
const initList = (res) => {
  let arr = [];
  res.currentPageRecords.forEach((item, index) => {
    arr[index] = {};
    arr[index].pageIndex = index + 1 + (res.pageIndex - 1) * 10;
    arr[index].taskCode = item.taskCode;
    arr[index].innerCode = item.innerCode;
    arr[index].typeName = item.taskType.typeName;
    if (item.createType) {
      arr[index].createType = "手动";
    } else {
      arr[index].createType = "自动";
    }
    arr[index].taskStatus = item.taskStatusTypeEntity.statusName;
    arr[index].userName = item.userName;
    arr[index].createTime = dayjs(item.createTime).format(
      "YYYY.MM.DD hh:mm:ss"
    );
    arr[index].taskId = item.taskId;
  });
  return arr;
};

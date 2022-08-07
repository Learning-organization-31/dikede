import { getTaskService, getAllTaskStatus, getTaskInfo } from "@/api/task";
import { getOperatorList } from "@/api/user";
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
    //运营人员列表
    operatorList: [],
    loading: false,
    //工单详情数据
    taskInfo: {},
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
    //修改运营人员名单
    SET_OPERATOR_LIST(state, payload) {
      state.operatorList = payload;
    },
    //修改工单详情数据
    SET_TASK_INFO(state, payload) {
      state.taskInfo = payload;
    },
  },

  actions: {
    // 获取运维工单数据
    async getMaintenance(context) {
      try {
        context.state.loading = true;
        const res = await getTaskService(context.state.taskSearch);
        const arr = initList(res);
        context.commit("SET_MAIN_TENANCE_LIST", [res, arr]);
        context.state.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    //获取所有工单类型列表
    async getAllTaskStatus(context) {
      const res = await getAllTaskStatus();
      context.commit("SET_ALL_TASK_STATUS", res);
    },
    //获取运营人员
    async getOperatorList(context, payload) {
      try {
        const res = await getOperatorList(payload.trim());
        context.commit("SET_OPERATOR_LIST", res);
      } catch (error) {
        console.log(error);
      }
    },
    //获取详情数据
    async getTaskInfo(context, payload) {
      const res = await getTaskInfo(payload.taskId);
      context.commit("SET_TASK_INFO", res);
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
    //计算出上方图片应该怎么显示
    imageShow(state) {
      return state.taskInfo?.taskStatusTypeEntity?.statusId;
    },
    //图片旁文字
    imageText(state) {
      return state.taskInfo?.taskStatusTypeEntity?.statusName;
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

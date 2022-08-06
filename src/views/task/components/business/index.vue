<template>
  <div>
    <!-- 搜索区域 -->
    <SearchBar
      @search="searchFn"
      lastInpTitle="工单编号"
      rightInpTitle="工单状态"
      :typeList="typeList"
    />
    <!-- 搜索区域 -->
    <div class="result">
      <!-- 下方添加按钮 -->
      <div class="btn-title">
        <!-- 新建配置和弹窗 -->
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="addDialogShow"
        >
          新建
        </MyButton>
        <AddDialog :taskInfo="taskInfo" />
        <!-- 工单配置和弹窗 -->
        <MyButton :btnStyle="businessBtnStyle" @click="businessDialogShow">
          工单配置
        </MyButton>
        <BusinessDialog />
      </div>
      <!-- 下方添加按钮 -->

      <!-- 列表 -->
      <el-table
        :data="currentPageRecords"
        :height="currentPageRecords[0] ? '528' : '120'"
        stripe
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column prop="pageIndex" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="taskCode" label="工单编号" width="230">
        </el-table-column>
        <el-table-column prop="innerCode" label="设备编号" width="210">
        </el-table-column>
        <el-table-column prop="typeName" label="工单类型" width="210">
        </el-table-column>
        <el-table-column prop="createType" label="工单方式" width="215">
        </el-table-column>
        <el-table-column prop="taskStatus" label="工单状态" width="210">
        </el-table-column>
        <el-table-column prop="userName" label="运营人员" width="210">
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="190">
        </el-table-column>
        <el-table-column prop="taskId" label="操作" width="100">
          <template slot-scope="scope">
            <span class="col-text" @click="getTaskInfo(scope.row)"
              >查看详情
            </span>
          </template>
        </el-table-column>
      </el-table>
      <InfoDialog
        :taskItem="taskItem"
        v-if="taskItem.taskId"
        @againCreate="againCreate"
      />
      <!-- 列表 -->
      <!-- 页码 -->
      <FooterPage
        :listIsShow="listIsShow"
        :taskList="taskList"
        v-if="taskList.totalCount"
        :lastDisabled="lastDisabled"
        :rightDisabled="rightDisabled"
        @lastPage="getLastTaskService"
        @nextPage="getNextTaskService"
      />
      <!-- 页码 -->
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import BusinessDialog from "./BusinessDialog";
import SearchBar from "@/components/SerchBar";
import AddDialog from "./AddDialog";
import InfoDialog from "./InfoDialog";
import FooterPage from "@/components/FooterPage";
import { getTaskService, getAllTaskStatus } from "@/api/task";

import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
export default {
  name: "Business",
  data() {
    return {
      taskSearch: {
        pageIndex: 1,
        pageSize: 10,
        // 工单编号
        taskCode: "",
        //工单状态
        status: "",
        isRepair: false,
      },
      taskList: {},
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      //工单配置按钮样式
      businessBtnStyle: {
        background: "#fbf4f0",
        color: "#655b56",
      },
      //节流阀,控制请求
      flag: true,
      //获取类型进行遍历
      typeList: [],
      //详情信息
      taskItem: {},
      //用于遍历循环出列表
      currentPageRecords: [],
      taskInfo: {},
    };
  },
  created() {
    //进入页面获取运营工单数据
    this.getTaskService();
    this.getAllTaskStatus();
  },

  methods: {
    //运营工单数据
    async getTaskService() {
      try {
        this.taskList = await getTaskService(this.taskSearch);
        let arr = [];
        this.taskList.currentPageRecords.forEach((item, index) => {
          arr[index] = {};
          arr[index].pageIndex = index + 1 + (this.taskList.pageIndex - 1) * 10;
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
        this.currentPageRecords = arr;
        this.flag = true;
      } catch (error) {
        console.log(error);
      }
    },

    //点击搜索按钮触发获取工单数据
    searchFn(taskCode, status) {
      this.taskSearch.pageIndex = 1;
      if (taskCode || status) {
        this.taskSearch.taskCode = taskCode;
        this.taskSearch.status = status;
      }
      this.getTaskService();
    },
    //获取工单类型列表
    async getAllTaskStatus() {
      try {
        this.typeList = await getAllTaskStatus();
      } catch (error) {
        console.log(error);
      }
    },
    //显示工单配置弹窗
    businessDialogShow() {
      this.setBusinessIsShow(true);
    },
    //新增按钮开启弹窗
    addDialogShow() {
      this.setAddDialogIsShow(true);
    },
    //获取上一页的数据
    getLastTaskService() {
      if (this.flag) {
        this.flag = false;
        this.taskSearch.pageIndex--;
        this.getTaskService();
      }
    },
    //获取下一页的数据
    getNextTaskService() {
      if (this.flag) {
        this.flag = false;
        this.taskSearch.pageIndex++;
        this.getTaskService();
      }
    },
    //点击详情展开详情
    getTaskInfo(item) {
      this.taskItem = item;
      this.setInfoDialogIsShow(true);
    },
    //重新创建
    againCreate(taskInfo) {
      this.taskInfo = taskInfo;
    },
    ...mapActions("task", [
      "setBusinessIsShow",
      "setAddDialogIsShow",
      "setInfoDialogIsShow",
    ]),
  },

  computed: {
    //控制列表数量显示隐藏
    listIsShow() {
      return !this.taskList.currentPageRecords?.[0];
    },
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.taskList.pageIndex <= 1;
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return (
        this.taskList.pageIndex == Math.ceil(this.taskList.totalCount / 10)
      );
    },
    ...mapState("task", ["addDialogIsShow"]),
  },

  components: {
    MyButton,
    BusinessDialog,
    SearchBar,
    AddDialog,
    FooterPage,
    InfoDialog,
  },
};
</script>

<style lang="scss" scoped>
// 列表头部样式
::v-deep .has-gutter {
  .cell {
    color: rgb(102, 102, 102);
    font-weight: 400;
  }
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}

//新建按钮和工单按钮
.btn-title {
  display: flex;
  margin-bottom: 20px;
}

.col-text {
  color: #5f84ff;
  opacity: 0.8;
  cursor: pointer;
}
//暂无数据显示样式
.none-list {
  .el-col {
    display: flex;
    justify-content: center;
  }
}
</style>

<template>
  <div>
    <SearchBar
      lastInpTitle="工单编号"
      rightInpTitle="工单状态"
      @search="searchFn"
      :typeList="typeList"
    />
    <div class="result" v-loading="loading">
      <div class="btn-title">
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="isShow = true"
          >新建
        </MyButton>
        <MaintenanceAddDialog :isShow.sync="isShow" ref="add" />
        <el-table
          :data="mainList"
          :height="mainList[0] ? '528' : '120'"
          stripe
          style="width: 100%"
          empty-text="暂无数据"
        >
          <el-table-column prop="pageIndex" label="序号" width="60px">
          </el-table-column>
          <el-table-column prop="taskCode" label="工单编号"> </el-table-column>
          <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
          <el-table-column prop="typeName" label="工单类型"> </el-table-column>
          <el-table-column prop="createType" label="工单方式">
          </el-table-column>
          <el-table-column prop="taskStatus" label="工单状态">
          </el-table-column>
          <el-table-column prop="userName" label="运营人员"> </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="180px">
          </el-table-column>
          <el-table-column prop="taskId" label="操作">
            <template slot-scope="scope">
              <span class="col-text" @click="getTaskInfoFn(scope.row)"
                >查看详情
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <OpeInfoDialog :infoDialogIsShow.sync="infoIsShow" @infoAdd="infoAdd" />
    <FooterPage
      :taskList="MaintenanceList"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      v-if="MaintenanceList.totalCount - 0"
      @lastPage="getLastMaintenanceList"
      @nextPage="getNextMaintenanceList"
    />
  </div>
</template>

<script>
import SearchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import FooterPage from "@/components/FooterPage";
import MaintenanceAddDialog from "./MaintenanceAddDialog";
import OpeInfoDialog from "./OpeInfoDialog";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Operation",
  data() {
    return {
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      isShow: false,
      infoIsShow: false,
    };
  },

  created() {
    // 进入页面获取运维工单数据
    this.getMaintenance();
    //进入页面获取所有工单类型,用于搜索使用
    this.getAllTaskStatus();
  },

  methods: {
    //重新创建
    infoAdd(taskInfo) {
      this.infoIsShow = false;
      this.isShow = true;
      const obj = {};
      obj.createType = 1;
      obj.assignorId = taskInfo.assignorId;
      obj.desc = taskInfo.desc;
      obj.innerCode = taskInfo.innerCode;
      obj.userId = 1;
      obj.productType = taskInfo.taskType.typeId;
      this.$refs.add.service = obj;
      this.$refs.add.replenishment();
    },
    //查看详情
    async getTaskInfoFn(info) {
      this.infoIsShow = true;
      this.getTaskInfo(info);
    },
    //搜索页面
    searchFn(taskCode, status) {
      this.SET_TASK_SEARCH_CODE_AND_STATUS([taskCode, status]);
      this.SET_TASK_SEARCH_PAGE_SIZE();
      this.getMaintenance();
    },

    //获取上一页数据
    getLastMaintenanceList() {
      this.SET_TASK_SEARCH_PAGE_SIZE(-1);
      this.getMaintenance();
    },

    //获取下一页数据
    getNextMaintenanceList() {
      this.SET_TASK_SEARCH_PAGE_SIZE(1);
      this.getMaintenance();
    },

    ...mapActions("operation", [
      "getMaintenance",
      "getAllTaskStatus",
      "getTaskInfo",
      "getOperatorList",
    ]),
    ...mapMutations("operation", [
      "SET_TASK_SEARCH_CODE_AND_STATUS",
      "SET_TASK_SEARCH_PAGE_SIZE",
    ]),
  },

  computed: {
    ...mapState("operation", [
      "mainList",
      "MaintenanceList",
      "typeList",
      "loading",
    ]),
    ...mapGetters("operation", ["lastDisabled", "rightDisabled"]),
  },

  components: {
    SearchBar,
    MyButton,
    FooterPage,
    MaintenanceAddDialog,
    OpeInfoDialog,
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
.col-text {
  color: #5f84ff;
  opacity: 0.8;
  cursor: pointer;
}
</style>

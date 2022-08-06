<template>
  <div>
    <Dialog
      :businessIsShow="infoDialogIsShow"
      @close="setInfoDialogUnShow"
      title="工单详情"
      :isInfoDialog="isInfoDialog"
      :removeDialog="isRemoveDialog"
      :twoBtn="false"
      @removeBtn="removeWork"
      @infoBtn="againCreate"
    >
      <!-- 上方图片区域 -->
      <div class="task-status">
        <div class="task-status-content">
          <img
            src="~@/assets/imgs/gantan.png"
            v-if="taskItem.taskStatus === '取消'"
          />
          <img
            src="~@/assets/imgs/shizhong.png"
            v-if="taskItem.taskStatus === '待办'"
          />
          <img
            src="~@/assets/imgs/duihao.png"
            v-if="taskItem.taskStatus === '完成'"
          />
          <span>{{ taskItem.taskStatus }}</span>
        </div>
        <div>
          <img
            src="~@/assets/imgs/gongdan.png"
            v-if="taskItem.taskStatus === '取消'"
          />
          <img
            src="~@/assets/imgs/daiban.png"
            v-if="taskItem.taskStatus === '待办'"
          />
          <img
            src="~@/assets/imgs/wancheng.png"
            v-if="taskItem.taskStatus === '完成'"
          />
        </div>
      </div>
      <!-- 上方图片区域 -->
      <div class="task-row">
        <el-row type="flex">
          <el-col :offset="1">
            <span>设备编号: </span>{{ taskInfo.innerCode }}
          </el-col>
          <el-col :offset="1">
            <span>创建日期: </span>{{ taskInfo.createTime | dayFormat }}</el-col
          >
        </el-row>
        <el-row type="flex">
          <el-col :offset="1" v-if="taskItem.taskStatus !== '待办'">
            <span
              >{{
                taskItem.taskStatus === "取消" ? "取消日期" : "完成日期"
              }}: </span
            >{{ taskInfo.updateTime | dayFormat }}</el-col
          >
          <el-col :offset="1">
            <span>运营人员: </span>{{ taskInfo.userName }}</el-col
          >
        </el-row>
        <el-row type="flex">
          <el-col :offset="1">
            <span>工单类型: </span
            >{{ taskInfo.taskType && taskInfo.taskType.typeName }}</el-col
          >
          <el-col :offset="1">
            <span>补货数量: </span
            ><span class="detail" @click="detailInfoFn">补货详情 </span></el-col
          >
        </el-row>
        <el-row type="flex">
          <el-col :offset="1">
            <span>工单方式: </span>{{ taskInfo.createType ? "手动" : "自动" }}
          </el-col>
          <el-col :offset="1">
            <span>
              {{ taskItem.taskStatus === "取消" ? "取消原因" : "备注" }}: </span
            >{{ taskInfo.desc }}</el-col
          >
        </el-row>
      </div>
    </Dialog>
    <DetailInfoDialog v-if="taskId" :taskId="taskId" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import Dialog from "@/components/Dialog";
import DetailInfoDialog from "./DetailInfoDialog";
import { getTaskInfo, removeWork } from "@/api/task";
import { mapActions, mapState } from "vuex";
export default {
  name: "InfoDialog",
  data() {
    return {
      taskInfo: {},
      taskId: "",
    };
  },

  created() {},

  methods: {
    //关闭对话框
    setInfoDialogUnShow() {
      this.setInfoDialogIsShow(false);
    },
    //获取工单详细信息
    async getTaskInfo() {
      try {
        this.taskInfo = await getTaskInfo(this.taskItem.taskId);
        this.taskId = this.taskInfo.taskId;
      } catch (error) {
        console.log(error);
      }
    },
    //打开获取详情对话框
    detailInfoFn() {
      this.setDetailInfoIsShow(true);
    },
    //取消工单按钮
    removeWork() {
      this.$confirm("取消工单后,将不能恢复,是否确认取消?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
          const res = await removeWork(this.taskItem.taskId);
          await this.$parent.searchFn();
          if (res) {
            this.setInfoDialogIsShow(false);
            this.$message({
              type: "success",
              message: "取消成功!",
            });
          }
        })
        .catch((error) => {
          if (error.response?.status === 500) {
            this.$message({
              type: "error",
              message: error.response.data,
            });
          } else {
            this.$message({
              type: "info",
              message: "放弃取消成功",
            });
          }
        });
    },
    //重新创建
    againCreate() {
      this.$emit("againCreate", this.taskInfo);
    },
    ...mapActions("task", ["setInfoDialogIsShow", "setDetailInfoIsShow"]),
  },

  computed: {
    //用来计算下方重新创建按钮是否显示
    isInfoDialog() {
      return this.taskItem.taskStatus === "取消";
    },
    //用来计算下方取消工单是否显示
    isRemoveDialog() {
      return this.taskItem.taskStatus === "待办";
    },
    ...mapState("task", ["infoDialogIsShow"]),
  },

  watch: {
    //taskItem改变重新调用数据
    taskItem: {
      deep: true,
      immediate: true,
      handler() {
        this.getTaskInfo();
      },
    },
  },

  props: {
    taskItem: {
      type: Object,
      required: true,
    },
  },

  components: {
    Dialog,
    DetailInfoDialog,
  },

  filters: {
    dayFormat(value) {
      return dayjs(value).format("YYYY.MM.DD hh:mm:ss");
    },
  },
};
</script>

<style lang="scss" scoped>
.task-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px 0 20px;
  width: 590px;
  height: 54px;
  margin-bottom: 25px;
  background-color: #f8f8f8;
  .task-status-content {
    display: flex;
    align-items: center;
    img {
      margin-right: 15px;
    }
  }
}

.task-row {
  padding: 0 12px;
  span {
    margin-right: 20px;
  }
}
.el-col {
  height: 36px;
}
.detail {
  color: #5f84ff;
  cursor: pointer;
}
</style>

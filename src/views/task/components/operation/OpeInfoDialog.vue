<template>
  <Dialog
    :businessIsShow="infoDialogIsShow"
    @close="closeFn"
    title="工单详情"
    :twoBtn="false"
    :removeDialog="imageShow === 1"
    :isInfoDialog="imageShow === 3"
    @removeBtn="removeWork"
    @infoBtn="infoBtnFn"
  >
    <!-- 上方图片区域 -->
    <div class="task-status">
      <div class="task-status-content">
        <img src="~@/assets/imgs/shizhong.png" v-if="imageShow === 1" />
        <img src="~@/assets/imgs/gantan.png" v-if="imageShow === 3" />
        <img src="~@/assets/imgs/duihao.png" v-if="imageShow === 4" />
        <span>{{ imageText }}</span>
      </div>
      <div>
        <img src="~@/assets/imgs/daiban.png" v-if="imageShow === 1" />
        <img src="~@/assets/imgs/gongdan.png" v-if="imageShow === 3" />
        <img src="~@/assets/imgs/wancheng.png" v-if="imageShow === 4" />
      </div>
    </div>
    <!-- 上方图片区域 -->
    <div class="task-row" v-if="imageShow === 1">
      <el-row type="flex">
        <el-col :offset="1">
          <span>设备编号: </span>{{ taskInfo.innerCode }}
        </el-col>
        <el-col :offset="1">
          <span>创建日期: </span>{{ taskInfo.createTime | dayFormat }}</el-col
        >
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>运营人员: </span>
          {{ taskInfo.userName }}
        </el-col>
        <el-col :offset="1">
          <span>工单类型: </span
          >{{ taskInfo.taskType && taskInfo.taskType.typeName }}
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>工单方式: </span>{{ taskInfo.createType ? "手动" : "自动" }}
        </el-col>

        <el-col :offset="1"> <span>备注: </span>{{ taskInfo.desc }} </el-col>
      </el-row>
    </div>

    <div class="task-row" v-if="imageShow === 3">
      <el-row type="flex">
        <el-col :offset="1">
          <span>设备编号: </span>{{ taskInfo.innerCode }}
        </el-col>
        <el-col :offset="1">
          <span>创建日期: </span>{{ taskInfo.createTime | dayFormat }}</el-col
        >
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>取消日期: </span>
          {{ taskInfo.updateTime | dayFormat }}
        </el-col>
        <el-col :offset="1">
          <span>运维人员: </span>
          {{ taskInfo.userName }}
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>工单类型: </span
          >{{ taskInfo.taskType && taskInfo.taskType.typeName }}
        </el-col>
        <el-col :offset="1">
          <span>工单方式: </span>{{ taskInfo.createType ? "手动" : "自动" }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1">
          <span>取消原因: </span>{{ taskInfo.desc }}
        </el-col>
      </el-row>
    </div>

    <div class="task-row" v-if="imageShow === 4">
      <el-row type="flex">
        <el-col :offset="1">
          <span>设备编号: </span>{{ taskInfo.innerCode }}
        </el-col>
        <el-col :offset="1">
          <span>创建日期: </span>{{ taskInfo.createTime | dayFormat }}</el-col
        >
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>完成日期: </span>
          {{ taskInfo.updateTime | dayFormat }}
        </el-col>
        <el-col :offset="1">
          <span>运维人员: </span>
          {{ taskInfo.userName }}
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>工单类型: </span
          >{{ taskInfo.taskType && taskInfo.taskType.typeName }}
        </el-col>
        <el-col :offset="1">
          <span>工单方式: </span>{{ taskInfo.createType ? "手动" : "自动" }}
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :offset="1">
          <span>备注: </span>
          {{ taskInfo.desc }}
        </el-col>
        <el-col :offset="1">
          <span><i class="el-icon-location"></i> 定位: </span>
          {{ taskInfo.addr }}
        </el-col>
      </el-row>
    </div>
  </Dialog>
</template>

<script>
import dayjs from "dayjs";
import Dialog from "@/components/Dialog";
import { removeWork } from "@/api/task";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "OpeInfoDialog",
  data() {
    return {};
  },

  created() {},
  methods: {
    //取消工单
    async removeWork() {
      try {
        await removeWork(this.taskInfo.taskId);
        this.SET_TASK_SEARCH_PAGE_SIZE();
        this.$message.success("取消成功");
        this.getMaintenance();
        this.closeFn();
      } catch (error) {
        this.$message.success(error.response.data);
      }
    },
    //重新创建
    infoBtnFn() {
      this.$emit("infoAdd", this.taskInfo);
    },
    //关闭弹窗
    closeFn() {
      this.$emit("update:infoDialogIsShow", false);
    },
    ...mapMutations("operation", ["SET_TASK_SEARCH_PAGE_SIZE"]),
    ...mapActions("operation", ["getMaintenance"]),
  },

  computed: {
    ...mapState("operation", ["taskInfo"]),
    ...mapGetters("operation", ["imageShow", "imageText"]),
  },

  watch: {},

  props: {
    infoDialogIsShow: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Dialog,
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
.el-icon-location {
  color: #5f84ff;
}
</style>

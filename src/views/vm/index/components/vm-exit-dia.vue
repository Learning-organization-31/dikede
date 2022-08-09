<template>
  <Dialog
    title="修改设备"
    :businessIsShow="exitDiaIsShow"
    @close="close"
    @cancelBtn="cancelBtn"
    @sureBtn="sureBtn"
  >
    <div class="vm-exit-dia" v-loading="loading">
      <el-row>机器编号： {{ vmServerDeil.innerCode }}</el-row>
      <el-row>供货时间： {{ vmServerDeil.lastSupplyTime | formatDate }}</el-row>
      <el-row
        >设备类型： {{ vmServerDeil.type && vmServerDeil.type.name }}</el-row
      >
      <el-row
        >设备容量：
        {{ vmServerDeil.type && vmServerDeil.type.channelMaxCapacity }}</el-row
      >
      <el-row
        >设备点位：
        <el-select style="width: 70%" v-model="nodeId" placeholder="请选择">
          <el-option
            v-for="item in NodeList.currentPageRecords"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option> </el-select
      ></el-row>
      <el-row> 合作商： {{ vmServerDeil.ownerName }}</el-row>
      <el-row
        >所属区域：
        {{ vmServerDeil.region && vmServerDeil.region.name }}</el-row
      >
      <el-row
        >设备地址： {{ vmServerDeil.node && vmServerDeil.node.name }}</el-row
      >
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { mapState } from "vuex";
import { exitVmNodeApi } from "@/api/vm/index";
import dayjs from "dayjs";
export default {
  components: { Dialog },
  props: ["exitDiaIsShow", "vmServerDeil"],
  data() {
    return {
      nodeId: "",
      loading: false,
    };
  },
  methods: {
    // 确认按钮
    async sureBtn() {
      if (this.loading) return; // 防抖
      this.loading = true;
      try {
        await exitVmNodeApi(this.vmServerDeil.id, this.nodeId);
        await this.$emit("updateView");
        this.$message.success("修改成功！");
      } catch (error) {
        this.$message.error("该设备正在运营！");
      } finally {
        this.loading = false;
        this.close();
      }
    },
    // 取消按钮
    cancelBtn() {
      this.close();
    },
    // 关闭弹窗
    close() {
      this.$emit("update:exitDiaIsShow", false);
    },
  },
  computed: {
    ...mapState("vm", ["NodeList"]),
  },
  filters: {
    formatDate(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style scoped lang="scss">
.vm-exit-dia {
  padding: 0 0 0 60px;
  .el-row {
    margin-bottom: 35px;
    ::v-deep.el-input__inner {
      height: 35px;
    }
  }
}
</style>

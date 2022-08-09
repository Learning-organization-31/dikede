<template>
  <Dialog
    title="策略管理"
    :twoBtn="false"
    :businessIsShow="StrategyDiaIsShow"
    @close="close"
  >
    <div class="vm-index-dia">
      <el-row>
        <el-col :span="12">机器编号： {{ VmPolicy.innerCode }}</el-col>
        <el-col :span="12">策略名称： {{ VmPolicy.policyName }}</el-col>
        <el-col :span="12">策略方案： {{ VmPolicy.discount }}%</el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <div class="strategy-btn" @click="cancelVmPolicy">取消政策</div>
      </el-row>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { mapState } from "vuex";
import { cancelVmPolicyApi } from "@/api/vm/index";
export default {
  components: { Dialog },
  props: ["StrategyDiaIsShow"],
  data() {
    return {
      flag: false,
    };
  },
  methods: {
    // 取消策略
    async cancelVmPolicy() {
      if (this.flag) return;
      this.flag = true;
      const { innerCode, policyId } = this.VmPolicy;
      try {
        await cancelVmPolicyApi(innerCode, policyId);
        this.$message.success("取消策略成功");
      } catch (error) {
        this.$message.error("取消策略失败");
      } finally {
        this.flag = false;
        this.close();
      }
    },
    // 关闭弹窗
    close() {
      this.$emit("update:StrategyDiaIsShow", false);
    },
  },
  computed: {
    ...mapState("vm", ["VmPolicy"]),
  },
};
</script>

<style scoped lang="scss">
.vm-index-dia {
  padding: 20px;
  padding-left: 70px;
  .el-col {
    height: 50px;
  }
  .strategy-btn {
    width: 78px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #fbf4f0;
    border-radius: 5px;
    cursor: pointer;
    transform: translateX(-30px);
    transition: 0.2s all;
    &:hover {
      background-color: #f3e7e1;
    }
  }
}
</style>

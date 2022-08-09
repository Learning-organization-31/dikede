<template>
  <Dialog
    title="流量策略管理"
    @close="onClose"
    :businessIsShow="changebusinessIsShow"
    @cancelBtn="changeCancelBtn"
    @sureBtn="changeSureBtn"
  >
    <div class="vm-index-dia" v-loading="changeLoading">
      <el-form
        ref="form"
        :model="params"
        :rules="fromRules"
        label-width="100px"
      >
        <el-form-item label="选择策略:" prop="strategy">
          <el-select
            style="width: 100%"
            v-model="params.strategy"
            placeholder="请选择"
          >
            <el-option
              v-for="item in PolicyList"
              :key="item.policyId"
              :label="item.policyName"
              :value="item.policyId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { updatePolicyApi } from "@/api/vm/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      changeLoading: false,
      params: {
        strategy: "",
      },
      fromRules: {
        strategy: [{ required: true, message: "请选择策略" }],
      },
    };
  },
  components: { Dialog },
  props: ["changebusinessIsShow", "multipleSelection"],
  methods: {
    // 点击批量操作弹窗内确定按钮
    async changeSureBtn() {
      if (this.changeLoading) return; // 防抖
      await this.$refs.form.validate();
      const innerCodeList = [];
      this.multipleSelection.forEach((item) =>
        item.innerCode
          ? innerCodeList.push(item.innerCode)
          : innerCodeList.push(item)
      );
      try {
        this.changeLoading = true;
        await updatePolicyApi({
          policyId: this.params.strategy,
          innerCodeList,
        });
        this.$message.success("修改策略成功");
      } catch (error) {
        this.$message.error("修改策略失败");
      } finally {
        this.changeLoading = false;
        this.onClose();
      }
    },

    // 关闭批量操作弹窗
    onClose() {
      this.params.strategy = "";
      this.$refs.form.resetFields();
      this.$emit("update:changebusinessIsShow", false);
    },

    // 点击批量操作弹窗内取消按钮
    changeCancelBtn() {
      this.onClose();
    },
  },
  computed: {
    ...mapState("vm", ["PolicyList"]),
  },
};
</script>

<style scoped>
.vm-index-dia {
  padding: 0 60px 0 30px;
}
</style>

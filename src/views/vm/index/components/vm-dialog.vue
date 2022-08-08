<template>
  <!-- 新建按钮弹窗 -->
  <Dialog
    title="新增设备"
    :businessIsShow="businessIsShow"
    @close="onClose"
    @cancelBtn="cancelBtn"
    @sureBtn="sureBtn"
  >
    <div class="vm-index-dia" v-loading="loading">
      <el-form
        ref="form"
        :model="formData"
        :rules="formDataRules"
        label-width="100px"
      >
        <el-form-item label="设备编号:">
          <span>系统自动生成</span>
        </el-form-item>
        <el-form-item label="选择型号:" prop="vmType">
          <el-select
            style="width: 100%"
            v-model="formData.vmType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in VmTypeList.currentPageRecords"
              :key="item.typeId"
              :label="item.name"
              :value="item.typeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择点位:" prop="nodeId">
          <el-select
            style="width: 100%"
            v-model="formData.nodeId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in NodeList.currentPageRecords"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
import { addvmServeApi } from "@/api/vm/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formData: {
        vmType: "",
        nodeId: "",
      },
      formDataRules: {
        vmType: [{ required: true, message: "请选择型号" }],
        nodeId: [{ required: true, message: "请选择点位" }],
      },
      loading: false,
    };
  },
  components: { Dialog },
  props: ["businessIsShow"],
  methods: {
    // 弹出层点击确认
    async sureBtn() {
      if (this.loading) return;
      await this.$refs.form.validate();
      try {
        this.loading = true;
        this.formData.createUserId = this.$store.state.user.userInfo.userId;
        await addvmServeApi(this.formData);
        this.onClose();
        this.$message.success("添加设备成功");
      } catch (error) {
        this.$message.error("添加设备失败");
      } finally {
        this.loading = false;
      }
    },

    // 弹出层点击取消
    cancelBtn() {
      this.onClose();
    },

    // 弹出层关闭
    onClose() {
      this.$emit("update:businessIsShow", false);
    },
  },
  computed: {
    ...mapState("vm", ["VmTypeList", "NodeList"]),
  },
};
</script>

<style scoped lang="scss">
.vm-index-dia {
  padding: 0 60px 0 30px;
}
</style>

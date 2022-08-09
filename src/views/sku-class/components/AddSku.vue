<template>
  <Dialog
    :title="title"
    :businessIsShow="addSkuIsShow"
    @close="closeFn"
    @cancelBtn="closeFn"
    @sureBtn="addSku"
  >
    <el-form
      :model="from"
      :rules="rules"
      ref="ruleForm"
      label-position="right"
      label-width="auto"
    >
      <el-form-item label="商品类型名称:" prop="className">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          v-model="from.className"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { addSkuClass, setSkuClass } from "@/api/sku-class";
export default {
  name: "addSku",
  data() {
    return {
      from: {
        className: "",
      },
      rules: {
        className: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },

  created() {},

  methods: {
    //新增商品类型
    async addSku() {
      try {
        await this.$refs.ruleForm.validate();
        if (this.from.classId) {
          await setSkuClass(this.from);
          this.$message.success("修改成功");
        } else {
          await addSkuClass(this.from.className);
          this.$message.success("添加成功");
        }
        this.closeFn();
        //添加成功,通知父级重新获取
        this.$emit("init");
      } catch (error) {
        if (error?.response?.data) {
          this.$message.error(error.response.data);
        }
      }
    },

    //关闭弹窗
    closeFn() {
      this.$refs.ruleForm.resetFields();
      this.from = {
        className: "",
      };
      this.$emit("update:title", "新增商品类型");
      this.$emit("update:addSkuIsShow", false);
    },
  },

  computed: {},

  components: {
    Dialog,
  },

  props: {
    addSkuIsShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新增商品类型",
    },
    skuRow: {
      type: Object,
    },
  },

  watch: {
    skuRow() {
      this.from.classId = this.skuRow.classId;
      this.from.className = this.skuRow.className;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 50px;
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  ::v-deep .el-input__inner {
    width: 398px;
    height: 36px;
    margin-left: 6px;
  }
  ::v-deep .el-textarea__inner {
    height: 82px;
    margin-left: 6px;
    width: 398px;
  }
  .item-icon {
    padding-left: 6px;
    color: #5f84ff;
    cursor: pointer;
    i {
      font-size: 16px;
    }
  }
}
</style>

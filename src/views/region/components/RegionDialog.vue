<template>
  <Dialog
    :title="title"
    :businessIsShow="IsShow"
    @close="closeFn"
    @cancelBtn="closeFn"
    @sureBtn="createRegion"
  >
    <el-form ref="form" :model="addReion" :rules="rules" label-width="auto">
      <el-form-item label="区域名称:" prop="regionName">
        <el-input
          v-model="addReion.regionName"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="备注说明:" prop="remark">
        <el-input
          type="textarea"
          v-model="addReion.remark"
          placeholder="请输入备注(不超过40字)"
          maxlength="40"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { createRegion, setRegion } from "@/api/region";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "RegionDialog",
  data() {
    return {
      addReion: {
        regionName: "",
        remark: "",
      },
      rules: {
        regionName: [
          { required: true, message: "请输入区域名称", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
    };
  },

  created() {},

  methods: {
    //校验表单,通过添加点位,弹窗提示,将页码更改至第一页,关闭弹窗,重新获取所有点位
    async createRegion() {
      try {
        await this.$refs.form.validate();
        if (this.addReion.id) {
          await setRegion(this.addReion);
          this.$message.success("修改成功");
        } else {
          await createRegion(this.addReion);
          this.$message.success("新增成功");
        }
        this.getRegionList();
        this.SET_PAGE_INDEX();
        this.closeFn();
      } catch (error) {
        this.$message.error(error.response.data);
      }
    },
    //通过修改跳转过来进行数据修改
    setAddReion(row) {
      const obj = {
        regionName: row.name,
        remark: row.remark,
        id: row.id,
      };
      this.addReion = obj;
    },
    // 关闭弹窗,清空弹窗内内容，并且清除校验规则
    closeFn() {
      this.addReion = {
        regionName: "",
        remark: "",
      };
      this.$refs.form.resetFields();
      this.$emit("update:IsShow", false);
      this.$emit("update:title", "新建区域");
    },
    ...mapMutations("region", ["SET_PAGE_INDEX"]),
    ...mapActions("region", ["getRegionList"]),
  },

  computed: {},

  props: {
    IsShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新建区域",
    },
  },

  components: {
    Dialog,
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
    margin-left: 8px;
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

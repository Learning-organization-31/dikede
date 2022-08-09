<template>
  <!-- 弹出框 -->
  <Dialog
    :title="title"
    :businessIsShow="businessIsShow"
    @close="onClose"
    @cancelBtn="onClose"
    @sureBtn="onSaveBtn"
  >
    <div class="vm-status-dia" v-loading="loading">
      <!-- 模态框表单 -->
      <el-form
        ref="form"
        :rules="addVmServeFormRules"
        :model="addVmServeForm"
        label-width="100px"
      >
        <el-form-item label="型号名称:" prop="name">
          <el-input
            placeholder="请输入"
            v-model="addVmServeForm.name"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="型号编码:" prop="model">
          <el-input
            placeholder="请输入 (限制数字、字母、中划线、下划线)"
            v-model="addVmServeForm.model"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="货道行数:" prop="vmRow">
          <el-input-number
            style="width: 100%"
            controls-position="right"
            placeholder="请输入"
            v-model="addVmServeForm.vmRow"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道列数:" prop="vmCol">
          <el-input-number
            style="width: 100%"
            controls-position="right"
            placeholder="请输入"
            v-model="addVmServeForm.vmCol"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道容量:" prop="channelMaxCapacity">
          <el-input-number
            style="width: 100%"
            controls-position="right"
            placeholder="请输入"
            v-model="addVmServeForm.channelMaxCapacity"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="设备图片:" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="addVmServeForm.image"
              :src="addVmServeForm.image"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span>支持扩展名：jpg、png，文件不得大于100kb</span>
        </el-form-item>
      </el-form>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { addvmTypeApi, getvmTypeDeilApi, exitvmTypeApi } from "@/api/vm/type";
export default {
  data() {
    return {
      addVmServeForm: {
        name: "",
        model: "",
        vmRow: 0,
        vmCol: 0,
        channelMaxCapacity: 0,
        image: "",
      },
      addVmServeFormRules: {
        name: [{ required: true, message: "请输入型号名称", trigger: "blur" }],
        model: [
          { required: true, message: "请输入型号编码", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]{4,15}$/,
            message: "型号编码格式不正确",
            trigger: "blur",
          },
        ],
        vmRow: [{ required: true, message: "请选择货道行数", trigger: "blur" }],
        vmCol: [{ required: true, message: "请选择货道列数", trigger: "blur" }],
        channelMaxCapacity: [
          { required: true, message: "请选择货道容量", trigger: "blur" },
        ],
        image: [{ required: true, message: "请上传图片", trigger: "change" }],
      },
      loading: false,
    };
  },
  components: { Dialog },
  props: ["businessIsShow"],
  methods: {
    // 模态框点击确定
    async onSaveBtn() {
      if (this.loading) return; // 防抖
      await this.$refs.form.validate(); // 校验表单
      this.loading = true;
      try {
        if (this.addVmServeForm.typeId) {
          // 修改
          await exitvmTypeApi(this.addVmServeForm);
          this.$message.success("修改售货机类型成功");
        } else {
          // 新增
          await addvmTypeApi(this.addVmServeForm);
          this.$message.success("新增售货机类型成功");
        }
        this.$emit("addvmTypeSucc");
        this.onClose();
      } catch (error) {
        this.$message.error("操作售货机类型失败");
      } finally {
        this.loading = false;
      }
    },

    // 获取售货机类型详情
    async getvmTypeDeil(typeId) {
      this.loading = true;
      const data = await getvmTypeDeilApi(typeId);
      this.addVmServeForm = data;
      this.loading = false;
    },

    // 关闭模态框
    onClose() {
      this.addVmServeForm = {};
      this.$refs.form.resetFields();
      this.$emit("update:businessIsShow", false);
    },

    // 图片
    handleAvatarSuccess(res, file) {
      this.addVmServeForm.image = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG  格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100kb!");
      }
      return isJPG && isLt2M;
    },
  },
  computed: {
    title() {
      return this.addVmServeForm.typeId ? "修改设备类型" : "新增设备类型";
    },
  },
};
</script>

<style scoped lang="scss">
.vm-status-dia {
  padding: 0 70px 0 50px;
  ::v-deep .el-form-item__label {
    font-weight: normal;
  }
  .dialog-span {
    font-size: 14px;
  }
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #f3f6fb;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 76px;
  height: 76px;
  line-height: 76px;
  text-align: center;
}
.avatar {
  width: 76px;
  height: 76px;
  display: block;
}
</style>

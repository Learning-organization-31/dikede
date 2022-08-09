<template>
  <div class="table-input">
    <Dialog
      title="新增人员"
      :businessIsShow="isShow"
      @close="onClose"
      @cancelBtn="onClose"
      @sureBtn="onaddBtn"
    >
      <el-form
        ref="form"
        :model="peopleInfo"
        label-width="80px"
        :rules="formRules"
      >
        <el-form-item label="人员名称：" prop="userName">
          <el-input
            v-model="peopleInfo.userName"
            placeholder="请输入"
            maxlength="5"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <el-select v-model="peopleInfo.roleId" placeholder="请选择">
            <el-option
              v-for="item in this.roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobile">
          <el-input
            v-model="peopleInfo.mobile"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="负责区域：" prop="regionId">
          <el-select v-model="peopleInfo.regionId" placeholder="请选择">
            <el-option
              v-for="item in this.areaList.currentPageRecords"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像：" prop="image">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="peopleInfo.image"
              :src="peopleInfo.image"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="info">支持扩展名：jpg、png，文件不得大于100kb</div>
        <el-form-item label="状态：" class="status">
          <el-radio-group v-model="peopleInfo.status">
            <el-checkbox v-model="checked">是否启用</el-checkbox>
            <!-- <el-radio :label="true">是否启用</el-radio> -->
          </el-radio-group>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
name: "Dialogy";
import Dialog from "@/components/Dialog";
import { addPeopleApi } from "@/api/people";
import { mapState } from "vuex";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Dialog,
  },
  data() {
    return {
      checked: false,
      //新建人员信息
      peopleInfo: {
        userName: "",
        roleId: "",
        mobile: "",
        regionId: "",
        regionName: "",
        status: "",
        image: "",
      },
      formRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        roleName: [{ required: true, message: "请输入角色", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        regionId: [{ required: true, message: "请填写区域", trigger: "blur" }],
        image: [{ required: true, message: "请上传头像", trigger: "blur" }],
      },

      businessIsShow: false,
    };
  },

  created() {},
  computed: {
    //获取人员信息列表
    ...mapState("people", ["workList"]),
    //获取角色列表
    ...mapState("people", ["roleList"]),
    ...mapState("people", ["areaList"]),
  },
  methods: {
    onClose() {
      this.$emit("update:isShow", false);
      console.log(this.roleList);
    },
    async onaddBtn() {
      try {
        this.$refs.form.validate();
        await addPeopleApi(this.peopleInfo);
        this.$message.success("添加成功");
        this.$emit("save");
        this.onClose();
      } catch (err) {
        console.log(err);
      }
    },
    handleAvatarSuccess(res, file) {
      this.peopleInfo.image = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="scss">
.table-input {
  .el-form-item {
    ::v-deep .el-form-item__label {
      width: 100px !important;
      font-size: 14px !important;
    }
  }
  .el-input {
    width: 80%;
    margin-left: 10px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep .avatar-uploader-icon {
  width: 80px;
  height: 80px;
  background: #f3f6fb;
  line-height: 85px;
  margin-left: 10px;
}
.info {
  margin-left: 120px;
  color: #bac0cd;
}
.status {
  margin-top: 20px;
}
::v-deep .el-input--suffix {
  width: 190%;
  margin-left: 10px;
}
</style>

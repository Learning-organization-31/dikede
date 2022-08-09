<template>
  <div class="table-input">
    <Dialog
      title="编辑人员"
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
        <el-form-item label="角色：" prop="roleName">
          <el-select v-model="peopleInfo.roleName" placeholder="请选择活动区域">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
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
        <el-form-item label="负责区域：" prop="regionName">
          <el-select v-model="peopleInfo.regionName" placeholder="请选择">
            <el-option
              v-for="item in areaList.currentPageRecords"
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
            <img v-if="imageUrl" :src="peopleInfo.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="info">支持扩展名：jpg、png，文件不得大于100kb</div>
        <el-form-item label="状态：" class="status" prop="status">
          
          <el-checkbox v-model="peopleInfo.checked">是否启用</el-checkbox>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import { mapState } from "vuex";
import { editPeopleApi } from "@/api/people";
export default {
  name: "EditInfo",
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
      businessIsShow: false,
      imageUrl: "http://lkd2-java.itheima.net/image/avatar.png",
      formRules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        roleName: [
          { required: true, message: "请输入区域名", trigger: "blur" },
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        image: [{ required: true, message: "请上传头像", trigger: "blur" }],
      },
      editInfo: {
        userName: "",
        // role: {
        roleId: 1,
        // },
        roleName: "",
        mobile: "",
        regionName: "",
        image: "",
        status: "true",
        regionId: "",
      },
      peopleList: {},
    };
  },

  created() {},
  computed: {
    ...mapState("people", ["peopleInfo"]),
    ...mapState("people", ["roleList"]),
    ...mapState("people", ["areaList"]),
  },

  methods: {
    onClose() {
      this.$emit("update:isShow", false);
      //关闭弹窗，让他回置
      this.$refs.form.resetFields();
    },
    async onaddBtn() {
      console.log(this.peopleInfo);
      this.peopleList = {
        userName: this.peopleInfo.userName,
        roleId: this.peopleInfo.roleId,
        mobile: this.peopleInfo.mobile,
        regionId: this.peopleInfo.regionId,
        status: this.peopleInfo.status,
        image: this.peopleInfo.image,
        regionName: this.peopleInfo.regionName,
      };
      await editPeopleApi(this.peopleList, this.peopleInfo.userId);
      this.$parent.$parent.getPeopleList();
      this.$message.success("修改成功");
      // this.$emit("save");
      this.onClose();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
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
::v-deep .el-upload {
  background: #f3f6fb;
  position: relative;
  overflow: hidden;
  background: #f3f6fb;
  border: 1px dashed #d8dde3;
  border-radius: 4px;
  cursor: pointer;
}
::v-deep .avatar-uploader .el-upload:hover {
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
  width: 85px;
  height: 85px;
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
.el-upload--text {
  position: relative;
  overflow: hidden;
  background: #f3f6fb;
  border: 1px dashed #d8dde3;
  border-radius: 4px;
  cursor: pointer;
}
</style>

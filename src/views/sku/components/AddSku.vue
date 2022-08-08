<template>
  <Dialog
    :businessIsShow="skuIsShow"
    :title="title"
    @close="close"
    @cancelBtn="close"
    @sureBtn="sureBtn"
    @open="open"
  >
    <el-form
      ref="ruleForm"
      label-position="right"
      label-width="auto"
      :model="myData"
      :rules="rules"
    >
      <el-form-item label="商品名称:" prop="skuName">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
          v-model="myData.skuName"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="brandName">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          v-model="myData.brandName"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number
          placeholder="请输入"
          controls-position="right"
          :precision="2"
          :step="0.01"
          :min="0.01"
          :max="9999.99"
          v-model="myData.price"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="商品类型:" prop="classId">
        <el-select
          v-model="myData.classId"
          placeholder="请选择"
          no-data-text="暂无数据"
        >
          <el-option
            :label="item.className"
            :value="item.classId"
            v-for="item in classSkuList"
            :key="item.classId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          v-model="myData.unit"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="skuImage">
        <el-upload
          list-type="picture-card"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="myData.skuImage" :src="myData.skuImage" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="text">支持扩展名:jpg、png,文件不得大于100kb</div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { skuGetSearch } from "@/api/sku-class";
import { addSkuVm, setSkuVm } from "@/api/sku";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "AddSku",
  data() {
    return {
      myData: {
        skuName: "",
        skuImage: "",
        price: "",
        classId: "",
        unit: "",
        brandName: "",
      },
      rules: {
        skuName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        skuImage: [
          { required: true, message: "请上传商品图片", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        classId: [
          { required: true, message: "请输入商品类型", trigger: "blur" },
        ],
        unit: [
          { required: true, message: "请输入商品规格", trigger: "change" },
        ],
        brandName: [
          { required: true, message: "请输入品牌名", trigger: "blur" },
        ],
      },
      //商品类型列表
      classSkuList: [],
    };
  },

  created() {},

  methods: {
    handleAvatarSuccess(res, file) {
      this.myData.skuImage = URL.createObjectURL(file.raw);
    },
    //上传图片前置钩子
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 < 100;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 100KB!");
      }
      return isJPG && isLt2M;
    },

    //打开页面,获取商品类型
    async open() {
      if (!this.classSkuList[0]) {
        this.classSkuList = (
          await skuGetSearch({ pageSize: 10000 })
        ).currentPageRecords;
      }
    },

    //确认按钮
    async sureBtn() {
      try {
        await this.$refs.ruleForm.validate();
        if (this.myData.skuId) {
          await setSkuVm(this.myData);
          this.$message.success("修改成功");
        } else {
          await addSkuVm(this.myData);
          this.$message.success("添加成功");
        }
        //添加成功或者修改成功
        this.SET_PARAMS_SKU_NAME();
        this.getSkuListFn(this.params);
        this.close();
      } catch (error) {
        if (error?.response?.data) {
          this.$message.error(error.response.data);
        }
      }
    },

    //关闭弹窗
    close() {
      this.$refs.ruleForm.resetFields();
      this.$emit("update:skuIsShow", false);
      this.$emit("update:title", "新增商品");
      this.myData = {
        skuName: "",
        skuImage: "",
        price: "",
        classId: "",
        unit: "",
        brandName: "",
      };
    },

    ...mapActions("sku", ["getSkuListFn"]),
    ...mapMutations("sku", ["SET_PARAMS_SKU_NAME"]),
  },

  computed: {
    ...mapState("sku", ["params"]),
  },

  components: {
    Dialog,
  },

  props: {
    skuIsShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新增商品",
    },
    row: {
      type: Object,
    },
  },

  watch: {
    row() {
      console.log(this.row);
      this.myData = {
        skuId: this.row.skuId,
        skuName: this.row.skuName,
        skuImage: this.row.skuImage,
        price: this.row.price,
        classId: this.row.skuClass.classId,
        unit: this.row.unit,
        brandName: this.row.brandName,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  margin-left: 135px;
  font-size: 14px;
  color: #bac0cd;
}
.el-form {
  padding: 0 50px 0 30px;
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  ::v-deep .el-input__inner {
    width: 398px;
    height: 36px;
    margin-left: 5px;
  }

  .el-input-number {
    width: 100%;
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
.el-icon-plus {
  position: absolute;
  top: -30px;
  left: 0;
  line-height: unset;
  width: 100%;
  height: 100%;
}
::v-deep .el-upload {
  position: relative;
  width: 84px;
  height: 84px;
  img {
    line-height: unset;
    width: 100%;
    height: 100%;
  }
}
</style>

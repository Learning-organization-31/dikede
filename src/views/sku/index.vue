<template>
  <div v-loading="loading">
    <SerchBar lastInpTitle="商品搜索" @search="searchFn" />
    <div class="result">
      <div class="btn-title">
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="addFn"
        >
          新建
        </MyButton>
        <AddSku :skuIsShow.sync="skuIsShow" :title="title" :row="row" />
        <MyButton :btnStyle="dataBtnStyle" @click="dataAt"> 导入数据 </MyButton>
        <Dialog
          :businessIsShow="dataAtIsShow"
          title="数据导入"
          @close="close"
          @cancelBtn="close"
          width="483px"
          @sureBtn="sureBtn"
          v-if="dataAtIsShow"
        >
          <div class="text-add">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
            >
              <div class="btn-title">
                <span>标题:</span>
                <el-button size="small" type="primary">点击上传</el-button>
              </div>
              <div slot="tip" class="el-upload__tip">
                支持扩展名:xls、xlsx,文件不得大于1M
              </div>
            </el-upload>
          </div>
        </Dialog>
      </div>
      <SkuDataList @setSku="setSku" />
    </div>
    <FooterPage
      :taskList="skuList"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="lastPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import SerchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import SkuDataList from "./components/SkuDataList";
import FooterPage from "@/components/FooterPage";
import AddSku from "./components/AddSku";
import Dialog from "@/components/Dialog";
import { fileUp } from "@/api/sku";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Sku",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      //导入数据按钮样式
      dataBtnStyle: { background: "#fbf4f0", color: "#655b56" },
      skuIsShow: false,
      title: "新增商品",
      row: {},
      dataAtIsShow: false,
      //上传文件列表
      fileList: [],
      fileName: "",
    };
  },

  created() {
    //进入页面获取所有列表数据
    this.getSkuListFn(this.params);
  },

  methods: {
    // 点击确认按钮触发
    async sureBtn() {
      try {
        if (this.fileName) {
          //有文件就发送请求,没有就
          await fileUp(this.fileName);
          this.$message.success("上传成功");
          this.fileName = "";
          this.dataAtIsShow = false;
          this.SET_PAGE_INDEX();
          this.getSkuListFn(this.params);
        } else {
          this.$message.error("暂无可用文件");
        }
      } catch (error) {
        this.$message.error(error.response.data);
      }
    },

    //上传成功时的回调
    handleAvatarSuccess(res, file) {
      const formData = new FormData();
      formData.append("fileName", file.raw);
      this.fileName = formData;
    },
    //传输文件值钱先判断类型和大小
    beforeAvatarUpload(file) {
      const isXlS =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isXlS) {
        this.$message.error("支持扩展名必须为xls、xlsx");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isLt1M && isXlS;
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`);
    },

    //打开导入数据
    dataAt() {
      this.dataAtIsShow = true;
    },
    // 关闭导入数据弹框
    close() {
      this.dataAtIsShow = false;
    },

    //修改商品
    setSku(row) {
      this.skuIsShow = true;
      this.title = "修改商品";
      this.row = row;
    },

    //新增按钮点击触发
    addFn() {
      this.skuIsShow = true;
    },

    //上一页
    lastPage() {
      this.SET_PAGE_INDEX(-1);
      this.getSkuListFn(this.params);
    },
    //下一页
    nextPage() {
      this.SET_PAGE_INDEX(1);
      this.getSkuListFn(this.params);
    },

    //搜索获取新结果
    searchFn(name) {
      this.SET_PARAMS_SKU_NAME(name);
      this.SET_PAGE_INDEX();
      this.getSkuListFn(this.params);
    },

    ...mapActions("sku", ["getSkuListFn"]),
    ...mapMutations("sku", ["SET_PARAMS_SKU_NAME", "SET_PAGE_INDEX"]),
  },

  computed: {
    ...mapState("sku", ["loading", "skuList", "params"]),
    ...mapGetters("sku", ["lastDisabled", "rightDisabled"]),
  },

  components: {
    SerchBar,
    MyButton,
    SkuDataList,
    FooterPage,
    AddSku,
    Dialog,
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}

//新建按钮和工单按钮
.upload-demo {
  padding-right: 63px;
  // height: 70px;
}
.el-upload__tip {
  position: absolute;
  top: 100px;
  left: 125px;
  font-size: 14px;
  color: #bac0cd;
}
.btn-title {
  display: flex;
  margin-bottom: 20px;
}
.text-add {
  text-align: center;
  line-height: 40px;
  .el-button {
    margin-left: 20px;
    width: 220px;
  }
}
</style>

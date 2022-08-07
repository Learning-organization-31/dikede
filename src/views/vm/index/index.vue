<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBar lastInpTitle="设备编号" @search="onSearch" />

    <!-- 主体内容 -->
    <div class="result">
      <!-- 下方添加按钮 -->
      <div class="btn-title">
        <!-- 新建配置和弹窗 -->
        <MyButton
          :btnStyle="addBtnStyle"
          icon="el-icon-circle-plus-outline"
          @click="addCilck"
        >
          新建
        </MyButton>
        <!-- 工单配置和弹窗 -->
        <MyButton :btnStyle="businessBtnStyle"> 批量操作 </MyButton>
      </div>

      <!-- 新建按钮弹窗 -->
      <vmDialog :businessIsShow.sync="businessIsShow" />

      <!-- 表单 -->
      <vmTable v-loading="loading" />

      <!-- 底部按钮 -->
      <FooterPage
        :taskList="vmList"
        @lastPage="lastPage"
        @nextPage="nextPage"
        :listIsShow="!vmList.totalCount"
        :lastDisabled="lastDisabled"
        :rightDisabled="rightDisabled"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import vmTable from "./components/vm-table";
import FooterPage from "@/components/FooterPage";
import vmDialog from "./components/vm-dialog.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      //工单配置按钮样式
      businessBtnStyle: {
        background: "#fbf4f0",
        color: "#655b56",
      },
      multipleSelection: [], // 全选按钮
      loading: false,
      businessIsShow: false,
    };
  },
  components: { SearchBar, MyButton, vmTable, FooterPage, vmDialog },

  created() {
    this.getMyVmList();
  },

  methods: {
    ...mapActions("vm", ["getVmList", "getVmTypeList", "getNodeList"]),

    // 获取售货机列表
    async getMyVmList(payload) {
      this.loading = true;
      await this.getVmList(payload);
      this.loading = false;
    },

    // 点击新增
    addCilck() {
      this.getVmTypeList();
      this.getNodeList();
      this.businessIsShow = true;
    },

    // 点击搜索
    onSearch(val) {
      this.getMyVmList({ innerCode: val });
    },

    // 点击上一页
    lastPage() {
      if (this.loading) return; // 防抖
      this.getMyVmList({ pageIndex: this.vmList.pageIndex - 1 });
    },

    // 点击下一页
    nextPage() {
      if (this.loading) return; // 防抖
      this.getMyVmList({ pageIndex: this.vmList.pageIndex - 0 + 1 });
    },
  },

  computed: {
    ...mapState("vm", ["vmList"]),

    // 是否禁用上一页
    lastDisabled() {
      return this.vmList.pageIndex <= "1";
    },

    // 是否禁用下一页
    rightDisabled() {
      return this.vmList.pageIndex >= this.vmList.totalPage;
    },
  },
};
</script>

<style scoped lang="scss">
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;

  //新建按钮和工单按钮
  .btn-title {
    display: flex;
    margin-bottom: 20px;
  }
}
</style>

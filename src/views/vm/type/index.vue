<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBar lastInpTitle="型号搜索" @search="onsearch" />

    <!-- 主体内容 -->
    <div class="result">
      <!-- 下方添加按钮 -->
      <div class="btn-title">
        <!-- 新建配置 -->
        <MyButton
          @click="addVmServe"
          :btnStyle="addBtnStyle"
          icon="el-icon-circle-plus-outline"
        >
          新建
        </MyButton>
      </div>

      <!-- 添加按钮弹出层 -->
      <vmDialog
        :businessIsShow.sync="businessIsShow"
        @addvmTypeSucc="getVmTypeList"
      />

      <!-- 表格 -->
      <vmTable v-loading="loading" />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import vmTable from "./components/vm-table.vue";
import vmDialog from "./components/vm-dialog.vue";
export default {
  name: "",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      loading: false,
      businessIsShow: false,
    };
  },

  created() {
    this.getVmTypeList();
  },

  components: { SearchBar, vmTable, MyButton, vmDialog },

  methods: {
    // 获取售货机类型列表
    async getVmTypeList(payload) {
      this.loading = true;
      await this.$store.dispatch("vm/getVmTypeList", payload);
      this.loading = false;
    },

    // 点击新增
    addVmServe() {
      this.businessIsShow = true;
    },

    // 点击搜索
    onsearch(value) {
      this.getVmTypeList({ name: value });
    },
  },

  computed: {},
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

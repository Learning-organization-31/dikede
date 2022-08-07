<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBar lastInpTitle="型号搜索" />

    <!-- 主体内容 -->
    <div class="result">
      <!-- 下方添加按钮 -->
      <div class="btn-title">
        <!-- 新建配置和弹窗 -->
        <MyButton :btnStyle="addBtnStyle" icon="el-icon-circle-plus-outline">
          新建
        </MyButton>
      </div>

      <vmTable v-loading="loading" />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import vmTable from "./components/vm-table.vue";
export default {
  name: "",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      loading: false,
    };
  },

  created() {
    this.getVmTypeList();
  },

  components: { SearchBar, vmTable, MyButton },

  methods: {
    // 获取售货机类型列表
    async getVmTypeList(payload) {
      this.loading = true;
      await this.$store.dispatch("vm/getVmTypeList", payload);
      this.loading = false;
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

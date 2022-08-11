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

        <!-- 批量操作按钮 -->
        <MyButton :btnStyle="businessBtnStyle" @click="changeClick">
          批量操作
        </MyButton>
      </div>

      <!-- 新建按钮弹窗 -->
      <vmDialog :businessIsShow.sync="businessIsShow" />

      <!-- 批量操作弹窗 -->
      <vmChangeDia
        :multipleSelection="multipleSelection"
        :changebusinessIsShow.sync="changebusinessIsShow"
      />

      <!-- 表单 -->
      <vmTable
        ref="vmTable"
        v-loading="loading"
        @strategyClick="strategyClick"
        @exitVmServe="exitVmServe"
        @channelClick="channelClick"
      />

      <!-- 策略管理弹窗 -->
      <vmStrategyDia :StrategyDiaIsShow.sync="StrategyDiaIsShow" />

      <!-- 修改按钮弹窗 -->
      <vmExitDia
        ref="vmExitDia"
        :exitDiaIsShow.sync="exitDiaIsShow"
        :vmServerDeil="vmServerDeil"
        @updateView="getMyVmList"
      />

      <!-- 货道按钮弹窗 -->
      <vmChannelDia
        :channelDiaIsShow.sync="channelDiaIsShow"
        :VmServeDeil="VmServeDeil"
        :rowDeil="rowDeil"
      />

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
import vmChangeDia from "./components/vm-change-dia.vue";
import vmStrategyDia from "./components/vm-strategy-dia.vue";
import vmExitDia from "./components/vm-exit-dia.vue";
import vmChannelDia from "./components/vm-channel-dia.vue";
import { mapActions, mapState } from "vuex";
import { getVmServeDeilApi } from "@/api/vm/index";

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
      loading: false,
      businessIsShow: false,
      changebusinessIsShow: false,
      StrategyDiaIsShow: false,
      exitDiaIsShow: false,
      channelDiaIsShow: false,
      vmServerDeil: {},
      multipleSelection: [], // 全选按钮内容
      pageIndex: 1,
      VmServeDeil: {},
      rowDeil: {},
    };
  },
  components: {
    SearchBar,
    MyButton,
    vmTable,
    FooterPage,
    vmDialog,
    vmChangeDia,
    vmStrategyDia,
    vmExitDia,
    vmChannelDia,
  },

  created() {
    this.getMyVmList();
  },

  methods: {
    ...mapActions("vm", [
      "getVmList",
      "getVmTypeList",
      "getNodeList",
      "getPolicyList",
      "getVmPolicy",
      "getVmchannelList",
    ]),

    // 获取售货机列表
    async getMyVmList(data) {
      this.loading = true;
      await this.getVmList({ pageIndex: this.pageIndex, ...data });
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
      this.pageIndex -= 1;
      this.getMyVmList();
    },

    // 点击下一页
    nextPage() {
      if (this.loading) return; // 防抖
      this.pageIndex += 1;
      this.getMyVmList();
    },

    // 点击批量操作按钮打开弹窗
    changeClick() {
      const multipleSelection = this.$refs.vmTable.multipleSelection;
      if (!multipleSelection.length) {
        return this.$message.warning("请勾选售货机");
      }
      this.multipleSelection = multipleSelection;
      this.getPolicyList();
      this.changebusinessIsShow = true;
    },

    // 点击策略
    async strategyClick(innerCode) {
      await this.getVmPolicy(innerCode);

      if (!this.VmPolicy) {
        this.getPolicyList();
        this.multipleSelection = [innerCode];
        this.changebusinessIsShow = true;
        return;
      }
      this.StrategyDiaIsShow = true;
    },

    // 点击修改
    exitVmServe(vmServerDeil) {
      this.getNodeList();
      this.vmServerDeil = vmServerDeil;
      this.$refs.vmExitDia.nodeId = vmServerDeil.node.id;
      this.exitDiaIsShow = true;
    },

    // 点击货道
    async channelClick(rowDeil) {
      this.getVmchannelList(rowDeil.innerCode);
      this.VmServeDeil = await getVmServeDeilApi(rowDeil.type.typeId);
      this.channelDiaIsShow = true;
      this.rowDeil = rowDeil;
    },
  },

  computed: {
    ...mapState("vm", ["vmList", "VmPolicy"]),

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

<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBar lastInpTitle="设备编号" @search="searchBtn" />

    <!-- 主体内容 -->
    <div class="result">
      <!-- 表单区域 -->
      <vmTable v-loading="loading" :businessIsShow.sync="businessIsShow" />

      <!-- 详情弹出框 -->
      <Dialog
        :businessIsShow="businessIsShow"
        title="设备详情"
        @close="closeDialog"
        :twoBtn="false"
      >
        <div class="vm-dia">
          <div class="title">
            <li>
              销售量：<span>{{ orderCount }} 个</span>
            </li>
            <li>
              销售额：<span>{{ myorderAmount }} 元</span>
            </li>
            <li>
              补货次数：<span>{{ supplyCount }} 次</span>
            </li>
            <li>
              维修次数：<span>{{ repairCount }} 次</span>
            </li>
          </div>
          <div class="content">
            <p>商品销量（月）</p>
            <el-row>
              <el-col
                :span="6"
                v-for="(item, index) in skuCollect"
                :key="index"
              >
                <span class="projectName" :title="item.skuName">
                  {{ item.skuName }}</span
                >
                ：{{ item.count }}</el-col
              >
              <el-col style="border: unset" v-if="skuCollect.length === 0"
                ><p>当前设备未销售商品</p></el-col
              >
            </el-row>
          </div>
        </div>
      </Dialog>

      <!-- 底部上下页 -->
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
import vmTable from "./components/vm-table.vue";
import FooterPage from "@/components/FooterPage";
import Dialog from "@/components/Dialog";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      loading: false,
      businessIsShow: false,
    };
  },

  components: { SearchBar, vmTable, FooterPage, Dialog },

  created() {
    this.getVmList();
  },

  methods: {
    // 获取售货机列表
    async getVmList(payload) {
      this.loading = true;
      await this.$store.dispatch("vm/getVmList", payload);
      this.loading = false;
    },

    // 点击搜索按钮
    searchBtn(value) {
      this.getVmList({ innerCode: value });
    },

    // 关闭模态框
    closeDialog() {
      this.businessIsShow = false;
    },

    // 点击上一页
    lastPage() {
      if (this.loading) return; // 防抖
      this.getVmList({ pageIndex: this.vmList.pageIndex - 1 });
    },

    // 点击下一页
    nextPage() {
      if (this.loading) return; // 防抖
      this.getVmList({ pageIndex: this.vmList.pageIndex - 0 + 1 });
    },
  },

  computed: {
    ...mapState("vm", [
      "vmList",
      "orderCount",
      "orderAmount",
      "supplyCount",
      "repairCount",
      "skuCollect",
    ]),

    // 转换商品收入
    myorderAmount() {
      const orderAmount = this.orderAmount / 100;
      return orderAmount > 10000
        ? (orderAmount / 10000).toFixed(2) + "万"
        : orderAmount;
    },

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
  .vm-dia {
    padding: 5px;
    .title {
      display: flex;
      height: 50px;
      text-align: center;
      align-items: center;
      background-color: #f4f6fb;
      li {
        flex: 1;
        list-style: none;
        span {
          color: #88a4fe;
        }
      }
    }
    .content {
      margin-top: 20px;
      .el-col {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -1px;
        margin-top: -1px;
        border: 1px solid #ccc;
        height: 40px;
      }
      .projectName {
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

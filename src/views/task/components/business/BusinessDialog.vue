<template>
  <Dialog
    :businessIsShow="businessIsShow"
    @businessUnShow="businessUnShow"
    @sureBtn="sureBtnFn"
    @cancelBtn="businessUnShow"
    @open="supplyAlertValueFn"
    @close="businessUnShow"
    title="工单配置"
  >
    <div class="content">
      <div class="text">补货警戒线：</div>
      <el-input-number
        v-model="num"
        controls-position="right"
        :min="1"
        :max="100"
        size="small"
      />
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { mapActions, mapState } from "vuex";
import { getSupplyAlertValue, setSupplyAlertValue } from "@/api/task";

export default {
  name: "BusinessDialog",
  data() {
    return {
      num: "",
    };
  },

  props: {},

  created() {},

  methods: {
    //打开工单配置获取捕获警戒线值
    async supplyAlertValueFn() {
      try {
        this.num = await getSupplyAlertValue();
      } catch (error) {
        console.log(error);
      }
    },
    // 确认按钮  设置捕获警戒线值
    async sureBtnFn() {
      try {
        await setSupplyAlertValue(this.num);
        this.$message.success("修改成功");
        //关闭弹窗
        this.businessUnShow();
      } catch (error) {
        console.log(error);
      }
    },
    //关闭工单配置弹窗
    businessUnShow() {
      this.setBusinessIsShow(false);
    },
    ...mapActions("task", ["setBusinessIsShow"]),
  },

  computed: {
    ...mapState("task", ["businessIsShow"]),
  },

  components: {
    Dialog,
  },
};
</script>

<style lang="scss" scoped>
// 中间内容部分样式
.content {
  display: flex;
  justify-content: center;
  .text {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #606266;
    margin-right: 15px;
    &::before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  .el-input-number {
    width: 396px;
    height: 36px;
  }
  &::v-deep .el-input-number__increase {
    height: 18px;
    width: 40px;
    line-height: 18px;
  }
  &::v-deep .el-input-number__decrease {
    height: 18px;
    width: 40px;
    line-height: 18px;
  }
  &::v-deep .el-input__inner {
    height: 36px;
  }
}
</style>

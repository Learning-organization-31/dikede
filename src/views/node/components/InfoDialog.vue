<template>
  <Dialog
    title="点位详情"
    :businessIsShow="infoIsShow"
    :twoBtn="false"
    @close="closeFn"
  >
    <!-- 列表 -->
    <el-table
      :data="infoList"
      :height="infoList[0] ? '528' : '120'"
      stripe
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column prop="pageIndex" label="序号" width="60px">
        <template v-slot="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="innerCode" label="机器编号"> </el-table-column>
      <el-table-column prop="vmStatus" label="设备状态"> </el-table-column>
      <el-table-column prop="lastSupplyTime" label="最后一次供货时间">
      </el-table-column>
    </el-table>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { getNodeInfo } from "@/api/node";
export default {
  name: "InfoDialog",
  data() {
    return {
      // 信息列表
      infoList: [],
      loading: false,
    };
  },

  created() {},

  methods: {
    //每次点击获取最新的点位详情数据,通过watch监视rowInfo的改动进行获取
    async getInfo() {
      this.infoList = await getNodeInfo(this.rowInfo.id);
    },
    //关闭弹层
    closeFn() {
      this.$emit("update:infoIsShow", false);
    },
  },

  computed: {},

  props: {
    infoIsShow: {
      type: Boolean,
      default: false,
    },
    rowInfo: {
      type: Object,
      required: true,
    },
  },

  watch: {
    //监视传递过来的单独详情数据进行获取最新的点位详情
    rowInfo() {
      this.getInfo();
    },
  },

  components: {
    Dialog,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog .el-dialog__body {
  padding: 20px 40px;
}
::v-deep .is-leaf {
  background-color: #f3f6fb !important;
}
</style>

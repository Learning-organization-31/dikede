<template>
  <Dialog
    title="补货详情"
    :businessIsShow="channelDialogIsShow"
    @close="closeFn"
    @cancelBtn="closeFn"
    @sureBtn="sureBtnFn"
  >
    <el-table
      :data="ChannelList"
      height="350"
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column label="货道编号" width="80">
        <template v-slot="scope">
          {{ scope.row.channelCode }}
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="120">
        <template v-slot="scope">
          {{ (scope.row.sku && scope.row.sku.skuName) || "-" }}
        </template>
      </el-table-column>
      <el-table-column label="当前数量" width="90">
        <template v-slot="scope">
          {{ scope.row.sku ? scope.row.currentCapacity : "-" }}
        </template>
      </el-table-column>
      <el-table-column label="还可添加" width="90">
        <template v-slot="scope">
          {{
            scope.row.sku
              ? scope.row.maxCapacity - scope.row.currentCapacity
              : "-"
          }}
        </template>
      </el-table-column>
      <el-table-column label="补满数量" width="210">
        <template v-slot="scope">
          <el-input-number
            v-if="scope.row.sku"
            v-model="scope.row.currentCapacity"
            controls-position="right"
            :min="0"
            :max="scope.row.maxCapacity"
          ></el-input-number>
          <span v-else>货道暂无商品</span>
        </template>
      </el-table-column>
    </el-table>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { mapActions, mapState } from "vuex";
export default {
  name: "ChannelDialog",
  data() {
    return {};
  },

  created() {},

  methods: {
    //关闭弹窗修改弹窗状态
    closeFn() {
      this.setChannelDialogIsShow(false);
    },
    //点击确认按钮触发
    sureBtnFn() {
      this.$emit("upDataService");
      this.closeFn();
    },
    ...mapActions("task", ["setChannelDialogIsShow"]),
  },

  computed: {
    ...mapState("task", ["channelDialogIsShow"]),
  },

  props: {
    ChannelList: {
      type: Array,
      required: true,
    },
  },

  watch: {},

  components: {
    Dialog,
  },
};
</script>

<style scoped></style>

<template>
  <Dialog
    :businessIsShow="detailInfoIsShow"
    :twoBtn="false"
    @close="setDetailInfoIsShow"
    title="补货详情"
  >
    <el-table :data="detailInfoList" height="350" stripe style="width: 100%">
      <el-table-column prop="channelCode" label="货道编号" width="190">
      </el-table-column>
      <el-table-column prop="skuName" label="商品" width="190">
      </el-table-column>
      <el-table-column prop="expectCapacity" label="补货数量" width="190">
      </el-table-column>
    </el-table>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { getDetailInfo } from "@/api/task";
import { mapActions, mapState } from "vuex";
export default {
  name: "DetailInfoDialog",
  data() {
    return {
      detailInfoList: [],
    };
  },

  created() {},

  methods: {
    //获取补货工单详情数据
    async getDetailInfo() {
      try {
        this.detailInfoList = await getDetailInfo(this.taskId);
        //并传提一套至vuex中方便后续使用
        this.setDetailInfoList(this.detailInfoList);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions("task", ["setDetailInfoIsShow", "setDetailInfoList"]),
  },

  computed: {
    ...mapState("task", ["detailInfoIsShow"]),
  },

  props: {
    taskId: {
      trype: String,
      requestd: true,
    },
  },

  watch: {
    taskId: {
      immediate: true,
      handler() {
        this.getDetailInfo();
      },
    },
  },

  components: {
    Dialog,
  },
};
</script>

<style scoped></style>

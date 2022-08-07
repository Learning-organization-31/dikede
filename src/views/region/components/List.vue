<template>
  <el-table
    :data="regionList.currentPageRecords"
    :height="
      regionList.currentPageRecords && regionList.currentPageRecords[0]
        ? '528'
        : '120'
    "
    stripe
    style="width: 100%"
    empty-text="暂无数据"
  >
    <el-table-column label="序号" width="80px">
      <template slot-scope="scope">
        <span>{{ scope.$index + 1 + (regionList.pageIndex - 1) * 10 }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="区域名称"> </el-table-column>
    <el-table-column prop="nodeCount" label="点位数"> </el-table-column>
    <el-table-column prop="remark" label="备注说明"> </el-table-column>
    <el-table-column prop="taskId" label="操作" width="200px">
      <template slot-scope="">
        <span class="col-text col-get"> 查看详情 </span>
        <span class="col-text col-set"> 修改 </span>
        <span class="col-text col-remove"> 删除 </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "RegionList",
  data() {
    return {};
  },

  created() {},

  methods: {},

  computed: {},

  props: {
    regionList: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .has-gutter {
  .cell {
    color: rgb(102, 102, 102);
    font-weight: 400;
  }
}

.col-text {
  color: #5f84ff;
  opacity: 0.8;
  cursor: pointer;
  margin-right: 7px;
}
.col-remove {
  color: red;
}
</style>

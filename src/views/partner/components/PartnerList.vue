<template>
  <el-table
    :data="List.currentPageRecords"
    :height="
      List.currentPageRecords && List.currentPageRecords[0] ? '528' : '120'
    "
    stripe
    style="width: 100%"
    empty-text="暂无数据"
  >
    <el-table-column label="序号" width="80px">
      <template slot-scope="scope">
        <span>{{ scope.$index + 1 + (List.pageIndex - 1) * 10 }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="合作商名称"> </el-table-column>
    <el-table-column prop="account" label="账号"> </el-table-column>
    <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
    <el-table-column prop="ratio" :formatter="formatter" label="分成比例">
    </el-table-column>
    <el-table-column prop="contact" label="联系人"> </el-table-column>
    <el-table-column prop="mobile" label="联系电话"> </el-table-column>
    <el-table-column prop="taskId" label="操作" width="235px">
      <template slot-scope="">
        <span class="col-text col-get"> 重置密码 </span>
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

  methods: {
    //格式化百分比
    formatter(row, column, cellValue) {
      return cellValue + "%";
    },
  },

  computed: {},

  props: {
    List: {
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

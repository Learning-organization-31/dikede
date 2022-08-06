<template>
  <el-table
    ref="multipleTable"
    :data="vmList.currentPageRecords"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="innerCode" label="设备编号" width="180" />
    <el-table-column prop="type.name" label="设备型号" width="180" />
    <el-table-column
      prop="node.addr"
      show-overflow-tooltip
      label="详细地址"
      width="180"
    />
    <el-table-column prop="ownerName" label="合作商" width="180" />
    <el-table-column
      prop="vmStatus"
      :formatter="vmStatus"
      label="设备状态"
      width="130"
    />
    <el-table-column label="操作" width="180">
      <span class="tb-span">货道</span>
      <span class="tb-span">策略</span>
      <span class="tb-span">修改</span>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    // 表单复选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 售货机状态，0:未投放;1-运营;3-撤机
    vmStatus(a, b, value) {
      if (value === 0) return "未投放";
      if (value === 1) return "运营";
      if (value === 3) return "撤机";
    },
  },
  computed: {
    ...mapState("vm", ["vmList"]),
  },
};
</script>

<style scoped lang="scss">
/* 表单操作内的span */
.tb-span {
  color: #6c8eff;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    color: #4368e1;
  }
}
</style>

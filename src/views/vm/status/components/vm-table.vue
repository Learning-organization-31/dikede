<template>
  <el-table
    ref="multipleTable"
    :data="vmList.currentPageRecords"
    tooltip-effect="dark"
    style="width: 100%"
  >
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="innerCode" label="设备编号" />
    <el-table-column prop="type.name" label="设备型号" />
    <el-table-column
      prop="node.addr"
      :formatter="vmAddr"
      show-overflow-tooltip
      label="详细地址"
    />
    <el-table-column prop="vmStatus" :formatter="vmStatus" label="运营状态" />
    <el-table-column label="设备状态" width="230">
      <template v-slot="{ $index }">
        <div style="display: flex">
          <Mytag
            :color="
              vmList.currentPageRecords[$index].status['10001']
                ? '#48d598'
                : '#ffb53a'
            "
            >离线</Mytag
          >
          <Mytag
            :color="
              vmList.currentPageRecords[$index].status['10002']
                ? '#48d598'
                : '#ffb53a'
            "
            >货道</Mytag
          >
          <Mytag
            :color="
              vmList.currentPageRecords[$index].status['10003']
                ? '#48d598'
                : '#ffb53a'
            "
            >轴传动</Mytag
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ $index }">
        <span class="tb-span" @click="checkDetails($index)">查看详情</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Mytag from "@/components/MyTag";
export default {
  props: ["businessIsShow"],
  methods: {
    ...mapActions("vm", [
      "getorderCount",
      "getorderAmount",
      "getsupplyCount",
      "getrepairCount",
      "getskuCollect",
    ]),
    // 售货机状态，0:未投放;1-运营;3-撤机
    vmStatus(a, b, value) {
      if (value === 0) return "未投放";
      if (value === 1) return "运营";
      if (value === 3) return "撤机";
    },
    // 详细地址
    vmAddr(a, b, value) {
      // return value.split("-")[3] ? value.split("-")[3] : value.split("-")[1];
      return value.split("-")[3] ? value.split("-")[3] : value;
    },
    // 查看详情
    checkDetails(index) {
      const innerCode = this.vmList.currentPageRecords[index].innerCode;
      this.getskuCollect(innerCode);
      this.getorderCount(innerCode);
      this.getorderAmount(innerCode);
      this.getsupplyCount(innerCode);
      this.getrepairCount(innerCode);
      this.$emit("update:businessIsShow", true);
    },
  },
  computed: {
    ...mapState("vm", ["vmList"]),
  },
  components: { Mytag },
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

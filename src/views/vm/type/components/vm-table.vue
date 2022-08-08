<template>
  <el-table
    ref="multipleTable"
    :data="VmTypeList.currentPageRecords"
    tooltip-effect="dark"
    style="width: 100%"
  >
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column prop="name" label="型号名称" />
    <el-table-column prop="model" label="型号编码" />
    <el-table-column label="设备图片">
      <template v-slot="{ $index }">
        <el-avatar
          :size="24"
          :src="VmTypeList.currentPageRecords[$index].image"
        />
      </template>
    </el-table-column>
    <el-table-column prop="vmRow" label="货道行" />
    <el-table-column prop="vmCol" label="货道列" />
    <el-table-column prop="channelMaxCapacity" label="设备容量" />
    <el-table-column label="操作">
      <template v-slot="{ $index }">
        <span class="tb-span" @click="exitVmServe($index)">修改</span>
        <span class="tb-span del" @click="delVmServe($index)">删除</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("vm", ["VmTypeList"]),
  },
  methods: {
    // 点击编辑
    exitVmServe(index) {
      const typeId = this.VmTypeList.currentPageRecords[index].typeId;
      this.$emit("exitVmServe", typeId);
    },

    // 点击删除
    delVmServe(index) {
      const typeId = this.VmTypeList.currentPageRecords[index].typeId;
      this.$emit("delVmServe", typeId);
    },
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
  &.del {
    color: #ff5a5a;
    &:hover {
      color: #eb4444;
    }
  }
}
</style>

<template>
  <el-table
    :data="skuList.currentPageRecords"
    :height="
      skuList.currentPageRecords && skuList.currentPageRecords[0]
        ? '528'
        : '120'
    "
    stripe
    style="width: 100%"
    empty-text="暂无数据"
  >
    <el-table-column label="序号" width="80px">
      <template slot-scope="scope">
        <span>{{ scope.$index + 1 + (skuList.pageIndex - 1) * 10 }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="className" label="商品类型名称"> </el-table-column>
    <el-table-column prop="taskId" label="操作" width="160px">
      <template slot-scope="scpoe">
        <span class="col-text col-set" @click="setSku(scpoe.row)"> 修改 </span>
        <span class="col-text col-remove" @click="removeSku(scpoe.row)">
          删除
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { removeSkuClass } from "@/api/sku-class";
export default {
  name: "SkuList",
  data() {
    return {};
  },

  created() {},

  methods: {
    //修改商品类型
    setSku(row) {
      this.$emit("setSku", row);
    },

    //删除商品类型
    async removeSku(row) {
      try {
        await this.$confirm("是否删除该商品类型", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        });
        await removeSkuClass(row.classId);
        this.$message.success("删除成功");
        this.$emit("init");
      } catch (error) {
        if (error?.response?.data) {
          this.$message.error(error.response.data);
        }
      }
    },
  },

  computed: {},

  props: {
    skuList: {
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

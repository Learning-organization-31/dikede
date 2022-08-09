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
    <el-table-column prop="skuName" label="商品名称"> </el-table-column>
    <el-table-column prop="skuImage" label="商品图片">
      <template slot-scope="{ row }">
        <div class="img">
          <img :src="row.skuImage" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="brandName" label="品牌"> </el-table-column>
    <el-table-column prop="unit" label="规格"> </el-table-column>
    <el-table-column prop="price" :formatter="fliterPrice" label="商品价格">
    </el-table-column>
    <el-table-column prop="skuClass.className" label="商品类型">
    </el-table-column>
    <el-table-column prop="updateTime" :formatter="fliterTime" label="创建日期">
    </el-table-column>
    <el-table-column label="操作" width="100px">
      <template slot-scope="scpoe">
        <span class="col-text col-set" @click="setSku(scpoe.row)"> 修改 </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "SkuDataList",
  data() {
    return {};
  },

  created() {},

  methods: {
    //过滤价格
    fliterPrice(row) {
      return "￥" + row.price / 100;
    },

    //过滤日期
    fliterTime(row) {
      return dayjs(row.updateTime).format("YYYY-MM-DD mm.hh.ss");
    },

    //修改
    setSku(row) {
      this.$emit("setSku", row);
    },
  },

  computed: {
    ...mapState("sku", ["skuList"]),
  },

  props: {},
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
.img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  height: 490px;
  opacity: 0;
  width: 0;
}
</style>

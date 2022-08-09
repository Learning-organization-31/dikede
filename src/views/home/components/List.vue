<template>
  <div class="list">
    <div class="title">
      商品热榜
      <span>{{ getCurrentMonthFirstNo }} ~ {{ getCurrentNowNo }}</span>
    </div>
    <div class="sku-list">
      <el-row type="flex" v-for="(item, index) in skuTopList" :key="index">
        <el-col :span="6">
          <div class="list-img list-img1" v-if="index === 0">
            {{ index + 1 }}
          </div>

          <div class="list-img list-img2" v-else-if="index === 1">
            {{ index + 1 }}
          </div>

          <div class="list-img list-img3" v-else-if="index === 2">
            {{ index + 1 }}
          </div>

          <div class="list-img list-img4" v-else>{{ index + 1 }}</div>
        </el-col>
        <el-col>
          <span class="list-name">{{ item.skuName }}</span>
        </el-col>
        <el-col :span="4">
          <span class="number">{{ item.count }}单</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getSkuTop } from "@/api/home";
import {
  getCurrentMonthFirst,
  getCurrentMonthFirstNo,
  getCurrentNow,
  getCurrentNowNo,
} from "@/utils/home";

export default {
  name: "List",
  data() {
    return {
      getCurrentMonthFirstNo: getCurrentMonthFirstNo(), //当月第一天不带时分秒
      getCurrentNowNo: getCurrentNowNo(), //当周第一天不带时分秒
      start: getCurrentMonthFirst(), //当月第一天发请求用
      end: getCurrentNow(), //当前时间发请求用
      skuTopList: [],
    };
  },

  created() {
    //获取top10
    this.getSkuTop();
  },

  methods: {
    async getSkuTop() {
      const date = Date.now();
      const start = dayjs(date).format("YYYY-MM") + "-01";
      const end = dayjs(date).format("YYYY-MM-DD");
      this.skuTopList = await getSkuTop({
        topValue: 10,
        start,
        end,
      });
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
//商品热榜样式
.list {
  border-radius: 15px;
  padding: 20px;
  width: 413px;
  height: 538px;
  background-color: #fff;
}
//头部区域
.title {
  position: relative;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  z-index: 1;
  span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
  }
}

// 列表样式
.sku-list {
  margin-top: 20px;
  padding-left: 10px;
  .list-img {
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    background: url(~@/assets/imgs/jiangbei4.png);
    width: 21px;
    height: 20px;
    line-height: 15px;
  }
  .list-img1 {
    background: url(~@/assets/imgs/jiangbei1.png);
  }
  .list-img2 {
    background: url(~@/assets/imgs/jiangbei2.png);
  }
  .list-img3 {
    color: #cf6d3d;
    background: url(~@/assets/imgs/jiangbei3.png);
  }
  .list-img4 {
    color: #e9b499;
  }

  .list-name {
    font-weight: 500;
    color: #333;
    height: 20px;
    font-size: 14px;
  }
  .number {
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #737589;
    line-height: 20px;
    text-align: right;
  }
}

.el-row {
  margin: 27px 0;
}
</style>

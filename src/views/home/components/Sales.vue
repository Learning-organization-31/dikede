<template>
  <div class="task-bottom">
    <div class="task-top">
      <div class="title">
        销售数据
        <span>{{ getCurrentMonthFirstNo }} ~ {{ getCurrentNowNo }}</span>
      </div>
      <div class="time">
        <div
          class="time-div"
          :class="{ ischeckoud: index === 1 }"
          @click="clickWeek"
        >
          周
        </div>
        <div
          class="time-div"
          :class="{ ischeckoud: index === 2 }"
          @click="clickM"
        >
          月
        </div>
        <div
          class="time-div"
          :class="{ ischeckoud: index === 3 }"
          @click="clickY"
        >
          年
        </div>
      </div>
    </div>
    <div class="examples">
      <div ref="simple" class="simple">
        <el-empty description="暂无内容" :image="image"></el-empty>
      </div>
      <div ref="align" class="align">
        <el-empty description="暂无内容" :image="image"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import image from "@/assets/imgs/no.png";
import { getAmountCollect, getRegionCollect } from "@/api/home";
import {
  getCurrentone,
  getCurrentNowNo,
  getCurrentMonthFirstNo,
  getCurrentNowNoTitle,
  getCurrentMonthOne,
} from "@/utils/home";
export default {
  name: "Sales",
  data() {
    return {
      getCurrentMonthFirstNo: getCurrentMonthFirstNo(),
      getCurrentNowNo: getCurrentNowNo(),
      image, //图片地址
      index: 1, //控制当前的周月年
      AmountCollect: {}, //线型图的数据
      RegionCollect: {}, //柱形图的数据
    };
  },

  created() {},

  mounted() {
    //进入页面获取销售数据用于渲染条形图
    this.getAmountCollect({
      collectType: 1,
      start: getCurrentone(),
      end: getCurrentNowNoTitle(),
    });
    //根据地区汇总销售额数据渲染柱形图
    this.getRegionCollect({
      start: getCurrentone(),
      end: getCurrentNowNoTitle(),
    });
  },

  methods: {
    //渲染条形图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.simple);
      // 绘制图表
      myChart.setOption({
        title: {
          text: "销售额趋势图",
          left: "center",
          textStyle: {
            fontSize: 14,
          },
        },
        tooltip: {},
        xAxis: {
          data: this.AmountCollect.xAxis,
        },
        yAxis: [
          {
            name: "单位:  元",
          },
        ],
        series: [
          {
            data: this.AmountCollect.series,
            type: "line",
            color: "red",
            smooth: true,
          },
        ],
      });
    },

    //渲染柱形图
    drawCategory() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.align);
      myChart.setOption({
        xAxis: {
          type: "category",
          data: this.RegionCollect.xAxis,
        },
        yAxis: {
          name: "单位:  元",
        },
        series: [
          {
            data: this.RegionCollect.series,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    },

    //获取线形图数据
    async getAmountCollect(params) {
      const res = await getAmountCollect(params);
      res.series = res.series.map((item) => item / 100);
      this.AmountCollect = res;
      this.drawLine();
    },

    //获取柱形图的数据
    async getRegionCollect(params) {
      const res = await getRegionCollect(params);
      res.series = res.series.map((item) => item / 100);
      this.RegionCollect = res;
      this.drawCategory();
      console.log(this.RegionCollect);
    },

    //切换为周
    clickWeek() {
      if (this.index === 1) return;
      this.index = 1;
      this.getAmountCollect({
        collectType: 1,
        start: getCurrentone(),
        end: getCurrentNowNoTitle(),
      });
      this.getRegionCollect({
        start: getCurrentone(),
        end: getCurrentNowNoTitle(),
      });
    },
    //切换为月
    clickM() {
      if (this.index === 2) return;
      this.index = 2;
      this.getAmountCollect({
        collectType: 1,
        start: getCurrentMonthOne(),
        end: getCurrentNowNoTitle(),
      });
      this.getRegionCollect({
        start: getCurrentMonthOne(),
        end: getCurrentNowNoTitle(),
      });
    },
    //切换为年
    clickY() {
      if (this.index === 3) return;
      this.index = 3;
      this.getAmountCollect({
        collectType: 2,
        start: dayjs(Date.now()).format("YYYY") + "-01-01",
        end: getCurrentNowNoTitle(),
      });
      this.getRegionCollect({
        start: dayjs(Date.now()).format("YYYY") + "-01-01",
        end: getCurrentNowNoTitle(),
      });
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
//销售数据样式
.task-bottom {
  position: relative;
  margin-top: 20px;
  height: 352px;
  border-radius: 15px;
  background-color: #fff;
  padding: 20px;
  .time {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 129px;
    height: 34px;
    border-radius: 7px;
    background: rgba(233, 243, 255, 0.37);
    .time-div {
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
      width: 37px;
      height: 25px;
      text-align: center;
      line-height: 25px;
    }
    .ischeckoud {
      background: #fff;
      box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      border-radius: 7px;
      font-weight: 600;
      color: #333;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
    }
  }
}

.task-top {
  display: flex;
  justify-content: space-between;
}
//头部区域
.title {
  position: relative;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  z-index: 1;
  span {
    font-size: 12px;
    font-weight: 400;
    color: #999;
  }
}

.examples {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  //下方线型图区域
  .simple {
    width: 620px;
    height: 278px;
  }
  //下方柱形图区域
  .align {
    width: 620px;
    height: 278px;
  }
}
</style>

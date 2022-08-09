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
        grid: {
          left: 90,
        },
        xAxis: {
          boundaryGap: false,
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
            areaStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0.1,
                      color: "#ff5757", //0%处的颜色
                    },
                    {
                      offset: 0.8,
                      color: "#fdf6f6", //100%处的颜色
                    },
                  ],
                  globlCoord: false,
                },
              },
            },
          },
        ],
        tooltip: {
          trigger: "axis",
        },
      });
    },

    //渲染柱形图
    drawCategory() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.align);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
        },
        title: {
          text: "销售额分布",
          left: "center",
          textStyle: {
            fontSize: 14,
          },
        },
        grid: {
          left: 90,
        },
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
            color: "#91b0ff",
            barWidth: "15",
            itemStyle: {
              barBorderRadius: [6, 6, 0, 0],
            },
          },
        ],
      });
    },

    //获取线形图数据
    async getAmountCollect(params) {
      const res = await getAmountCollect(params);
      res.series = res.series.map((item) => item / 100);
      if (this.index === 1) {
        res.xAxis = res.xAxis.map((item) => {
          return this.isDay(dayjs(item).day());
        });
      } else if (this.index === 2) {
        res.xAxis = res.xAxis.map((item) => {
          return dayjs(item).format("MM月DD日");
        });
      } else if (this.index === 3) {
        res.xAxis = res.xAxis.map((item) => {
          return dayjs(item).format("YY年MM月");
        });
      }
      this.AmountCollect = res;
      this.drawLine();
    },

    //获取柱形图的数据
    async getRegionCollect(params) {
      const res = await getRegionCollect(params);
      res.series = res.series.map((item) => item / 100);
      this.RegionCollect = res;
      this.drawCategory();
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

    //用来返回星期几
    isDay(num) {
      switch (num) {
        case 0:
          return "星期天";
        case 1:
          return "星期一";
        case 2:
          return "星期二";
        case 3:
          return "星期三";
        case 4:
          return "星期四";
        case 5:
          return "星期五";
        case 6:
          return "星期六";
      }
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

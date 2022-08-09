<template>
  <div class="es">
    <div class="flex">
      <div class="title">合作商点位数Top5</div>
      <i
        class="el-icon-chat-line-round"
        @click="$router.push('/node/partner')"
      ></i>
    </div>
    <div ref="basic" class="basic">
      <el-empty description="暂无内容" :image="image"></el-empty>
    </div>
    <div class="dianwei">
      <div class="count">25</div>
      <div class="name">点位数</div>
      <div class="count">5</div>
      <div class="name">合作商数</div>
    </div>
  </div>
</template>

<script>
import image from "@/assets/imgs/no.png";
export default {
  name: "Partner",
  data() {
    return {
      image,
    };
  },

  created() {},

  mounted() {
    // this.drawLine();
  },

  methods: {
    // drawLine() {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart = this.$echarts.init(this.$refs.basic);
    //   myChart.setOption({
    //     legend: {
    //       top: "bottom",
    //     },
    //     toolbox: {
    //       show: true,
    //       feature: {
    //         mark: { show: true },
    //         dataView: { show: true, readOnly: false },
    //         restore: { show: true },
    //         saveAsImage: { show: true },
    //       },
    //     },
    //     series: [
    //       {
    //         name: "Nightingale Chart",
    //         type: "pie",
    //         radius: [50, 250],
    //         center: ["50%", "50%"],
    //         roseType: "area",
    //         itemStyle: {
    //           borderRadius: 8,
    //         },
    //         data: [
    //           { value: 40, name: "rose 1" },
    //           { value: 38, name: "rose 2" },
    //           { value: 32, name: "rose 3" },
    //           { value: 30, name: "rose 4" },
    //           { value: 28, name: "rose 5" },
    //           { value: 26, name: "rose 6" },
    //           { value: 22, name: "rose 7" },
    //           { value: 18, name: "rose 8" },
    //         ],
    //       },
    //     ],
    //   });
    // },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.es {
  position: relative;
  width: 990px;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
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

.flex {
  display: flex;
  justify-content: space-between;
}

.el-icon-chat-line-round {
  color: #5f84ff;
  cursor: pointer;
  font-size: 20px;
}
.basic {
  width: 668px;
  height: 284px;
  margin-top: 20px;
}

.dianwei {
  position: absolute;
  right: 100px;
  top: 60px;
  width: 154px;
  height: 230px;
  background-color: #f8f8f9;
  padding: 47px 0 0 38px;
  .count {
    height: 33px;
    font-size: 24px;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
  }
  .name {
    height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
  }
}
</style>

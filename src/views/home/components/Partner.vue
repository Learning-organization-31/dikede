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
      <div class="count">{{ NodeCount }}</div>
      <div class="name">点位数</div>
      <div class="count">{{ PartnerCount }}</div>
      <div class="name">合作商数</div>
    </div>
  </div>
</template>

<script>
import image from "@/assets/imgs/no.png";
import {
  getNodeCollectApi,
  getNodeCountApi,
  getPartnerCountApi,
} from "@/api/home";
export default {
  name: "Partner",
  data() {
    return {
      image,
      NodeCollect: [],
      NodeCount: "",
      PartnerCount: "",
    };
  },

  async created() {
    this.NodeCollect = await getNodeCollectApi();
    this.drawLine();
    this.NodeCount = await getNodeCountApi();
    this.PartnerCount = await getPartnerCountApi();
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.basic);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: "合作商点照射Top5",
            type: "pie",
            radius: [20, 100],
            center: ["30%", "50%"],
            roseType: "radius",
            data: this.NodeCollect,
          },
        ],
      });
    },
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

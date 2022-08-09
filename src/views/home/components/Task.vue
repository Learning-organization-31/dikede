<template>
  <div class="task-top">
    <div class="tongji">
      <img src="~@/assets/imgs/bg1.png" class="bg1" />
      <img src="~@/assets/imgs/bg2.png" class="bg2" />
      <div class="title">
        工单统计
        <span>{{ getCurrentMonthFirstNo }} ~ {{ getCurrentNowNo }}</span>
      </div>
      <ul class="last-ul">
        <li>
          <div>{{ total }}</div>
          <p>工单总数（个）</p>
        </li>
        <li>
          <div>{{ completedTotal }}</div>
          <p>完成工单（个）</p>
        </li>
        <li>
          <div>{{ progressTotal }}</div>
          <p>进行工单（个）</p>
        </li>
        <li>
          <div>{{ cancelTotal }}</div>
          <p>取消工单（个）</p>
        </li>
      </ul>
    </div>
    <div class="xiaoshou">
      <img src="~@/assets/imgs/bg4.png" class="bg4" />
      <div class="title">
        销售统计
        <span>{{ getCurrentMonthFirstNo }} ~ {{ getCurrentNowNo }}</span>
      </div>
      <ul class="right-ul">
        <li>
          <div>{{ orderCount }}</div>
          <p>订单量（个）</p>
        </li>
        <li>
          <div>{{ amount }}</div>
          <p>销售额（万元）</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getOrderCount, getAmount, getTaskReportInfo } from "@/api/home";
import {
  getCurrentMonthFirst,
  getCurrentMonthFirstNo,
  getCurrentNow,
  getCurrentNowNo,
} from "@/utils/home";
export default {
  name: "Task",
  data() {
    return {
      orderCount: 0, //订单量
      amount: 0, //销售额
      cancelTotal: 0, //取消工单
      total: 0, //工单总数
      completedTotal: 0, //完成总数
      progressTotal: 0, //进行总数
      getCurrentMonthFirstNo: getCurrentMonthFirstNo(), //当月第一天不带时分秒
      getCurrentNowNo: getCurrentNowNo(), //当周第一天不带时分秒
      start: getCurrentMonthFirst(), //当月第一天发请求用
      end: getCurrentNow(), //当前时间发请求用
    };
  },

  created() {
    //进入页面获取订单量
    this.getOrderCount();
    //获取销售额
    this.getAmount();
    //进入页面获取所有工单数据
    this.getTaskReportInfo();
  },

  methods: {
    //获取工单数据
    async getTaskReportInfo() {
      const res = await getTaskReportInfo({
        start: this.start,
        end: this.end,
      });
      res.forEach((item) => {
        this.cancelTotal += item.cancelTotal;
        this.total += item.total;
        this.completedTotal += item.completedTotal;
        if (item.progressTotal) {
          this.progressTotal += item.progressTotal;
        }
      });
    },

    //获取订单量
    async getOrderCount() {
      this.orderCount = await getOrderCount({
        start: this.start,
        end: this.end,
      });
    },

    //获取销售额
    async getAmount() {
      const res = await getAmount({
        start: this.start,
        end: this.end,
      });
      this.amount = (res / 1000000).toFixed(2);
    },
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
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

.task-top {
  display: flex;
  justify-content: space-between;
  height: 166px;
  //工单统计样式
  .tongji {
    position: relative;
    padding: 20px;
    width: 684px;
    background-color: #e9f3ff;
    border-radius: 15px;
    overflow: hidden;
    .bg1 {
      position: absolute;
      top: 0;
      left: 0;
    }

    .bg2 {
      position: absolute;
      right: 12px;
      bottom: 0;
    }

    .last-ul {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      li {
        list-style: none;
        div {
          text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
          color: #072074;
          font-size: 36px;
          height: 50px;
          line-height: 50px;
          font-weight: 600;
        }
        p {
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          color: #91a7dc;
        }
      }
    }
  }
  // 销售统计样式
  .xiaoshou {
    position: relative;
    padding: 20px;
    width: 575px;
    background-color: #fbefe8;
    border-radius: 15px;
    .bg4 {
      position: absolute;
      bottom: 0;
      right: 12px;
    }
    .right-ul {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-evenly;
      li {
        list-style: none;
        div {
          text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
          color: #ff5757;
          font-size: 36px;
          height: 50px;
          line-height: 50px;
          font-weight: 600;
        }
        p {
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          color: #de9690;
        }
      }
    }
  }
}
</style>

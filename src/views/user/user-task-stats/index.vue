<template>
  <div class="count">
    <div class="top">
      <div class="people-left">
        <div class="title">运营人员（当天）</div>
        <div class="people-right-car">
          <div class="status">
            <div class="item">
              <div class="num">{{ dataTime.total }}</div>
              <div class="text">工单总数（个）</div>
            </div>
          </div>
          <div class="status">
            <div class="item">
              <div class="num">{{ dataTime.completedTotal }}</div>
              <div class="text">完成工单（个）</div>
            </div>
          </div>
          <div class="status">
            <div class="item">
              <div class="num">{{ dataTime.cancelTotal }}</div>
              <div class="text">拒绝工单（个）</div>
            </div>
          </div>
          <div class="status">
            <div class="item">
              <div class="num">{{ dataTime.workerCount }}</div>
              <div class="text">运营人员数（个）</div>
            </div>
          </div>
        </div>
      </div>
      <div class="people-right">
        <div class="title">运维人员（当天）</div>
        <div class="people-right-cilun">
          <div class="status">
            <div class="item">
              <div class="num">{{ operation.total }}</div>
              <div class="text">工单总数（个）</div>
            </div>
          </div>
          <div class="status">
            <div class="item">
              <div class="num">{{ operation.completedTotal }}</div>
              <div class="text">完成工单（个）</div>
            </div>
          </div>
          <div class="status">
            <div class="item">
              <div class="num">{{ operation.cancelTotal }}</div>
              <div class="text">拒绝工单（个）</div>
            </div>
          </div>
          <div class="status">
            <div class="item">
              <div class="num">{{ operation.workerCount }}</div>
              <div class="text">运维人员数（个）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <el-card class="box-card" shadow="never" style="border: none">
        <div class="status">
          <div class="left-status">工单状态</div>
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="selectTime">
          <div class="item is-checked">周</div>
          <div class="item">月</div>
          <div class="item">年</div>
        </div>
        <div class="card-img">
          <img src="../../../assets/imgs/no.png" />
        </div>
      </el-card>
      <el-card class="right-card" shadow="never" style="border: none">
        <div class="header">
          <div class="title">人效排名（月度）</div>
          <div class="select">
            <el-select v-model="areaList.name" placeholder="请选择">
              <el-option
                v-for="item in areaList.currentPageRecords"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="role-list">
            <div class="item">运营人员</div>
            <div class="item">运维人员</div>
          </div>
        </div>
        <div class="body-img">
          <img src="../../../assets/imgs/no.png" alt="" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCountApi } from "@/api/people";
import { mapActions, mapState } from "vuex";
export default {
  name: "task",
  data() {
    return {
      // times: ["周", "月", "年"],
      pickerOptions: {},
      value1: [new Date(), new Date()],
      dataTime: {},
      operation: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },

  created() {
    this.getPeopleCount();
  },

  methods: {
    async getPeopleCount() {
      const res = await getCountApi();
      console.log(res);
    },
    ...mapActions("people", ["setAreaList"]),
    async getPeopleCount(payload) {
      await this.setAreaList(payload);
      const res = await getCountApi();
      this.dataTime = res[0];
      this.operation = res[1];
    },
  },

  computed: {
    ...mapState("people", ["areaList"]),
  },
};
</script>

<style scoped lang="scss">
.count {
  .top {
    overflow: hidden;
    overflow-x: auto;
  }
  .people-left {
    width: 48%;
    min-height: 166px;
    border-radius: 20px;
    background-image: url("../../../assets/imgs/people.png"),
      url("../../../assets/imgs/car.png");
    background-repeat: no-repeat, no-repeat;
    background-position: 0 0, calc(100% - 12px) 100%;
    background-color: #e9f3ff;
    position: absolute;

    background-repeat: no-repeat;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333;
      margin-top: 20px;
      margin-left: 20px;
    }
    .people-right-car {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      .status {
        margin-right: 40px;
        margin-top: 20px;
        margin-left: 30px;
        .item {
          flex-direction: column;
          display: inline-block;
          .num {
            text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
            color: #072074;
            height: 50px;
            font-size: 36px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            line-height: 50px;
          }
          .text {
            color: #91a7dc;
            height: 17px;
            margin-top: 3px;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 17px;
          }
        }
      }
    }
  }
  .item is-checked {
    background: #fff;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    border-radius: 7px;
    font-weight: 600;
    color: #333;
  }
  .people-right {
    position: absolute;
    top: 20px;
    right: 20px;
    margin-left: 0px;
    width: 48%;
    min-height: 166px;
    border-radius: 20px;
    background: #fbefe8;
    background: #fbefe8 url(../../../assets/imgs/cilun.png) no-repeat
      calc(100% - 12px) 100%;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333;
      margin-top: 20px;
      margin-left: 20px;
    }
    .people-right-cilun {
      display: flex;
      align-items: center;
      justify-content: center;
      .status {
        margin-right: 40px;
        margin-top: 20px;
        margin-left: 30px;
      }
      .item {
        display: inline-flex;
        flex-direction: column;
        .num {
          height: 50px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 50px;
          text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
          color: #ff5757;
        }
        .text {
          color: #de9690;
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 17px;
        }
      }
    }
  }

  .card {
    .el-card__body {
      width: 75%;
    }
    .text {
      font-size: 14px;
    }

    .box-card {
      width: 70%;
      height: 550px;
      margin-top: 190px;
      border-radius: 20px;
      display: flex;
    }
    .left-status {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333;
      flex: 1;
      margin-top: 10px;
    }
    .block {
      .el-date-editor {
        width: 230px;
        // margin-right: 21px;
        height: 32px;
        position: absolute;
        top: 239px;
        right: 600px;
        ::v-deep .el-range__icon {
          line-height: 24px;
        }
      }
    }
    .selectTime {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 129px;
      height: 34px;
      background: rgba(233, 243, 255, 0.37);
      border-radius: 10px;
      position: absolute;
      right: 450px;
      top: 239px;
      .item {
        width: 37px;
        height: 25px;
        font-size: 14px;
        color: #9ca3b4;
        cursor: pointer;
        text-align: center;
        line-height: 25px;
      }
    }
    .card-img {
      img {
        margin-top: 200px;
        margin-left: 400px;
      }
    }
  }
  .right-card {
    width: 27%;
    float: right;
    margin-top: -545px;
    height: 550px;
    .header {
      display: flex;
      flex: 1;
      .title {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333;
        margin-top: 10px;
      }
    }
    .select {
      .el-select {
        width: 88px;
        height: 32px;
        position: absolute;
        right: 40px;
      }
    }
    .role-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      margin-left: -60px;
      .item {
        width: 78px;
        height: 25px;
        font-size: 14px;
        color: #9ca3b4;
        cursor: pointer;
      }
    }
    .body-img {
      img {
        margin-left: 80px;
        margin-top: 160px;
      }
    }
  }
}
::v-deep .el-range-input {
  font-size: 12px;
}
</style>

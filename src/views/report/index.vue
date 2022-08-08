<template>
  <div>
    <div class="topTitle">
      <div class="leftTitle">
        <p>日销售统计</p>
        <div class="boxLeft">
          <div>
            5
            <p>当日销售量 (个)</p>
          </div>
          <div>
            0
            <p>当日销售额 (元)</p>
          </div>
          <div>
            0
            <p>当日分成 (元)</p>
          </div>
        </div>
      </div>
      <div class="rightTitle">
        <p>月销售统计</p>
        <div class="boxRight">
          <div>
            3225
            <p>当月销售量 (个)</p>
          </div>
          <div>
            2.28
            <p>当月销售額 (万元)</p>
          </div>
          <div>
            31.49
            <p>当月分成 (元)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="manBox">
      <ReportSearch
        @search="searchFn"
        lastInpTitle="合作商"
        dateInput="true"
        dateTitle="日期"
      />

      <div class="mainMiddle">
        <div>笔数统计:<span>3225</span>个</div>
        <div>收入统计:<span>22840.48</span>元</div>
        <div>分成统计:<span>31.49</span>元</div>
      </div>

      <!-- 列表 -->
      <div class="mainBottom">
        <el-table
          size="medium"
          :data="orderList.currentPageRecords"
          highlight-current-row
          style="width: 100%; margin-top: 20px"
          fit
        >
          <el-table-column property="orderNo" label="订单日期">
          </el-table-column>
          <el-table-column property="skuName" label="合作商"> </el-table-column>
          <el-table-column property="amount" label="分成比例">
          </el-table-column>
          <el-table-column property="innerCode" label="收入(元)">
          </el-table-column>
          <el-table-column property="status" label="笔数"> </el-table-column>
          <el-table-column property="createTime" label="分成金额(元)">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import ReportSearch from './components/ReportSearch'
export default {
  name: '',
  data() {
    return {
      orderList: [],
    }
  },
  components: {
    ReportSearch,
  },

  created() {},

  methods: {
    searchFn(val) {
      console.log(val)
    },
  },

  computed: {},
}
</script>

<style scoped lang="scss">
.topTitle {
  height: 165px;
  display: flex;
  margin-bottom: 20px;

  .leftTitle,
  .rightTitle {
    margin: 0 10px 0 0;
    flex: 1;
    padding: 20px;
    border-radius: 20px;

    p {
      padding: 0;
      margin: 0;
    }
  }
  .leftTitle {
    background-color: #e9f3ff;
    background-image: url('~@/assets/imgs/people.png'),
      url('~@/assets/imgs/taiyangcheng.png');
    background-position: 0 0, bottom right;
    background-repeat: no-repeat, no-repeat;

    .boxLeft {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 1;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 36px;
      color: #072074;

      p {
        font-size: 12px;
        color: #91a7dc;
      }
    }
  }
  .rightTitle {
    background: #fbefe8 url('~@/assets/imgs/yueliangcheng.png') no-repeat 98%
      100%;

    .boxRight {
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 1;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 36px;
      color: #ff5757;

      p {
        font-size: 12px;
        color: #de9690;
      }
    }
  }
}
.mainMiddle {
  margin-top: -30px;
  background-color: #fff;
  display: flex;
  padding: 20px 17px;

  div {
    margin-right: 50px;
    font-size: 14px;

    span {
      font-size: 20px;
      color: red;
      margin: 0 12px;
    }
  }
}
.mainBottom {
  margin-top: -20px;
}
::v-deep .el-table--medium {
  padding: 0 10px;
}
</style>

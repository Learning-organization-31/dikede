<template>
  <div>
    <div class="topTitle">
      <div class="leftTitle">
        <p>日销售统计</p>
        <div class="boxLeft">
          <div>
            {{ nowDayOrderCount }}
            <p>当日销售量 (个)</p>
          </div>
          <div>
            {{ nowDayOrderMoney }}
            <p>当日销售额 (元)</p>
          </div>
          <div>
            {{ nowDayOrderDivide }}
            <p>当日分成 (元)</p>
          </div>
        </div>
      </div>
      <div class="rightTitle">
        <p>月销售统计</p>
        <div class="boxRight">
          <div>
            {{ nowMonthOrderCount }}
            <p>当月销售量 (个)</p>
          </div>
          <div>
            {{ nowMonthOrderMoney }}
            <p>当月销售額 (万元)</p>
          </div>
          <div>
            {{ nowMonthOrderDivide }}
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
        :typeList="partnersList.currentPageRecords"
      />

      <div class="mainMiddle">
        <div>
          笔数统计:<span>{{ nowMonthOrderCountNext }}</span
          >个
        </div>
        <div>
          收入统计:<span>{{ nowMonthOrderMoneyNext }}</span
          >元
        </div>
        <div>
          分成统计:<span>{{ nowMonthOrderDivideNext }}</span
          >元
        </div>
      </div>

      <!-- 列表 -->
      <div class="mainBottom">
        <el-table
          v-loading="loading"
          size="medium"
          :data="partnerNameList.currentPageRecords"
          highlight-current-row
          style="width: 100%; margin-top: 20px"
          fit
        >
          <el-table-column property="date" label="订单日期"> </el-table-column>
          <el-table-column property="ownerName" label="合作商">
          </el-table-column>
          <el-table-column property="ratio" label="分成比例"> </el-table-column>
          <el-table-column property="orderTotalMoney" label="收入(元)">
          </el-table-column>
          <el-table-column property="orderCount" label="笔数">
          </el-table-column>
          <el-table-column property="totalBill" label="分成金额(元)">
          </el-table-column>
        </el-table>

        <FooterPage
          :listIsShow="listIsShow"
          :taskList="partnerNameList"
          v-if="partnerNameList.totalCount"
          :lastDisabled="lastDisabled"
          :rightDisabled="rightDisabled"
          @lastPage="getLastTaskService"
          @nextPage="getNextTaskService"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReportSearch from './components/ReportSearch'
import { mapActions, mapGetters } from 'vuex'
import FooterPage from '@/components/FooterPage'
import {
  getOrdersTotal,
  getOrdersTotalBill,
  getOrdersTotalMoney,
} from '@/api/report'
import dayjs from 'dayjs'
export default {
  name: 'report',
  data() {
    return {
      startTime: dayjs().startOf('month').format('YYYY-MM-DD'),
      endTime: dayjs().format('YYYY-MM-DD'),
      dayTimeNext: [
        dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ],
      monthTimeNext: [
        dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ],
      nowDayOrderCount: '',
      nowMonthOrderCount: '',
      nowMonthOrderCountNext: '',
      nowDayOrderDivide: '',
      nowMonthOrderDivide: '',
      nowMonthOrderDivideNext: '',
      nowDayOrderMoney: '',
      nowMonthOrderMoney: '',
      nowMonthOrderMoneyNext: '',
      oneStartTime: '',
      oneEndTime: '',
      page: 1,
      searchVal: '',
      loading: false,
    }
  },
  components: {
    ReportSearch,
    FooterPage,
  },

  async created() {
    this.loading = true
    await this.setPartnersList([this.page, 10000])
    await this.setPartnerNameList([this.startTime, this.endTime, this.page, 10])
    this.loading = false

    this.getNowOrders()
    this.getDivideOrders()
    this.getMoneyOrders()
  },

  methods: {
    ...mapActions('report', ['setPartnersList', 'setPartnerNameList']),

    async searchFn(val) {
      if (
        val?.[0] !== this.searchVal?.[0] ||
        val?.[1][0] !== this.searchVal?.[1][0] ||
        val?.[1][1] !== this.searchVal?.[1][1]
      )
        this.page = 1
      if (!val) {
        val = [null, [dayjs().startOf('month').$d, dayjs().$d]]
      }

      this.loading = true
      this.searchVal = val
      this.oneStartTime = val[1][0]
      this.oneEndTime = val[1][1]

      this.nowMonthOrderCountNext = await getOrdersTotal(
        dayjs(val[1][0]).format('YYYY-MM-DD HH:mm:ss'),
        dayjs(val[1][1]).format('YYYY-MM-DD HH:mm:ss'),
        val[0]
      )

      this.nowMonthOrderDivideNext =
        (await getOrdersTotalBill(
          dayjs(val[1][0]).format('YYYY-MM-DD HH:mm:ss'),
          dayjs(val[1][1]).format('YYYY-MM-DD HH:mm:ss'),
          val[0]
        )) / 100

      this.nowMonthOrderMoneyNext =
        (await getOrdersTotalMoney(
          dayjs(val[1][0]).format('YYYY-MM-DD HH:mm:ss'),
          dayjs(val[1][1]).format('YYYY-MM-DD HH:mm:ss'),
          val[0]
        )) / 100

      this.setPartnerNameList([
        dayjs(val[1][0]).format('YYYY-MM-DD'),
        dayjs(val[1][1]).format('YYYY-MM-DD'),
        this.page,
        10,
        val[0],
      ])

      this.loading = false
    },

    async getNowOrders() {
      // 当天销售量
      this.nowDayOrderCount = await getOrdersTotal(...this.dayTimeNext)
      //  当月销售量
      this.nowMonthOrderCount = await getOrdersTotal(...this.monthTimeNext)

      this.nowMonthOrderCountNext = this.nowMonthOrderCount
    },
    async getDivideOrders() {
      // 当天分成
      this.nowDayOrderDivide =
        (await getOrdersTotalBill(...this.dayTimeNext)) / 100
      //  当月分成
      this.nowMonthOrderDivide =
        (await getOrdersTotalBill(...this.monthTimeNext)) / 100

      this.nowMonthOrderDivideNext = this.nowMonthOrderDivide
    },
    async getMoneyOrders() {
      // 当天销售额
      this.nowDayOrderMoney =
        (await getOrdersTotalMoney(...this.dayTimeNext)) / 100
      //  当月销售额
      const res = await getOrdersTotalMoney(...this.monthTimeNext)
      this.nowMonthOrderMoney = res ? (res / 1000000).toFixed(2) : 0
      this.nowMonthOrderMoneyNext = res / 100
    },
    getLastTaskService() {
      this.page--
      this.searchFn(this.searchVal)
    },
    getNextTaskService() {
      this.page++
      this.searchFn(this.searchVal)
    },
  },

  computed: {
    ...mapGetters(['partnersList', 'partnerNameList']),

    //控制列表数量显示隐藏
    listIsShow() {
      return !this.partnerNameList.currentPageRecords?.[0]
    },
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.partnerNameList.pageIndex <= 1
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return this.partnerNameList.pageIndex == this.partnerNameList.totalPage
    },
  },
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
  padding: 0 20px;
  background-color: #fff;
}
</style>

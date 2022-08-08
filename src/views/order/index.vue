<template>
  <div>
    <!-- 搜索栏 -->
    <div class="Top">
      <MyOrderSearch
        @search="searchFn"
        lastInpTitle="订单编号"
        dateInput="true"
        dateTitle="选择日期"
      />
    </div>

    <div class="main">
      <!-- 列表 -->
      <el-table
        size="medium"
        :data="orderList.currentPageRecords"
        highlight-current-row
        style="width: 100%; margin-top: 20px"
        fit
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column
          property="orderNo"
          label="订单编号"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column property="skuName" label="商品名称"> </el-table-column>
        <el-table-column property="amount" label="订单金额(元)">
        </el-table-column>
        <el-table-column property="innerCode" label="设备编号">
        </el-table-column>
        <el-table-column property="status" label="订单状态"> </el-table-column>
        <el-table-column property="createTime" label="订单日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              style="color: #4368e1; cursor: pointer; margin-right: 10px"
              @click="itemOrder(scope.row)"
              >查看详情</span
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 页脚 -->
      <FooterPage
        :listIsShow="listIsShow"
        :taskList="orderList"
        v-if="orderList.totalCount"
        :lastDisabled="lastDisabled"
        :rightDisabled="rightDisabled"
        @lastPage="getLastTaskService"
        @nextPage="getNextTaskService"
      />

      <!-- 对话详情 -->
      <DetailOrder
        :infoDialogIsShow.sync="infoIsShow"
        :itemInfo="itemInfo"
      ></DetailOrder>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import MyOrderSearch from './components/MyOrderSearch'
import DetailOrder from './components/DetailOrder'
import FooterPage from '@/components/FooterPage'
import MyButton from '@/components/MyButton'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'order',
  data() {
    return {
      page: 1,
      infoIsShow: false,
      itemInfo: {},
      timeValue: '',
      startDate: '',
      endDate: '',
    }
  },
  components: {
    FooterPage,
    MyButton,
    DetailOrder,
    MyOrderSearch,
  },

  created() {
    this.getOrderList()
  },

  methods: {
    ...mapActions('order', ['setGetOrderList']),
    searchFn(taskCode) {
      console.log(taskCode)
      this.page = 1
      if (taskCode[0] === null && taskCode[1] === null) {
        this.setGetOrderList([this.page, 10])
      } else if (taskCode[0] !== null && taskCode[1] === null) {
        this.setGetOrderList([this.page, 10, taskCode[0]])
      } else if (taskCode[0] === null && taskCode[1] !== null) {
        this.startDate = dayjs(taskCode[1][0]).format('YYYY-MM-DD')
        this.endDate = dayjs(taskCode[1][2]).format('YYYY-MM-DD')
        this.setGetOrderList([this.page, 10, this.startDate, this.endDate])
      } else if (taskCode[0] !== null && taskCode[1] !== null) {
        this.startDate = dayjs(taskCode[1][0]).format('YYYY-MM-DD')
        this.endDate = dayjs(taskCode[1][2]).format('YYYY-MM-DD')
        this.setGetOrderList([
          this.page,
          10,
          taskCode[0],
          this.startDate,
          this.endDate,
        ])
      }
    },
    indexMethod(index) {
      if (this.orderList.pageIndex == 1) return index + 1
      else return index + 1 + this.orderList.pageIndex * 10 - 10
    },
    getLastTaskService() {
      this.page--
      this.setGetOrderList([this.page, 10])
    },
    getNextTaskService() {
      this.page++
      this.setGetOrderList([this.page, 10])
    },
    getOrderList() {
      this.setGetOrderList([this.page, 10])
    },

    itemOrder(val) {
      this.itemInfo = val
      console.log(val)
      this.infoIsShow = true
    },
  },

  computed: {
    ...mapGetters(['orderList']),

    //控制列表数量显示隐藏
    listIsShow() {
      return !this.orderList.currentPageRecords?.[0]
    },
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.orderList.pageIndex <= 1
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return this.orderList.pageIndex == this.orderList.totalPage
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  padding: 20px;
  width: 100%;
  background-color: #fff;
}
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  opacity: 0;
  width: 0;
}
</style>

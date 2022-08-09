<template>
  <Dialog
    :businessIsShow="infoDialogIsShow"
    @close="closeFn"
    title="订单详情"
    :twoBtn="false"
  >
    <!-- 上方图片区域 -->
    <div class="task-status">
      <div class="task-status-content">
        <img
          src="~@/assets/imgs/gantan.png"
          v-if="itemInfo.status === ('未支付' || '出货失败')"
        />
        <img
          src="~@/assets/imgs/duihao.png"
          v-if="itemInfo.status === ('出货成功' || '支付完成')"
        />
        <span>{{ itemInfo.status }}</span>
      </div>
      <div>
        <img
          src="~@/assets/imgs/gongdan.png"
          v-if="itemInfo.status === ('未支付' || '出货失败')"
        />
        <img
          src="~@/assets/imgs/wancheng.png"
          v-if="itemInfo.status === ('出货成功' || '支付完成')"
        />
      </div>
    </div>
    <!-- 下方内容区域 -->
    <div class="task-row">
      <el-row type="flex">
        <el-col :offset="1">
          <span>订单编号: </span>{{ itemInfo.orderNo }}
        </el-col>
        <el-col :offset="1">
          <span>商品名称: </span>{{ itemInfo.skuName }}</el-col
        >
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>订单金额: </span>
          {{ itemInfo.amount }}
        </el-col>
        <el-col :offset="1">
          <span>设备编号: </span>{{ itemInfo.innerCode }}
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>完成时间: </span>{{ itemInfo.updateTime }}
        </el-col>
        <el-col :offset="1">
          <span>创建时间: </span>{{ itemInfo.createTime }}
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :offset="1">
          <span>支付方式: </span>{{ itemInfo.payType }}
        </el-col>
        <el-col :offset="1">
          <span>设备地址: </span>{{ itemInfo.addr }}
        </el-col>
      </el-row>
    </div>
  </Dialog>
</template>

<script>
import dayjs from 'dayjs'
import Dialog from '@/components/Dialog'
export default {
  name: 'OpeInfoDialog',
  data() {
    return {}
  },

  created() {},
  methods: {
    //关闭弹窗
    closeFn() {
      this.$emit('update:infoDialogIsShow', false)
    },
  },

  computed: {},

  props: {
    infoDialogIsShow: {
      type: Boolean,
      default: false,
    },
    itemInfo: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    Dialog,
  },

  filters: {
    dayFormat(value) {
      return dayjs(value).format('YYYY.MM.DD hh:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
.task-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px 0 20px;
  width: 590px;
  height: 54px;
  margin-bottom: 25px;
  background-color: #f8f8f8;
  .task-status-content {
    display: flex;
    align-items: center;
    img {
      margin-right: 15px;
    }
  }
}

.task-row {
  padding: 0 12px;
  span {
    margin-right: 20px;
  }
}
.el-col {
  height: 40px;
  line-height: 1.3;
}
.detail {
  color: #5f84ff;
  cursor: pointer;
}
.el-icon-location {
  color: #5f84ff;
}
</style>

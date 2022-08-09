<template>
  <!-- 搜索区域 -->
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item :label="lastInpTitle + ': '">
        <el-select v-model="status" placeholder="请选择" :clearable="true">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in typeList"
            :key="item.statusId"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="dateTitle + ': '" v-if="dateInput">
        <el-date-picker
          style="width: 410px"
          v-model.number="timeValue"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
        >
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <MyButton
          @click="searchBtnFn"
          icon="el-icon-search"
          :btnStyle="searchButStyle"
        >
          查询
        </MyButton>
      </el-form-item>
    </el-form>
  </div>
  <!-- 搜索区域 -->
</template>

<script>
import MyButton from '@/components/MyButton'
import dayjs from 'dayjs'
export default {
  name: 'MyOrderSearch',
  data() {
    return {
      status: '',
      timeValue: [dayjs().startOf('month').$d, dayjs().$d],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },

      //搜索区域按钮样式
      searchButStyle: {
        background: '#5f84ff',
      },
    }
  },

  props: {
    lastInpTitle: {
      type: String,
    },
    dateInput: {
      type: [String, Boolean],
    },
    dateTitle: {
      type: String,
    },
    typeList: {
      type: Array,
    },
  },

  created() {},

  methods: {
    //搜索按钮获取数据
    searchBtnFn() {
      this.$emit('search', [this.status, this.timeValue])
    },
  },

  computed: {},

  components: {
    MyButton,
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  height: 64px;
  background-color: #fff;
  padding-left: 17px;
  margin-bottom: 20px;
  .el-form {
    display: flex;
    align-items: center;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
::v-deep .el-form-item__label {
  font-weight: 400;
}
//输入框的样式
::v-deep .demo-form-inline {
  .el-icon-circle-close {
    cursor: pointer;
  }
  input {
    width: 220px;
    height: 36px;
  }
}
</style>

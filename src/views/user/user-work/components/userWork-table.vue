<template>
  <div>
    <!-- 列表 -->
    <el-table
      stripe
      style="width: 100%"
      empty-text="暂无数据"
      :border="false"
      :data="workCountList.currentPageRecords"
    >
      <el-table-column
        prop="pageIndex"
        label="序号"
        width="100"
        type="index"
        :index="indexMethod"
        empty-text="暂无数据"
      >
      </el-table-column>
      <el-table-column prop="userName" label="人员名称" width="180">
      </el-table-column>
      <el-table-column prop="roleName" label="角色" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="180">
      </el-table-column>
      <el-table-column prop="workCount" label="完成工单(本月)" width="160">
      </el-table-column>
      <el-table-column prop="progressTotal" label="进行中工单" width="160">
      </el-table-column>
      <el-table-column prop="cancelCount" label="拒绝工单(本月)" width="160">
      </el-table-column>
      <el-table-column prop="taskId" label="操作" width="160">
        <!-- slot-scope="scope" -->
        <template>
          <el-button @click="sureBtn" type="text" size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
      <!-- <FormDialog :visible.sync="businessIsShow" /> -->
    </el-table>
    <div class="detail">
      <el-dialog title="人员详情" :visible.sync="businessIsShow">
        <div class="peopleName">
          <span class="street">人员名称：运营街道</span>
          <span class="yunying">角色：运营原</span>
          <span class="phone">联系电话：1212121212</span>
          <p class="fuze">负责区域：城北街道</p>
        </div>
        <el-table :data="gridData" border>
          <el-table-column
            property="date"
            label="总共单数"
            width="150"
          ></el-table-column>
          <el-table-column
            property="name"
            label="拒绝工单"
            width="200"
          ></el-table-column>
          <el-table-column
            property="address"
            label="完成工单"
          ></el-table-column>
          <el-table-column
            property="address"
            label="进行中的工单"
          ></el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Button from "@/components/MyButton";
// import Dialog from "./detail.vue";
import Dialog from "@/components/Dialog";

export default {
  // <Dialog :businessIsShow.sync="businessIsShow" @close="close"></Dialog>

  // components: { Dialog, Button },
  data() {
    return {
      businessIsShow: false,
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      formLabelWidth: "120px",
    };
  },

  created() {},
  computed: {
    ...mapState("people", ["workCountList"]),
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    // closeBtn() {
    //   this.$emit("update:businessIsShow", false);
    // },
    sureBtn() {
      this.businessIsShow = true;
    },
    // close() {
    //   this.businessIsShow = false;
    // },
  },
};
</script>

<style scoped lang="scss">
.peopleManger {
  ::v-deep .el-table__header {
    margin-top: 20px;
    margin-left: 20px;
  }
  ::v-deep .has-gutter {
    .cell {
      color: rgb(102, 102, 102);
      font-weight: 400;
      background-color: #f3f6fb;
      height: 42px;
      line-height: 42px;
    }
  }
  .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
::v-deep .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none;
  padding-left: 20px;
}
.detail {
  .peopleName {
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
    .street {
      margin-right: 100px;
    }
    .yunying {
      margin-right: 100px;
    }
    .phone {
      margin-right: 100px;
    }
    .fuze {
      margin-top: 20px;
    }
  }
  ::v-deep .el-table__body {
    width: 580px;
    height: 160px;
  }
  .el-table__row {
    height: 40px;
  }
}
</style>

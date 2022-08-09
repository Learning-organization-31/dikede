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
        <template v-slot="{ row }">
          <el-button @click="sureBtn(row.userId)" type="text" size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="detail">
      <el-dialog title="人员详情" :visible.sync="businessIsShow">
        <div class="peopleName">
          <span class="street">人员名称：{{ peopleInfo.userName }}</span>
          <span class="yunying">角色：{{ peopleInfo.roleName }}</span>
          <span class="phone">联系电话：{{ peopleInfo.mobile }}</span>
          <p class="fuze">负责区域：{{ peopleInfo.regionName }}</p>
        </div>
        <!-- <el-table :data="detailsList" border>
          <el-table-column width="80"></el-table-column>
          <el-table-column
            v-for="item in tableTitle"
            :key="item.name"
            :prop="item.name"
            :label="item.title"
            width="100"
          ></el-table-column>
        </el-table> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
// type="index"
// :index="indexMethod"
import { getInformationApi, getPeopleInfoApi } from "@/api/people"; //人员工作量列表
import { mapActions, mapState } from "vuex";
import Button from "@/components/MyButton";
import Dialog from "@/components/Dialog";
import dayjs from "@/utils/dayjs";
export default {
  data() {
    return {
      businessIsShow: false,
      formLabelWidth: "120px",
      detailsList: {},
      tableTitle: [
        {
          title: "总工单数",
          name: "total",
        },
        {
          title: "拒绝工单",
          name: "cancelCount",
        },
        {
          title: "完成工单",
          name: "workCount",
        },
        {
          title: "进行中工单",
          name: "doingTotal",
        },
      ],
      dataTime: [],
    };
  },

  created() {
    // this.sureBtn();
  },
  computed: {
    ...mapState("people", ["peopleInfo"]),
    ...mapState("people", ["workCountList"]),
  },
  methods: {
    ...mapActions("people", ["setpeopleInfoList"]),
    ...mapActions("people", ["setWorkCountList"]),

    async sureBtn(val) {
      await this.setpeopleInfoList(val);
      console.log(this.peopleInfo);
      console.log(val);
      const res = await getPeopleInfoApi(val);
      this.detailsList = res;
      const startTime = dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss");
      console.log(startTime);
      const endTime = dayjs().endOf("date").format("YYYY-MM-DD HH:mm:ss");
      // const data = await getInformationApi({
      //   userId: this.peopleInfo.userId,
      //   start: startTime,
      //   end: endTime,
      // });
      // console.log(data);
      this.businessIsShow = true;
    },
    //通过element-ui来对应每个index
    indexMethod(index) {
      return index + 1;
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
      background-color: #f3f6fb;
      height: 42px;
      line-height: 42px;
      margin-top: 20px;
      font-size: 13px;
      text-align: center;
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
}
.detail {
  .el-table {
    height: 200px;
  }
  .peopleName {
    height: 86px;
    padding: 10px 19px 0;
    margin-bottom: 20px;
    background: #f3f6fb;
    .street {
      margin-right: 20px;
    }
    .yunying {
      margin-right: 20px;
    }
    .phone {
      margin-right: 20px;
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
::v-deep .el-dialog__body {
  min-height: 277px;
}
::v-deep .el-table thead {
  font-size: 13px;
  font-weight: normal;
}
</style>

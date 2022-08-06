<template>
  <div class="peopleManger">
    <SerchBar :lastInpTitle="lastInpTitle" />
    <Button class="addBtn" icon="el-icon-circle-plus-outline">新建</Button>
    <!-- 列表 -->

    <!--  :height="currentPageRecords[0] ? '528' : '120'" -->
    <el-table
      stripe
      style="width: 100%"
      empty-text="暂无数据"
      :data="peopleList"
      :border="false"
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
      <el-table-column prop="userName" label="人员名称" width="250">
      </el-table-column>
      <el-table-column prop="regionName" label="归属区域" width="210">
      </el-table-column>
      <el-table-column prop="role.roleName" label="角色" width="250">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="250">
      </el-table-column>
      <el-table-column prop="taskId" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            修改
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
            class="delBtn"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <!-- <FooterPage
        :taskList="peopleList"
        :listIsShow="peopleList.totalCount"
      ></FooterPage> -->
    </el-table>
  </div>
</template>

<script>
//引入搜索框和按钮组件
import SerchBar from "@/components/SerchBar";
import Button from "@/components/MyButton";
import { getPeopleListApi } from "@/api/people";
// import FooterPage from "@/components/FooterPage";
export default {
  name: "PeopleManger",
  data() {
    return {
      peopleList: [], //接受后台返回来的数据
    };
  },
  //接受传过来的值
  props: {
    lastInpTitle: {
      type: String,
      default: "人员搜索",
    },
  },
  components: {
    Button,
    SerchBar,
    // FooterPage,
  },
  created() {
    this.getPeopleList();
  },

  methods: {
    getTaskInfo() {},
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    async getPeopleList() {
      //发送请求获取后台拿回来的数据
      const { currentPageRecords } = await getPeopleListApi();
      console.log(...currentPageRecords);
      //用变量接受
      this.peopleList = currentPageRecords;
    },
    indexMethod(index) {
      return index + 1;
    },
  },

  computed: {},
};
</script>

<style scoped lang="scss">
.peopleManger {
  .addBtn {
    ::v-deep .el-button {
      background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
      margin-left: 15px;
      margin-top: 35px;
    }
  }
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
  ::v-deep .el-button--small {
    color: #5f84ff;
    font-size: 14px;
  }
  .delBtn {
    color: red;
  }
}
::v-deep .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none;
  padding-left: 20px;
}
</style>

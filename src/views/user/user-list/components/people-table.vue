<template>
  <div class="peopleManger">
    <!-- 列表 -->

    <!--  :height="currentPageRecords[0] ? '528' : '120'" -->
    <el-table
      stripe
      style="width: 100%"
      empty-text="暂无数据"
      :data="workList.currentPageRecords"
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
          <el-button @click.native="getTaskInfo" type="text" size="small">
            修改
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
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
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  created() {},
  computed: {
    //拿到vuex后台获取到的数据
    ...mapState("people", ["workList"]),
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none;
  padding-left: 20px;
}
</style>

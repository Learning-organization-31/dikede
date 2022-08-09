<template>
  <div class="peopleManger">
    <!-- 列表 -->
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
        width="80"
        type="index"
        :index="indexMethod"
        empty-text="暂无数据"
      >
      </el-table-column>
      <el-table-column prop="userName" label="人员名称"> </el-table-column>
      <el-table-column prop="regionName" label="归属区域"> </el-table-column>
      <el-table-column prop="role.roleName" label="角色"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="taskId" label="操作" width="200">
        <template v-slot="{ row }">
          <el-button @click="sureBtn(row.id)" type="text" size="small">
            修改
          </el-button>
          <el-button
            @click="deleteRow(row.id)"
            type="text"
            size="small"
            class="delBtn col-text"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Dialog :isShow.sync="businessIsShow" @save="sureBtn"></Dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Dialog from "./editinfo.vue";
import { editPeopleApi, delPeopleApi, getPeopleInfoApi } from "@/api/people";
export default {
  data() {
    return {
      businessIsShow: false,
      peopleInfos: {
        userName: "",
        roleId: "",
        mobile: "",
        regionName: "",
        status: "",
        image: "",
      },
    };
  },
  components: {
    Dialog,
  },
  created() {},
  computed: {
    //拿到vuex后台获取到的数据
    ...mapState("people", ["workList"]),
    ...mapState("people", ["peopleInfo"]),
  },
  methods: {
    ...mapActions("people", ["setpeopleInfoList"]),
    indexMethod(index) {
      return index + 1;
    },
    async sureBtn(val) {
      await this.setpeopleInfoList(val);
      this.businessIsShow = true;
    },
    //删除任务
    async deleteRow(val) {
      try {
        await this.$confirm("此操作将永久删除该点位, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        });
        await delPeopleApi(val);
        this.$parent.getPeopleList();
        this.$message.success("删除成功");
      } catch (error) {
        if (error === "cancel") return;
        if (error?.response?.data) {
          this.$message.error(error.response.data);
        } else {
          this.$message.error("删除失败");
        }
      }
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
.col-text {
  color: red !important;
  opacity: 0.8;
  cursor: pointer;
  margin-right: 7px;
}
</style>

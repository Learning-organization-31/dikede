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
        <template v-slot="{ row }">
          <el-button @click="sureBtn(row.id)" type="text" size="small">
            修改
          </el-button>
          <el-button
            @click="deleteRow(row.id)"
            type="text"
            size="small"
            class="delBtn"
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
      console.log(this.peopleInfo);
      this.businessIsShow = true;
    },
    //删除任务
    async deleteRow(val) {
      await delPeopleApi(val);
      this.$parent.getPeopleList();
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

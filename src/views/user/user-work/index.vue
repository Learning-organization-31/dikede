<template>
  <div class="peopleManger">
    <!-- 人员搜索 -->
    <SerchBar
      lastInpTitle="人员搜索"
      rightInpTitle="角色"
      @search="searchFn"
      :typeList="typeList"
    />
    <worktable />
    <FooterPage
      @lastPage="lastPage"
      @nextPage="nextPage"
      :taskList="workCountList"
      :listIsShow="!workCountList.totalCount"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
    />
  </div>
</template>

<script>
//引入搜索框和按钮组件
import Dialog from "@/components/Dialog";
import SerchBar from "./components/detail.vue";
import Button from "@/components/MyButton";
import { mapActions, mapState } from "vuex";
import FooterPage from "@/components/FooterPage";
import worktable from "@/views/user/user-work/components/userWork-table.vue";
export default {
  name: "WorkPeopleManger",
  //  @lastPage="lastPage"
  //     @nextPage="nextPage"
  //  :lastDisabled="lastDisabled"
  //     :rightDisabled="rightDisabled"
  data() {
    return {
      dialogTableVisible: false,
      typeList: [],
      peopleSearch: {
        pageIndex: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    Button,
    SerchBar,
    FooterPage,
    worktable,
    Dialog,
  },
  created() {
    //页面一加载就要渲染数据
    this.getWorkPeopleList();
  },
  computed: {
    //拿到vuex存储的数据
    ...mapState("people", ["workCountList"]),
    ...mapState("people", ["workList"]),
    ...mapState("people", ["roleList"]),
    // 假如当前是第一页，点击上一页，按钮会变成不可点击
    lastDisabled() {
      return this.workCountList.pageIndex <= "1";
    },
    // 假如当前是最后一页，点击下一页，按钮会变成不可点击，且还是保留在最后一页
    rightDisabled() {
      return this.workCountList.pageIndex >= this.workCountList.totalPage;
    },
  },
  methods: {
    //调用vuex里面的方法
    ...mapActions("people", ["setWorkCountList"]),
    ...mapActions("people", ["setWorkPeople"]),
    ...mapActions("people", ["setpeopleInfoList"]),
    ...mapActions("people", ["setRoleList"]),

    getpeopleInfo() {
      this.dialogTableVisible = true;
    },
    //调用vuex传过来的方法
    async getWorkPeopleList(payload) {
      //加载方法
      await this.setWorkCountList(payload);
      await this.setRoleList(payload);
      this.typeList = this.roleList;
      console.log(this.typeList);
    },
    async searchFn(value, status) {
      this.setWorkCountList({ userName: value }, { isRepair: status });
    },
    // 上一页
    lastPage() {
      this.setWorkCountList({
        pageIndex: this.workCountList.pageIndex - 1,
      });
    },

    // 下一页
    nextPage() {
      this.setWorkCountList({
        pageIndex: this.workCountList.pageIndex - 0 + 1,
      });
    },
  },
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
</style>

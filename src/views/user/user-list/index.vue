<template>
  <div>
    <SerchBar lastInpTitle="人员搜索" @search="onSearch" />

    <div class="result">
      <div class="btn-title">
        <Button
          class="addBtn"
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="sureBtn"
          >新建</Button
        >
      </div>
      <!-- 列表 -->
      <peopleTable />
      <Dialog :isShow.sync="businessIsShow" @save="sureBtn"> </Dialog>
    </div>

    <FooterPage
      :taskList="workList"
      :listIsShow="!workList.totalCount"
      @lastPage="lastPage"
      @nextPage="nextPage"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
    ></FooterPage>
  </div>
</template>

<script>
//引入搜索框和按钮组件
import peopleTable from "./components/people-table.vue";
import SerchBar from "@/components/SerchBar";
import Button from "@/components/MyButton";
import Dialog from "./components/dialogy-table.vue";
import { mapActions, mapState } from "vuex";
import FooterPage from "@/components/FooterPage";
export default {
  name: "PeopleManger",
  data() {
    return {
      businessIsShow: false,
      name: "",
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
    };
  },
  components: {
    Button,
    SerchBar,
    Dialog,
    peopleTable,
    FooterPage,
  },
  created() {
    this.getPeopleList();
  },

  methods: {
    ...mapActions("people", ["setWorkPeople"]),
    ...mapActions("people", ["setRoleList"]),
    ...mapActions("people", ["setWorkCountList"]),
    ...mapActions("people", ["setAreaList"]),
    async getPeopleList(payload) {
      await this.setWorkPeople(payload);
      await this.setRoleList(payload);
      await this.setWorkCountList(payload);
      await this.setAreaList(payload);
    },

    sureBtn() {
      this.businessIsShow = true;
    },
    close() {
      this.businessIsShow = false;
    },
    // 上一页
    lastPage() {
      this.setWorkPeople({
        pageIndex: this.workList.pageIndex - 1,
      });
    },

    // 下一页
    nextPage() {
      this.setWorkPeople({
        pageIndex: this.workList.pageIndex - 0 + 1,
      });
    },
    //头部搜索
    onSearch(value) {
      this.setWorkPeople({ userName: value });
    },
  },

  computed: {
    ...mapState("people", ["workList"]),
    ...mapState("people", ["roleList"]),
    ...mapState("people", ["workCountList"]),
    ...mapState("people", ["areaList"]),
    ...mapState("people", ["peopleInfo"]),
    // 假如当前是第一页，点击上一页，按钮会变成不可点击
    lastDisabled() {
      return this.workList.pageIndex <= "1";
    },
    // 假如当前是最后一页，点击下一页，按钮会变成不可点击，且还是保留在最后一页
    rightDisabled() {
      return this.workList.pageIndex >= this.workList.totalPage;
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
  ::v-deep .el-table__header {
    margin-top: 5px;
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
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}

//新建按钮和工单按钮
.btn-title {
  display: flex;
}
</style>

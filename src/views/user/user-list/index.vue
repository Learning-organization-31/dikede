<template>
  <div class="peopleManger">
    <SerchBar lastInpTitle="人员搜索" />
    <Button class="addBtn" icon="el-icon-circle-plus-outline" @click="sureBtn"
      >新建</Button
    >
    <!-- 列表 -->
    <peopleTable />
    <Dialog
      :businessIsShow.sync="businessIsShow"
      @sureBtn="close"
      @cancelBtn="close"
      @close="close"
    />
  </div>
</template>

<script>
//引入搜索框和按钮组件
import peopleTable from "./components/people-table.vue";
import SerchBar from "@/components/SerchBar";
import Button from "@/components/MyButton";
import Dialog from "@/components/Dialog";
import { mapActions } from "vuex";
// import FooterPage from "@/components/FooterPage";
export default {
  name: "PeopleManger",
  data() {
    return {
      businessIsShow: false,
    };
  },
  components: {
    Button,
    SerchBar,
    Dialog,
    peopleTable,
  },
  created() {
    this.getPeopleList();
  },

  methods: {
    ...mapActions("people", ["setWorkPeople"]),
    getTaskInfo() {},
    deleteRow(id) {
      // rows.splice(index, 1);
    },
    async getPeopleList(payload) {
      await this.setWorkPeople(payload);
    },

    sureBtn() {
      this.businessIsShow = true;
    },
    close() {
      this.businessIsShow = false;
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
</style>

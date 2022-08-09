<template>
  <div>
    <el-table
      :data="List.currentPageRecords"
      :height="
        List.currentPageRecords && List.currentPageRecords[0] ? '528' : '120'
      "
      stripe
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column label="序号" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (List.pageIndex - 1) * 10 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="合作商名称"> </el-table-column>
      <el-table-column prop="account" label="账号"> </el-table-column>
      <el-table-column prop="vmCount" label="设备数量"> </el-table-column>
      <el-table-column prop="ratio" :formatter="formatter" label="分成比例">
      </el-table-column>
      <el-table-column prop="contact" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="联系电话"> </el-table-column>
      <el-table-column prop="taskId" label="操作" width="235px">
        <template slot-scope="scope">
          <span class="col-text col-get" @click="initPassword(scope.row)">
            重置密码
          </span>
          <span class="col-text col-get" @click="infoDialogFn(scope.row)">
            查看详情
          </span>
          <span class="col-text col-set" @click="setInfoFn(scope.row)">
            修改
          </span>
          <span class="col-text col-remove" @click="clearPartner(scope.row)">
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>
    <PartnerInfo :isShow.sync="isShow" :row="row" />
  </div>
</template>

<script>
import { initPassword, clearPartner } from "@/api/partner";
import PartnerInfo from "./PartnerInfo";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "RegionList",
  data() {
    return {
      //控制详情弹窗是否显示
      isShow: false,
      row: {},
    };
  },

  created() {},

  methods: {
    //删除合作商
    async clearPartner(row) {
      try {
        await this.$confirm("是否删除该合作商", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        });
        await clearPartner(row.id);
        this.$message.success("删除合作商成功");
        //删除成功,重新获取数据
        this.SET_PAGE_INDEX();
        this.partnerSearch(this.partnerSearchCondition);
      } catch (error) {
        if (error?.response?.data) {
          this.$message.error(error?.response?.data);
        }
      }
    },

    //修改合作商
    setInfoFn(row) {
      this.$emit("setInfoFn", row);
    },

    //查看详情
    infoDialogFn(row) {
      //打开弹窗
      this.isShow = true;
      this.row = row;
    },

    //重置密码
    async initPassword(row) {
      try {
        await this.$confirm("确定要重置合作商密码吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        });
        await initPassword(row.id);
        this.$message.success("重置密码成功");
      } catch (error) {}
    },

    //格式化百分比
    formatter(row, column, cellValue) {
      return cellValue + "%";
    },

    ...mapMutations("partner", ["SET_PAGE_INDEX"]),
    ...mapActions("partner", ["partnerSearch"]),
  },

  computed: {
    ...mapState("partner", ["partnerSearchCondition"]),
  },

  props: {
    List: {
      type: Object,
      required: true,
    },
  },

  components: {
    PartnerInfo,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .has-gutter {
  .cell {
    color: rgb(102, 102, 102);
    font-weight: 400;
  }
}

.col-text {
  color: #5f84ff;
  opacity: 0.8;
  cursor: pointer;
  margin-right: 7px;
}
.col-remove {
  color: red;
}
</style>

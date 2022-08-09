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
      <el-table-column prop="name" label="点位名称"> </el-table-column>
      <el-table-column prop="region.name" label="所在名称"> </el-table-column>
      <el-table-column prop="businessType.name" label="商圈类型">
      </el-table-column>
      <el-table-column prop="ownerName" label="合作商"> </el-table-column>
      <el-table-column prop="addr" :formatter="formatter" label="详细地址">
      </el-table-column>
      <el-table-column prop="taskId" label="操作" width="200px">
        <template slot-scope="scope">
          <span class="col-text col-get" @click="getInfo(scope.row)">
            查看详情
          </span>
          <span class="col-text col-set" @click="setInfo(scope.row)">
            修改
          </span>
          <span class="col-text col-remove" @click="removeNode(scope.row)">
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>
    <InfoDialog :infoIsShow.sync="infoIsShow" :rowInfo="rowInfo" />
  </div>
</template>

<script>
import InfoDialog from "./InfoDialog";
import { removeNodeFn } from "@/api/node";
export default {
  name: "RegionList",
  data() {
    return {
      infoIsShow: false,
      rowInfo: {},
    };
  },

  created() {},

  methods: {
    //修改详情
    setInfo(row) {
      this.$emit("setInfo", row);
    },
    //删除点位
    async removeNode(row) {
      try {
        await this.$confirm("此操作将永久删除该点位, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        });
        await removeNodeFn(row.id);
        this.$message.success("删除成功");
      } catch (error) {
        console.log(error);
        if (error === "cancel") return;
        if (error?.response?.data) {
          this.$message.error(error.response.data);
        } else {
          this.$message.error("该点位不允许删除");
        }
      }
    },
    //查看详情
    getInfo(row) {
      this.infoIsShow = true;
      this.rowInfo = row;
    },

    //格式化地址
    formatter(row, column, cellValue) {
      return cellValue.split("-")[3];
    },
  },

  computed: {},

  props: {
    List: {
      type: Object,
      required: true,
    },
  },

  components: {
    InfoDialog,
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

<template>
  <div>
    <el-table
      :data="regionList.currentPageRecords"
      :height="
        regionList.currentPageRecords && regionList.currentPageRecords[0]
          ? '528'
          : '120'
      "
      stripe
      style="width: 100%"
      empty-text="暂无数据"
    >
      <el-table-column label="序号" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 + (regionList.pageIndex - 1) * 10 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="区域名称"> </el-table-column>
      <el-table-column prop="nodeCount" label="点位数"> </el-table-column>
      <el-table-column prop="remark" label="备注说明"> </el-table-column>
      <el-table-column prop="taskId" label="操作" width="200px">
        <template slot-scope="scpoe">
          <span class="col-text col-get" @click="getInfo(scpoe.row)">
            查看详情
          </span>
          <span class="col-text col-set" @click="setRegion(scpoe.row)">
            修改
          </span>
          <span class="col-text col-remove" @click="removeRegion(scpoe.row)">
            删除
          </span>
        </template>
      </el-table-column>
    </el-table>
    <Dialog
      title="区域详情"
      :businessIsShow="isShow"
      :twoBtn="false"
      @close="closeFn"
    >
      <div class="dialog-floor">
        <div class="name">
          区域名称: <span class="region-name">{{ regionName }}</span>
        </div>
        <div class="dialog-row">
          包含点位:
          <span class="region-name">
            <el-table
              :data="nodeList"
              stripe
              style="width: 100%"
              empty-text="暂无数据"
            >
              <el-table-column prop="date" label="序号" width="80px">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="点位名称"> </el-table-column>
              <el-table-column prop="vmCount" label="设备数量">
              </el-table-column>
            </el-table>
          </span>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import { removeRegion } from "@/api/region";
import { nodeSearch } from "@/api/node";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "RegionList",
  data() {
    return {
      // 区域名字
      regionName: "",
      isShow: false,
      // 包含点位列表
      nodeList: [],
    };
  },

  created() {},

  methods: {
    //修改
    setRegion(row) {
      this.$emit("setRegion", row);
    },
    // 查看详情
    async getInfo(row) {
      this.regionName = row.name;
      this.isShow = true;
      const params = {
        regionId: row.id,
      };
      this.nodeList = (await nodeSearch(params)).currentPageRecords;
      console.log(this.nodeList);
    },
    //删除区域
    async removeRegion(row) {
      try {
        await removeRegion(row.id);
        this.$message.success("删除成功");
        this.SET_PAGE_INDEX();
        this.getRegionList();
      } catch (error) {
        this.$message.error(error.response.data);
      }
    },
    //关闭弹窗
    closeFn() {
      this.isShow = false;
    },
    ...mapActions("region", ["getRegionList"]),
    ...mapMutations("region", ["SET_PAGE_INDEX"]),
  },

  computed: {},

  props: {
    regionList: {
      type: Object,
      required: true,
    },
  },

  components: {
    Dialog,
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

//区域详情弹窗样式
.dialog-floor {
  padding-left: 55px;
  font-size: 14px;
  .name {
    margin-bottom: 30px;
  }
  .region-name {
    margin-top: -14px;
    margin-left: 15px;
    flex: 1;
  }
}
.dialog-row {
  display: flex;
  padding-right: 50px;
}
</style>

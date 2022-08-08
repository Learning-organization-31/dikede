<template>
  <div>
    <!-- 搜索栏 -->
    <SearchBar @search="searchFn" lastInpTitle="策略搜索" />

    <!-- 下方添加按钮 -->
    <div class="main">
      <!-- 新建配置和弹窗 -->
      <MyButton
        icon="el-icon-circle-plus-outline"
        :btnStyle="addBtnStyle"
        @click="addDialogShow"
      >
        新建
      </MyButton>
      <!-- 列表 -->
      <el-table
        size="medium"
        :data="policyList.currentPageRecords"
        highlight-current-row
        style="width: 100%; margin-top: 20px"
        fit
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column property="policyName" label="策略名称">
        </el-table-column>
        <el-table-column property="discount" label="策略方案">
        </el-table-column>
        <el-table-column property="createTime" label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span
              style="color: #4368e1; cursor: pointer; margin-right: 10px"
              @click="itemDetails(scope.row.policyId)"
              >查看详情</span
            >
            <span
              style="color: #4368e1; cursor: pointer; margin-right: 10px"
              @click="editDialogShow(scope.row)"
              >修改</span
            >
            <span
              style="color: red; cursor: pointer"
              @click="delClickFn(scope.row.policyId)"
              >删除</span
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 页脚 -->
      <FooterPage
        :listIsShow="listIsShow"
        :taskList="policyList"
        v-if="policyList.totalCount"
        :lastDisabled="lastDisabled"
        :rightDisabled="rightDisabled"
        @lastPage="getLastTaskService"
        @nextPage="getNextTaskService"
      />
    </div>
    <!-- 对话框 -->
    <Dialog
      @close="closeFn"
      :twoBtn="false"
      title="策略详情"
      :businessIsShow="dialogTableVisible"
    >
      <div style="margin-left: 40px">
        策略名称: <span style="margin-left: 10px">九折优惠</span>
      </div>

      <div class="dialogMain">
        <div style="margin: 0 10px; padding-top: 10px">策略方案:</div>
        <div style="margin-top: -4px; flex: 1">
          <el-table :data="policyItemList.currentPageRecords" fit>
            <el-table-column
              type="index"
              label="序号"
              :index="indexMethodNext"
            ></el-table-column>
            <el-table-column
              property="nodeName"
              label="点位名称"
            ></el-table-column>
            <el-table-column
              property="innerCode"
              label="设备编号"
            ></el-table-column>
          </el-table>
          <!-- 页脚 -->
          <FooterPage
            :listIsShow="listIsShowNext"
            :taskList="policyItemList"
            v-if="policyItemList.totalCount"
            :lastDisabled="lastDisabledNext"
            :rightDisabled="rightDisabledNext"
            @lastPage="getLastTaskServiceNext"
            @nextPage="getNextTaskServiceNext"
          />
        </div>
      </div>
    </Dialog>

    <!-- 新建弹窗 -->
    <AddDialog :isShowAdd.sync="isShowAdd"></AddDialog>
    <!-- 修改策略 -->
    <DelDialog :isShowDeit.sync="isShowDeit" :itemInfo="itemInfo"></DelDialog>
  </div>
</template>

<script>
import AddDialog from './components/AddDialog'
import DelDialog from './components/DelDialog'
import SearchBar from '@/components/SerchBar'
import MyButton from '@/components/MyButton'
import FooterPage from '@/components/FooterPage'
import Dialog from '@/components/Dialog'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'policy',
  data() {
    return {
      addBtnStyle: {
        background: 'linear-gradient(135deg,#ff9743,#ff5e20)',
      },
      page: 1,
      pageNext: 1,
      dialogTableVisible: false,
      id: '',
      isShowAdd: false,
      isShowDeit: false,
      itemInfo: {},
    }
  },
  components: {
    SearchBar,
    MyButton,
    FooterPage,
    Dialog,
    AddDialog,
    DelDialog,
  },

  created() {
    this.setPolicyList([this.page, 10])
  },

  methods: {
    ...mapActions('policy', [
      'setPolicyList',
      'setPolicyItemList',
      'delPolicyItem',
    ]),
    indexMethod(index) {
      if (this.policyList.pageIndex == 1) return index + 1
      else return index + 1 + this.policyList.pageIndex * 10 - 10
    },
    //item
    indexMethodNext(index) {
      if (this.policyItemList.pageIndex == 1) return index + 1
      else return index + 1 + this.policyItemList.pageIndex * 10 - 10
    },
    searchFn(taskCode) {
      try {
        this.setPolicyList([this.page, 10, taskCode])
        this.$message.success('搜索成功')
      } catch (error) {
        this.$message.error('搜索失败')
      }
    },
    addDialogShow() {
      this.isShowAdd = true
    },
    editDialogShow(val) {
      this.isShowDeit = true
      this.itemInfo = val
    },

    getLastTaskService() {
      this.page--
      this.setPolicyList([this.page, 10])
    },
    getNextTaskService() {
      this.page++
      this.setPolicyList([this.page, 10])
    },

    //item
    getLastTaskServiceNext() {
      this.pageNext--
      this.setPolicyItemList([this.id, this.pageNext, 10])
    },
    getNextTaskServiceNext() {
      this.pageNext++
      this.setPolicyItemList([this.id, this.pageNext, 10])
    },

    itemDetails(val) {
      this.id = val
      this.dialogTableVisible = true
      this.setPolicyItemList([val, this.pageNext, 10])
    },
    closeFn() {
      this.dialogTableVisible = false
      this.pageNext = 1
    },
    async delClickFn(val) {
      try {
        await this.delPolicyItem(val)
        await this.setPolicyList([this.page, 10])
        this.$message.success('删除成功')
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
  },

  computed: {
    ...mapGetters(['policyList', 'policyItemList']),

    //控制列表数量显示隐藏
    listIsShow() {
      return !this.policyList.currentPageRecords?.[0]
    },
    //控制上一页的按钮是否禁用
    lastDisabled() {
      return this.policyList.pageIndex <= 1
    },
    //控制下一页的按钮是否禁用
    rightDisabled() {
      return this.policyList.pageIndex == this.policyList.totalPage
    },

    // item
    //控制列表数量显示隐藏
    listIsShowNext() {
      return !this.policyItemList.currentPageRecords?.[0]
    },
    //控制上一页的按钮是否禁用
    lastDisabledNext() {
      return this.policyItemList.pageIndex <= 1
    },
    //控制下一页的按钮是否禁用
    rightDisabledNext() {
      return this.policyItemList.pageIndex == this.policyItemList.totalPage
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  width: 100%;
  background-color: #fff;
}
.dialogMain {
  display: flex;
  padding: 30px 30px 30px;
}
</style>

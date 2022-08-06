<template>
  <div>
    <Dialog
      :businessIsShow="isShow"
      title="新增工单"
      @close="addDialogUnShow"
      @cancelBtn="addDialogUnShow"
      @open="openFn"
      @sureBtn="createService"
      :isDestroy="true"
    >
      <div class="content">
        <el-form
          :model="service"
          :rules="rules"
          ref="ruleForm"
          label-position="right"
          label-width="auto"
        >
          <el-form-item label="设备编号:" prop="innerCode">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="service.innerCode"
              maxlength="15"
              show-word-limit
              @input="replenishment"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="工单类型:" prop="productType">
            <el-select
              v-model="service.productType"
              placeholder="请选择"
              no-data-text="暂无数据"
            >
              <el-option
                :label="item.typeName"
                :value="item.typeId"
                v-for="item in allTaskType"
                :key="item.typeId"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="运营人员:" prop="assignorId">
            <el-select
              v-model="service.assignorId"
              placeholder="请选择"
              no-data-text="暂无人员"
            >
              <el-option
                :label="item.userName"
                :value="item.userId"
                v-for="item in operatorList"
                :key="item.userId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注:" prop="desc">
            <el-input
              type="textarea"
              placeholder="请输入备注(不超过40字)"
              v-model="service.desc"
              maxlength="40"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
  name: "addDialog",
  data() {
    return {
      service: {
        assignorId: "", //运营人员id
        createType: 1, //工单类型
        desc: "", //描述信息
        details: [], //补货信息(补货工单才有)
        innerCode: "", //设备编号
        productType: "", //工单类型
        userId: 1,
      },
      //工单类型列表
      allTaskType: [],
      //运营人员列表
      operatorList: [],
      //补货信息列表
      ChannelList: [],
      rules: {
        innerCode: [
          { required: true, message: "设备编号不能为空", trigger: "blur" },
        ],
        productType: [
          { required: true, message: "工单类型不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "运营人员不能为空", trigger: "blur" },
        ],
        desc: [{ required: true, message: "备注不能为空", trigger: "blur" }],
      },
      //防抖,用于搜索运营人员
      timer: null,
    };
  },

  created() {},

  methods: {},

  computed: {},

  components: {
    Dialog,
  },

  watch: {},

  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 50px;
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  ::v-deep .el-input__inner {
    width: 398px;
    height: 36px;
    margin-left: 6px;
  }
  ::v-deep .el-textarea__inner {
    height: 82px;
    margin-left: 6px;
    width: 398px;
  }
  .item-icon {
    padding-left: 6px;
    color: #5f84ff;
    cursor: pointer;
    i {
      font-size: 16px;
    }
  }
}
</style>

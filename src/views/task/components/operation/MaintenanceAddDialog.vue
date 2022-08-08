<template>
  <div>
    <Dialog
      :businessIsShow="isShow"
      title="新增工单"
      @close="closeFn"
      @cancelBtn="closeFn"
      @sureBtn="addWord"
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
import { mapActions, mapMutations, mapState } from "vuex";
import { taskType, createService } from "@/api/task";
export default {
  name: "addDialog",
  data() {
    return {
      //表单数据
      service: {
        assignorId: "", //运营人员id
        createType: 1, //工单类型
        desc: "", //描述信息
        innerCode: "", //设备编号
        productType: "", //工单类型
        userId: 1,
      },
      //工单类型列表
      allTaskType: [],

      rules: {
        innerCode: [
          { required: true, message: "设备编号不能为空", trigger: "blur" },
        ],
        productType: [
          { required: true, message: "工单类型不能为空", trigger: "change" },
        ],
        assignorId: [
          { required: true, message: "运营人员不能为空", trigger: "change" },
        ],
        desc: [{ required: true, message: "备注不能为空", trigger: "blur" }],
      },
      //防抖,用于搜索运营人员
      timer: null,
    };
  },

  created() {
    this.getAllTaskStatus();
  },

  methods: {
    //添加新工单
    async addWord() {
      try {
        await this.$refs.ruleForm.validate();
        await createService(this.service);
        this.SET_TASK_SEARCH_PAGE_SIZE();
        this.getMaintenance();
        this.$message.success("发布成功");
        this.closeFn();
      } catch (error) {
        if (error.response.status === 500) {
          this.$message.error(error.response.data);
        }
      }
    },
    //获取所有工单类型
    async getAllTaskStatus() {
      const res = await taskType();
      this.allTaskType = res.filter((item) => item.typeName !== "补货工单");
    },
    //监听input框获取最新的运营人员的数据,添加防抖
    replenishment() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.service.innerCode.trim()) {
          this.getOperatorList(this.service.innerCode);
        }
      }, 500);
    },
    //关闭弹层,清空from表单数据
    closeFn() {
      this.$emit("update:isShow", false);
      this.service = {
        assignorId: "", //运营人员id
        createType: 1, //工单类型
        desc: "", //描述信息
        innerCode: "", //设备编号
        productType: "", //工单类型
        userId: 1,
      };
    },
    ...mapActions("operation", ["getOperatorList", "getMaintenance"]),
    ...mapMutations("operation", ["SET_TASK_SEARCH_PAGE_SIZE"]),
  },

  computed: {
    ...mapState("operation", ["taskSearch", "operatorList"]),
  },

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

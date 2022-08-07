<template>
  <div>
    <Dialog
      :businessIsShow="addDialogIsShow"
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
          <el-form-item label="补货数量:">
            <span class="item-icon" @click="getChannel">
              <i class="el-icon-s-order"></i> 补货清单
            </span>
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
    <ChannelDialog :ChannelList="ChannelList" @upDataService="upDataService" />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import ChannelDialog from "./ChannelDialog";
import { mapActions, mapState } from "vuex";
import { taskType, createService, getChannelList } from "@/api/task";
import { getOperatorList } from "@/api/user";
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

  created() {},

  methods: {
    //隐藏弹窗
    addDialogUnShow() {
      this.setAddDialogIsShow(false);
      //关闭弹窗清空数据
      this.service.desc = "";
      this.service.details = [];
      this.service.innerCode = "";
      this.service.productType = "";
      this.service.userId = "";
      this.service.assignorId = "";
      this.operatorList = [];
    },
    //打开页面获取工单类型
    async openFn() {
      try {
        if (!this.allTaskType[0]) {
          const res = await taskType();
          this.allTaskType = res.filter((item) => item.typeName === "补货工单");
        }
      } catch (error) {
        console.log(error);
      }
    },
    //点击确定新建
    createService() {
      this.$refs.ruleForm.validate(async (validate) => {
        if (validate) {
          try {
            await createService(this.service);
            this.$message.success("发布成功");
            //发布成功重新获取数据
            this.$parent.getTaskService();
            this.setAddDialogIsShow(false);
          } catch (error) {
            if (error.response.status === 500) {
              this.$message.error(error.response.data);
            }
            console.dir(error);
          }
        }
      });
    },
    //监听input事件获取运营人员 开启防抖
    replenishment() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.ruleForm.validateField("innerCode", async (validate) => {
          if (validate.trim() === "") {
            //校验没问题获取运营人员列表
            this.operatorList = await getOperatorList(
              this.service.innerCode.trim()
            );
          }
        });
      }, 200);
    },
    // 点击补货清单单独校验设备编号获取售货机货道详情
    //并且打开遮罩
    async getChannel() {
      try {
        this.$refs.ruleForm.validateField("innerCode", async (validate) => {
          if (validate.trim() === "") {
            //校验没问题获取运补货信息列表
            this.ChannelList = await getChannelList(
              this.service.innerCode.trim()
            );
            //打开对话框
            this.setChannelDialogIsShow(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    //弹框确认补货详情自定义事件触发
    upDataService() {
      const arr = [];
      this.ChannelList.forEach((item) => {
        if (item.sku) {
          const obj = {};
          obj.channelCode = item.channelCode;
          obj.expectCapacity = item.currentCapacity;
          obj.skuId = item.sku.classId;
          obj.skuName = item.sku.brandName;
          obj.skuImage = item.sku.skuImage;
          arr.push(obj);
        }
      });
      this.service.details = arr;
    },
    ...mapActions("task", [
      "setAddDialogIsShow",
      "setChannelDialogIsShow",
      "setInfoDialogIsShow",
    ]),
  },

  computed: {
    ...mapState("task", ["addDialogIsShow", "detailInfoList"]),
  },

  components: {
    Dialog,
    ChannelDialog,
  },

  watch: {
    //监听taskInfo改变,说明点击了重新创建,将值赋给新建工单并打开新建
    async taskInfo() {
      await this.replenishment();
      this.service.desc = this.taskInfo.desc;
      this.service.innerCode = this.taskInfo.innerCode;
      this.service.productType = this.taskInfo.taskType.typeId;
      this.service.assignorId = this.taskInfo.assignorId;
      this.service.details = this.detailInfoList;
      console.log(this.service);
      this.setInfoDialogIsShow(false);
      this.setAddDialogIsShow(true);
    },
  },

  props: {
    taskInfo: {
      type: Object,
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

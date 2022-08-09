<template>
  <Dialog
    :businessIsShow="addIsShow"
    @close="closeFn"
    @cancelBtn="closeFn"
    :title="title"
    @sureBtn="addPartner"
  >
    <el-form
      ref="ruleForm"
      label-position="right"
      label-width="auto"
      :model="addNewPartner"
      :rules="rules"
    >
      <el-form-item label="合作商名称:" prop="name">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          v-model="addNewPartner.name"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          v-model="addNewPartner.contact"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
          v-model="addNewPartner.mobile"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="分成比例(%):" prop="ratio">
        <el-input-number
          placeholder="请输入"
          controls-position="right"
          :min="0"
          :max="100"
          v-model="addNewPartner.ratio"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="账号:" prop="account" v-if="!addNewPartner.id">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="18"
          show-word-limit
          v-model="addNewPartner.account"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password" v-if="!addNewPartner.id">
        <el-input
          type="text"
          placeholder="请输入"
          maxlength="20"
          show-word-limit
          v-model="addNewPartner.password"
        >
        </el-input>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { addPartner, setPartner } from "@/api/partner";
import { mapActions, mapMutations, mapState } from "vuex";
const pattern =
  /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
export default {
  name: "AddPartner",
  data() {
    return {
      addNewPartner: {
        name: "", //合作商名称
        contact: "", //	联系人
        mobile: "", //手机号
        ratio: "", //	分成比例
        account: "", //账号
        password: "", //密码
      },
      rules: {
        name: [
          { required: true, message: "合作商名称不能为空", trigger: "blur" },
        ],
        contact: [
          { required: true, message: "联系人不能为空", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { pattern, message: "请输入正确的手机号", trigger: "blur" },
        ],
        ratio: [
          { required: true, message: "分成比例不能为空", trigger: "blur" },
        ],
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {},

  methods: {
    //点击确认按钮添加新的合作商
    async addPartner() {
      try {
        await this.$refs.ruleForm.validate();
        //校验通过开始发送添加请求 关闭弹窗重新获取数据
        if (this.addNewPartner.id) {
          await setPartner(this.addNewPartner);
          this.$message.success("修改成功");
        } else {
          await addPartner(this.addNewPartner);
          this.$message.success("新增成功");
        }
        this.SET_PAGE_INDEX();
        this.partnerSearch(this.partnerSearchCondition);
        this.closeFn();
      } catch (error) {
        if (error?.response?.data) {
          this.$message.error(error?.response?.data);
        }
      }
    },

    //关闭添加弹窗 初始化数据,清空规则
    closeFn() {
      this.$emit("update:addIsShow", false);
      this.$refs.ruleForm.resetFields();
      this.addNewPartner = {
        name: "", //合作商名称
        contact: "", //	联系人
        mobile: "", //手机号
        ratio: "", //	分成比例
        account: "", //账号
        password: "", //密码
      };
      this.$emit("update:title", "新增合作商");
    },
    ...mapMutations("partner", ["SET_PAGE_INDEX"]),
    ...mapActions("partner", ["partnerSearch"]),
  },

  computed: {
    ...mapState("partner", ["partnerSearchCondition"]),
  },

  components: {
    Dialog,
  },

  props: {
    addIsShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新增合作商",
    },
    row: {
      type: Object,
    },
  },

  watch: {
    //监视row的变化判断是否为修改状态
    row() {
      this.addNewPartner.id = this.row.id;
      this.addNewPartner.name = this.row.name;
      this.addNewPartner.contact = this.row.contact;
      this.addNewPartner.mobile = this.row.mobile;
      this.addNewPartner.ratio = this.row.ratio;

      console.log(this.addNewPartner);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 50px 0 30px;
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  ::v-deep .el-input__inner {
    width: 398px;
    height: 36px;
    margin-left: 5px;
  }

  .el-input-number {
    width: 100%;
  }
}
</style>

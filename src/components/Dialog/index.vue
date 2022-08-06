<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    :width="width"
    @close="close"
    @open="open"
    :destroy-on-close="isDestroy"
  >
    <slot></slot>
    <div class="bottom-btn" v-if="isInfoDialog">
      <MyButton @click="infoBtn" :btnStyle="infoStyle">重新创建</MyButton>
    </div>
    <div class="bottom-btn" v-if="removeDialog">
      <MyButton @click="removeBtn" :btnStyle="infoStyle">取消工单</MyButton>
    </div>
    <div class="bottom-btn" v-if="twoBtn">
      <MyButton @click="cancelBtn" :btnStyle="cancelStyle">取 消 </MyButton>
      <MyButton @click="sureBtn" :btnStyle="sureStyle">确 定 </MyButton>
    </div>
  </el-dialog>
</template>

<script>
import MyButton from "@/components/MyButton";
export default {
  name: "Dialog",
  data() {
    return {
      isShow: "",
      //取消按钮样式
      cancelStyle: {
        background: "#fbf4f0",
        color: "#655b56",
      },
      //确认按钮样式
      sureStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
        color: "#fff",
        marginLeft: "24px",
      },
      //重新创建按钮样式
      infoStyle: {
        background: "#fbf4f0",
        color: "#655b56",
      },
    };
  },

  props: {
    businessIsShow: {
      typeof: Boolean,
      default: false,
    },
    title: {
      typeof: String,
    },
    isInfoDialog: {
      type: Boolean,
      default: false,
    },
    twoBtn: {
      type: Boolean,
      default: true,
    },
    removeDialog: {
      type: Boolean,
      default: false,
    },
    isDestroy: {
      type: Boolean,
      default: false,
    },
    width: {
      typeof: String,
      default: "630px",
    },
  },

  created() {},

  methods: {
    //取消按钮触发点击事件
    cancelBtn() {
      this.$emit("cancelBtn");
    },
    //确认按钮点击触发事件
    sureBtn() {
      this.$emit("sureBtn");
    },
    //弹窗打开时触发
    open() {
      this.$emit("open");
    },
    //关闭弹窗时触发
    close() {
      this.$emit("close");
    },
    //重新创建按钮触发点击事件
    infoBtn() {
      this.$emit("infoBtn");
    },
    //取消工单按钮触发点击事件
    removeBtn() {
      this.$emit("removeBtn");
    },
  },

  computed: {},

  watch: {
    //代理父级传递过来的弹窗控制，不然会报错
    businessIsShow: {
      immediate: true,
      handler() {
        this.isShow = this.businessIsShow;
      },
    },
  },

  components: {
    MyButton,
  },
};
</script>

<style lang="scss" scoped>
// 整个盒子的大样式
::v-deep .el-dialog {
  border-radius: 10px;
  .el-dialog__header {
    .el-dialog__title {
      color: #333;
      font-size: 16px;
      font-weight: 600;
    }
  }
  .el-dialog__body {
    padding: 20px 20px 30px;
  }
}

//下方按钮样式
.bottom-btn {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>

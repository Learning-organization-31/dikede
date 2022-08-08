<template>
  <!-- 页码 -->
  <div class="total" v-if="!listIsShow">
    <template v-if="lastDisabled === false || rightDisabled === false">
      <span
        >共{{ taskList.totalCount }}条数据 第{{ taskList.pageIndex }}/
        {{ Math.ceil(taskList.totalCount / 10) }}页</span
      >
      <div class="page-button">
        <MyButton
          :btnStyle="pageBtnStyle"
          :disabled="lastDisabled"
          @click="lastPage"
          >上一页
        </MyButton>
        <MyButton
          :btnStyle="pageBtnStyle"
          :disabled="rightDisabled"
          @click="nextPage"
          >下一页
        </MyButton>
      </div>
    </template>
  </div>
  <!-- 页码 -->
</template>

<script>
import MyButton from "../MyButton";
export default {
  name: "FooterPage",
  data() {
    return {
      //页码按钮
      pageBtnStyle: {
        background: "#d5ddf8",
        width: "70px",
        height: "32px",
        color: "#000",
        fontWeight: "400",
        marginLeft: "25px",
      },
    };
  },

  props: {
    listIsShow: {
      type: Boolean,
    },
    taskList: {
      type: Object,
    },
    lastDisabled: {
      type: Boolean,
    },
    rightDisabled: {
      type: Boolean,
    },
  },

  created() {},

  methods: {
    lastPage() {
      this.$emit("lastPage");
    },
    nextPage() {
      this.$emit("nextPage");
    },
  },

  computed: {},

  components: {
    MyButton,
  },
};
</script>

<style lang="scss" scoped>
//页码样式
.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 32px 60px 32px 16px;
  span {
    color: #dbdfe5;
    font-size: 16px;
  }
}

//页面按钮
.page-button {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

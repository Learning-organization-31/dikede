<template>
  <!-- 搜索区域 -->
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item :label="lastInpTitle + ':'">
        <el-input
          ref="lastInput"
          v-model="taskCode"
          placeholder="请输入"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item :label="rightInpTitle + ':'" v-if="rightInpTitle">
        <el-select v-model="status" placeholder="请选择" :clearable="true">
          <el-option
            :label="item.roleName"
            :value="item.roleId"
            v-for="item in typeList"
            :key="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <MyButton
          @click="searchBtnFn"
          icon="el-icon-search"
          :btnStyle="searchButStyle"
        >
          查询
        </MyButton>
      </el-form-item>
    </el-form>
  </div>
  <!-- 搜索区域 -->
</template>

<script>
import MyButton from "@/components/MyButton";
export default {
  name: "SearchBar",
  data() {
    return {
      taskCode: "",
      status: "",

      //搜索区域按钮样式
      searchButStyle: {
        background: "#5f84ff",
      },
    };
  },

  props: {
    lastInpTitle: {
      type: String,
    },
    rightInpTitle: {
      type: String,
    },
    typeList: {
      type: Array,
    },
  },

  created() {},

  methods: {
    //搜索按钮获取数据
    searchBtnFn() {
      this.$emit("search", this.taskCode, this.status);
    },
  },

  computed: {},

  components: {
    MyButton,
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  height: 64px;
  background-color: #fff;
  padding-left: 17px;
  margin-bottom: 20px;
  .el-form {
    display: flex;
    align-items: center;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
::v-deep .el-form-item__label {
  font-weight: 400;
}
//输入框的样式
::v-deep .demo-form-inline {
  .el-icon-circle-close {
    cursor: pointer;
  }
  input {
    width: 206px;
    height: 36px;
  }
}
</style>

<template>
  <div class="no">
    <div class="flex">
      <div class="title">异常设备监控</div>
      <i class="el-icon-chat-line-round"></i>
    </div>
    <el-empty description="暂无内容" :image="image"></el-empty>
  </div>
</template>

<script>
import image from "@/assets/imgs/no.png";
export default {
  name: "List",
  data() {
    return {
      image,
    };
  },

  created() {},

  methods: {},

  computed: {},
};
</script>

<style lang="scss" scoped>
.no {
  width: 702px;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
}

//头部区域
.title {
  position: relative;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  z-index: 1;
  span {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #999;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
}

.el-icon-chat-line-round {
  color: #5f84ff;
  cursor: pointer;
  font-size: 20px;
}
</style>

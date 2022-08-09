<template>
  <Dialog
    :businessIsShow="isShow"
    title="合作商详情"
    :twoBtn="false"
    @close="closeFn"
    @cancelBtn="closeFn"
  >
    <el-row type="flex">
      <el-col :offset="2">
        <span class="col-span">合作商名称: </span>
        {{ row.name }}
      </el-col>
      <el-col :offset="1">
        <span class="col-span">联系人: </span>
        {{ row.contact }}
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :offset="2">
        <span class="col-span">联系电话: </span>
        {{ row.mobile }}
      </el-col>
      <el-col :offset="1">
        <span class="col-span">分成比例: </span>
        {{ row.ratio + "%" }}
      </el-col>
    </el-row>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
  name: "PartnerInfo",
  data() {
    return {};
  },

  created() {},

  methods: {
    //关闭弹窗
    closeFn() {
      this.$emit("update:isShow", false);
    },
  },

  computed: {},

  components: {
    Dialog,
  },

  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
    },
  },

  watch: {},
};
</script>

<style lang="scss" scoped>
.el-col {
  height: 36px;
}
.col-span {
  margin-right: 20px;
}
</style>

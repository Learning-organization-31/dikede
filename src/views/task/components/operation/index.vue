<template>
  <div>
    <SearchBar lastInpTitle="工单编号" rightInpTitle="工单状态" />
    <div class="result">
      <div class="btn-title">
        <MyButton icon="el-icon-circle-plus-outline" :btnStyle="addBtnStyle"
          >新建</MyButton
        >
        <!-- <FooterPage /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import FooterPage from "@/components/FooterPage";
export default {
  name: "Operation",
  data() {
    return {
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
    };
  },

  created() {},

  methods: {},

  computed: {},

  components: {
    SearchBar,
    MyButton,
    FooterPage,
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>

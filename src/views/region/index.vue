<template>
  <div>
    <SerchBar lastInpTitle="区域搜索" />
    <div class="result">
      <div class="btn-title">
        <MyButton icon="el-icon-circle-plus-outline" :btnStyle="addBtnStyle"
          >新建
        </MyButton>
      </div>
      <!-- 列表 -->
      <List :regionList="regionList" />
    </div>
    <FooterPage :taskList="regionList" />
  </div>
</template>

<script>
import SerchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import List from "./components/List.vue";
import FooterPage from "@/components/FooterPage";
import { mapActions, mapState } from "vuex";
export default {
  name: "region",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
    };
  },

  created() {
    //进入页面获取区域列表
    this.getRegionList(this.regionSearch);
  },

  methods: {
    ...mapActions("region", ["getRegionList"]),
  },

  computed: {
    ...mapState("region", ["regionSearch", "regionList"]),
  },

  components: {
    SerchBar,
    MyButton,
    List,
    FooterPage,
  },
};
</script>

<style lang="scss" scoped>
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}

//新建按钮和工单按钮
.btn-title {
  display: flex;
  margin-bottom: 20px;
}
</style>

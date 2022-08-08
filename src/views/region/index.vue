<template>
  <div>
    <SerchBar lastInpTitle="区域搜索" @search="searchFn" />
    <div class="result" v-loading="loading">
      <div class="btn-title">
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="addRegion"
          >新建
        </MyButton>
        <RegionDialog :IsShow.sync="IsShow" :title.sync="title" ref="dialog" />
      </div>
      <!-- 列表 -->
      <List :regionList="regionList" @setRegion="setRegion" />
    </div>
    <FooterPage
      :taskList="regionList"
      @lastPage="lastPage"
      @nextPage="nextPage"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      v-if="regionList.currentPageRecords && regionList.currentPageRecords[0]"
    />
  </div>
</template>

<script>
import SerchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import List from "./components/List.vue";
import FooterPage from "@/components/FooterPage";
import RegionDialog from "./components/RegionDialog";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "region",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      IsShow: false,
      title: "新建区域",
    };
  },

  created() {
    //进入页面获取区域列表
    this.getRegionList(this.regionSearch);
  },

  methods: {
    //修改某个区域,由子组件发起请求
    setRegion(row) {
      this.IsShow = true;
      this.title = "修改区域";
      this.$refs.dialog.setAddReion(row);
    },
    //上一页
    lastPage() {
      this.SET_PAGE_INDEX(-1);
      this.getRegionList(this.regionSearch);
    },
    //下一页
    nextPage() {
      this.SET_PAGE_INDEX(1);
      this.getRegionList(this.regionSearch);
    },
    //搜索区域
    searchFn(value) {
      this.SET_REGION_LIST_NAME(value.trim());
      this.getRegionList(this.regionSearch);
    },
    //新增按钮显示弹窗
    addRegion() {
      this.IsShow = true;
    },
    ...mapActions("region", ["getRegionList"]),
    ...mapMutations("region", ["SET_REGION_LIST_NAME", "SET_PAGE_INDEX"]),
  },

  computed: {
    ...mapState("region", ["regionSearch", "regionList", "loading"]),
    ...mapGetters("region", ["lastDisabled", "rightDisabled"]),
  },

  components: {
    SerchBar,
    MyButton,
    List,
    FooterPage,
    RegionDialog,
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

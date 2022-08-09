<template>
  <div v-loading="loading">
    <SerchBar lastInpTitle="合作商搜索" @search="searchParthner" />
    <div class="result">
      <div class="btn-title">
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="AddPartnerFn"
          >新建
        </MyButton>
      </div>
      <PartnerList :List="partnerList" @setInfoFn="setInfoFn" />
    </div>
    <FooterPage
      :taskList="partnerList"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="lastPage"
      @nextPage="nextPage"
    />
    <AddPartner :addIsShow.sync="addIsShow" :title.sync="title" :row="row" />
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import SerchBar from "@/components/SerchBar";
import PartnerList from "./components/PartnerList";
import FooterPage from "@/components/FooterPage";
import AddPartner from "./components/AddPartner";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "Node",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      //添加弹窗显示隐藏控制
      addIsShow: false,
      title: "新增合作商",
      row: {},
    };
  },

  created() {
    //进入页面获取所有合作商
    this.partnerSearch(this.partnerSearchCondition);
  },

  methods: {
    //修改合作
    setInfoFn(row) {
      // 打开弹窗,将数据进行更新,并更改
      this.title = "修改合作商";
      this.addIsShow = true;
      this.row = row;
    },

    //上一页
    lastPage() {
      console.log(1);
      this.SET_PAGE_INDEX(-1);
      this.partnerSearch(this.partnerSearchCondition);
    },
    //下一页
    nextPage() {
      console.log(1);
      this.SET_PAGE_INDEX(1);
      this.partnerSearch(this.partnerSearchCondition);
    },

    //新建按钮,打开弹窗
    AddPartnerFn() {
      this.addIsShow = true;
    },

    //通过名字搜索合作商
    searchParthner(name) {
      // 把页码改为第一页
      this.SET_NAME(name.trim());
      this.SET_PAGE_INDEX();
      this.partnerSearch(this.partnerSearchCondition);
    },

    ...mapActions("partner", ["partnerSearch"]),
    ...mapMutations("partner", ["SET_NAME", "SET_PAGE_INDEX"]),
  },

  computed: {
    ...mapState("partner", [
      "partnerSearchCondition",
      "partnerList",
      "loading",
    ]),
    ...mapGetters("partner", ["lastDisabled", "rightDisabled"]),
  },

  components: {
    SerchBar,
    MyButton,
    PartnerList,
    FooterPage,
    AddPartner,
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

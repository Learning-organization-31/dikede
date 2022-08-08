<template>
  <div>
    <SerchBar lastInpTitle="合作商搜索" />
    <div class="result">
      <div class="btn-title">
        <MyButton icon="el-icon-circle-plus-outline" :btnStyle="addBtnStyle"
          >新建
        </MyButton>
      </div>
      <PartnerList :List="partnerList" />
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import SerchBar from "@/components/SerchBar";
import PartnerList from "./components/PartnerList";
import { mapActions, mapState } from "vuex";
export default {
  name: "Node",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
    };
  },

  created() {
    //进入页面获取所有合作商
    this.partnerSearch(this.partnerSearchCondition);
  },

  methods: {
    ...mapActions("partner", ["partnerSearch"]),
  },

  computed: {
    ...mapState("partner", ["partnerSearchCondition", "partnerList"]),
  },

  components: {
    SerchBar,
    MyButton,
    PartnerList,
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

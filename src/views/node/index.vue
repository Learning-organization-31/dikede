<template>
  <div>
    <SerchBar lastInpTitle="点位搜索" rightInpTitle="区域搜索" />
    <div class="result">
      <div class="btn-title">
        <MyButton icon="el-icon-circle-plus-outline" :btnStyle="addBtnStyle"
          >新建
        </MyButton>
      </div>
      <NodeList :List="nodeAllList" />
    </div>
    <FooterPage :taskList="nodeAllList" />
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import SerchBar from "@/components/SerchBar";
import NodeList from "./components/NodeList";
import FooterPage from "@/components/FooterPage";
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
    //进入页面获取所有点位
    this.getNodeList(this.nodeSearchCondition);
  },

  methods: {
    ...mapActions("node", ["getNodeList"]),
  },

  computed: {
    ...mapState("node", ["nodeSearchCondition", "nodeAllList"]),
  },

  components: {
    SerchBar,
    MyButton,
    NodeList,
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

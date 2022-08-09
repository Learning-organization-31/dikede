<template>
  <div v-loading="loading">
    <SerchBar
      lastInpTitle="点位搜索"
      rightInpTitle="区域搜索"
      @search="searchFn"
      :typeList="typeList"
    />
    <div class="result">
      <div class="btn-title">
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="addDialogFn"
          >新建
        </MyButton>
        <AddNode
          :AddNodeIsShow.sync="AddNodeIsShow"
          :title.sync="title"
          :typeList="typeList"
          ref="addNode"
        />
      </div>
      <NodeList :List="nodeAllList" @setInfo="setInfo" />
    </div>
    <FooterPage
      :taskList="nodeAllList"
      v-if="nodeAllList.currentPageRecords && nodeAllList.currentPageRecords[0]"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="lastPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import MyButton from "@/components/MyButton";
import SerchBar from "@/components/SerchBar";
import NodeList from "./components/NodeList";
import FooterPage from "@/components/FooterPage";
import AddNode from "./components/AddNode";
import { getRegionList } from "@/api/region";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "Node",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      AddNodeIsShow: false,
      title: "新增点位",
      //搜索项,添加所需所在区域也是使用的改内容,传递给子组件服用
      typeList: [],
    };
  },

  async created() {
    //进入页面获取所有点位
    this.getNodeList(this.nodeSearchCondition);
    //进入页面获取所有搜索项
    const res = await getRegionList({ pageSize: 10000 });
    res.currentPageRecords.forEach((item) => {
      const obj = {
        statusName: item.name,
        statusId: item.id,
      };
      this.typeList.push(obj);
    });
  },

  methods: {
    //修改点位管理
    setInfo(row) {
      this.AddNodeIsShow = true;
      this.title = "修改点位";
      this.$refs.addNode.setNodeInfo(row);
    },

    //点击新建按钮获取打开新建对话框
    addDialogFn() {
      this.AddNodeIsShow = true;
    },

    //上一页
    lastPage() {
      this.SET_PAGE_INDEX(-1);
      this.getNodeList(this.nodeSearchCondition);
    },

    //下一页
    nextPage() {
      this.SET_PAGE_INDEX(1);
      this.getNodeList(this.nodeSearchCondition);
    },

    //搜索点位
    searchFn(name, regionId) {
      this.SET_NAME_AND_REGIONID([name, regionId]);
      this.getNodeList(this.nodeSearchCondition);
    },

    ...mapActions("node", ["getNodeList"]),
    ...mapMutations("node", ["SET_NAME_AND_REGIONID", "SET_PAGE_INDEX"]),
  },

  computed: {
    ...mapState("node", ["nodeSearchCondition", "nodeAllList", "loading"]),
    ...mapGetters("node", ["lastDisabled", "rightDisabled"]),
  },

  components: {
    SerchBar,
    MyButton,
    NodeList,
    FooterPage,
    AddNode,
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

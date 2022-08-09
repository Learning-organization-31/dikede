<template>
  <div v-loading="loading">
    <SerchBar lastInpTitle="商品类型搜索" @search="searchFn" />
    <div class="result">
      <div class="btn-title">
        <MyButton
          icon="el-icon-circle-plus-outline"
          :btnStyle="addBtnStyle"
          @click="addSku"
        >
          新建
        </MyButton>
        <AddSku
          :addSkuIsShow.sync="addSkuIsShow"
          :title.sync="title"
          @init="initParams"
          :skuRow="skuRow"
        />
      </div>
      <SkuList :skuList="skuList" @setSku="setSku" @init="initParams" />
    </div>
    <FooterPage
      :taskList="skuList"
      :lastDisabled="lastDisabled"
      :rightDisabled="rightDisabled"
      @lastPage="lastPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { skuGetSearch } from "@/api/sku-class";
import SerchBar from "@/components/SerchBar";
import MyButton from "@/components/MyButton";
import SkuList from "./components/SkuList";
import FooterPage from "@/components/FooterPage";
import AddSku from "./components/AddSku";
export default {
  name: "SkuClass",
  data() {
    return {
      //新建按钮样式
      addBtnStyle: {
        background: "linear-gradient(135deg,#ff9743,#ff5e20)",
      },
      params: {
        pageIndex: 1,
        pageSize: 10,
        className: "",
      },
      loading: false,
      //商品类型列表
      skuList: {},
      addSkuIsShow: false,
      title: "新增商品类型",
      skuRow: {},
    };
  },

  created() {
    this.skuGetSearch();
  },

  methods: {
    //修改商品类型
    setSku(row) {
      this.skuRow = row;
      this.addSkuIsShow = true;
      this.title = "修改商品类型";
    },

    //添加成功或者删除成功之后初始化数据并且重新获取数据
    initParams() {
      this.params.pageIndex = 1;
      this.skuGetSearch();
    },

    //新增
    addSku() {
      this.addSkuIsShow = true;
    },

    //上一页
    lastPage() {
      this.params.pageIndex = this.params.pageIndex - 1;
      this.skuGetSearch();
    },
    //下一页
    nextPage() {
      this.params.pageIndex = this.params.pageIndex + 1;
      this.skuGetSearch();
    },

    //搜索
    searchFn(name) {
      this.params.className = name;
      this.skuGetSearch();
    },

    //获取所有商品类型
    async skuGetSearch() {
      this.loading = true;
      this.skuList = await skuGetSearch(this.params);
      this.loading = false;
    },
  },

  computed: {
    //计算上一页是否禁用
    lastDisabled() {
      return this.skuList.pageIndex <= 1;
    },
    //计算下一页是否禁用
    rightDisabled() {
      return (
        this.skuList.pageIndex == Math.ceil((this.skuList.totalCount - 0) / 10)
      );
    },
  },

  components: {
    SerchBar,
    MyButton,
    SkuList,
    FooterPage,
    AddSku,
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

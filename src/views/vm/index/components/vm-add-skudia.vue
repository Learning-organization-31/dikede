<template>
  <Dialog
    title="选择商品"
    :twoBtn="false"
    :businessIsShow="addSkuDiaIsShow"
    @close="close"
    width="920px"
  >
    <div class="vm-add-dia" v-loading="loading">
      <!-- 头部搜索 -->
      <SearchBar lastInpTitle="商品名称" @search="search" />

      <!-- 左右箭头 -->
      <svg-icon
        iconClass="左箭头"
        @click="leftClick"
        class="active"
        className="left"
      />
      <svg-icon
        iconClass="右箭头"
        @click="rightClick"
        class="active"
        className="right"
      />

      <!-- channe区域 -->
      <div class="channel-box">
        <!-- 主题内容 -->
        <el-row type="flex" class="channel-row" justify="space-between">
          <el-col
            class="channel-col"
            v-for="(item, index) in skuSearchList.currentPageRecords"
            :key="index"
          >
            <div class="img" @click="colClick(item)">
              <img v-imgError :src="item.skuImage" />
              <p>{{ item.skuName }}</p>
            </div>
            <img
              class="tag"
              v-show="item.skuId === clickDeil.skuId"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACQ0lEQVRYR83YP2gTURzA8e8vTSwUEXRQcFHXTiJ10EFcOrQIHQodCiZRCy46uIWmaKSJHRyETBWhSa2IEMGKuAiCRXHWxUGcHAQHhwZqaJLeT15IRNPk8ufe5XLju/fnc793v/fenSxk9FhVeagwCYwR4KVCSuJp3VSYCdBRG9pgHiflrsTSujMMkTEYAzMgDTI6jcg0DFZBCiWBCnCom4dsxtiO0BcnzNRIhTMqvOgEaoWxBhLhfTnEzMFddssR3qly1g3UDmMHJDyXCpd3xqmMfWUTuNQvxgYoe6rKrVRKnHhGV1W57gXjBeSIkMgn5b7pJJbRJEraK6YlSOClwk9gAQi1GKQswpV8Up6ae9G0xoCcgLQDub0zzW32pX0oxMXcomzFl3VahQ3gyD+NthFm15Py1pTFMzqpymsgYgPTbso+/f7F+cIDKcVX9KTuUQAmUH6MKNNrt+VzHXNalS23NaeXyLgujAJr+SW5ZipNZXX0aJElJ8yjjYR8N2XzaT0RET6iHLcVmc4rdYir64uSax5wfkUPH9jjg8K4bYxrlpltwHE496Q+RabyzayOFou8AS74gemY9grfSmEmCgnZRlVi93iGMucXpiOoVgFeUSWqYZaBG35iugK5LXaNe/1kU7t+PR8/bGI8R8g2xhPID0zfIL8wfYH8xPQM8hvTE2gQmK5Bg8J0BRokpiNo0Bj33b7+rd3N1mGzTsutI4jItD2gBYnZN2VBY/4DDQPmL2hYMDVQNKN3Gj+LbGZLv339Abi3VpXvOoUQAAAAAElFTkSuQmCC"
            />
          </el-col>
        </el-row>
      </div>

      <!-- 底部按钮 -->
      <el-row type="flex" justify="center" style="margin-top: 20px">
        <div class="strategy-btn" @click="sureBtn">确认</div>
      </el-row>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import SearchBar from "@/components/SerchBar";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      pageIndex: 1,
      loading: false,
      skuName: "",
      clickDeil: {},
    };
  },
  components: { Dialog, SearchBar },
  props: ["addSkuDiaIsShow", "addItemDeil"],
  methods: {
    ...mapActions("vm", ["getskuSearchList"]),

    // 点击确定
    sureBtn() {
      this.$emit("addSku", this.clickDeil);
    },

    // 点击card
    colClick(itemDeil) {
      this.clickDeil = itemDeil;
    },
    // 点击左箭头
    async leftClick() {
      if (this.pageIndex <= 1) return;
      this.pageIndex -= 1;
      this.updateList();
    },
    // 点击右箭头
    async rightClick() {
      if (this.pageIndex >= this.skuSearchList.totalPage) return;
      this.pageIndex += 1;
      this.updateList();
    },

    // 搜索
    search(val) {
      this.skuName = val;
      this.pageIndex = 1;
      this.updateList();
    },

    // 发送请求
    async updateList() {
      if (this.loading) return;
      this.loading = true;
      await this.getskuSearchList({
        pageIndex: this.pageIndex,
        skuName: this.skuName,
      });
      this.loading = false;
    },

    // 关闭
    close() {
      this.$emit("update:addSkuDiaIsShow", false);
    },
  },
  computed: {
    ...mapState("vm", ["skuSearchList"]),
  },
  watch: {
    addItemDeil: {
      immediate: true,
      handler(val) {
        this.clickDeil = val;
      },
    },
  },
};
</script>

<style scoped lang="scss">
.vm-add-dia {
  position: relative;
  padding-left: 30px;

  .channel-row {
    flex-flow: wrap;
  }
  .channel-col {
    width: 20%;
    margin-bottom: 20px;
    cursor: pointer;
    position: relative;
    .tag {
      position: absolute;
      top: 0;
      left: 0;
    }

    .img {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding-top: 16px;
      background-color: #f6f7fb;
      width: 80%;
      height: 100%;
      overflow: hidden;
      img {
        background-color: #f6f7fb;
        width: auto;
        height: auto;
        max-width: 84px;
        max-height: 84px;
      }
    }
  }

  .left,
  .right {
    font-size: 30px;
    z-index: 9999;
  }
  .left {
    position: absolute;
    left: 0;
    top: 250px;
  }
  .right {
    position: absolute;
    right: 5px;
    top: 250px;
  }
  .active {
    opacity: 0.3;
  }

  .strategy-btn {
    width: 78px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background-color: #ff712c;
    border-radius: 5px;
    cursor: pointer;
    transform: translateX(-30px);
    transition: 0.2s all;
    &:hover {
      background-color: #e64b16;
    }
  }
}
</style>

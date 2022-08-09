<template>
  <Dialog
    title="智能排货"
    :businessIsShow="TopIsShow"
    @close="close"
    :twoBtn="false"
    width="800px"
  >
    <div class="vm-busin-dia">
      <p>该商品区域属于商圈适合销售一下：</p>
      <el-row type="flex" class="channel-row" justify="space-between">
        <el-col
          class="channel-col"
          v-for="item in businessTopList"
          :key="item.skuId"
        >
          <div class="img">
            <img v-imgError :src="item.image" />
            <p>{{ item.skuName || "暂无商品" }}</p>
          </div>
        </el-col>
      </el-row>

      <!-- 底部按钮 -->
      <el-row type="flex" justify="center" style="margin-top: 20px">
        <div class="strategy-btn" @click="isOk">采纳建议</div>
      </el-row>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { mapState } from "vuex";
export default {
  components: { Dialog },
  props: ["TopIsShow"],
  methods: {
    // 点击确定
    isOk() {
      this.$emit("useBusinssTop", this.businessTopList);
      this.close();
    },

    // 关闭弹窗
    close() {
      this.$emit("update:TopIsShow", false);
    },
  },
  computed: {
    ...mapState("vm", ["businessTopList"]),
  },
};
</script>

<style scoped lang="scss">
.vm-busin-dia {
  padding-left: 20px;
  .channel-row {
    flex-flow: wrap;
  }
  .channel-col {
    width: 20%;
    margin-bottom: 20px;
    .img {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding-top: 16px;
      background-color: #f6f7fb;
      width: 80%;
      height: 100%;
      img {
        background-color: #f6f7fb;
        width: auto;
        height: auto;
        max-width: 84px;
        max-height: 84px;
      }
    }
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

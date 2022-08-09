<template>
  <div>
    <Dialog
      title="货道设置"
      :twoBtn="false"
      :businessIsShow="channelDiaIsShow"
      @close="close"
      width="950px"
    >
      <div class="vm-channel-dia" v-loading="loading">
        <!-- 顶部货道详情 -->
        <el-row type="flex" align="middle" class="title">
          <el-col :span="4">货道行数：{{ VmServeDeil.vmRow }}</el-col>
          <el-col :span="4">货道列数：{{ VmServeDeil.vmCol }}</el-col>
          <el-col :span="4"
            >货道容量（个）：{{ VmServeDeil.channelMaxCapacity }}</el-col
          >
          <el-col :span="12">
            <el-row type="flex" justify="end" class="title-btn">
              <div class="strategy-btn channel-btn" @click="buinessBtnFn">
                智能排货
              </div>
            </el-row>
          </el-col>
        </el-row>

        <!-- channe区域 -->
        <div class="channel-box">
          <svg-icon
            iconClass="左箭头"
            :class="{ active: leftIsActive }"
            className="left"
            @click="leftFn"
          />
          <svg-icon
            iconClass="右箭头"
            :class="{ active: rightIsActive }"
            className="right"
            @click="rightFn"
          />

          <el-carousel
            ref="caroysel"
            arrow="never"
            :autoplay="false"
            indicator-position="none"
          >
            <el-carousel-item>
              <el-scrollbar style="height: 100%; overflow-x: hidden">
                <el-row type="flex" class="channel-row">
                  <el-col
                    class="channel-col"
                    v-for="item in VmchannelList1"
                    :key="item.channelId"
                  >
                    <div class="card">
                      <!-- 图片区域 -->
                      <div class="img">
                        <img
                          :src="
                            (item.sku && item.sku.skuImage) ||
                            item.image ||
                            item.skuImage ||
                            defultimg
                          "
                        />
                        <p>
                          {{
                            (item.sku && item.sku.skuName) ||
                            item.skuName ||
                            "暂无商品"
                          }}
                        </p>
                      </div>
                      <!-- 按钮区域 -->
                      <div class="carousel-btn">
                        <span class="add-btn" @click="addBtn(item)">添加</span>
                        <span
                          class="del-btn"
                          @click="delBtn(item)"
                          :class="{ disab: !item.skuId }"
                          >删除</span
                        >
                      </div>
                      <!-- tag -->
                      <div class="tag">{{ item.channelCode }}</div>
                    </div>
                  </el-col>
                </el-row>
              </el-scrollbar>
            </el-carousel-item>
            <el-carousel-item v-if="VmchannelList2">
              <el-scrollbar style="height: 100%; overflow-x: hidden">
                <el-row type="flex" class="channel-row">
                  <el-col
                    class="channel-col"
                    v-for="item in VmchannelList2"
                    :key="item.channelId"
                  >
                    <div class="card">
                      <!-- 图片区域 -->
                      <div class="img">
                        <img
                          :src="
                            (item.sku && item.sku.skuImage) ||
                            item.image ||
                            item.skuImage ||
                            defultimg
                          "
                        />
                        <p>
                          {{
                            (item.sku && item.sku.skuName) ||
                            item.skuName ||
                            "暂无商品"
                          }}
                        </p>
                      </div>
                      <!-- 按钮区域 -->
                      <div class="carousel-btn">
                        <span class="add-btn" @click="addBtn(item)">添加</span>
                        <span
                          class="del-btn"
                          :class="{ disab: !item.skuId }"
                          @click="delBtn(item)"
                          >删除</span
                        >
                      </div>
                      <!-- tag -->
                      <div class="tag">{{ item.channelCode }}</div>
                    </div>
                  </el-col>
                </el-row>
              </el-scrollbar>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 底部按钮 -->
        <el-row type="flex" justify="center" style="margin-top: 20px">
          <div class="strategy-btn" @click="strategybtn">确认</div>
        </el-row>
      </div>
    </Dialog>

    <!--智能排货弹窗  -->
    <VmBusinessTopDia
      :TopIsShow.sync="TopIsShow"
      @useBusinssTop="useBusinssTop"
    />
    <!-- 添加商品弹窗 -->
    <addSkuDia
      :addSkuDiaIsShow.sync="addSkuDiaIsShow"
      @addSku="addSku"
      :addItemDeil="addItemDeil"
    />
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import VmBusinessTopDia from "./vm-businesstop.dia.vue";
import addSkuDia from "./vm-add-skudia.vue";
import { mapState, mapActions } from "vuex";
import { channelConfigApi } from "@/api/vm/index";
export default {
  data() {
    return {
      defultimg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABOCAYAAAC+JjE8AAAIFElEQVR4Xu2da2xbZxnH/897HGdLl7W0s52A0qZpfEvoysY6cdHWFjFpjCEQ0jZVDATitiE0IRiMgsRl2piqdh+GhAZsH0CgdWsHG6i0mraxpBtlKmGlK4ntHF+KCnF83LUU2Jo457wPOm4Dqa/H9nHs2j4ffZ7rz++5vs/7HIKFLRxO95IDH5aQ24jxLgDrGbwSIKcF9UtQhDMEOgsgwYS/CIiXWMfvAgHXv8slQ6UEpqbS/cLJ9zH482D0lDPW0vsJbxHoMZmhnSMjrmSxXAsC3cusbIxq3wHwdQCXtzSoypM7B2DX8WH3/bcTGbnqeUDj8ZQnI2kPM2+r3Ff7aBDRS07B24eGPKmlWV8ENHuId8k/MLC+fdBUnykBCbkg3r/0FPA/oOaFhxUeB/iaMi5OAzgCcBKM/1QfThNrEq4AqB/A9QBWl46UjpJBWxYvWP8HGtWeYubbiyqTeIFgPPT6Bs94oXNHE+OpOjTzWnJ1LLWFoewAyw8WvRAR7Q0Mu+8w92eBRqLahyTzgSIKbwrgbr/X84uqI2sBxXD81J1sGD8GsKJQOoLoFv+w+2AWaDiq/YmZr8u7YhHmmOXNQW//eAswqTmFqbh2Ixn8HIDL8owRTQSH3ZspEklulkIcKeSNgC8FvJ5Ha46khQyEp1N3MaEgExJiM4Wj2gPM/O38+yk65h92XUtEsoV41JwKM4twVHsNwKb8I5oepJCqjQG8JW8n01cCPvcjNUfQggbC07P3MFEBNjROoaiWBHNfbt4ScnTU2z9VKY9Y7PTaOV1fpyiiSziQ9K5bE2m1UR5JnApI3QgVOI/OUkhNzQPIe8khV1LvqNtt6T5TVd+4UofxZYA/A2A4x9EpIvwKDt4ZGOxLVPoHNaP8sWOzK5w9VIhNxgTKhYIOej0lX5ws6kTi2g1S5ydBeHuZ5OcZ9LURr/tHzQip0pjCUU0ycx6jmoCG1PQWQJq3Ed3WA6JvBb3uh6zLN6ek7UATiTOr5vXMNAOuClM2/9itIz73oQr1mkrcdqAhVfsBwDuqzPLVoNfz3ip1m0KtDkBTJwCsqyY7ImLR5Rz2rVsVr0a/GXRsBaqqSZcOodWSmIS8Y9Tbv7cWG43UtRVoOJ72syHDtSREjLsDPo/5suGS3GwFejRxZtVleuZMLSSY8PGRYc8ztdhopK6tQM1EQmrqOIB3VpMUEYwFgXdszJk+qMZWo3RsBxqJpb8qpXy4uoRof9Dr/kh1us2hZTtQVVW7dVz5OgBfhSnOKV3Ktb7Bq/KfhSs01Ehx24FmD/tY2kdSvmL15t481CFoe2DIva+RMOzwXRegWaiJ5CB0sQfAe0oFSqAZkvJTfn/fi3Yk1GgbdQNqJmY+S07HtI8y8GkwfYDBved/hy4EXgVo34ru+ccGBgbMIoGW2OoKNJfQyZNnV/9Ln3dODrrSrTpDuqxAW2IIlkmiA/QCoElVu0YBPgfiq81ZdMl8gkgcEt10wD9w1T+sDoa2BzoxM9NzxVvKw8z44mI9Qg48JqJxgnjEt2HNb8tN27Q10NfUpKsHYj+fL60puxEoBMgdAW/fb4oJty3QycmTq0W3cwyMjWVJ5giYFXZMdFdwg2s6V7ctgR4+fPLyt7mcvy93j1waNM+REN/zD7l2LT0NtCXQsKo9xShRAFfRkKVxB5Q7vd41fzfV2g5oJKZ9U0q2dTKQgLRkfGLE53m+rYBOx9+4yTD0gwCUigahNWFDQHyDiXfbPo1szf/ySoVCyUEoNAGiNcvr+by3mublGxFwKZ8TEzM9K1Y5XgGXrcKuW+gtBTQUTT0Bxva60bJguGagqsrdC9A+S8AnAYxeqPA1CDjDQIKIjoPwR6nQwZHB4ut7LMRaUmQ6mr7XYLmrVju16tcENBxNbmMWjwMYshCIWWd6hEh5Bjr/MhBwzVjQsSQSiZ76mGTj6TpdhCzFsChUFVCzmH9TLH0/A/cxc8VX0ux7UsJ+EP3Ev8H1nFn4UFHUS4RVNb3VgDzATbJArWKg4XS6F2f5SWa+pVoIF+kRRQTzD+d6+eeb+vrerMTmdDx1k27gWULzLJusCKi5MIy6stV2FT8XlwPFwD8F6Gcs6NFCz84FnqXvYcZugLvK2V7O/ZaBZu/vHMrzAOcW1Nodr3n4vwyip0W3+HXuO8pIRLtBCjwA8I12O7bDniWg4fDselZoDMBaO5xatWGeW1ny3xiICWGuqSIvMw9Y1W+EXFmgf42dXqsYC+MgDDYiwEvNZ0mg0eisewHiZTBXWsxwqXGwLd6iQB1wrNRhmEtuyi2mtS2YVjBUFCgIL4BRdMFoKyRfjxyKA62Htzaw2QFq85/cAdoBajMBm811RmgHqM0EbDbXGaEdoDYTsNlcZ4R2gNpMwGZznRHaAWozAZvNFW2RYbOfdjGXKdrEpV0I2JonkdnEpXCbIVsdtY0xGi/aCKttGNiYKBE9WLJVm42+2sKUkPL6bJuckJqaAPDutsi6fkn+Oej1XGel3WX9Qmghyxe1u7wwSs3+H7e1UI7Lmcq+oNeTbWZ7UctgKPIQI9unvrNZJUB0lPQCLYNN/WztkkMe7hQ1WKTJOMG6eF/BptaLJiYntT7hxB6At1o026ZiNCYz2D466p5dCqBgw0Cz5jOiat9lwr2dDwPkjZdzxNjt97q/T1Y+DLBUfepEul/obBbVfqEDFueI6KfSQTtLlbZbammZ7XEvjFshaGv24yqE9cxYWajvaIsc/xkinAWf/7gKJI+RVPZb+bjKfwGFjihtQmXGoAAAAABJRU5ErkJggg==",
      leftIsActive: true,
      rightIsActive: false,
      TopIsShow: false,
      addSkuDiaIsShow: false,
      VmchannelList1: [],
      VmchannelList2: [],
      addItemDeil: {},
      loading: false,
    };
  },
  components: { Dialog, VmBusinessTopDia, addSkuDia },
  props: ["channelDiaIsShow", "VmServeDeil", "rowDeil"],
  methods: {
    ...mapActions("vm", ["getbusinessTopList", "getskuSearchList"]),
    // 点击添加
    addBtn(addItem) {
      this.getskuSearchList({ pageIndex: 1 });
      this.addItemDeil = addItem;
      this.addSkuDiaIsShow = true;
    },

    // 点击确定提交
    async strategybtn() {
      if (this.loading) return; // 防抖
      this.loading = true;
      const innerCode = this.rowDeil.innerCode;
      const channelList = [];
      [...this.VmchannelList1, ...this.VmchannelList2].forEach((item) => {
        channelList.push({ channelCode: item.channelCode, skuId: item.skuId });
      });

      try {
        await channelConfigApi({ innerCode, channelList });
        this.$message.success("修改货道成功");
      } catch (error) {
        this.$message.error("修改货道失败");
      } finally {
        this.loading = false;
        this.close();
      }
    },

    // 确定添加
    addSku(clickDeil) {
      clickDeil.channelCode = this.addItemDeil.channelCode;

      if (this.leftIsActive) {
        const index = this.VmchannelList1.findIndex((item) => {
          return item.channelCode === clickDeil.channelCode;
        });
        this.$set(this.VmchannelList1, index, clickDeil);
      }
      if (this.rightIsActive) {
        const index = this.VmchannelList2.findIndex((item) => {
          return item.channelCode === clickDeil.channelCode;
        });
        this.$set(this.VmchannelList2, index, clickDeil);
      }
      this.addSkuDiaIsShow = false;
    },

    // 点击删除
    delBtn(delitem) {
      if (!delitem.skuId) return;
      if (this.leftIsActive) {
        const index = this.VmchannelList1.findIndex((item) => {
          return item.channelCode === delitem.channelCode;
        });

        this.$set(this.VmchannelList1, index, {
          ...this.VmchannelList1[index],
          image: "",
          skuId: null,
          skuName: "",
          sku: "",
        });
      }
      if (this.rightIsActive) {
        const index = this.VmchannelList2.findIndex((item) => {
          return item.channelCode === delitem.channelCode;
        });

        this.$set(this.VmchannelList2, index, {
          ...this.VmchannelList2[index],
          image: "",
          skuId: null,
          skuName: "",
          sku: "",
        });
      }
    },
    // 确定使用智能推荐
    useBusinssTop(BusinssList) {
      if (this.VmchannelList2.length === 0) {
        for (let i = 0; i < 10; i++) {
          BusinssList[i].channelCode = this.VmchannelList1[i].channelCode;
        }
        return this.VmchannelList1.splice(0, 10, ...BusinssList);
      }
      for (let i = 0; i <= 4; i++) {
        BusinssList[i].channelCode = this.VmchannelList1[i].channelCode;
        BusinssList[i + 5].channelCode = this.VmchannelList2[i].channelCode;
      }

      this.VmchannelList1.splice(0, 5, ...BusinssList.slice(0, 5));
      this.VmchannelList2.splice(0, 5, ...BusinssList.slice(5, 10));
    },
    // 点击智能排货按钮
    buinessBtnFn() {
      this.getbusinessTopList(this.rowDeil.businessId);
      this.TopIsShow = true;
    },
    // 关闭弹层
    close() {
      this.$emit("update:channelDiaIsShow", false);
    },
    // 切换轮播图
    leftFn() {
      if (this.leftIsActive) return;
      this.$refs.caroysel.prev();
      this.rightIsActive = false;
      this.leftIsActive = true;
    },
    // 切换轮播图
    rightFn() {
      if (this.rightIsActive) return;
      this.$refs.caroysel.next();
      this.rightIsActive = true;
      this.leftIsActive = false;
    },
  },
  computed: {
    ...mapState("vm", ["VmchannelList"]),
  },
  watch: {
    VmchannelList: {
      immediate: true,
      deep: true,
      handler(val) {
        this.VmchannelList1 = [];
        this.VmchannelList2 = [];

        if (this.VmchannelList.length <= 30) {
          this.VmchannelList1 = val;
          this.rightIsActive = true;
          return;
        }
        this.rightIsActive = false;
        val.forEach((item) => {
          const str = item.channelCode.charAt(item.channelCode.length - 1);
          if (str <= 5 && str != 0) {
            this.VmchannelList1.push(item);
          } else {
            this.VmchannelList2.push(item);
          }
        });
      },
    },
  },
};
</script>

<style scoped lang="scss">
.vm-channel-dia {
  // padding: 20px;
  // padding-left: 70px;

  .title {
    margin-left: 30px;
    margin-right: 20px;
    padding-left: 40px;
    background-color: #f3f6fb;
    height: 50px;
    .title-btn {
      margin-right: 20px;
    }
  }

  .channel-box {
    margin-top: 20px;
    padding: 0 40px;
    .el-carousel__item {
      background-color: #fff;
      .channel-row {
        flex-flow: wrap;
        .channel-col {
          width: 20%;
        }
      }

      .card {
        margin-right: 10px;
        margin-bottom: 20px;
        position: relative;
        // overflow: hidden;
        text-align: center;
        width: 148px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        .img {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          background-color: #f6f7fb;
          padding-top: 10px;
          height: 135px;
          img {
            background-color: #f6f7fb;
            width: auto;
            height: auto;
            max-width: 84px;
            max-height: 84px;
          }
        }
        .carousel-btn {
          height: 40px;
          line-height: 40px;
          .add-btn,
          .del-btn {
            margin-right: 10px;
            cursor: pointer;
          }
          .add-btn {
            color: #6d8fff;
            &:hover {
              color: #5879e4;
            }
          }
          .del-btn {
            color: #ff7676;
            &:hover {
              color: #ed5a5a;
            }
          }
          .disab {
            cursor: not-allowed;
          }
        }
        .tag {
          position: absolute;
          top: 20px;
          left: 0;
          color: #fff;
          background-color: #829bed;
          width: 43px;
          height: 23px;
          line-height: 23px;
          border-radius: 0 10px 10px 0;
        }
      }
    }

    ::v-deep .el-carousel__container {
      height: 380px;
    }
    ::v-deep.el-scrollbar__wrap {
      overflow-x: hidden;
    }

    .left,
    .right {
      font-size: 30px;
    }
    .left {
      position: absolute;
      left: 15px;
      top: 50%;
    }
    .right {
      position: absolute;
      right: 15px;
      top: 50%;
    }
    .active {
      opacity: 0.3;
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
    &.channel-btn {
      transform: unset;
      background-color: #5f84ff;
      &:hover {
        background-color: #5373e0;
      }
    }
  }
}
</style>

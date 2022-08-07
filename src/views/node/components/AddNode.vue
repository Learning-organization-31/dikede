<template>
  <div>
    <Dialog
      :businessIsShow="AddNodeIsShow"
      :title="title"
      @close="closeFn"
      @cancelBtn="closeFn"
      @open="openFn"
      @sureBtn="sureBtn"
    >
      <el-form
        :model="addNodeRequire"
        :rules="rules"
        ref="ruleForm"
        label-position="right"
        label-width="auto"
      >
        <el-form-item label="设备编号:" prop="name">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="addNodeRequire.name"
            maxlength="15"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所在区域:" prop="regionId">
          <el-select
            v-model="addNodeRequire.regionId"
            placeholder="请选择"
            no-data-text="暂无数据"
          >
            <el-option
              :label="item.statusName"
              :value="item.statusId"
              v-for="item in typeList"
              :key="item.statusId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属商圈:" prop="businessId">
          <el-select
            v-model="addNodeRequire.businessId"
            placeholder="请选择"
            no-data-text="暂无数据"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in BusinessTypeList"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="归属合作商:" prop="ownerId" :required="true">
          <el-select
            v-model="addNodeRequire.ownerId"
            placeholder="请选择"
            no-data-text="暂无数据"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in partnerList"
              :key="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址:" :required="true">
          <el-cascader
            placeholder="请选择"
            :options="options"
            v-model="addrTop"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="addr">
          <el-input
            type="textarea"
            placeholder="请输入详细地址"
            v-model="addNodeRequire.addr"
            maxlength="60"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";

import Dialog from "@/components/Dialog";
import {
  getBusinessType,
  getPartnerList,
  addNodeFn,
  setNodeFn,
} from "@/api/node";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "AddNode",
  data() {
    return {
      addNodeRequire: {
        name: "", //名称
        addr: "", //详细地址
        areaCode: 0, //最后一级区域Id
        createUserId: "", //创建人Id
        regionId: "", //所属区域Id
        businessId: "", //所属商圈Id
        ownerId: "", //合作商Id
        ownerName: "", //合作商名称
      },
      addrTop: [],
      //暂存详细地址,用来发送请求失败时拿回数据
      mapAddr: "",

      rules: {
        name: [{ required: true, message: "请输入设备编号", trigger: "blur" }],
        regionId: [
          { required: true, message: "请选择所在区域", trigger: "change" },
        ],
        businessId: [
          { required: true, message: "请选择所属商圈", trigger: "change" },
        ],
        ownerId: [
          { required: true, message: "请选择归属合作商", trigger: "change" },
        ],
        addr: [{ required: true, message: "请选择详细地址", trigger: "blur" }],
      },
      options: regionData, //地址列表
      BusinessTypeList: [], //商圈列表
      partnerList: [], //合作商列表
    };
  },

  created() {},

  methods: {
    //确认按钮
    async sureBtn() {
      try {
        //校验
        await this.$refs.ruleForm.validate();
        //校验成功,将userid放上去
        this.addNodeRequire.createUserId = this.userInfo.userId;

        //将地址进行缝合   先保存缝合前的数据 防止发送失败时数据错误
        this.mapAddr = this.addNodeRequire.addr;

        this.addNodeRequire.addr =
          CodeToText[this.addrTop[0]] +
          "-" +
          CodeToText[this.addrTop[1]] +
          "-" +
          CodeToText[this.addrTop[2]] +
          "-" +
          this.addNodeRequire.addr;
        this.addNodeRequire.areaCode = this.addrTop[2];
        if (this.title === "新增点位") {
          //新增调用
          //查找出合作商的名称进行赋值
          const res = this.partnerList.find(
            (item) => item.id === this.addNodeRequire.ownerId
          );
          this.addNodeRequire.ownerName = res.name;
          //发起新增请求
          await addNodeFn(this.addNodeRequire);
          this.$message.success("发布成功");
        } else {
          //修改时候触发 发起修改请求
          await setNodeFn(this.addNodeRequire);
          this.$message.success("修改成功");
        }

        //重新获取所有点位
        this.SET_PAGE_INDEX();
        this.getNodeList(this.nodeSearchCondition);
        //关闭弹窗
        this.closeFn();
      } catch (error) {
        if (error.response?.status) {
          this.addNodeRequire.addr = this.mapAddr;
          this.$message.error(error.response.data);
        }
      }
    },
    //打开弹窗判断是否有选择框所需数据,如果没有就调用接口获取数据
    async openFn() {
      if (this.BusinessTypeList[0]) return;
      this.BusinessTypeList = await getBusinessType();
      this.partnerList = (
        await getPartnerList({ pageSize: 10000 })
      ).currentPageRecords;
    },

    //通过父级调用修改点位
    setNodeInfo(row) {
      console.log(row);
      this.addNodeRequire.name = row.name;
      this.addNodeRequire.regionId = row.regionId;
      this.addNodeRequire.businessId = row.businessId;
      this.addNodeRequire.ownerId = row.ownerId;
      this.addNodeRequire.id = row.id;
      const arr = row.addr.split("-");
      if (arr.length === 4) {
        this.addNodeRequire.addr = arr[3];
        const textArr = [];
        textArr.push(TextToCode[arr[0]].code);
        textArr.push(TextToCode[arr[0]][arr[1]].code);
        textArr.push(TextToCode[arr[0]][arr[1]][arr[2]].code);
        this.addrTop = textArr;
      } else {
        this.addNodeRequire.addr = arr[1];
      }
    },

    //关闭新增弹窗
    closeFn() {
      this.$emit("update:AddNodeIsShow", false);
      //关闭弹窗并初始化数据
      this.addNodeRequire = {
        name: "", //名称
        addr: "", //详细地址
        areaCode: 0, //最后一级区域Id
        createUserId: "", //创建人Id
        regionId: "", //所属区域Id
        businessId: "", //所属商圈Id
        ownerId: "", //合作商Id
        ownerName: "", //合作商名称
      };
      this.addrTop = [];
      this.$refs.ruleForm.resetFields();
      this.$emit("update:title", "新增点位");
    },
    ...mapActions("node", ["getNodeList"]),
    ...mapMutations("node", ["SET_PAGE_INDEX"]),
  },

  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("node", ["nodeSearchCondition"]),
  },

  props: {
    AddNodeIsShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "新增点位",
    },
    typeList: {
      type: Array,
      required: true,
    },
  },

  components: {
    Dialog,
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 40px;
  ::v-deep .el-form-item__label {
    font-size: 14px;
    color: #606266;
    font-weight: 400;
  }
  ::v-deep .el-input__inner {
    width: 405px;
    height: 36px;
    margin-left: 6px;
  }
  ::v-deep .el-textarea__inner {
    height: 82px;
    margin-left: 8px;
    width: 405px;
  }
  .item-icon {
    padding-left: 6px;
    color: #5f84ff;
    cursor: pointer;
    i {
      font-size: 16px;
    }
  }
}
</style>

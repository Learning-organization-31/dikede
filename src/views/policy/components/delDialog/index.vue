<template>
  <Dialog
    title="修改策略"
    @close="addClose"
    @cancelBtn="cancelBtnFn"
    @sureBtn="sureBtnFn"
    :businessIsShow="isShowDeit"
  >
    <div class="mainInfo">
      <el-form
        :model="formData"
        :rules="rules"
        ref="FormRef"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item prop="policyName" label="策略名称:">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="formData.policyName"
            maxlength="15"
            show-word-limit
          />
        </el-form-item>

        <el-form-item prop="discount" label="策略方案:">
          <el-input-number
            style="width: 100%"
            v-model="formData.discount"
            controls-position="right"
            placeholder="请输入"
            :min="1"
            :max="100"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
import { mapActions } from 'vuex'
export default {
  name: 'AddDialog',
  data() {
    return {
      formData: {
        policyName: '',
        discount: '',
      },
      rules: {
        policyName: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
        ],
        discount: [
          { required: true, message: '请输入策略方案', trigger: 'blur' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },

  props: {
    isShowDeit: {
      type: Boolean,
      default: false,
    },
    itemInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    Dialog,
  },

  created() {},
  watch: {
    isShowDeit: {
      handler(val) {
        if (val === true) {
          this.formData.policyName = this.itemInfo.policyName
          this.formData.discount = this.itemInfo.discount
        }
      },
    },
  },

  methods: {
    ...mapActions('policy', ['editPolicyItemFn']),
    addClose() {
      this.$emit('update:isShowDeit', false)
    },
    cancelBtnFn() {
      this.$emit('update:isShowDeit', false)
    },
    async sureBtnFn() {
      await this.$refs.FormRef.validate()

      try {
        await this.editPolicyItemFn([this.itemInfo.policyId, this.formData])
        this.$emit('update:isShowDeit', false)

        this.$message.success('修改成功')
        await this.$refs.FormRef.resetFields()
        this.$parent.setPolicyList([this.$parent.page, 10])
      } catch (error) {
        this.$message.error('修改失败')
      }
    },
  },
}
</script>

<style scoped lang="scss">
.mainInfo {
  padding: 0 40px 0 10px;
}
</style>

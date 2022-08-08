<template>
  <Dialog
    title="新增策略"
    @close="addClose"
    @cancelBtn="cancelBtnFn"
    @sureBtn="sureBtnFn"
    :businessIsShow="isShowAdd"
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
    isShowAdd: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Dialog,
  },

  created() {},

  methods: {
    ...mapActions('policy', ['addPolicyItemFn']),
    addClose() {
      this.$emit('update:isShowAdd', false)
    },
    cancelBtnFn() {
      this.$emit('update:isShowAdd', false)
    },
    async sureBtnFn() {
      await this.$refs.FormRef.validate()

      try {
        await this.addPolicyItemFn(this.formData)
        this.$emit('update:isShowAdd', false)
        this.$message.success('添加成功')
        await this.$refs.FormRef.resetFields()
        this.$parent.setPolicyList([this.$parent.page, 10])
      } catch (error) {
        this.$message.error('添加失败')
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

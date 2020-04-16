<template>
  <el-dialog
    title="请评分"
    :visible.sync="dVisible"
    width="30%"
    :before-close="handleClose"
    class="rate-dialog">
    <el-rate
      v-model="rateValue"
      text-color="#ff9900"
      show-score>
    </el-rate>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="dVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rateValue: null
    }
  },
  computed: {
    dVisible: {
      set(val) {
        this.$emit('update:visible', val)
      },
      get() {
        return this.visible
      }
    }
  },
  methods: {
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.rate-dialog {
  /deep/ .el-rate__icon {
    font-size: 26px;
  }
  /deep/ .el-rate__text {
    font-size: 20px;
  }
}
</style>

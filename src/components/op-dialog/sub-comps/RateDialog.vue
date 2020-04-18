<template>
  <el-dialog
    title="请评分"
    :visible.sync="dVisible"
    width="350px"
    :before-close="handleClose"
    class="rate-dialog">
    <el-rate
      v-model="rateValue"
      text-color="#ff9900"
      show-score>
    </el-rate>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRateRequest">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { photoService } from '@/request/services'
import { mapState } from 'vuex'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      rateValue: 0
    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy']),
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
    },
    async addRateRequest() {
      await photoService.addRate({
        photos: this.checkedOptionsCopy.map(item => item.id),
        rate: this.rateValue
      })
      this.$message.success('添加成功')
      this.dVisible = false
      this.$bus.$emit('flashContent')
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

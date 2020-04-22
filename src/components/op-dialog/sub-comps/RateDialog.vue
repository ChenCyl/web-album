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
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      rateValue: this.params.rate || 0
    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy'])
  },
  methods: {
    handleClose(done) {
      done()
    },
    async addRateRequest() {
      if (this.params.rate) {
        this._singleAddRateRequest()
      } else {
        this._bashAddRateRequest()
      }
    },
    async _singleAddRateRequest() {
      await photoService.setRate({
        photoIds: [this.params.photoId],
        rate: this.rateValue
      })
      this.$message.success('修改成功')
      this.dVisible = false
      this.$bus.$emit('flashDetail')
    },
    async _bashAddRateRequest() {
      await photoService.setRate({
        photoIds: this.checkedOptionsCopy.map(item => item.photoId),
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

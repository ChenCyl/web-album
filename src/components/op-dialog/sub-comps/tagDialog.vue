<template>
  <el-dialog
    title="请添加标签"
    :visible.sync="dVisible"
    width="30%"
    :before-close="handleClose"
    class="tag-dialog">
    <!-- TODO: 接口mock了 -->
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

<style>

</style>

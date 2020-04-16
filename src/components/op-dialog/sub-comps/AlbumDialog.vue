<template>
  <!-- TODO: 筛选加新建 -->
  <el-dialog
    title="请选择相册"
    :visible.sync="dVisible"
    width="350px"
    :before-close="handleClose"
    class="album-dialog">
    <el-radio-group v-model="radio">
      <el-radio v-for="album in albums" :key="album.id" :label="album.id">
        <!-- <el-image style="width: 50px; height: 50px"
                  :src="album.src"
                  fit="cover"></el-image> -->
        <div class="ib va-m">
          <div class="name single-ellipsis" :title="album.name">{{ album.name }}</div>
          <div>{{`(${album.num})`}}</div>
        </div>
      </el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="dVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
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
      radio: ''
    }
  },
  computed: {
    ...mapState(['albums']),
    dVisible: {
      set(val) {
        this.$emit('update:visible', val)
      },
      get() {
        return this.visible
      }
    }
  },
  created() {
  },
  methods: {
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.album-dialog {
  .el-radio-group {
    max-height: 276px;
    overflow: auto;
  }
  .el-radio {
    display: block;
    margin-bottom: 20px;
    .name {
      margin-left: 5px;
      max-width: 200px;
      margin-right: 5px;
    }
  }
}
</style>

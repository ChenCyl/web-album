<template>
  <el-dialog
    title="请选择相册"
    :visible.sync="dVisible"
    width="350px"
    :before-close="handleClose"
    class="album-dialog">
    <el-radio-group v-model="albumValue">
      <el-radio v-for="album in albums" :key="album.id" :label="album.id">
        <div class="ib va-m">
          <div class="name single-ellipsis" :title="album.name">{{ album.name }}</div>
          <div>{{`(${album.num})`}}</div>
        </div>
      </el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="addToAlbumRequest">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { photoService } from '@/request/services'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      albumValue: ''
    }
  },
  computed: {
    ...mapState(['albums', 'checkedOptionsCopy']),
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
    },
    async addToAlbumRequest() {
      if (this.albumValue) {
        console.log('copyOptions', this.checkedOptionsCopy)
        await photoService.addToAlbum({
          album: this.albumValue,
          photos: this.checkedOptionsCopy.map(item => item.id)
        })
        this.$message.success('添加成功')
        this.dVisible = false
        this.$bus.$emit('flashContent')
      } else {
        this.$message.warning('请选择相册')
      }
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

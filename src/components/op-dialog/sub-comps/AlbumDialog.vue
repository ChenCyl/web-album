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
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      albumValue: this.params.album ? this.params.album.id : ''
    }
  },
  computed: {
    ...mapState(['albums', 'checkedOptionsCopy'])
  },
  created() {
  },
  methods: {
    handleClose(done) {
      done()
    },
    async addToAlbumRequest() {
      if (this.albumValue) {
        await photoService.addToAlbum({
          albumId: this.albumValue,
          photoIds: this.params.album ? [this.params.photoId] : this.checkedOptionsCopy.map(item => item.photoId)
        })
        this.$message.success('操作成功')
        this.dVisible = false
        this.$bus.$emit(this.params.album ? 'flashDetail' : 'flashContent')
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

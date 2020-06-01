<template>
  <el-dialog
    title="上传照片"
    :visible.sync="dVisible"
    :before-close="handleClose"
    class="upload-dialog">
    <el-upload
      name="imgInput"
      :with-credentials="true"
      class="upload-demo"
      action="http://116.62.152.21:8080/api/uploadphoto"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      list-type="picture-card"
      multiple>
      <i class="el-icon-plus"></i>
      <div class="el-upload__tip" slot="tip">支持的文件类型：JPEG、JPG、PNG、RAW (NEF/NRW)、TIFF、NMS、MPO</div>
    </el-upload>
    <el-dialog :visible.sync="viewerVisible">
      <img width="100%" :src="viewerImageUrl" alt="">
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { photoService } from '@/request/services'
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      fileList: [],
      viewerVisible: false,
      viewerImageUrl: ''
    }
  },
  computed: {
    ...mapState(['albums', 'checkedOptionsCopy'])
  },
  created() {
  },
  methods: {
    ...mapActions(['fetchAlbums', 'fetchFilter']),
    async handleSuccess(response, file, fileList) {
      // console.log('upload success file', response)
      let res = await photoService.addPhoto({
        fileList: [response.data.number]
      })
      if (this.params && this.params.albumId) {
        await photoService.addToAlbum({
          albumId: +this.params.albumId,
          photoIds: res.data
        })
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      this.viewerImageUrl = file.url
      this.viewerVisible = true
    },
    handleClose(done) {
      this.$confirm('您正在关闭上传框，请确保文件已上传完毕', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$bus.$emit('flashContent')
        this.fetchAlbums()
        this.fetchFilter()
        done()
      }).catch()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

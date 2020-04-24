<template>
  <el-dialog
    title="上传照片"
    :visible.sync="dVisible"
    width="830px"
    :before-close="handleClose"
    class="upload-dialog">
    <el-upload
      class="upload-demo"
      action="http://120.26.186.13:9099/mock/13/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :file-list="fileList"
      :data="uploadCdt"
      list-type="picture-card"
      multiple>
      <i class="el-icon-plus"></i>
      <div class="el-upload__tip" slot="tip">支持的文件类型：JPEG、RAW (NEF/NRW)、TIFF、MOV、AVI、MP4、WAV、NMS、MPO</div>
    </el-upload>
    <el-dialog :visible.sync="viewerVisible">
      <img width="100%" :src="viewerImageUrl" alt="">
    </el-dialog>
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
      fileList: [],
      viewerVisible: false,
      viewerImageUrl: ''
    }
  },
  computed: {
    ...mapState(['albums', 'checkedOptionsCopy', 'uploadCdt'])
  },
  created() {
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log('upload success file', file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
        done()
      }).catch()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

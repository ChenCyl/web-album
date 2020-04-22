<template>
  <div v-if="dVisible" v-loading.fullscreen.lock="fullscreenLoading">

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { photoService } from '@/request/services'
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy'])
  },
  async mounted() {
    this.$confirm('此操作将永久删除照片, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.deletePhotosRequset()
    }).catch()
  },
  methods: {
    async deletePhotosRequset() {
      this.fullscreenLoading = true
      await photoService.deletePhotos({
        photoIds: this.checkedOptionsCopy.map(item => item.photoId)
      })
      this.fullscreenLoading = false
      this.$message.success('删除成功')
      this.$bus.$emit("flashContent")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

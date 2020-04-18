<template>
  <div v-if="dVisible" v-loading.fullscreen.lock="fullscreenLoading">

  </div>
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
      fullscreenLoading: false
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
        photos: this.checkedOptionsCopy.map(item => item.id)
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

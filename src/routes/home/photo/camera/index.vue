<template>
  <div>
    <head-title title="照相机" />

    <table-content from="camera"
                   :pageOptions="pageOptions"
                   :total="total"
                   :loading="loading"
                   @handleRowClick="handleRowClick"
                   @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange"></table-content>

  </div>
</template>

<script>
import TableContent from  "@/routes/home/components/table-content"
import { cameraService } from '@/request/services'

export default {
  components: {
    TableContent
  },
  data() {
    return {
      pageOptions: [],
      currentPage: 1,
      pageSize: 20,
      loading: false,
      total: 0,
      photoVisible: false
      // camera: {}
    }
  },
  created() {
    this._getCameraList()
  },
  methods: {
    handleRowClick(val) {
      // this.camera = val
      this.$router.push({
        name: 'photo-camera-photo',
        query: {
          id: val.cameraName
          // name: val.name
        }
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.photoVisible ? this._getPhotos() : this._getCameraList()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.photoVisible ? this._getPhotos() : this._getCameraList()
    },
    async _getCameraList() {
      this.loading = true
      try {
        let res = await cameraService.getCameraList({
          page: this.currentPage,
          size: this.pageSize
        })
        // console.log('res', res)
        this.pageOptions = res.data.data
        this.total = res.data.number
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>


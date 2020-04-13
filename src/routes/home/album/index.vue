<template>
  <div>

    <head-title :title="albumName">
      <template #button>
        <el-button type="primary">上传</el-button>
      </template>
    </head-title>

    <main-content :pageOptions="pageOptions"
                  :total="total"
                  :loading="loading"
                  @handleOrderChange="handleOrderChange"
                  @handleSizeChange="handleSizeChange"
                  @handleCurrentChange="handleCurrentChange"></main-content>

  </div>
</template>

<script>
import MainContent from  "@/routes/home/components/main-content"
import { photoService } from '@/request/services'
import { mapState } from 'vuex'

export default {
  components: {
    MainContent
  },
  data() {
    return {
      pageOptions: [],
      currentPage: 1,
      pageSize: 20,
      loading: false,
      total: 0,
      orderValue: 'ptime_etf',
      albumName: ''
    }
  },
  computed: {
    ...mapState(['albums'])
  },
  created() {
    this._getPhoto()
    let id = this.$route.params.id

    let album = this.albums.find(item => item.id === id)
    albumName = album.name
  },
  methods: {
    handleOrderChange(val) {
      this.orderValue = val
      this._getPhoto()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this._getPhoto()
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this._getPhoto()
    },
    async _getPhoto() {
      this.loading = true
      try {
        let res = await photoService.getPhotos({
          page: this.currentPage,
          size: this.pageSize,
          albums: ["no_album"],
          dates: [],
          cameras: [],
          rates: [0],
          tags: ["no_tag"],
          order: this.orderValue
        })
        this.pageOptions = res.data.data
        this.total = res.data.total
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>


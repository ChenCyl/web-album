<template>
  <div>

    <head-title title="未整理" intro="无所属相册、无等级、无标签的照片" />

    <main-content :pageOptions="pageOptions"
                  :total="total"
                  :loading="loading"
                  @handleOrderChange="handleOrderChange"
                  @handleSizeChange="handleSizeChange"
                  @handleCurrentChange="handleCurrentChange"
                  @handleKeywordChange="handleKeywordChange"></main-content>

  </div>
</template>

<script>
import MainContent from  "@/routes/home/components/main-content"
import { photoService } from '@/request/services'
import flashMixin from '@/core/mixins/flashMixin'

export default {
  components: {
    MainContent
  },
  mixins: [ flashMixin ],
  data() {
    return {
      pageOptions: [],
      currentPage: 1,
      pageSize: 20,
      loading: false,
      total: 0,
      orderValue: 'ptime_etf',
      searchKey: ''
    }
  },
  created() {
    this._getPhoto()
  },
  methods: {
    handleKeywordChange(keyword) {
      this.searchKey = keyword
      this._getPhoto()
    },
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
          order: this.orderValue,
          keyword: this.searchKey
        })
        this.pageOptions = res.data.data.data
        this.total = res.data.data.number
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>


<template>
  <div>

    <head-title :title="albumName" :albumId="albumId">
      <template #op>
        <el-popover placement="bottom"
                    width="260"
                    v-model="albumPopVisible">
          <el-form :model="albumForm" ref="albumForm" class="album-form">
            <el-form-item prop="name"
                          :rules="[{ required: true, message: '请输入新的相册名称', trigger: 'blur' },
                                   { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }]">
              <el-input v-model.trim="albumForm.name"
                        placeholder="请输入相册名称"
                        size="small">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div style="text-align: right;">
                <el-button size="mini" type="text" @click="albumPopVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="saveAlbumRequest">确定</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-button slot="reference"
                     type="primary"
                     icon="el-icon-edit"
                     circle
                     size="mini"
                     plain />
        </el-popover>
        <el-popover
          placement="top"
          width="260"
          v-model="deletePopVisible">
          <p><i class="el-icon-question highlight" style="margin-right: 5px"></i>确认删除相册？</p>
          <p class="typo-sec">相册下的照片将不会被删除</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="deletePopVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="deleteAlbumRequest">确定</el-button>
          </div>
          <el-button
            slot="reference"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            plain />
        </el-popover>
      </template>
    </head-title>

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
import { photoService, albumService } from '@/request/services'
import { mapState, mapActions } from 'vuex'
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
      albumName: '',
      albumId: '',
      albumForm: {
        name: ''
      },
      albumPopVisible: false,
      deletePopVisible: false,
      searchKey: ''
    }
  },
  computed: {
    ...mapState(['albums'])
  },
  watch: {
    $route: {
      handler(val) {
        this.albumId = val.params.id
        this._getPhoto()
        let album = this.albums.find(item => item.id === this.albumId)
        if (album) {
          this.albumName = album.name
          this.albumForm.name = album.name
        } else {
          console.log('相册已被删除')
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions(['fetchAlbums']),
    // 编辑相册名称
    saveAlbumRequest() {
      this.$refs.albumForm.validateField('name', async success => {
        if (!success) {
          await albumService.saveAlbum({
            albumName: this.albumForm.name,
            albumId: this.albumId
          })
          this.$message.success('修改成功')
          this.albumPopVisible = false
          this.albumName = this.albumForm.name
          this.fetchAlbums()
        }
      })
    },
    // 删除相册
    async deleteAlbumRequest() {
      await albumService.deleteAlbum({
        albumId: this.albumId
      })
      this.$message.success('删除成功')
      this.deletePopVisible = false
      await this.fetchAlbums()
      this.$router.push(`/album/${this.albums[0].id}`)
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
    handleKeywordChange(keyword) {
      this.searchKey = keyword
      this._getPhoto()
    },
    async _getPhoto() {
      this.loading = true
      try {
        let res = await photoService.getPhotos({
          page: this.currentPage,
          size: this.pageSize,
          albums: [this.albumId],
          dates: [],
          cameras: [],
          rates: [],
          tags: [],
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


<style lang="scss" scoped>
.album-form {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>

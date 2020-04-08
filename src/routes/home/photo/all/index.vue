<template>
  <div class="photo-all">

    <head-title title="所有照片">
      <template #button>
        <el-button type="primary">上传</el-button>
      </template>
      <template #selector>
        <photo-selectors />
      </template>
    </head-title>

    <div class="content with-shadow">
      <!-- 图片操作区 -->
      <div class="op-cont typo-base">
        <div class="total">
          共 <span class="highlight">112</span> 张照片
        </div>
        <div class="op">
          <div class="order">
            <el-dropdown>
              <span class="el-dropdown-link">
                排序：按时间排序<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="search">
            <el-input size="small" placeholder="输入相片名称"></el-input>
          </div>
          <el-tooltip content="切换视图" placement="top" effect="light">
            <div class="switch-display el-icon-set-up text-btn"></div>
          </el-tooltip>
        </div>
      </div>
      <!-- 图片陈列区 -->
      <div class="photo-cont">
        <!-- NOTE: handleCheckedOptionsChange 命名不可更改 -->
        <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange">
          <div v-for="option in pageOptions"
               :key="option.id"
               :class="{
                 'photo-wrap': true,
                 'photo-checked': checkedOptions.indexOf(option.id) > -1}">
            <div class="op-wrap">
              <el-checkbox :label="option.id"></el-checkbox>
              <div>
                <i class="text-btn el-icon-view" @click="viewDetail(option.id)" title="查看详细参数"></i>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="text-btn el-icon-more-outline"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-files">添加到相册</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-star-off">添加等级</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-price-tag">添加标签</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-share">分享</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-download">下载</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-close">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="image-wrap">
              <el-image style="width: 150px; height: 140px"
                        :src="option.sImgUrl"
                        fit="contain"
                        :preview-src-list="[option.sImgUrl]"></el-image>
                        <!-- FIXME: sImgUrl => lImgUrl -->
            </div>
            <div class="title-wrap typo-base">
              <div class="title single-ellipsis" title="nia">{{option.title}}</div>
              <div class="format">.{{option.format}}</div>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <!-- 分页 -->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[20, 40, 80]"
                     :page-size="pageSize"
                     layout="sizes, prev, pager, next, jumper"
                     :total="400">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import PhotoSelectors from '@/routes/home/components/photo-selectors'
import footerMixin from '@/core/mixins/footerMixin'
import { photoService } from '@/request/services'

export default {
  components: {
    PhotoSelectors
  },
  mixins: [ footerMixin ],
  data() {
    return {
      checkAll: false,
      checkedOptions: [], // NOTE: 必须使用该命名
      pageOptions: [], // NOTE: 必须使用该命名
      currentPage: 1,
      pageSize: 20
    }
  },
  computed: {
  },
  watch: {

  },
  created() {
    this._getPhoto()
  },
  methods: {
    viewDetail(id) {
      this.$detail('ddddd')
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
      let res = await photoService.getPhotos({
        page: this.currentPage,
        size: this.pageSize
      })
      console.log(res)

      // let imgUrlList = res.data.map(img => img.sImgUrl)

      // res.data.forEach(img => {

      //   img.urlList = imgUrlList

      //   let topItem = imgUrlList.shift()
      //   imgUrlList.push(topItem)

      // })

      this.pageOptions = res.data
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/variables.scss';

.content {
  padding: 20px;
  background-color: $color-white;

  .op-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .total {

    }
    .op {
      display: flex;
      align-items: center;
      .search {
        margin-left: 20px;
      }
      .switch-display {
        margin-left: 20px;
        font-size: 24px;
      }
    }

  }

  .photo-cont {

    .photo-wrap {
      display: inline-block;
      border: 1px solid $border-color-base;
      border-radius: 4px;
      margin: 0 20px 20px 0;
      padding: 8px;
    }
    .photo-checked {
      border-color: $color-primary;
    }

    .op-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /deep/ .el-checkbox__label {
        visibility: hidden;
        width: 80px;
      }
      .text-btn {
        font-size: 16px;
        margin-left: 10px;
      }
    }

    .image-wrap {
      margin: 5px 0;
    }

    .title-wrap {
      display: flex;
      max-width: 150px;
      .title {
        max-width: 126px;
      }
      .format {
        white-space: nowrap;
      }
    }
  }

  .el-pagination {
    text-align: right;
  }

}
</style>

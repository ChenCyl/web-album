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

      <div class="photo-cont">
        <!-- NOTE: handleCheckedOptionsChange 命名不可更改 -->
        <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange">
          <div v-for="city in pageOptions"
               :key="city"
               :class="{
                 'photo-wrap': true,
                 'photo-checked': checkedOptions.indexOf(city) > -1}">
            <div class="op-wrap">
              <el-checkbox :label="city"></el-checkbox>
              <div>
                <!-- <el-tooltip content="查看详细参数" placement="top" effect="light"> -->
                <i class="text-btn el-icon-view" @click="viewDetail" title="查看详细参数"></i>
                <!-- </el-tooltip> -->
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
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                        fit="contain"
                        :preview-src-list="srcList"></el-image>
            </div>
            <div class="title-wrap typo-base">
              <div class="title single-ellipsis" title="nia">你好</div>
              <div class="fix">.jpg</div>
            </div>
          </div>
        </el-checkbox-group>
      </div>

      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[100, 200, 300, 400]"
                     :page-size="100"
                     layout="sizes, prev, pager, next, jumper"
                     :total="400">
      </el-pagination>

    </div>

  </div>
</template>

<script>
import PhotoSelectors from '@/routes/home/components/photo-selectors'
import footerMixin from '@/core/mixins/footerMixin'

export default {
  components: {
    PhotoSelectors
  },
  mixins: [ footerMixin ],
  data() {
    return {
      checkAll: false,
      checkedOptions: [], // NOTE: 必须使用该命名
      pageOptions: ['上海', '北京', '广州', '深圳'], // NOTE: 必须使用该命名
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],

      currentPage: 1

    }
  },
  computed: {
  },
  watch: {

  },
  methods: {
    viewDetail() {
      this.$detail('ddddd')
    },

    handleSizeChange() {

    },

    handleCurrentChange() {

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
      }
      .text-btn {
        font-size: 16px;
        margin-left: 10px;
      }
    }

    .image-wrap {

    }

    .title-wrap {
      display: flex;
      .title {
        max-width: 126px;
      }
    }
  }

  .el-pagination {
    text-align: right;
  }

}
</style>

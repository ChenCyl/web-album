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
          <el-tooltip content="切换视图" placement="bottom" effect="light">
            <div class="switch-display el-icon-set-up text-btn"></div>
          </el-tooltip>
        </div>

      </div>
      <div class="photo-cont">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <div v-for="city in cities"
               :key="city"
               :class="{
                 'photo-wrap': true,
                 'photo-checked': checkedCities.indexOf(city) > -1}">
            <div class="op-wrap">
              <el-checkbox :label="city"></el-checkbox>
              <div class="text-btn" @click="viewDetail">详情</div>
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
    </div>


  </div>
</template>

<script>
import PhotoSelectors from '@/routes/home/components/photo-selectors'
import { mapState, mapMutations } from 'vuex'

const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
  components: {
    PhotoSelectors
  },
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      srcList: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
    }
  },
  computed: {
    ...mapState('footer', ['clickAll'])
  },
  watch: {
    checkedCities: {
      handler(val) {
        if (val.length > 0) {
          this.showFooter()
          if (val.length === cityOptions.length) {
            this.footerCheckAll(true)
          } else {
            this.footerCheckAll(false)
          }
        }
        else {
          this.hideFooter()
          this.footerCheckAll(false)
        }
      },
      immediate: true
    },
    clickAll(val) {
      if (val) { this.checkedCities = cityOptions }
      else { this.checkedCities = [] }
    }
  },
  methods: {
    ...mapMutations('footer', ['showFooter', 'hideFooter', 'footerCheckAll']),
    handleCheckedCitiesChange(val) {

    },
    viewDetail() {

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
      // padding: 10px;
      /deep/ .el-checkbox__label {
        visibility: hidden;
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
}
</style>

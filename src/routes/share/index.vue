<template>
  <div class="share-page">
    <el-row>
      <el-col :span="20" :offset="2">

        <el-row class="share-text">
          <span class="typo-h1">{{shareData.title}}</span>
        </el-row>

        <el-row class="share-text">
          <span class="typo-base" v-if="shareData.user">@{{shareData.user}}</span>
        </el-row>

        <el-row class="share-text">
          <span class="typo-base">{{shareData.intro}}</span>
        </el-row>

        <el-row :gutter="15"
                v-viewer="{
                  title: false,
                  url: 'data-src'}"
                class="share-pic-cont">
          <el-col :span="4"
                  v-for="photo in shareData.photos"
                  :key="photo.photoId">
            <!-- <el-card :body-style="{ padding: '0px' }"> -->
            <el-image :src="photo.fileMinUrlPath"
                      style="width: 100%; height: 200px"
                      fit="fill"
                      lazy
                      :data-src="photo.fileUrlPath" />
            <!-- <div style="padding: 14px;">
            <span class="typo-base">{{ photo.photoName | formatName }}.{{ photo.fileFormat }}</span>
          </div> -->
            <!-- </el-card> -->
          </el-col>
        </el-row>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  filters: {
    formatName(val) {
      let arr = val.split('.')
      if (arr.length > 1) {
        arr.pop()
        return arr.join('.')
      }
      return val
    }
  },
  data() {
    return {
      shareData: []
    }
  },
  computed: {
    ...mapState('share', ['share'])
  },
  async created() {
    const uuid = this.$route.params.id
    await this.getAllShare()
    if (this.share[uuid]) {
      this.shareData = this.share[uuid]
      // console.log('shareData', this.shareData)
    } else {
      this.$router.push('/404')
    }
  },
  methods: {
    ...mapActions('share', ['getAllShare'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
.share-page {
  height: 100%;
  overflow: auto;
}

.el-row {
  margin: 20px 0;
}

.el-image {
  margin-bottom: 15px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.8);
  }
  // height: 200px;
}
.typo-h1 {
  color: $color-primary;
}
.share-text {
  text-align: center;
}
.share-pic-cont {

}
</style>

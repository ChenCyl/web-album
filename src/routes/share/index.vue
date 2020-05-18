<template>
  <div>
    <el-row>
      <el-col :span="18"
              :offset="3">
        <span class="typo-h1">{{shareData.title}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18"
              :offset="3">
        <span class="typo-base">{{shareData.intro}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18"
              :offset="3"
              v-for="photo in shareData.photos"
              :key="photo.photoId">
        <el-card :body-style="{ padding: '0px' }">
          <el-image :src="photo.fileUrlPath"
                    style="width: 100%; height: 100%"
                    fit="contain"
                    lazy />
          <div style="padding: 14px;">
            <span class="typo-base">{{ photo.photoName }}.{{ photo.fileFormat }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
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
      console.log('shareData', this.shareData)
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
.el-row {
  margin: 20px 0;
}
.el-card {
  margin-bottom: 20px;
}
.typo-h1 {
  color: $color-primary;
}
</style>

<template>
  <div class="head-title with-shadow">
    <!-- 标题 -->
    <div class="typo-h1">
      <span>{{ title }}</span>
      <el-tooltip v-if="intro"
                  :content="intro"
                  placement="right"
                  effect="light">
        <i class="el-icon-info intro"></i>
      </el-tooltip>
      <!-- 修改、删除操作 -->
      <div v-if="$slots.op" class="op-wrap ib">
        <slot name="op"></slot>
      </div>
    </div>
    <!-- 上传按钮 -->
    <div class="button-wrap">
      <el-button type="primary" @click="uploadPhotos">{{ albumId ? '上传至该相册' : '上传'}}</el-button>
    </div>
    <!-- 选择器 -->
    <el-divider v-if="$slots.selector"></el-divider>
    <div v-if="$slots.selector" class="filter-wrap">
      <slot name="selector"></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    title: String,
    intro: String,
    albumId: String
  },
  methods: {
    ...mapMutations(['updateUploadCdt']),
    uploadPhotos() {
      this.updateUploadCdt({
        album: this.albumId || ''
      })
      this.$dialog('upload')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.head-title {
  background-color: $color-white;
  margin: -20px -20px 20px -20px;
  padding: 20px;
  position: relative;
}

.button-wrap {
  position: absolute;
  top: 0;
  right: 20px;
  line-height: 68px;
}

.intro {
  color: $color-warning;
  margin-left: 8px;
  font-size: 16px;
}

.op-wrap {
  margin-left: 20px;
  /deep/ .el-button {
    margin-right: 10px;
  }
}

</style>

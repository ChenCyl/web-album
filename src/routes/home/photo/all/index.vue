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

    <div class="content">
      ss
    </div>

  </div>
</template>

<script>
import PhotoSelectors from '@/routes/home/components/photo-selectors'
export default {
  components: {
    PhotoSelectors
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/variables.scss';

.content {
  background-color: $color-white;
}
</style>

<template>
  <component :is="message" :visible.sync="visible" :params="params"></component>
</template>

<script>

export default {
  components: {
    album: () => import('./sub-comps/AlbumDialog'),
    rate: () => import('./sub-comps/RateDialog'),
    tag: () => import('./sub-comps/tagDialog'),
    share: () => import('./sub-comps/ShareDialog'),
    carousel: () => import('./sub-comps/CarouselMask'),
    download: () => import('./sub-comps/Download'),
    delete: () => import("./sub-comps/Delete"),
    upload: () => import('./sub-comps/UploadDialog')
  },
  data() {
    return {
      visible: false,
      params: {}
    }
  },
  created() {

  }
}
</script>

<style>

</style>

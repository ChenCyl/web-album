<template>
  <component :is="message" :visible.sync="visible"></component>
</template>

<script>

export default {
  components: {
    album: () => import('./sub-comps/AlbumDialog'),
    rate: () => import('./sub-comps/RateDialog'),
    tag: () => import('./sub-comps/tagDialog'),
    share: () => import('./sub-comps/ShareDialog')
  },
  data() {
    return {
      visible: false
    }
  },
  created() {

  }
}
</script>

<style>

</style>

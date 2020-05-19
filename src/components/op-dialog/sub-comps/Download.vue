<template>
  <div v-if="dVisible" v-loading.fullscreen.lock="fullscreenLoading">

  </div>
</template>

<script>
import { mapState } from 'vuex'
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy'])
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

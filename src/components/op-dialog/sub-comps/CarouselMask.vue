<template>
  <div id="carousel-mask" v-if="dVisible">
    <el-carousel trigger="click" height="100%">
      <el-carousel-item v-for="item in checkedOptionsCopy" :key="item.id">
        <el-image
          style="width: 100%; height: 100%"
          :src="item.lImgUrl"
          fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy']),
    dVisible: {
      set(val) {
        this.$emit('update:visible', val)
      },
      get() {
        return this.visible
      }
    }
  },
  mounted() {
    document.getElementById('carousel-mask').requestFullscreen()
  }
}
</script>

<style lang="scss" scoped>
.el-carousel {
  height: 100%;
}
</style>

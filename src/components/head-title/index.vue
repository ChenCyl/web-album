<template>
  <div class="head-title with-shadow">
    <span class="typo-h1">{{ title }}</span>
    <div v-if="$slots.button" class="button-wrap">
      <slot name="button"></slot>
    </div>
    <el-divider v-if="$slots.selector"></el-divider>
    <div v-if="$slots.selector" class="filter-wrap">
      <slot name="selector"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    info: String
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

</style>

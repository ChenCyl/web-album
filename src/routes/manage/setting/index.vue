<template>
  <div>
    <head-title title="设置"></head-title>

    <div class="content with-shadow">
      <modify-password></modify-password>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModifyPassword from './components/modify-password'

export default {
  components: {
    ModifyPassword
  },
  computed: {
    ...mapState('user', ['userName'])
  }
}
</script>

<style lang="scss" scoped>

@import "@/styles/common.scss";
.content {
  padding: 40px;
  background-color: $color-white;
}
</style>

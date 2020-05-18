<template>
  <div class="logo ib va-m" @click="$router.push('/photo')">
    <template v-if="type === 'no-text'">
      <div class="logo-pic logo-pic-white"></div>
    </template>
    <template v-else-if="type === 'white'">
      <div class="logo-pic logo-pic-white"></div>
      <div class="logo-text logo-text-white">
        PHOTOWN
      </div>
    </template>
    <template v-else>
      <div class="logo-pic"></div>
      <div class="logo-text">
        PHOTOWN
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  }
}
</script>

<style lang="scss" scoped>

.logo {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  text-align: center;
  cursor: pointer;
  .logo-pic {
    width: 65px;
    height: 65px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(../../assets/logo-black.png);
    &.logo-pic-white {
      width: 45px;
      height: 45px;
      background-image: url(../../assets/logo-white.png);
    }
  }
  .logo-text {
    color: #132279;
    font-size: 30px;
    text-indent: 10px;
    &.logo-text-white {
      color: white;
      font-size: 18px;
    }
  }
}
</style>

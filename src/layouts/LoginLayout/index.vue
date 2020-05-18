<template>
  <div class="login-layout">
    <div class="left-area"></div>
    <div class="right-area">
      <router-view class="content" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

@import "@/styles/common.scss";

.login-layout {
  display: flex;
  height: 100%;
  .left-area {
    flex: 1;
    background-image: url(./img/login-page-pic.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: center;
  }
  .right-area {
    flex-basis: 500px;
    background-color: $color-white;
    padding: 0 80px;
    .content {
      margin-top: 20vh;
    }
  }
}

</style>

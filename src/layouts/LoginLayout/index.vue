<template>
  <div class="login-layout" >
    <div class="left-area"></div>
    <div class="right-area">
      <div class="logo"></div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.login-layout {
  display: flex;
  .left-area {
    flex: 2;
    background: green;
  }
  .left-area {
    flex: 0 0 1;
    // flex-shrink: 0;
    padding: 20px;
    .logo {
      width: 200;
      height: 36px;
      background: green;
    }
  }
}

</style>

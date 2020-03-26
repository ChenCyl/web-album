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
.login-layout {
  display: flex;
  height: 100%;
  .left-area {
    flex: 1;
    background: green;
  }
  .right-area {
    flex-basis: 500px;
    background-color: aquamarine;
    padding: 0 80px;
    .content {
      margin-top: 20vh;
    }
  }
}

</style>

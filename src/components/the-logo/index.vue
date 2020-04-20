<template>
  <div class="logo" @click="$router.push('/photo')"></div>
</template>

<script>
export default {

}
</script>

<style>
.logo {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/logo.png);
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>

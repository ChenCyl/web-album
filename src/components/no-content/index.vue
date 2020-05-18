<template>
  <div class="no-content">
    <div class="empty-pic"></div>
    <div class="empty-text typo-sec">暂无内容</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.no-content {
  text-align: center;
  margin: 100px 0;
  .empty-pic {
    margin: 10px auto;
    width: 80px;
    height: 80px;
    background-image: url(./img/empty.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
}
</style>

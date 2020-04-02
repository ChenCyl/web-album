<template>
  <div class="photo-seletors">

    <div class="select-wrap">
      <div class="label typo-base">拍摄日期</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">照相机</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">等级</div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-seletors {
  margin-bottom: -20px;
}

.select-wrap {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}

.label {
  display: inline-block;
  width: 56px;
  text-align-last: justify;
  margin-right: 15px;
}
</style>

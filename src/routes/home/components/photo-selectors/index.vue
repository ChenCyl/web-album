<template>
  <div class="photo-seletors">

    <div class="select-wrap">
      <div class="label typo-base">相册</div>
      <el-select v-model="albumValue" placeholder="请选择" size="small">
        <el-option
          v-for="item in albumOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">拍摄日期</div>
      <el-date-picker
        size="small"
        v-model="dateValue"
        type="dates"
        placeholder="选择一个或多个日期"
        :picker-options="datePickerOptions"
        value-format="timestamp"
        :change="handleChange">
      </el-date-picker>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">照相机</div>
      <el-select v-model="cameraValue" placeholder="请选择" size="small">
        <el-option
          v-for="item in cameraOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">等级</div>
      <el-select v-model="rateValue" placeholder="请选择" size="small">
        <el-option
          v-for="item in rateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">标签</div>
      <el-select v-model="tagValue" placeholder="请选择" size="small">
        <el-option
          v-for="item in tagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

  </div>
</template>

<script>
import { filterService } from '@/request/services'

export default {
  data() {
    return {
      albumValue:'',
      albumOptions: [],
      dateValue: '',
      dateOptions: [],
      datePickerType: 'date',
      datePickerOptions: {
        disabledDate: null
      },
      cameraValue: '',
      cameraOptions: [],
      rateValue: '',
      rateOptions: [],
      tagValue: '',
      tagOptions: []
    }
  },
  created() {
    this._getDate()
  },
  methods: {
    async _getDate() {
      let res = await filterService.getDate()
      let timestamps = res.data.map(timestamp => {
        // 接受的 timestamp 以秒为单位
        return $moment.unix(timestamp).startOf('day').unix()
        // let year = $moment.unix(timestamp).year()
        // let yearValue = $moment.unix(timestamp).startOf('year').unix()
        // let month = $moment.unix(timestamp).month() + 1
        // let monthValue = $moment.unix(timestamp).startOf('month').unix()
        // let day = $moment.unix(timestamp).date()
        // let dayValue = $moment.unix(timestamp).startOf('day').unix()
      })
      this.datePickerOptions.disabledDate = (pickTime) => {
        let pickTimestamp = $moment(pickTime).unix()
        return timestamps.indexOf(pickTimestamp) < 0
      }
    },
    handleChange(val) {
      this.$emit('change', val) // 思考选择器和外层组件如何交互
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

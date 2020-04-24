<template>
  <div class="photo-seletors">

    <div class="select-wrap">
      <div class="label typo-base">相册</div>
      <el-select v-model="albumValue"
                 placeholder="请选择"
                 size="small"
                 multiple
                 clearable
                 collapse-tags
                 @change="handleChange">
        <el-option
          v-for="item in albumOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
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
        value-format="yyyy-MM-dd"
        @change="handleChange">
      </el-date-picker>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">照相机</div>
      <el-select v-model="cameraValue"
                 placeholder="请选择"
                 size="small"
                 multiple
                 clearable
                 collapse-tags
                 @change="handleChange">
        <el-option
          v-for="item in cameraOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">等级</div>
      <el-select v-model="rateValue"
                 placeholder="请选择"
                 size="small"
                 multiple
                 clearable
                 collapse-tags
                 @change="handleChange">
        <el-option
          v-for="item in rateOptions"
          :key="item"
          :label="item + ' 星'"
          :value="item">
          <span style="float: left; margin-right: 30px">{{ item + ' 星' }}</span>
          <el-rate style="float: right; line-height: 2; margin-right: 15px" :value="item" disabled>
          </el-rate>
        </el-option>
      </el-select>
    </div>

    <div class="select-wrap">
      <div class="label typo-base">标签</div>
      <el-select v-model="tagValue"
                 placeholder="请选择"
                 size="small"
                 multiple
                 clearable
                 collapse-tags
                 @change="handleChange">
        <el-option
          v-for="item in tagOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      albumValue:[],
      dateValue: [],
      cameraValue: [],
      rateValue: [],
      rateOptions: $macro.RATE_LIST,
      tagValue: []
    }
  },
  computed: {
    ...mapState({
      albumOptions: state => state.filter.albums,
      datePickerOptions: state => {
        let disabledDate = pickDate => {
          let pickFormatDate = $moment(pickDate).format("YYYY-MM-DD")
          return state.filter.dates.indexOf(pickFormatDate) < 0
        }
        return { disabledDate }
      },
      cameraOptions: state => state.filter.cameras,
      tagOptions: state => state.filter.tags
    })
  },
  methods: {
    handleChange() {
      this.$emit('change', {
        albums: this.albumValue,
        dates: this.dateValue,
        cameras: this.cameraValue,
        rates: this.rateValue,
        tags: this.tagValue
      })
    }
  }
  // FIXME: 可能会用到的
  // dates = dates.map(dates => {
  // 接受的 timestamp 以秒为单位
  // return $moment.unix(dates).startOf('day').unix()
  // let year = $moment.unix(timestamp).year()
  // let yearValue = $moment.unix(timestamp).startOf('year').unix()
  // let month = $moment.unix(timestamp).month() + 1
  // let monthValue = $moment.unix(timestamp).startOf('month').unix()
  // let day = $moment.unix(timestamp).date()
  // let dayValue = $moment.unix(timestamp).startOf('day').unix()
  // })
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

<template>
  <div class="content with-shadow" v-loading="loading">
    <div v-if="pageOptions && pageOptions.length === 0">
      <no-content />
    </div>
    <template v-else>
      <!-- 图片操作区 -->
      <div class="op-cont typo-base">
        <div class="total">
          共 <span class="highlight">{{ total }}</span> 种相机
        </div>
        <!-- <div class="op">
          <div class="search">
            <el-input size="small" placeholder="输入相机名称"></el-input>
          </div>
          <el-tooltip content="切换视图" placement="top" effect="light">
            <div class="switch-display el-icon-set-up text-btn"></div>
          </el-tooltip>
        </div> -->
      </div>
      <!-- 表格区 -->
      <div class="table-cont">
        <!-- NOTE: handleCheckedOptionsChange 命名不可更改 -->
        <el-table
          ref="multipleTable"
          :data="pageOptions"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
          style="width: 100%"
          header-row-class-name="table-head"
          stripe>
          <template v-if="from === 'camera'">
            <!-- <el-table-column type="selection" width="55"></el-table-column> -->
            <el-table-column prop="cameraName"
                             label="照相机"
                             width="250"
                             show-overflow-tooltip></el-table-column>
            <el-table-column prop="num" label="相片数量" width="180"></el-table-column>
            <el-table-column prop="latestPtitle" label="最新上传" show-overflow-tooltip></el-table-column>
            <el-table-column prop="latestDate" label="最新上传时间" show-overflow-tooltip></el-table-column>
          </template>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[20, 40, 80]"
                     :page-size="pageSize"
                     layout="sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </template>
  </div>
</template>

<script>
import footerMixin from '@/core/mixins/footerMixin'
import NoContent from '@/components/no-content'

export default {
  components: {
    NoContent
  },
  mixins: [ footerMixin ],
  props: {
    total: Number,
    loading: Boolean,
    pageOptions: Array, // NOTE: 必须使用该命名
    from: String
  },
  data() {
    return {
      orderValue: 'utime_etf',
      orderOptions: $macro.ORDER_LIST,
      checkedOptions: [], // NOTE: 必须使用该命名
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    handleRowClick(row) {
      // console.log(row)
      this.$emit('handleRowClick', row)
    },
    handleSelectionChange(val) {
      this.checkedOptions = val
      this.handleCheckedOptionsChange(val)
    },
    // handleOrderChange(val) {
    //   this.$emit('handleOrderChange', val)
    // },
    // viewDetail(id) {
    //   this.$detail('ddddd')
    // },
    handleSizeChange(val) {
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style lang="scss" scoped src="./style.scss">

</style>

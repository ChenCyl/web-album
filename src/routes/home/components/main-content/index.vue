<template>
  <div class="content with-shadow">
    <!-- 图片操作区 -->
    <div class="op-cont typo-base">
      <div class="total">
        共 <span class="highlight">{{ total }}</span> 张照片
      </div>
      <div class="op">
        <div class="order">
          <span>排序：</span>
          <el-select v-model="orderValue"
                     placeholder="请选择"
                     @change="handleOrderChange">
            <el-option
              v-for="item in orderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search">
          <el-input size="small" placeholder="输入相片名称"></el-input>
        </div>
        <el-tooltip content="切换视图" placement="top" effect="light">
          <div class="switch-display el-icon-set-up text-btn"></div>
        </el-tooltip>
      </div>
    </div>
    <!-- 图片陈列区 -->
    <div class="photo-cont" v-loading="loading">
      <!-- NOTE: handleCheckedOptionsChange 命名不可更改 -->
      <el-checkbox-group v-model="checkedOptions" @change="handleCheckedOptionsChange">
        <div v-for="option in pageOptions"
             :key="option.id"
             :class="{
               'photo-wrap': true,
               'photo-checked': checkedOptions.indexOf(option.id) > -1}">
          <div class="op-wrap">
            <el-checkbox :label="option.id"></el-checkbox>
            <div>
              <i class="text-btn el-icon-view" @click="viewDetail(option.id)" title="查看详细参数"></i>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="text-btn el-icon-more-outline"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-files">添加到相册</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-star-off">添加等级</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-price-tag">添加标签</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-share">分享</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-download">下载</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-close">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="image-wrap">
            <el-image style="width: 150px; height: 140px"
                      :src="option.sImgUrl"
                      fit="contain"
                      :preview-src-list="[option.sImgUrl]"></el-image>
            <!-- FIXME: sImgUrl => lImgUrl -->
          </div>
          <div class="title-wrap typo-base">
            <div class="title single-ellipsis" title="nia">{{option.title}}</div>
            <div class="format">.{{option.format}}</div>
          </div>
        </div>
      </el-checkbox-group>
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
  </div>
</template>

<script>
import footerMixin from '@/core/mixins/footerMixin'

export default {
  mixins: [ footerMixin ],
  props: {
    total: Number,
    loading: Boolean,
    pageOptions: Array // NOTE: 必须使用该命名
  },
  data() {
    return {
      orderValue: 'ptime_etf',
      orderOptions: $macro.ORDER_LIST,
      checkedOptions: [], // NOTE: 必须使用该命名
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    handleOrderChange(val) {
      this.$emit('handleOrderChange', val)
    },
    viewDetail(id) {
      this.$detail('ddddd')
    },
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

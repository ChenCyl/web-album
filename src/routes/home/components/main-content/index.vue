<template>
  <div class="content with-shadow" v-loading="loading">
    <div v-if="pageOptions && pageOptions.length === 0">
      <no-content />
    </div>
    <template v-else>
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
            <el-input v-model.trim="keyword"
                      size="small"
                      placeholder="输入相片名称进行搜索"
                      @input="handleKeywordChange"></el-input>
          </div>
        <!-- <el-tooltip content="切换视图" placement="top" effect="light">
          <div class="switch-display el-icon-set-up text-btn"></div>
        </el-tooltip> -->
        </div>
      </div>
      <!-- 图片陈列区 -->
      <div class="photo-cont">
        <!-- NOTE: handleCheckedOptionsChange 命名不可更改 -->
        <el-checkbox-group v-model="checkedOptions"
                           @change="handleCheckedOptionsChange"
                           v-viewer="{
                             title: false,
                             url: 'data-src'
                           }">
          <div v-for="option in pageOptions"
               :key="option.photoId"
               :class="{
                 'photo-wrap': true,
                 'photo-checked': checkedOptions.findIndex(item => item.photoId === option.photoId) > -1}">
            <div class="op-wrap">
              <el-checkbox :label="option"></el-checkbox>
              <div>
                <span class="text-btn view-detail-btn" @click="viewDetail(option)" title="查看详细参数">i</span>
                <!-- <el-dropdown trigger="click" @command="handleOnePhotoOptCmd">
                  <span class="el-dropdown-link">
                    <i class="text-btn el-icon-more-outline"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-files" command="album">添加到相册</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-star-off" command="rate">添加等级</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-price-tag" command="tag">添加标签</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-share" :command="{type: 'share', photoId: option.photoId}">分享</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-download" :command="{type: 'download', photoId: option.photoId}">下载</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-close" :command="{type: 'delete', photoId: option.photoId}">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown> -->
              </div>
            </div>
            <div class="image-wrap">
              <el-image style="width: 150px; height: 140px"
                        :src="option.fileMinUrlPath"
                        fit="contain"
                        :data-src="option.fileUrlPath"></el-image>
            </div>
            <div class="title-wrap typo-base">
              <div class="title single-ellipsis" :title="option.photoName">{{option.photoName | formatName}}</div>
              <div class="format">.{{option.fileFormat}}</div>
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
  filters: {
    formatName(val) {
      let arr = val.split('.')
      if (arr.length > 1) {
        arr.pop()
        return arr.join('.')
      }
      return val
    }
  },
  mixins: [ footerMixin ],
  props: {
    total: Number,
    loading: Boolean,
    pageOptions: Array // NOTE: 必须使用该命名
  },
  data() {
    return {
      orderValue: 'utime_etf',
      orderOptions: $macro.ORDER_LIST,
      checkedOptions: [], // NOTE: 必须使用该命名
      currentPage: 1,
      pageSize: 20,
      keyword: ''
    }
  },
  methods: {
    // handleOnePhotoOptCmd(cmd) {
    //   this.$dialog({
    //     message: cmd.type,
    //     params: {
    //       photoId: cmd.photoId
    //     }
    //   })
    // },
    handleKeywordChange(val) {
      this.$emit('handleKeywordChange', val)
    },
    handleOrderChange(val) {
      this.$emit('handleOrderChange', val)
    },
    viewDetail(img) {
      this.$detail(img)
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

<template>
  <div>
    <head-title title="分享管理"></head-title>

    <div class="content with-shadow">
      <!-- 图片操作区 -->
      <div class="op-cont typo-base">
        <div class="total">
          共 <span class="highlight">{{ shareData.length }}</span> 个分享链接
        </div>
        <div class="op">
          <div class="search">
            <el-input size="small" placeholder="输入相机名称"></el-input>
          </div>
          <el-tooltip content="切换视图" placement="top" effect="light">
            <div class="switch-display el-icon-set-up text-btn"></div>
          </el-tooltip>
        </div>
      </div>
      <!-- 表格区 -->
      <div class="table-cont">
        <el-table
          ref="multipleTable"
          :data="shareData"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="table-head"
          stripe>
          <template>
            <el-table-column prop="title" label="主题"></el-table-column>
            <el-table-column prop="intro" label="介绍" show-overflow-tooltip></el-table-column>
            <el-table-column label="链接">
              <template slot-scope="{ row }">
                <span class="text-btn">{{`https://localhost:8080/share/${row.uuid}`}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="expire" label="有效期至"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
  },
  data() {
    return {
      shareData: []
    }
  },
  computed: {
    ...mapState('share', ['share'])
  },
  created() {
    console.log('share', this.share)
    this.shareData = Object.values(this.share)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.content {
  padding: 20px;
  background-color: $color-white;

  .op-cont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .total {

    }
    .op {
      display: flex;
      align-items: center;
      .search {
        margin-left: 20px;
      }
      .switch-display {
        margin-left: 20px;
        font-size: 24px;
      }
    }
  }

  .table-cont {
    margin-bottom: 20px;
    /deep/ .table-head th {
      background-color: $table-head-bg-color;
      color: $color-text-regular;
    }
    // /deep/ .el-table__body .el-table__row {
    //   cursor: pointer;
    // }
  }

  .el-pagination {
    text-align: right;
  }

}
</style>

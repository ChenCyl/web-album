<template>
  <div>
    <head-title title="分享管理"></head-title>

    <div class="content with-shadow">
      <div v-if="shareData && shareData.length === 0">
        <no-content />
      </div>
      <template v-else>
        <!-- 图片操作区 -->
        <div class="op-cont typo-base">
          <div class="total">
            共 <span class="highlight">{{ shareData.length }}</span> 个分享链接
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
            v-loading="loading"
            stripe>
            <template>
              <el-table-column prop="title" label="主题"></el-table-column>
              <el-table-column prop="intro" label="介绍语" show-overflow-tooltip></el-table-column>
              <el-table-column label="链接">
                <template slot-scope="{ row }">
                  <span class="text-btn" @click="copyLink(row.link)">{{ row.link }}</span>
                </template>
              </el-table-column>
              <el-table-column label="照片数量">
                <template slot-scope="{ row }">
                  {{ row.photos.length }}
                </template>
              </el-table-column>
              <el-table-column prop="expireTime" label="有效期至" min-width="150">
                <template slot-scope="{ row }">
                  <el-date-picker
                    v-model="row.expireTime"
                    size="mini"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :clearable="false"
                    @change="handleEdit(row)">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-popconfirm
                    title="确认删除？"
                    @onConfirm="handleDelete(row)">
                    <el-button  size="mini" type="danger" slot="reference">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { copy2Clip } from '@/utils/copy2Clip'
import NoContent from '@/components/no-content'

export default {
  components: {
    NoContent
  },
  props: {
  },
  data() {
    return {
      shareData: [],
      loading: false
    }
  },
  computed: {
    ...mapState('share', ['share'])
  },
  async mounted() {
    this.loading = true
    await this.getAllShare()
    // console.log('share', this.share)
    this.shareData = Object.values(this.share)
    this.loading = false
  },
  methods: {
    ...mapActions('share', ['getAllShare', 'saveAllShare']),
    copyLink(text) {
      copy2Clip(text, () => {
        this.$message.success('成功复制到剪切板')
      })
    },
    async handleDelete(row) {
      this.loading = true
      delete this.share[row.uuid]
      await this.saveAllShare()
      this.shareData = Object.values(this.share)
      this.loading = false
      this.$message.success('删除成功')
    },
    async handleEdit(row) {
      this.loading = true
      // console.log('eidt', row)
      this.share[row.uuid] = row
      await this.saveAllShare()
      this.shareData = Object.values(this.share)
      this.loading = false
      this.$message.success('修改成功')
    }
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

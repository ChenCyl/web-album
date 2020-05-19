<template>
  <el-dialog
    title="请设置标签"
    :visible.sync="dVisible"
    width="350px"
    :before-close="handleClose"
    class="tag-dialog">
    <div>
      <el-checkbox-group v-model="tagValue" size="small" v-loading="loading">
        <el-checkbox-button v-for="tag in filter.tags" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox-button>
        <div class="ib" v-if="inputVisible">
          <el-input
            class="input-new-tag"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm">
          </el-input>
          <el-button type="text" size="mini" @click="handleInputConfirm">确认</el-button>
        </div>
        <el-button v-else
                   class="button-new-tag"
                   size="small"
                   @click="showInput">+ 新建标签</el-button>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="setTagsRequest">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { tagService } from '@/request/services'
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      tagValue: this.params.tagList ? this.params.tagList.map(item => item.id) : [],
      inputVisible: false,
      inputValue: '',
      loading: false
    }
  },
  computed: {
    ...mapState(['filter', 'checkedOptionsCopy'])
  },
  created() {
    console.log(this.filter)
  },
  methods: {
    ...mapActions(['fetchFilter']),
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.loading = true
        await this.createTagRequest()
        await this.fetchFilter()
        this.loading = false
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async createTagRequest() {
      await tagService.createTag({
        tagName: this.inputValue
      })
    },
    async setTagsRequest() {
      if (this.tagValue.length) {
        await tagService.setTags({
          photoIds: this.params.photoId ? [this.params.photoId] : this.checkedOptionsCopy.map(item => item.photoId),
          tagIds: this.tagValue
        })
        this.$message.success('添加成功')
        this.dVisible = false
        this.$bus.$emit("flashContent")
        this.$bus.$emit('flashDetail')
      } else {
        this.$message.warning("请选择标签")
      }
    },
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>

@import "@/styles/common";

.el-checkbox-button {
  /deep/ .el-checkbox-button__inner {
      margin: 0 10px 10px 0;
      border: 1px solid $border-color-base;
      border-radius: 4px;
      box-shadow: none;
  }
}
.input-new-tag {
  width: 90px;
  margin-right: 5px;
}
</style>

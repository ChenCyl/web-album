<template>
  <el-dialog
    title="分享"
    :visible.sync="dVisible"
    width="350px"
    :before-close="handleClose"
    class="rate-dialog">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="分享主题">
        <el-input v-model.trim="form.title"
                  size="small"
                  maxlength="20"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea"
                  v-model="form.intro"
                  size="small"
                  maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <!-- NOTE: 暂时不用 按需做 -->
      <!-- <el-form-item label="分享设置">
        <el-checkbox-group v-model="form.auth">
          <el-checkbox label="file" name="type">是否分享文件信息</el-checkbox>
          <el-checkbox label="camera" name="type">是否分享相机信息</el-checkbox>
          <el-checkbox label="params" name="type">是否分享拍摄数据</el-checkbox>
          <el-checkbox label="location" name="type">是否分享位置信息</el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="shareRequest">创建分享链接</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { copy2Clip } from '@/utils/copy2Clip'
import dialogMixin from '@/core/mixins/dialogMixin'

export default {
  mixins: [ dialogMixin ],
  data() {
    return {
      form: {
        title: '',
        intro: '',
        auth: []
      }
    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy'])
  },
  methods: {
    ...mapActions('share', ['createShareLink']),
    handleClose(done) {
      done()
    },
    async shareRequest() {
      let linkId = await this.createShareLink({
        title: this.form.title,
        intro: this.form.intro
      })
      const h = this.$createElement
      this.$message({
        customClass: 'share-link-msg',
        showClose: true,
        message: h('p', null, [
          h('p', { style: 'color: #67C23A; font-size: 14px' }, '创建成功，点击复制分享链接：'),
          h('i',
            {
              class: 'text-btn',
              on: {
                click: () => { this.copyLink(linkId)}
              }
            },
            'https://localhost:8080/share/' + linkId) // FIXME:
        ]),
        type: 'success',
        duration: 0
      })
      this.dVisible = false
    },
    copyLink(text) {
      copy2Clip(text, () => {
        this.$message.success('复制成功')
      })
    }
  }
}
</script>

<style lang="scss">
.share-link-msg {
  min-width: 400px
}

</style>

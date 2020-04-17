<template>
  <el-dialog
    title="请评分"
    :visible.sync="dVisible"
    width="350px"
    :before-close="handleClose"
    class="rate-dialog">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分享主题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="分享设置">
        <el-checkbox-group v-model="form.type">
          <!-- TODO: 。。。 -->
          <el-checkbox label="美食/餐厅线上活动" name="type">是否分享文件信息</el-checkbox>
          <el-checkbox label="地推活动" name="type">是否分享相机信息</el-checkbox>
          <el-checkbox label="线下主题活动" name="type">是否分享拍摄数据</el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type">是否分享位置信息</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dVisible = false">取 消</el-button>
      <el-button type="primary" @click="shareRequest">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { photoService } from '@/request/services'
import { mapState } from 'vuex'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {

      }
    }
  },
  computed: {
    ...mapState(['checkedOptionsCopy']),
    dVisible: {
      set(val) {
        this.$emit('update:visible', val)
      },
      get() {
        return this.visible
      }
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    async addRateRequest() {
      await photoService.addRate({
        photos: this.checkedOptionsCopy,
        rate: this.rateValue
      })
      this.$message.success('添加成功')
      this.dVisible = false
      this.$bus.$emit('flashContent')
    }
  }
}
</script>

<style lang="scss" scoped>


</style>

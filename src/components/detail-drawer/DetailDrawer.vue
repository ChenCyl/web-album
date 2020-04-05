<template>
  <div>
    <el-drawer
      title="照片详情"
      size="500px"
      :visible.sync="visible"
      direction="rtl"
      :before-close="handleClose">
      <div class="detail-cont">
        <el-image style="height: 340px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="contain"></el-image>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="一致性 Consistency" name="1">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ data.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ data.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ data.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ data.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ data.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ data.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ data.desc }}</span>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- TODO: 调用组件的地方可以传入图片id -->
      <!-- <span>{{ message }}</span> -->
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      activeName: '1',
      data: {}
    }
  },
  methods: {
    handleClose(done) {
      done()
    }
  }
}
</script>

<style lang="scss">
.el-drawer {
  overflow: auto;
  label {
    width: 90px;
    color: #99a9bf; // TODO:
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
.detail-cont {
  padding: 0 20px;
}
</style>

<template>
  <div>
    <el-drawer
      title="照片详情"
      size="500px"
      :visible.sync="visible"
      direction="rtl">
      <div class="detail-cont">
        <el-image style="height: 340px"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="contain"></el-image>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane name="basicInfo">
            <span slot="label">
              <el-tooltip content="基本信息" placement="bottom" effect="dark">
                <i class="icon-label el-icon-picture-outline"></i>
              </el-tooltip>
            </span>
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="名称">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="所属相册">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="等级">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="标签">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="fileInfo">
            <span slot="label">
              <el-tooltip content="文件信息" placement="bottom" effect="dark">
                <i class="icon-label el-icon-document"></i>
              </el-tooltip>
            </span>
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="文件名">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="拍摄日期">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="上传日期">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="文件大小">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="影像大小">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="cameraInfo">
            <span slot="label">
              <el-tooltip content="相机信息" placement="bottom" effect="dark">
                <i class="icon-label el-icon-camera"></i>
              </el-tooltip>
            </span>
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="照相机制造商">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="照相机">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="镜头">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="photoInfo">
            <span slot="label">
              <el-tooltip content="拍摄数据" placement="bottom" effect="dark">
                <i class="icon-label el-icon-video-camera"></i>
              </el-tooltip>
            </span>
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="光圈">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="快门速度">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="焦距">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="ISO感光度">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="曝光补偿">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="场景模式">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="AF区域模式">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="测光">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="白平衡">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="闪光灯">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="动态D-Lighting">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="优化校准">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="基于">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="快速调整">
                <span>{{ data.desc || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="locationInfo">
            <span slot="label">
              <el-tooltip content="位置信息" placement="bottom" effect="dark">
                <i class="icon-label el-icon-location-information"></i>
              </el-tooltip>
            </span>
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="地点全称">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="纬度">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="经度">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="海拔">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="方位">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
              <el-form-item label="POI">
                <span>{{ data.name || '暂无' }}</span>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>


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
      activeName: 'basicInfo',
      data: {
        name: '动物森友会'
      }
    }
  },
  methods: {
    handleClick() {
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.el-drawer {
  overflow: auto;
  label {
    width: 100px;
    color: $color-text-secondary;
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

.icon-label {
  font-size: 18px;
}
</style>

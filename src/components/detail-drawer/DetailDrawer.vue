<template>
  <el-drawer
    title="照片详情"
    size="600px"
    :visible.sync="visible"
    direction="rtl"
    :modal="false"
    @closed="onClose"
    class="photo-detail-drawer">
    <div class="detail-cont">
      <el-image :src="fileUrlPath"
                fit="contain">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
      </el-image>
      <el-tabs v-model="activeName"
               type="card"
               @tab-click="handleClick"
               v-loading="loading">
        <el-tab-pane name="basicInfo">
          <span slot="label">
            <el-tooltip content="基本信息" placement="top" effect="light">
              <i class="icon-label el-icon-picture-outline"></i>
            </el-tooltip>
          </span>
          <el-form label-position="left" class="detail-form-cont">
            <el-form-item label="名称">
              <span>{{ detailData.photoName || '暂无' }}</span>
              <el-popover placement="top"
                          width="260"
                          v-model="nameEditPopVisible">
                <el-input v-model.trim="photoNameValue"
                          placeholder="请输入照片名称"
                          maxlength="100"
                          size="small">
                </el-input>
                <div style="text-align: right; margin-top: 10px">
                  <el-button size="mini" type="text" @click="nameEditPopVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="editNameComfirm">确定</el-button>
                </div>
                <el-button slot="reference"
                           type="text"
                           icon="el-icon-edit"></el-button>
              </el-popover>
            </el-form-item>
            <el-form-item label="所属相册">
              <span>{{ detailData.album ? detailData.album.name : '暂无' }}</span> <!-- FIXME:多对一 -->
              <el-button type="text" @click="editAlbum(detailData.album)" icon="el-icon-edit"></el-button>
            </el-form-item>
            <el-form-item label="等级">
              <el-rate v-model="detailData.photoScore"
                       disabled
                       show-score
                       text-color="#ff9900"></el-rate>
              <el-button type="text" @click="editRate(detailData.photoScore)" icon="el-icon-edit"></el-button>
            </el-form-item>
            <el-form-item label="标签">
              <el-tag
                :key="tag.id"
                v-for="tag in detailData.tagList"
                closable
                :disable-transitions="false"
                @close="handleDeleteTag(tag.id)">
                {{ tag.name }}
              </el-tag>
              <div class="ib" v-if="createTagVisible">
                <el-input
                  class="input-new-tag"
                  v-model="createTagValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleCreateTagComfirm">
                </el-input>
                <el-button type="text" size="mini" @click="handleCreateTagComfirm">确认</el-button>
              </div>
              <el-button v-else
                         class="button-new-tag"
                         size="small"
                         @click="showCreateTagInput">+新建标签</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="fileInfo">
          <span slot="label">
            <el-tooltip content="文件信息" placement="top" effect="light">
              <i class="icon-label el-icon-document"></i>
            </el-tooltip>
          </span>
          <el-form label-position="left" class="detail-form-cont">
            <!-- <el-form-item label="文件名">
              <span>{{ detailData.fileName || '暂无' }}</span>
            </el-form-item> -->
            <el-form-item label="文件名">
              <span>{{ detailData.photoName || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="拍摄日期">
              <span>{{ detailData.photoTime | formatDate}}</span>
            </el-form-item>
            <el-form-item label="上传日期">
              <span>{{ detailData.photoUploadTime | formatDate}}</span>
            </el-form-item>
            <el-form-item label="文件大小">
              <span>{{ detailData.photoSize + ' b' || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="X分辨率">
              <span>{{ detailData.photoPixelX + ' 像素' || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="Y分辨率">
              <span>{{ detailData.photoPixelY + ' 像素' || '暂无' }}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="cameraInfo">
          <span slot="label">
            <el-tooltip content="相机信息" placement="top" effect="light">
              <i class="icon-label el-icon-camera"></i>
            </el-tooltip>
          </span>
          <el-form label-position="left" class="detail-form-cont">
            <el-form-item label="照相机制造商">
              <span>{{ detailData.cameraMaker || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="照相机">
              <span>{{ detailData.photoCamera || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="镜头">
              <span>{{ detailData.cameraLens || '暂无' }}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="photoInfo">
          <span slot="label">
            <el-tooltip content="拍摄数据" placement="top" effect="light">
              <i class="icon-label el-icon-video-camera"></i>
            </el-tooltip>
          </span>
          <el-form label-position="left" class="detail-form-cont">
            <el-form-item label="光圈">
              <span>{{ detailData.cameraAperture || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="快门速度">
              <span>{{ detailData.shutterSpeed || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="焦距">
              <span>{{ detailData.focusLength || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="ISO感光度">
              <span>{{ detailData.ISO || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="曝光补偿">
              <span>{{ detailData.exposureCompensation || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="场景模式">
              <span>{{ detailData.sceneType || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="AF区域模式">
              <span>{{ detailData.AFAreaMode || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="测光">
              <span>{{ detailData.meteringMode || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="白平衡">
              <span>{{ detailData.whiteBalance || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="闪光灯">
              <span>{{ detailData.flash || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="优化校准">
              <span>{{ detailData.orientation || '暂无' }}</span>
            </el-form-item>
            <el-form-item label-width="126px" label="动态D-Lighting">
              <span>{{ detailData.DLighting || '暂无' }}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name="locationInfo">
          <span slot="label">
            <el-tooltip content="位置信息" placement="top" effect="light">
              <i class="icon-label el-icon-location-information"></i>
            </el-tooltip>
          </span>
          <el-form label-position="left" class="detail-form-cont">
            <el-form-item label="地点全称">
              <span>{{ detailData.photo_place || '暂无' }}</span> <!-- TODO: 后续确认 photo_place是这个还是方位 -->
            </el-form-item>
            <el-form-item label="纬度">
              <span>{{ detailData.latitude || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="经度">
              <span>{{ detailData.longitude || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="海拔">
              <span>{{ detailData.altitude || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="方位">
              <span>{{ detailData.name || '暂无' }}</span>
            </el-form-item>
            <el-form-item label="POI">
              <span>{{ detailData.name || '暂无' }}</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>


    </div>
    <!-- TODO: 调用组件的地方可以传入图片id -->
    <!-- <span>{{ message }}</span> -->
  </el-drawer>
</template>

<script>
import { photoService, tagService } from '@/request/services'
import detailMixin from '@/core/mixins/detailMixin'

export default {
  filters: {
    formatDate(val) {
      if (val) {
        console.log('moent',$moment(val, $moment.HTML5_FMT.DATETIME_LOCAL_MS))
        return $moment(val, $moment.HTML5_FMT.DATETIME_LOCAL_MS).subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss')

      } else return '暂无'
    }
  },
  mixins: [ detailMixin ],
  data() {
    return {
      visible: false,
      activeName: 'basicInfo',
      detailData: {},
      // 合并的data:
      // photoId
      // fileUrlPath
      // fileMinUrlPath
      createTagVisible: false,
      createTagValue: '',
      loading: false,
      photoNameValue: '',
      nameEditPopVisible: false
    }
  },
  watch: {
    // visible(val) {
    //   if (!val) {
    //     // this.$destroy()
    //     this.onClose()
    //   }
    // }
  },
  created() {
    this._getDetail()
  },
  methods: {
    async editNameComfirm() {
      if (this.photoNameValue) {
        await photoService.updatePhotoName({
          photoId: this.photoId,
          photoName: this.photoNameValue
        })
        this.$message.success('修改成功')
        this.nameEditPopVisible = false
        this._getDetail()
        this.$bus.$emit('flashContent')
      } else {
        this.nameEditPopVisible = false
      }
    },
    editAlbum(album) {
      this.$dialog({
        message: 'album',
        params: {
          album,
          photoId: this.photoId
        }
      })
    },
    editRate(rate) {
      this.$dialog({
        message: 'rate',
        params: {
          rate,
          photoId: this.photoId
        }
      })
    },
    async handleDeleteTag(tagId) {
      await tagService.removeTag({
        photoId: this.photoId,
        tagId: tagId
      })
      this._getDetail()
    },
    async handleCreateTagComfirm() {
      if (this.createTagValue) {
        let res = await tagService.createTag({
          tagName: this.createTagValue
        })
        let newTagId = res.data.tagId
        await tagService.setTags({
          photoIds: [this.photoId],
          tagIds: [...this.detailData.tagList.map(item=>item.id), newTagId]
        })
        this.createTagValue = ''
        this.createTagVisible = false
        this._getDetail()
      } else {
        this.createTagVisible = false
      }
    },
    showCreateTagInput() {
      this.createTagVisible = true
    },
    handleClick() {
    },
    async _getDetail() {
      this.loading = true
      let res = await photoService.getDetail({
        photoId: this.photoId
      })
      console.log(res)
      this.detailData = res.data
      this.photoNameValue = this.detailData.photoName
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.photo-detail-drawer {
  overflow: auto;
  label {
    width: 100px;
    color: $color-text-secondary;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }

  .detail-cont {
    padding: 0 20px 20px 20px;
    .el-image {
      height: 300px;
      width: 100%;
      margin-bottom: 15px;
    }
    .detail-form-cont {
      height: 353px;
      overflow: auto;
    }
  }

  .icon-label {
    font-size: 18px;
    padding: 0 10px;
  }

  .el-tag {
    margin-right: 10px;
  }
  .input-new-tag {
    width: 90px;
    margin-right: 5px;
  }

  .el-rate {
    display: inline-block;
  }
  .el-icon-edit {
    margin-left: 15px;
  }
}

</style>

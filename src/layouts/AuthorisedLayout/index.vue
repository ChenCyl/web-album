<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <el-menu
        router
        :default-active="defaultActive"
        :default-openeds="['photo-menu', 'album-menu']"
        :collapse="isCollapse">
        <!-- @open="handleOpen"
          @close="handleClose"> -->
        <div class="logo-wrap"><the-logo /></div>
        <!-- 相片菜单 -->
        <el-submenu index="photo-menu">
          <template slot="title">
            <i :class="routes[0].meta.icon"></i>
            <span>{{ routes[0].meta.title }}</span>
          </template>
          <template v-for="subRoute in routes[0].children">
            <!-- 未整理 -->
            <el-menu-item-group v-if="subRoute.meta.group" :key="subRoute.name">
              <template slot="title">{{subRoute.meta.group}}</template>
              <el-menu-item :index="`/${routes[0].path}/${subRoute.path}`" :key="subRoute.name">
                <template slot="title">
                  <i :class="subRoute.meta.icon"></i>
                  <span> {{ subRoute.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
            <!-- 拍摄日期 -->
            <el-submenu v-else-if="subRoute.name === 'photo-date'" :index="subRoute.name" :key="subRoute.name">
              <template slot="title">
                <i :class="subRoute.meta.icon"></i>
                <span>{{ subRoute.meta.title }}</span>
              </template>
              <el-menu-item index="/photo/date" class="photo-date-tree">
                <el-tree
                  :data="dateTree"
                  node-key="fullDate"
                  show-checkbox
                  @check="handleDateCheck">
                </el-tree>
              </el-menu-item>
            </el-submenu>
            <!-- 其余 -->
            <el-menu-item v-else :index="`/${routes[0].path}/${subRoute.path}`" :key="subRoute.name">
              <template slot="title">
                <i :class="subRoute.meta.icon"></i>
                <span> {{ subRoute.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
        <!-- 相册菜单 -->
        <el-submenu index="album-menu">
          <template slot="title">
            <i :class="routes[1].meta.icon"></i>
            <span>{{ routes[1].meta.title }}</span>
            <el-popover placement="right"
                        width="260"
                        v-model="albumPopVisible">
              <el-form :model="albumForm" ref="albumForm" class="album-form">
                <el-form-item prop="name"
                              :rules="[{ required: true, message: '请输入相册名称', trigger: 'blur' },
                                       { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]">
                  <el-input v-model.trim="albumForm.name"
                            placeholder="请输入相册名称"
                            size="small"
                            show-word-limit>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <div style="text-align: right;">
                    <el-button size="mini" type="text" @click="albumPopVisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="saveAlbumRequest">确定</el-button>
                  </div>
                </el-form-item>
              </el-form>
              <i slot="reference"
                 class="el-icon-circle-plus-outline text-btn"
                 @click.stop
                 title="新增相册"
                 style="margin-left: 60px; font-size: 16px">
              </i>
            </el-popover>
          </template>
          <el-menu-item v-for="item in albums"
                        :index="`/album/${item.albumId}`"
                        :key="item.albumId">
            {{`${item.albumName} (${item.size})`}}
          </el-menu-item>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <div class="collapse-btn" @click="isCollapse = !isCollapse">
          <i :class="isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <div class="search-wrap">
          <el-input size="small" v-model="searchKey" placeholder="请输入照片、相册名称..."></el-input>
        </div>
        <div class="account-wrap">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              烙锅丸子<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="share-manage"><i class="el-icon-connection"></i>分享管理</el-dropdown-item>
              <el-dropdown-item command="setting"><i class="el-icon-setting"></i>设置</el-dropdown-item>
              <el-dropdown-item command="exit" divided><i class="el-icon-circle-close"></i>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主要内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部操作 -->
      <transition name="collapse-ttb">
        <el-footer v-if="footerVisible">
          <el-checkbox v-model="allChecked" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="config-wrap">
            <el-button type="text" @click="addToAblum" icon="el-icon-files">添加到相册</el-button>
            <el-button type="text" @click="addRate" icon="el-icon-star-off">添加等级</el-button>
            <el-button type="text" @click="addTag" icon="el-icon-price-tag">添加标签</el-button>
            <el-button type="text" @click="playCarousel" icon="el-icon-data-board">幻灯片</el-button>
            <el-button type="text" @click="share" icon="el-icon-share">分享</el-button>
            <el-button type="text" @click="download" icon="el-icon-download">下载</el-button>
            <el-button type="text" @click="deletePhotos" icon="el-icon-close">删除</el-button>
          </div>
        </el-footer>
      </transition>
    </el-container>

  </el-container>
</template>

<script>
import theLogo from '@/components/the-logo'
import { mapState, mapMutations, mapActions } from 'vuex'
import { albumService } from '@/request/services'

export default {
  components: {
    theLogo
  },
  data() {
    return {
      isCollapse: false,
      routes: this.$router.options.routes[0].children[0].children,
      searchKey: '',
      allChecked: false,
      footerVisible: false,
      albumPopVisible: false,
      albumForm: {
        name: ''
      },
      defaultActive: ''
    }
  },
  computed: {
    ...mapState(['dateTree', 'albums'])
  },
  watch: {
    $route: {
      handler(val) {
        this.defaultActive = val.path
      },
      immediate: true
    }
  },
  created() {
    this.fetchFilter()
    this.fetchAlbums()
  },
  mounted() {
    this.$bus.$on('clickOption', (val) => {
      console.log('clickOption', val)
      this.allChecked = val.allChecked
      this.footerVisible = val.footerVisible
    })
  },
  beforeDestroy() {
    this.$bus.$off('clickOption')
  },
  methods: {
    ...mapMutations(['updateCheckDates']),
    ...mapActions(['fetchFilter', 'fetchAlbums']),
    handleDateCheck(node, data) {
      this.updateCheckDates(data.checkedKeys.filter(date => date))
      if (this.$route.name !== 'photo-date') {
        this.$router.push('/photo/date')
      }
    },
    handleCommand() {
      this.$router.push('/manage/share')
    },
    // 点击全选事件 -> 子组件数据改变
    // 子组件数据改变 -> 全选值改变
    handleCheckAllChange(val) {
      this.$bus.$emit('clickAll', val)
    },
    handleClose(done) {
      done()
    },
    addToAblum() {
      this.$dialog('album')
    },
    addRate() {
      this.$dialog('rate')
    },
    addTag() {
      this.$dialog('tag')
    },
    playCarousel() {
      this.$dialog('carousel')
    },
    share() {
      this.$dialog('share')
    },
    download() {
      this.$dialog('download')
    },
    deletePhotos() {
      this.$dialog('delete')
    },
    // 新增相册
    saveAlbumRequest() {
      this.$refs.albumForm.validateField('name', async success => {
        if (!success) {
          await albumService.saveAlbum({
            albumName: this.albumForm.name
          })
          this.$message.success('添加成功')
          this.albumPopVisible = false
          this.fetchAlbums()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

@import "@/styles/variables";

.el-container {
  background-color: $background-color-base;
  height: 100%;
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
}

.el-menu:not(.el-menu--collapse) {
  width: 200px
}

.logo-wrap {
  height: 45px;
  width: 150px;
  margin: 10px auto;
}

.el-aside {
  .photo-date-tree {
      height: auto;
      padding: 0 !important;
      margin-left: 44px;
  }
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $border-color-lighter;
  background-color: $color-white;

  .collapse-btn {
    font-size: 27px;
    color: $color-text-placeholder;
    cursor: pointer;
  }

  .search-wrap {
    width: 240px;
    margin-left: auto;
    margin-right: 20px;
  }
}

.el-main {
  // background-color: $background-color-base;
}

.el-footer {
  z-index: 1;
  box-shadow: 0px -2px 10px 0 $border-color-base;
  background-color: $color-white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .config-wrap {
    .el-button {
      margin-left: 20px;
    }

  }
}

.album-form {
  .el-form-item {
    margin-bottom: 0;;
  }
}
</style>

<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <el-menu
        router
        :default-active="defaultActive">
        <div class="logo-wrap"><the-logo /></div>
        <el-menu-item index="/manage/share" key="/manage/share">
          <template slot="title">
            <i class="el-icon-connection"></i>
            <span> 分享管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/manage/setting" key="/manage/setting">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span> 修改密码</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 主要内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
import theLogo from '@/components/the-logo'
import { mapState } from 'vuex'
import { albumService } from '@/request/services'

export default {
  components: {
    theLogo
  },
  data() {
    return {
      defaultActive: ''
    }
  },
  computed: {
    ...mapState('user', ['userName'])
  },
  watch: {
    $route: {
      handler(val) {
        this.defaultActive = val.path
      },
      immediate: true
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
}

.el-main {
  /deep/ .button-wrap {
    display: none
  }
}
</style>

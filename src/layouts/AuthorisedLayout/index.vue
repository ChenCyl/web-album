<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        router
        default-active="/photo/all"
        :default-openeds="['/photo', '/album']"
        class="el-menu-vertical-demo"
        :collapse="isCollapse">
        <!-- @open="handleOpen"
          @close="handleClose"> -->
        <div class="logo-wrap"><the-logo /></div>
        <el-submenu v-for="route in routes" :key="route.name" :index="`/${route.path}`">
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span>{{ route.meta.title }}</span>
          </template>
          <template v-for="subRoute in route.children">
            <el-menu-item-group v-if="subRoute.meta.group" :key="subRoute.name">
              <template slot="title">{{subRoute.meta.group}}</template>
              <el-menu-item :index="`/${route.path}/${subRoute.path}`" :key="subRoute.name">
                <template slot="title">
                  <i :class="subRoute.meta.icon"></i>
                  <span> {{ subRoute.meta.title }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item v-else :index="`/${route.path}/${subRoute.path}`" :key="subRoute.name">
              <template slot="title">
                <i :class="subRoute.meta.icon"></i>
                <span> {{ subRoute.meta.title }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
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

      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>

  </el-container>
</template>

<script>
import theLogo from '@/components/the-logo'

export default {
  components: {
    theLogo
  },
  data() {
    return {
      isCollapse: false,
      routes: this.$router.options.routes[0].children[0].children,
      searchKey: ''
    }
  },
  mounted() {
    console.log(this.routes)
  },
  methods: {
    handleCommand() {

    }
  }
}
</script>

<style lang="scss" scoped>

@import "@/styles/variables";

.el-container {
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

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $border-color-lighter;

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
  background-color: $background-color-base;
}

.el-footer {
  z-index: 1;
  box-shadow: 0px -2px 20px 0 $border-color-base;
}
</style>

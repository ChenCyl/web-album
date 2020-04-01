<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse">
          <!-- @open="handleOpen"
          @close="handleClose"> -->
          <div class="logo-wrap"><the-logo /></div>
          <el-submenu v-for="(route, i) in routes" :key="route.name" :index="i+''">
            <template slot="title">
              <i :class="route.meta.icon"></i>
              <span>{{ route.meta.title }}</span>
            </template>
            <el-menu-item v-for="(subRoute, j) in route.children" :key="subRoute.name" :index="`${i}-${j}`">{{ subRoute.meta.title }}</el-menu-item>
            <!-- <el-menu-item-group v-for="(subRoute, j) in route" :key="subRoute.name">
              <template v-if="subRoute.meta.group" slot="title">{{subRoute.meta.group }}</template>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

        <el-footer>Footer</el-footer>

      </el-container>
    </el-container>
  </div>
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
      routes: this.$router.options.routes[0].children[0].children
    }
  },
  mounted() {
    console.log(this.routes)
    console.log('dfsdf')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.logo-wrap {
  height: 60px;
  width: 150px;
}
</style>

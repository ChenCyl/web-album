
<template>
  <div class="login-page">
    <div class="logo">logo</div>
    <div class="title">注册账号</div>
    <div class="input-wrap">
      <el-input v-model="email" placeholder="请输入邮箱" prefix-icon="el-icon-user"></el-input>
      <el-input v-model="password"
                placeholder="请输入验证码"
                prefix-icon="el-icon-lock">
        <template slot="append">
          <el-button type="primary" @click="getValiCode"></el-button>
        </template>
      </el-input>
      <el-input v-model="password"
                placeholder="请设置登录密码"
                prefix-icon="el-icon-user"
                show-password></el-input>
      <el-input v-model="password"
                placeholder="请重新输入密码"
                prefix-icon="el-icon-user"
                show-password></el-input>
    </div>
    <div class="comfirm-btn">
      <el-button type="primary" @click="comfirm">确认注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    comfirm() {
      console.log('click comfirm')
    },
    goRegister() {
      this.$router.push('/login/register')
    },
    forgetPass() {
      this.$router.push('/login/forget-password')
    },
    getValiCode() {

    }
  }
}
</script>

<style lang="scss" scoped src="../style.scss">

</style>

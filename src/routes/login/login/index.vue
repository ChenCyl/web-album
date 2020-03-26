<template>
  <div class="login-page">
    <div class="logo">logo</div>
    <div class="title">账号登陆</div>
    <div class="input-wrap">
      <el-input v-model="account" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
      <el-input v-model="password"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password></el-input>
    </div>
    <div class="comfirm-btn">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
    <div class="no-account">
      <span>还没有账号？</span>
      <el-link type="primary" @click="goRegister">立即注册</el-link>
      <el-link type="warning" class="forget-pass" @click="forgetPass">忘记密码</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('click login')
    },
    goRegister() {
      this.$router.push('/login/register')
    },
    forgetPass() {
      this.$router.push('/login/forget-password')
    }
  }
}
</script>

<style lang="scss" scoped src="../style.scss">

</style>

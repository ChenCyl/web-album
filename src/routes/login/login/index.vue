<template>
  <div class="login-page">
    <div class="logo"><the-logo /></div>
    <div class="title">登 录</div>
    <div class="input-wrap">
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="comfirm-btn">
      <el-button type="primary" @click="loginRequest">登录</el-button>
    </div>
    <div class="no-account">
      <span>还没有账号？</span>
      <el-link type="primary" @click="goRegister">立即注册</el-link>
      <!-- <el-link type="warning" class="forget-pass" @click="forgetPass">忘记密码</el-link> -->
    </div>
  </div>
</template>

<script>

import validator from '@/utils/validate'
import { mapActions } from 'vuex'
import theLogo from '@/components/the-logo'


export default {
  components: {
    theLogo
  },
  data() {
    function accountValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!validator.isAccountName(value)) {
        callback(new Error('用户名是 1 ~ 10 位字母和数字的组合'))
      } else {
        callback()
      }
    }
    function passwordValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!validator.isPassword(value)) {
        callback(new Error('密码是 6 ~ 12 位字母和数字的组合'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { validator: accountValidator, trigger: 'blur' }
        ],
        password: [
          { validator: passwordValidator, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    loginRequest() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          await this.login({
            userAccount: this.loginForm.account,
            userPwd: this.loginForm.password
          })
          if (this.$route.query && this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/photo')
          }
        } else {
          return false
        }
      })
    },
    goRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="scss" scoped src="../style.scss">

</style>

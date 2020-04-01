<template>
  <div class="login-page">
    <div class="logo">logo</div>
    <div class="title">账号登陆</div>
    <div class="input-wrap">
      <el-form :model="loginForm" ref="loginForm" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account"
                    placeholder="请输入邮箱"
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

import validator from '@/utils/validate'

export default {
  data() {
    function accountValidator(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!validator.isEmail(value)) {
        callback(new Error('非法邮箱'))
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
    login() {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      // console.log('click login')
      this.$router.push('/home/all-photos')
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

<template>
  <div class="login-page">
    <div class="logo">logo</div>
    <div class="title">注册账号</div>
    <div class="input-wrap">
      <el-form :model="registerForm"
               ref="registerForm"
               :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="registerForm.account"
                    placeholder="请输入邮箱"
                    prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item prop="valiCode">
              <el-input v-model="registerForm.valiCode"
                        placeholder="请输入验证码"
                        prefix-icon="el-icon-key"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button class="code-btn"
                         type="primary"
                         @click="getValiCode"
                         :disabled="codeBtnDisabled">{{ codeBtnText}}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password"
                    placeholder="请设置登录密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="registerForm.password2"
                    placeholder="请重新输入密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="comfirm-btn">
      <el-button type="primary" @click="comfirm">确认注册</el-button>
    </div>
  </div>
</template>

<script>

import validator from '@/utils/validate'

export default {
  data() {
    const accountValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!validator.isEmail(value)) {
        callback(new Error('非法邮箱'))
      } else {
        callback()
      }
    }

    const passwordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!validator.isPassword(value)) {
        callback(new Error('密码是 6 ~ 12 位字母和数字的组合'))
      } else {
        callback()
      }
    }

    const pass2Validator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        account: '',
        valiCode: '',
        password: '',
        password2: ''
      },
      rules: {
        account: [
          { validator: accountValidator, trigger: 'blur' }
        ],
        valiCode: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ],
        password: [
          { validator: passwordValidator, trigger: 'blur' }
        ],
        password2: [
          { validator: pass2Validator, trigger: 'blur' }
        ]
      },
      codeBtnText: '获取验证码',
      codeBtnDisabled: false
    }
  },
  methods: {
    comfirm() {
      console.log('click login')
    },
    goRegister() {
      this.$router.push('/login/register')
    },
    forgetPass() {
      this.$router.push('/login/forget-password')
    },
    getValiCode() {
      this.$refs.registerForm.validateField('account', () => {
        // if (err) return
        this._getValiCode()
      })
    },
    _getValiCode() {
      let interval
      let sec = 60
      this.codeBtnDisabled = true
      this.codeBtnText = `${sec}s后重试`
      return function () {
        if (!interval) {
          if (sec === 0) {
            clearInterval(interval)
          } else {
            interval = setInterval(() => {
              sec--
            }, 1000)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped src="../style.scss"></style>
<style lang="scss" scoped>
.code-btn {
     width: 100%;
}
</style>

<template>
  <div class="login-page">
    <el-link @click="goLogin"
             :underline="false"
             class="back-btn el-icon-video-play"></el-link>
    <div class="logo"><the-logo /></div>
    <div class="title">注 册</div>
    <div class="input-wrap">
      <el-form :model="registerForm"
               ref="registerForm"
               :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="registerForm.account"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <!-- <el-row :gutter="10">
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
                         :disabled="codeBtnDisabled">{{ codeBtnText }}</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
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
import { userService } from '@/request/services'
import { getuuid } from '@/utils/uuid'
import theLogo from '@/components/the-logo'

export default {
  components: {
    theLogo
  },
  data() {
    const accountValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!validator.isAccountName(value)) {
        callback(new Error('用户名是 1 ~ 10 位字母和数字的组合'))
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
        // valiCode: '',
        password: '',
        password2: ''
      },
      rules: {
        account: [
          { validator: accountValidator, trigger: 'blur' }
        ],
        // valiCode: [
        //   { required: true, trigger: 'blur', message: '请输入验证码' }
        // ],
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
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          await userService.register({
            // username: 'USER' + getuuid(),
            username: this.registerForm.account,
            userAccount: this.registerForm.account,
            userPwd: this.registerForm.password
          })
          this.$message.success("注册成功")
          this.$router.push('/login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goLogin() {
      this.$router.push('/login')
    },

    getValiCode() {
      this.$refs.registerForm.validateField('account', (err) => {
        if (err) return
        this._getValiCode()
      })
    },
    _getValiCode() {
      let sec = 5 // FIXME: change to 60
      this.codeBtnText = `${sec}s 后重试`
      this.codeBtnDisabled = true
      let interval = setInterval(() => {
        sec--
        if (sec === 0) {
          clearInterval(interval)
          this.codeBtnText = `获取验证码`
          this.codeBtnDisabled = false
        } else {
          this.codeBtnText = `${sec}s 后重试`
        }
      }, 1000)
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

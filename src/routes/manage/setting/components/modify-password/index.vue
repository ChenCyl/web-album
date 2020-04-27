<template>
  <div class="login-page">
    <!-- <div class="logo">logo</div>
    <div class="title">忘记密码</div> -->
    <div class="input-wrap">
      <el-form :model="modiPassForm"
               ref="modiPassForm"
               :rules="rules">
        <!-- <el-form-item prop="account">
          <el-input v-model="modiPassForm.account"
                    placeholder="请输入邮箱"
                    prefix-icon="el-icon-message"></el-input>
        </el-form-item> -->
        <!-- <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item prop="valiCode">
              <el-input v-model="modiPassForm.valiCode"
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
        <el-form-item prop="oldPassword">
          <el-input v-model="modiPassForm.oldPassword"
                    placeholder="请输入旧密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="modiPassForm.password"
                    placeholder="请设置新密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="modiPassForm.password2"
                    placeholder="再次确认新密码"
                    prefix-icon="el-icon-lock"
                    show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="comfirm-btn">
      <el-button type="primary" @click="comfirm">确认</el-button>
    </div>
  </div>
</template>

<script>

import validator from '@/utils/validate'
import { mapActions } from 'vuex'

export default {
  data() {
    const accountValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名 '))
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
      } else if (value !== this.modiPassForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      modiPassForm: {
        oldPassword: '',
        password: '',
        password2: ''
      },
      rules: {
        oldPassword: [
          { validator: passwordValidator, trigger: 'blur' }
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
    ...mapActions('user', ['modifyPassword', 'logout']),
    comfirm() {
      this.$refs.modiPassForm.validate(async (valid) => {
        if (valid) {
          await this.modifyPassword({
            oldPassword: this.modiPassForm.oldPassword,
            newPassword: this.modiPassForm.password
          })
          this.$message.success('修改成功，请重新登录')
          await this.logout()
          this.$router.push('/login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goRegister() {
      this.$router.push('/register')
    },
    getValiCode() {
      this.$refs.modiPassForm.validateField('account', (err) => {
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

<style lang="scss" scoped src="@/routes/login/style.scss"></style>
<style lang="scss" scoped>
.code-btn {
  width: 100%;
}
.login-page {
  width: 350px;
}
</style>

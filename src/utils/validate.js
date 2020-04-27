
export default {

  // 可验证邮箱类型如：
  // yulei.chen@tongji.cn
  // yulei-chen@tongji.uni.cn
  // yulei_chen.balala@tongji.com.uni.cn
  isEmail(val) {
    const reg = /^[\w_-]+(\.[\w_-]+)*@[\w_-]+(\.[\w_-]+)+$/
    return reg.test(val)
  },

  // 6 ~ 16 位数字与字母的组合
  isPassword(val) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    return reg.test(val)
  },

  isAccountName(val) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,10}$/
    return reg.test(val)
  }
}

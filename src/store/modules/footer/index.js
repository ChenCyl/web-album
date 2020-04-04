
// 逻辑：
// 点击全选事件 -> clickAll状态改变 -> 绑定到checkbox的数据改变 -> 全选框样式改变
const state = {
  visible: false,
  isCheckedAll: false,
  config: [],
  clickAll: false
}

const mutations = {
  showFooter(state, payload) {
    state.visible = true
    if (payload) {
      let { isCheckedAll, config } = payload
      state.isCheckedAll = isCheckedAll
      state.config = config
    }
  },
  hideFooter(state) {
    state.visible = false
  },
  footerCheckAll(state, isCheckedAll) {
    state.isCheckedAll = isCheckedAll
  },
  handleClickAll(state, isCheckedAll) {
    state.clickAll = isCheckedAll
  }

}

const actions = {


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

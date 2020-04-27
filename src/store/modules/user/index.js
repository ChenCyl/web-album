/**
 * 本页 code from vue_admin_template
 */

import { userService } from '@/request/services'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userName: ''
    // avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, userName) => {
    state.userName = userName
  }
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
}

const actions = {
  // user userService.
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      userService.login({ username: userName.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_NAME', userName)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // userService.getUserInfo(state.token).then(response => {
        userService.getUserInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please userService. again.')
        }

        const { userName } = data.data // FIXME:

        commit('SET_NAME', userName)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      userService.logout(state.token).then(() => {
        removeToken() // must remove  token  first
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  modifyPassword({ commit, state }, payload) {
    const { oldPassword, newPassword } = payload
    return userService.modifyPassword({
      userName: state.userName,
      oldPassword,
      newPassword
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

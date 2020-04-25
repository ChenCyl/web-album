/**
 * 本页 code from vue_admin_template
 */

import { userService } from '@/request/services'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userEmail: ''
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
  SET_EMAIL: (state, userEmail) => {
    state.userEmail = userEmail
  }
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
}

const actions = {
  // user userService.
  login({ commit }, userInfo) {
    const { userEmail, password } = userInfo
    return new Promise((resolve, reject) => {
      userService.login({ userEmail: userEmail.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        commit('SET_EMAIL', userEmail)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      userService.getUserInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please userService. again.')
        }

        const { userEmail } = data

        commit('SET_EMAIL', userEmail)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import { getuuid } from '@/utils/uuid'

const state = {
  share: {}
}

const mutations = {
  updateShare(state, payload) {
    state.share[payload.uuid] = payload
    console.log('state.share', state.share)
  }
}

const actions = {
  createShareLink({ commit, rootState }, data) {
    let uuid = getuuid()
    commit('updateShare', {
      photos: rootState.checkedOptionsCopy,
      ...data,
      uuid
    })
    return uuid
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

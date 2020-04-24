import { getuuid } from '@/utils/uuid'

const state = {
  share: {}
}

const mutations = {
  updateShare(state, payload) {
    state.share[payload.uuid] = payload
    console.log('state.share', state.share)
  },
  removeExpirePhoto(state) {
    // console.log(Object.values(state.share))
    // if (Object.values(state.share).photos) {
    //   console.log('remove')
    //   state.share.photos = state.share.photos.filter(item =>
    //     $moment(item.expireTime).diff($moment(Date.now())) > 0
    //   )
    // }
  }
}

const actions = {
  createShareLink({ commit, rootState }, data) {
    let uuid = getuuid()
    let now = $moment()
    console.log(now.unix())
    commit('updateShare', {
      photos: rootState.checkedOptionsCopy,
      ...data,
      uuid,
      createTime: now.format('YYYY-MM-DD HH:mm'),
      expireTime: now.add(1, 'minutes').format('YYYY-MM-DD HH:mm')
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

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
    let beDeleted = []
    Object.values(state.share).forEach(item => {
      if ($moment(item.expireTime).diff($moment()) < 0) {
        beDeleted.push(item.uuid)
      }
    })
    beDeleted.forEach(uuid => delete state.share[uuid])
  }
}

const actions = {
  createShareLink({ commit, rootState }, data) {
    let uuid = getuuid()
    let link = 'http://localhost:8080/#/share/' + uuid  //FIXME:
    let now = $moment()
    console.log(now.unix())
    commit('updateShare', {
      photos: rootState.checkedOptionsCopy,
      title: data.title,
      intro: data.intro,
      uuid,
      link,
      createTime: now.format('YYYY-MM-DD HH:mm'),
      expireTime: now.add(3, 'days').format('YYYY-MM-DD HH:mm')  //FIXME:
    })
    return link
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

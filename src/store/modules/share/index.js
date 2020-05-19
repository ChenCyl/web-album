import { getuuid } from '@/utils/uuid'
import { shareService } from '@/request/services'

const state = {
  share: {}
}

const mutations = {
  updateShare(state, payload) {
    state.share[payload.uuid] = payload
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
  createShareLink({ commit, state, rootState, rootGetters }, data) {
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
      createTime: now.format('YYYY-MM-DD HH:mm:ss'),
      expireTime: now.add(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
      user: rootGetters.name
    })
    shareService.saveAllShare({
      data: JSON.stringify(state.share)
    })
    return link
  },
  async getAllShare({ commit, state, rootGetters }) {
    let res = await shareService.getAllShare()
    state.share = JSON.parse(res.data)
    commit('removeExpirePhoto')
    if (rootGetters.name) {
      shareService.saveAllShare({
        data: JSON.stringify(state.share)
      })
    }
  },
  async saveAllShare({ state }) {
    return shareService.saveAllShare({
      data: JSON.stringify(state.share)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

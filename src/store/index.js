import Vue from 'vue'
import Vuex from 'vuex'

import footer from './modules/footer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: {
      dates: [],
      tags: []
    },
    dateTree: {}
  },
  mutations: {
    updateFilter(state, payload) {
      state.filter = payload
    }
  },
  actions: {

  },
  modules: {
    footer
  }
})

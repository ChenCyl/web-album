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
      // 更新 filter
      state.filter = payload
      // 更新 dateTree
      let tree = {}
      payload.dates.forEach(date => {
        console.log(date)
        let dateArr = date.split('-')
        if (tree[dateArr[0]]) {
          if (tree[dateArr[0]][dateArr[1]]) {
            tree[dateArr[0]][dateArr[1]].push({
              day: dateArr[2],
              fullDate: date
            })
          } else {
            tree[dateArr[0]][dateArr[1]] = [{
              day: dateArr[2],
              fullDate: date
            }]
          }
        } else {
          tree[dateArr[0]] = {}
          tree[dateArr[0]][dateArr[1]] = [{
            day: dateArr[2],
            fullDate: date
          }]
        }
      })
      state.dateTree = tree
      console.log(state.dateTree)
    }
  },
  actions: {

  },
  modules: {
    footer
  }
})

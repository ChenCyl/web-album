import Vue from 'vue'
import Vuex from 'vuex'

import footer from './modules/footer'
import { photoService } from '@/request/services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: {
      dates: [],
      tags: []
    },
    dateTree: [],
    checkDates: []
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
              label: dateArr[2],
              fullDate: date
            })
          } else {
            tree[dateArr[0]][dateArr[1]] = [{
              label: dateArr[2],
              fullDate: date
            }]
          }
        } else {
          tree[dateArr[0]] = {}
          tree[dateArr[0]][dateArr[1]] = [{
            label: dateArr[2],
            fullDate: date
          }]
        }
      })
      // 格式化 tree
      let formatTree = []
      for (let year of Object.keys(tree)) {
        let node = {
          label: year,
          children: []
        }
        for(let month of Object.keys(tree[year])) {
          node.children.push({
            label: month,
            children: tree[year][month]
          })
        }
        formatTree.push(node)
      }
      state.dateTree = formatTree
      console.log(state.dateTree)
    },
    updateCheckDates(state, dates) {
      state.checkDates = dates
    }
  },
  actions: {
    async fetchFilter({ commit }) {
      let res = await photoService.getFilter()
      commit('updateFilter', {
        albums: res.data.albums || [],
        dates: res.data.dates || [],
        cameras: res.data.cameras || [],
        tags: res.data.tags || []
      })
    }
  },
  modules: {
    footer
  }
})

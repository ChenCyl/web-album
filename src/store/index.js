import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import share from './modules/share'
import user from './modules/user'
import { photoService, albumService } from '@/request/services'

Vue.use(Vuex)

// p.s. store 中只存储获取的方法（即会改变 state 的）

export default new Vuex.Store({
  state: {
    filter: {
      dates: [],
      tags: [],
      albums: [],
      cameras: []
    },
    dateTree: [],
    checkDates: [],
    albums: [],
    checkedOptionsCopy: [],
    uploadCdt: {} // 上传条件
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
    },
    updateAlbums(state, payload) {
      state.albums = payload
    },
    updateCheckedOptionsCopy(state, options) {
      state.checkedOptionsCopy = options
    },
    updateUploadCdt(state, payload) {
      state.uploadCdt = payload
    }
  },
  actions: {
    // 获取所有照片中选择器的选项数据
    async fetchFilter({ commit }) {
      let res = await photoService.getFilter()
      commit('updateFilter', {
        albums: res.data.albums || [],
        dates: res.data.dates || [],
        cameras: res.data.cameras || [],
        tags: res.data.tags || []
      })
    },
    // 获取所有相册 用于侧边栏
    async fetchAlbums({ commit }) {
      let res = await albumService.getAlbums()
      commit('updateAlbums', res.data.data)
    }
  },
  modules: {
    share,
    user
  },
  getters
})

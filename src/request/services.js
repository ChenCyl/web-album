import request from './index'

// service + api

export const photoService = {

  getPhotos(data) {
    return request({
      url: '/getPhotos',
      method: 'post',
      data
    })
  },

  getFilter() {
    return request({
      url: '/getFilter',
      method: 'get'
    })
  },

  addToAlbum(data) {
    return request({
      url: '/addToAlbum',
      method: 'post',
      data
    })
  },

  setRate(data) {
    return request({
      url: '/setRate',
      method: 'post',
      data
    })
  },

  deletePhotos(data) {
    return request({
      url: '/deletePhotos',
      method: 'post',
      data
    })
  },

  getDetail(data) {
    return request({
      url: '/getDetail',
      method: 'post',
      data
    })
  },

  updatePhotoName(data) {
    return request({
      url: '/updatePhotoName',
      method: 'post',
      data
    })
  }
}

export const cameraService = {

  getCameraList() {
    return request({
      url: '/getCameraList',
      method: 'post'
    })
  }

}

export const albumService = {

  saveAlbum(data) {
    return request({
      url: '/saveAlbum',
      method: 'post',
      data
    })
  },

  getAlbums() {
    return request({
      url: '/getAlbums',
      method: 'get'
    })
  },

  deleteAlbum(data) {
    return request({
      url: '/deleteAlbum',
      method: 'post',
      data
    })
  }
}

export const tagService = {

  createTag(data) {
    return request({
      url: '/createTag',
      method: 'post',
      data
    })
  },

  setTags(data) {
    return request({
      url: '/setTags',
      method: 'post',
      data
    })
  },

  removeTag(data) {
    return request({
      url: '/removeTag',
      method: 'post',
      data
    })
  }

}


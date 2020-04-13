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

  createAlbum(data) {
    return request({
      url: '/createAlbum',
      method: 'post',
      data
    })
  },

  getAlbums() {
    return request({
      url: '/getAlbums',
      method: 'get'
    })
  }
}


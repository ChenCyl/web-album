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

  getFilters() {
    return request({
      url: '/getFilters',
      method: 'get'
    })
  }

}


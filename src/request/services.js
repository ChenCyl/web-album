import request from './index'

// service + api

export const photoService = {

  getPhotos(data) {
    return request({
      url: '/getPhotos',
      method: 'post',
      data
    })
  }

}

export const filterService = {

  // 获取拍摄日期（三级：年、月、日）
  getDate() {
    return request({
      url: '/getDate',
      method: 'get'
    })
  }

}

// export default {
//   photoService
// }

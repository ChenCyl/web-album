import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://120.26.186.13:9099/mock/13',
  timeout: 30000,
  // headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: false // 跨域请求时是否需要使用凭证
})


export default axiosInstance

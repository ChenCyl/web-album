import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 30000,
  // headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: false, // 跨域请求时是否需要使用凭证
})


export default axiosInstance

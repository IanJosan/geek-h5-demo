import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo } from './storage'
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0/',
})

instance.interceptors.request.use(
  (config) => {
    const token = getTokenInfo().token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (err) => {
    if (err.response) {
      Toast.show({
        content: err.response.data.message,
        icon: 'fail',
        duration: 1000,
      })
    } else {
      Toast.show({
        content: '服务器忙',
        icon: 'fail',
        duration: 1000,
      })
    }
    return Promise.reject(err)
  }
)

export default instance

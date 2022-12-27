import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getTokenInfo, setTokenInfo } from './storage'
import history from './history'
import store from '../store'
import { saveToken, logout } from '../store/actions/login'
const baseURL = 'http://geek.itheima.net/v1_0/'
const instance = axios.create({
  timeout: 5000,
  baseURL,
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
  async (err) => {
    if (!err.response) {
      Toast.show({
        content: '服务器忙',
        icon: 'fail',
        duration: 1000,
      })
      return Promise.reject(err)
    }
    if (err.response.status !== 401) {
      Toast.show({
        content: err.response.data.message,
        icon: 'fail',
        duration: 1000,
      })
      return Promise.reject(err)
    }
    const { refresh_token } = getTokenInfo()
    if (!refresh_token) {
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(err)
    }
    try {
      const res = await axios({
        method: 'put',
        url: baseURL + 'authorizations',
        headers: {
          Authorization: 'Bearer' + refresh_token,
        },
      })
      const tokenInfo = {
        token: res.data.data.token,
        refresh_token,
      }
      store.dispatch(saveToken(tokenInfo))
      setTokenInfo(tokenInfo)
      return instance(err.config)
    } catch {
      store.dispatch(logout())
      history.push({
        pathname: '/login',
        state: {
          from: history.location.pathname,
        },
      })
      return Promise.reject(err)
    }
  }
)

export default instance

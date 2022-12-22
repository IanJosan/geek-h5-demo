import axios from 'axios'
const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0/',
})

instance.interceptors.request.use(
  (config) => {
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
    return Promise.reject(err)
  }
)

export default instance

import request from '../../utils/request'
import { removeTokenInfo, setTokenInfo } from '../../utils/storage'
export const sendCode = (mobile) => {
  return async (dispatch) => {
    const res = await request({
      url: '/sms/codes/' + mobile,
      method: 'get',
    })
    console.log(res)
  }
}
// 异步action
export const login = (data) => {
  return async (dispatch) => {
    const res = await request({
      method: 'post',
      url: '/authorizations',
      data,
    })
    dispatch(saveToken(res.data))
    setTokenInfo(res.data)
  }
}

// 同步action
export const saveToken = (payload) => {
  return {
    type: 'login/token',
    payload,
  }
}
// logout
export const logout = () => {
  return (dispatch) => {
    removeTokenInfo()
    dispatch({
      type: 'login/logout',
    })
  }
}

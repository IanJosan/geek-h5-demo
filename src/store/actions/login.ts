import { Dispatch } from 'redux'
import request from '../../utils/request'
import { removeTokenInfo, setTokenInfo } from '../../utils/storage'
export const sendCode = (mobile: string) => {
  return async () => {
    await request({
      url: '/sms/codes/' + mobile,
      method: 'get',
    })
  }
}
// 异步action
export const login = (data: { mobile: string; code: string }) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: 'post',
      url: '/authorizations',
      data,
    })
    dispatch(saveToken(res.data))
    setTokenInfo(res.data)
  }
}
type Token = { token: string; refresh_token: string }
// 同步action
export const saveToken = (payload: Token) => {
  return {
    type: 'login/token',
    payload,
  }
}
// logout
export const logout = () => {
  return (dispatch: Dispatch) => {
    removeTokenInfo()
    dispatch({
      type: 'login/logout',
    })
  }
}

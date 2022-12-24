import request from '../../utils/request'
import { SAVE_USER, SAVE_PROFILE } from '../action_types/profile'

export const saveUser = (payload) => {
  return {
    type: SAVE_USER,
    payload,
  }
}
export const getUser = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/user',
    })
    dispatch(saveUser(res.data))
  }
}
export const saveProfile = (payload) => {
  return {
    type: SAVE_PROFILE,
    payload,
  }
}
export const getProfile = () => {
  return async (dispatch) => {
    const res = await request({
      method: 'get',
      url: '/user/profile',
    })
    dispatch(saveProfile(res.data))
  }
}
export const updateProfile = (data) => {
  return async (dispatch) => {
    await request({
      method: 'patch',
      url: '/user/profile',
      data,
    })
    dispatch(getProfile())
  }
}

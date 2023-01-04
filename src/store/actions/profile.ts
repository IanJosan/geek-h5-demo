import request from '../../utils/request'
import { SAVE_USER, SAVE_PROFILE } from '../action_types/profile'
import { User, Profile, ProfileAction } from '../reducers/profile'
import { Dispatch } from 'redux'
import { RootThunkAction } from '..'
export const saveUser = (payload: User): ProfileAction => {
  return {
    type: SAVE_USER,
    payload,
  }
}
export const getUser = () => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: 'get',
      url: '/user',
    })
    dispatch(saveUser(res.data))
  }
}
export const saveProfile = (payload: Profile): ProfileAction => {
  return {
    type: SAVE_PROFILE,
    payload,
  }
}
export const getProfile = () => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      method: 'get',
      url: '/user/profile',
    })
    dispatch(saveProfile(res.data))
  }
}
type PartialProfile = Partial<Profile>
export const updateProfile = (data: PartialProfile): RootThunkAction => {
  return async (dispatch) => {
    await request({
      method: 'patch',
      url: '/user/profile',
      data,
    })
    dispatch(getProfile())
  }
}
export const updatePhoto = (fd: FormData): RootThunkAction => {
  return async (dispatch) => {
    await request.patch('/user/photo', fd)
    // await request({
    //   method: 'patch',
    //   url: '/user/photo',
    //   fd,
    // })
    dispatch(getProfile())
  }
}

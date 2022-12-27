import request from '../../utils/request'
import {
  getLocalChannels,
  hasToken,
  setLocalChannels,
} from '../../utils/storage'
import { SAVE_CHANNELS, SAVE_ALL_CHANNELS } from '../action_types/home'
export const getUserChannels = () => {
  return async (dispatch) => {
    if (hasToken()) {
      const res = await request.get('/user/channels')
      dispatch(saveUserChannels(res.data.channels))
    } else {
      const channels = getLocalChannels()
      if (channels) {
        dispatch(saveUserChannels(channels))
      } else {
        const res = await request.get('/user/channels')
        dispatch(saveUserChannels(res.data.channels))
        setLocalChannels(res.data.channels)
      }
    }
  }
}

export const saveUserChannels = (payload) => {
  return {
    type: SAVE_CHANNELS,
    payload,
  }
}

export const getAllChannels = (payload) => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

export const saveAllChannels = (payload) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  }
}

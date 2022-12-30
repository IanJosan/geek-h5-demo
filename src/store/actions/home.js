import request from '../../utils/request'
import {
  getLocalChannels,
  hasToken,
  setLocalChannels,
} from '../../utils/storage'
import {
  SAVE_CHANNELS,
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
} from '../action_types/home'
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

export const delChannel = (channel) => {
  return async (dispatch, getState) => {
    const userChannels = getState().home.userChannels
    if (hasToken()) {
      await request.delete('/user/channels/' + channel.id)
      dispatch(
        saveUserChannels(userChannels.filter((item) => item.id !== channel.id))
      )
    } else {
      const result = userChannels.filter((item) => item.id !== channel.id)
      dispatch(saveUserChannels(result))
      setLocalChannels(result)
    }
  }
}

export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    const channels = [...getState().home.userChannels, channel]
    if (hasToken()) {
      await request.patch('/user/channels', {
        channels: [channel],
      })
      dispatch(saveUserChannels(channels))
    } else {
      dispatch(saveUserChannels(channels))
      setLocalChannels(channels)
    }
  }
}

export const getAticleList = (channelId, timeStamp, LoadMore = false) => {
  return async (dispatch) => {
    const res = await request({
      url: '/articles',
      method: 'get',
      params: {
        channel_id: channelId,
        timestamp: timeStamp,
      },
    })
    dispatch(
      setArticleList({
        channelId,
        timestamp: res.data.pre_timestamp,
        list: res.data.results,
        LoadMore,
      })
    )
  }
}

export const setArticleList = (payload) => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload,
  }
}

export const setMoreAction = (payload) => {
  return {
    type: 'home/setMoreAction',
    payload,
  }
}

export const unLikeArticle = (articleId) => {
  return async (dispatch, getState) => {
    await request({
      method: 'post',
      url: '/article/dislikes',
      data: {
        target: articleId,
      },
    })
  }
}

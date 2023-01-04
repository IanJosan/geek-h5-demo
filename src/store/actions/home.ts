import { Dispatch } from 'redux'
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
import { Channel, ActionType, ArticleType, MoreAction } from '../reducers/home'
import { RootThunkAction } from '../index'
export const getUserChannels = (): RootThunkAction => {
  return async (dispatch: Dispatch) => {
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

export const saveUserChannels = (payload: Channel[]): ActionType => {
  return {
    type: SAVE_CHANNELS,
    payload,
  }
}

export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    dispatch(saveAllChannels(res.data.channels))
  }
}

export const saveAllChannels = (payload: any) => {
  return {
    type: SAVE_ALL_CHANNELS,
    payload,
  }
}

export const delChannel = (channel: Channel): RootThunkAction => {
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

export const addChannel = (channel: Channel): RootThunkAction => {
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

export const getAticleList = (
  channelId: number,
  timeStamp: string,
  LoadMore = false
): RootThunkAction => {
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

export const setArticleList = (payload: ArticleType): ActionType => {
  return {
    type: SAVE_ARTICLE_LIST,
    payload,
  }
}

export const setMoreAction = (payload: MoreAction): ActionType => {
  return {
    type: 'home/setMoreAction',
    payload,
  }
}

export const unLikeArticle = (articleId: string): RootThunkAction => {
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

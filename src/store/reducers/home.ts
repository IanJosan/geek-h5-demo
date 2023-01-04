import {
  SAVE_CHANNELS,
  SAVE_ALL_CHANNELS,
  SAVE_ARTICLE_LIST,
} from '../action_types/home'
export type Channel = {
  id: number
  name: string
}
export type MoreAction = {
  visible: boolean
  articleId: string
  channelId: number
}
export type Article = {
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  comm_count: string
  pubdate: string
  cover: {
    type: string
    images: string[]
  }
}

export type Articles = {
  [index: number]: { timestamp: string; list: Article[] }
}
export type HomeAction = {
  userChannels: Channel[]
  allChannels: Channel[]
  moreAction: MoreAction
  articles: Articles
}
const initValue: HomeAction = {
  userChannels: [],
  allChannels: [],
  articles: {},
  moreAction: {
    visible: false,
    articleId: '',
    channelId: -1,
  },
} as HomeAction
export type ArticleType = {
  channelId: number
  timestamp: string
  list: Article[]
}
export type ActionType =
  | {
      type: 'home/saveChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveAllChannels'
      payload: Channel[]
    }
  | {
      type: 'home/saveArticleList'
      payload: ArticleType
    }
  | {
      type: 'home/saveMoreArticleList'
      payload: ArticleType
    }
  | {
      type: 'home/setMoreAction'
      payload: MoreAction
    }

export default function rducer(state = initValue, action: ActionType) {
  const { type, payload } = action
  switch (type) {
    case SAVE_CHANNELS:
      return {
        ...state,
        userChannels: payload,
      }
    case SAVE_ALL_CHANNELS:
      return {
        ...state,
        allChannels: payload,
      }
    case SAVE_ARTICLE_LIST:
      return {
        ...state,
        articles: {
          ...state.articles,
          [payload.channelId]: {
            timestamp: payload.timestamp,
            list: [...state.articles[payload.channelId].list, ...payload.list],
          },
        },
      }
    case 'home/setMoreAction':
      return {
        ...state,
        moreAction: payload,
      }
    default:
      return state
  }
}

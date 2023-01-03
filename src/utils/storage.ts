// 用户 Token 的本地缓存键名
const TOKEN_KEY = 'geek-itcast'
const CHANNEL_KEY = 'geek-itcast-21-channels'
/**
 * 从本地缓存中获取 Token 信息
 */
export const getTokenInfo = () => {
  // return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
  return JSON.parse(localStorage.getItem(TOKEN_KEY)!) || {}
}
type Token = { token: string; refresh_token: string }
type Channels = {
  id: number
  name: string
}
/**
 * 将 Token 信息存入缓存
 * @param {Object} tokenInfo 从后端获取到的 Token 信息
 */
export const setTokenInfo = (tokenInfo: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenInfo))
}

/**
 * 删除本地缓存中的 Token 信息
 */
export const removeTokenInfo = () => {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断本地缓存中是否存在 Token 信息
 */
export const hasToken = () => {
  return !!getTokenInfo().token
}

export const setLocalChannels = (channels: Channels) => {
  localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
}

export const getLocalChannels = (): Channels => {
  return JSON.parse(localStorage.getItem(CHANNEL_KEY)!)
}

export const removeLocalChannels = () => {
  localStorage.removeItem(CHANNEL_KEY)
}

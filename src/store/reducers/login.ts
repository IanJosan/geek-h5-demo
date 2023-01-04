type Token = { token: string; refresh_token: string }
const initvalue: Token = {
  token: '',
  refresh_token: '',
}
type ActionType = {
  type: 'login/token' | 'login/logut'
  payload: Token
}

export default function reducer(state = initvalue, action: ActionType) {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload
  }
  if (type === 'login/logut') {
    return {}
  }
  return state
}

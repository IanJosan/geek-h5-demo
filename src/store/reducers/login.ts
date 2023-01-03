type Token = { token: string; refresh_token: string }
const initvalue: Token = {
  token: '',
  refresh_token: '',
}
type ActionType =
  | {
      type: 'login/token'
      payload: Token
    }
  | {
      type: 'login/logut'
      payload: null
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

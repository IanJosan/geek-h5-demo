const initvalue = {
  token: '',
  refresh_token: '',
}
export default function reducer(state = initvalue, action) {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload
  }
  if (type === 'login/logut') {
    return {}
  }
  return state
}

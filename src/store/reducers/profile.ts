import { SAVE_USER, SAVE_PROFILE } from '../action_types/profile'
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type Profile = {
  id: string
  name: string
  photo: string
  mobile: string
  gender: number
  birthday: string
}
type InitType = {
  user: User
  profile: Profile
}
export type ProfileAction =
  | {
      type: 'profile/user'
      payload: User
    }
  | {
      type: 'profile/profile'
      payload: Profile
    }
const initValue: InitType = {
  user: {},
  profile: {},
} as InitType
export default function reducer(state = initValue, action: ProfileAction) {
  const { type, payload } = action
  if (type === SAVE_USER) {
    return {
      ...state,
      user: payload,
    }
  }
  if (type === SAVE_PROFILE) {
    return {
      ...state,
      profile: payload,
    }
  }

  return state
}

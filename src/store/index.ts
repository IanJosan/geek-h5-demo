// 创建store
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '../utils/storage'
import { ThunkAction } from 'redux-thunk'
import { ActionType as HomeAction } from './reducers/home'
import { ActionType as LoginAction } from './reducers/login'
import { ProfileAction } from './reducers/profile'
const store = createStore(
  reducer,
  { login: getTokenInfo() },
  composeWithDevTools(applyMiddleware(thunk))
)
type RootAction = HomeAction | LoginAction | ProfileAction
export type RootThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  RootAction
>
export type RootState = ReturnType<typeof store.getState>
export default store

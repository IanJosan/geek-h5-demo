import './App.scss'
import React, { Suspense } from 'react'
import {
  Route,
  Routes,
  Navigate,
  // Router,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import AuthRoute from './component/AuthRoute'
import history from './utils/history'
const Home = React.lazy(() => import('./pages/Layout'))
const Login = React.lazy(() => import('./pages/Login'))
const ProfileEdit = React.lazy(() => import('./pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('./pages/Profile/Chat'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="app">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}

        <Suspense fallback={<div>loding</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>

            <Route
              path="/home/*"
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            ></Route>
            <Route
              path="/profile/edit"
              element={
                <AuthRoute>
                  <ProfileEdit></ProfileEdit>
                </AuthRoute>
              }
            ></Route>
            <Route
              path="/profile/chat"
              element={
                <AuthRoute>
                  <ProfileChat></ProfileChat>
                </AuthRoute>
              }
            ></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App

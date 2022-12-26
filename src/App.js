import './App.scss'
import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import AuthRoute from './component/AuthRoute'
const Home = React.lazy(() => import('./pages/Layout'))
const Login = React.lazy(() => import('./pages/Login'))
const ProfileEdit = React.lazy(() => import('./pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('./pages/Profile/Chat'))
function App() {
  return (
    <Router>
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
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App

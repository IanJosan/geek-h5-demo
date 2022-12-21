import './App.scss'
import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
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
            <Route path="/home" element={<Home></Home>}></Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App

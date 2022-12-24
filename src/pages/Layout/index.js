import styles from './index.module.scss'
import Icon from '../../component/Icon'
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import classNames from 'classname'
const Home = lazy(() => import('../Home'))
const QA = lazy(() => import('../QA'))
const Video = lazy(() => import('../Video'))
const Profile = lazy(() => import('../Profile'))

const tabBar = [
  {
    title: '首页',
    icon: 'iconbtn_home',
    path: '/home',
  },
  {
    title: '问答',
    icon: 'iconbtn_qa',
    path: '/home/qa',
  },
  {
    title: '视频',
    icon: 'iconbtn_video',
    path: '/home/video',
  },
  {
    title: '我的',
    icon: 'iconbtn_mine',
    path: '/home/profile',
  },
]
function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content">
        <Suspense fallback={<div>loding</div>}>
          <Routes>
            <Route index element={<Home></Home>}></Route>
            <Route path="qa" element={<QA></QA>}></Route>
            <Route path="video" element={<Video></Video>}></Route>
            <Route path="profile" element={<Profile></Profile>}></Route>
          </Routes>
        </Suspense>
      </div>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {tabBar.map((item) => (
          <div
            className={classNames(
              'tabbar-item',
              location.pathname === item.path ? 'tabbar-item-active' : ''
            )}
            key={item.title}
            onClick={() => navigate(item.path)}
          >
            <Icon
              type={classNames(
                location.pathname === item.path ? item.icon + '_sel' : item.icon
              )}
            />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Layout

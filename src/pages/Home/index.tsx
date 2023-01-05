import styles from './index.module.scss'
import Tabs from '../../component/Tabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels } from '../../store/actions/home'
import Icon from '../../component/Icon'
import { Popup } from 'antd-mobile'
import { useState } from 'react'
import Channels from './components/Channels'
import ArticleList from './components/ArticleList'
import MoreAction from './components/MoreAction'
import { RootState } from '@/store'
import { useNavigate } from 'react-router-dom'
function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])
  const tabs = useSelector((state: RootState) => state.home.userChannels)
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  return (
    <div className={styles.root}>
      <Tabs
        tabs={tabs}
        index={active}
        onChange={(e: number) => {
          setActive(e)
        }}
      >
        {tabs.map((item) => (
          <ArticleList
            key={item.id}
            channelId={item.id}
            activeId={tabs[active].id}
          ></ArticleList>
        ))}
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => navigate('/search')} />
        <Icon type="iconbtn_channel" onClick={() => setOpen(true)} />
      </div>
      <Popup
        className="my-deawer"
        visible={open}
        onMaskClick={() => {
          setOpen(false)
        }}
        position="left"
        bodyStyle={{ minWidth: '60vw' }}
      >
        {open && (
          <Channels
            onClose={onClose}
            index={active}
            onChange={(e: any) => {
              setActive(e)
            }}
          ></Channels>
        )}
      </Popup>
      <MoreAction></MoreAction>
    </div>
  )
}

export default Home

import styles from './index.module.scss'
import Tabs from '../../component/Tabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllChannels, getUserChannels } from '../../store/actions/home'
import Icon from '../../component/Icon'
import { Popup } from 'antd-mobile'
import { useState } from 'react'
import Channels from './components/Channels'
function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
    dispatch(getAllChannels())
  }, [dispatch])
  const tabs = useSelector((state) => state.home.userChannels)
  const [open, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
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
        {open && <Channels onClose={onClose}></Channels>}
      </Popup>
    </div>
  )
}

export default Home

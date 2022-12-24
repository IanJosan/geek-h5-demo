import styles from './index.module.scss'
import NavBar from '../../../component/Navbar'
import { List, DatePicker, Popup, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../../../store/actions/profile'

import EditInput from './components/EditInput'
function Edit() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const profile = useSelector((state) => state.profile.profile)
  console.log(profile)
  const [visible1, setVisible1] = useState({ visible: false, type: '' })
  const onclose = () => {
    setVisible1({ visible: false, type: '' })
  }
  const onCommit = async (type, value) => {
    await dispatch(
      updateProfile({
        [type]: value,
      })
    )
    Toast.show({
      content: '修改成功',
      icon: 'success',
      duration: 1000,
    })
    setVisible1({ visible: false, type: '' })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        <NavBar onLeftClick={() => {}}>个人信息</NavBar>

        <div className="wrapper">
          {/* 列表一：显示头像、昵称、简介 */}
          <List className="profile-list">
            <List.Item
              arrow="horizontal"
              extra={
                <span className="avatar-wrapper">
                  <img
                    src={profile ? profile.photo : ''}
                    alt=""
                    style={{ height: '22.5px' }}
                  />
                </span>
              }
            >
              头像
            </List.Item>

            <List.Item
              arrow="horizontal"
              extra={profile ? profile.name : ''}
              onClick={() => {
                setVisible1({ visible: true, type: 'name' })
              }}
            >
              昵称
            </List.Item>

            <List.Item
              arrow="horizontal"
              extra={
                <span className="intro">{profile ? profile.intro : ''}</span>
              }
              onClick={() => {
                setVisible1({ visible: true, type: 'intro' })
              }}
            >
              简介
            </List.Item>
          </List>

          {/* 列表二：显示性别、生日 */}
          <List className="profile-list">
            <List.Item
              arrow="horizontal"
              extra={profile ? (profile.gender === 0 ? '男' : '女') : ''}
            >
              性别
            </List.Item>
            <DatePicker>{(value) => 'Please select'}</DatePicker>
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          <input type="file" hidden />
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button className="btn">退出登录</button>
        </div>
      </div>
      <Popup
        visible={visible1.visible}
        onMaskClick={() => {
          setVisible1({ visible: false, type: '' })
        }}
        bodyStyle={{ height: '40vh' }}
      >
        {visible1.visible && (
          <EditInput
            onclose={onclose}
            type={visible1.type}
            onCommit={onCommit}
          ></EditInput>
        )}
      </Popup>
    </div>
  )
}
export default Edit

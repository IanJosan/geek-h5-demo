import styles from './index.module.scss'
import NavBar from '../../../component/Navbar'
import { List, DatePicker, Popup, Toast, Modal } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {
  getProfile,
  updateProfile,
  updatePhoto,
} from '../../../store/actions/profile'
import { logout } from '../../../store/actions/login'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import { useNavigate } from 'react-router-dom'
function Edit() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])
  const profile = useSelector((state) => state.profile.profile)
  console.log(profile)
  const [visible1, setVisible1] = useState({ visible: false, type: '' })
  const [visible2, setVisible2] = useState({ visible: false, type: '' })
  const onclose = () => {
    setVisible1({ visible: false, type: '' })
    setVisible2({ visible: false, type: '' })
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
    onclose()
  }
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {
          console.log('paizhao')
        },
      },
      {
        title: '本地选择',
        onClick: () => {
          fileRef.current.click()
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          onCommit('gender', 0)
        },
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 1)
        },
      },
    ],
  }
  const fileRef = useRef(null)
  const onFileChange = async (e) => {
    const file = e.target.files[0]
    const fd = new FormData()
    fd.append('photo', file)
    await dispatch(updatePhoto(fd))
    Toast.show({
      content: '修改成功',
      icon: 'success',
      duration: 1000,
    })
    onclose()
  }
  const navigate = useNavigate()
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
              onClick={() => {
                setVisible2({ visible: true, type: 'photo' })
              }}
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
              onClick={() => {
                setVisible2({ visible: true, type: 'gender' })
              }}
            >
              性别
            </List.Item>
            <DatePicker>{(value) => 'Please select'}</DatePicker>
          </List>

          {/* 文件选择框，用于头像图片的上传 */}
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />
        </div>

        {/* 底部栏：退出登录按钮 */}
        <div className="logout">
          <button
            className="btn"
            block
            onClick={() =>
              Modal.confirm({
                content: '是否退出登录',
                confirmText: '确认退出？',
                onConfirm: async () => {
                  dispatch(logout())
                  navigate('/login', { replace: true })
                  Toast.show({
                    icon: 'success',
                    content: '已退出',
                    position: 'bottom',
                  })
                },
              })
            }
          >
            退出登录
          </button>
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
      <Popup
        visible={visible2.visible}
        onMaskClick={() => {
          setVisible2({ visible: false, type: '' })
        }}
        bodyStyle={{ height: '40vh' }}
      >
        {visible2.visible && (
          <EditList
            config={config}
            onclose={onclose}
            type={visible2.type}
          ></EditList>
        )}
      </Popup>
    </div>
  )
}
export default Edit

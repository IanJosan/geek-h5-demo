import styles from './index.module.scss'
import Icon from '../../../component/Icon'
import Input from '../../../component/Input'
import Navbar from '../../../component/Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { getTokenInfo } from '../../../utils/storage'
export default function Chat() {
  const navigate = useNavigate()
  const [messageList, setMessageList] = useState([
    { type: 'robot', text: '机器人' },
    { type: 'user', text: 'hi' },
  ])
  const photo = useSelector((state) => state.profile.user.photo)
  const [msg, setMsg] = useState('')
  const clientRef = useRef(null)
  const listRef = useRef(null)
  useEffect(() => {
    const client = io('http://geek.itheima.net/', {
      query: {
        token: getTokenInfo().token,
      },
      transports: ['websocket'],
    })
    clientRef.current = client
    client.connect(console.log('连接成功'))
    setMessageList([...messageList, { type: 'robot', text: 'hi' }])
    client.on('message', function (e) {
      setMessageList((messageList) => {
        return [
          ...messageList,
          {
            type: 'robot',
            text: e.msg,
          },
        ]
      })
    })
    return () => {
      client.close()
    }
  }, [])
  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messageList])
  const onKeyUp = (e) => {
    if (e.keyCode !== 13) return
    if (!msg) return
    setMessageList([...messageList, { type: 'user', text: msg }])
    clientRef.current.emit('message', {
      msg,
      timestamp: Date.now(),
    })
    setMsg('')
  }
  return (
    <div className={styles.root}>
      <Navbar
        className="fixed-header"
        onLeftClick={() => {
          navigate(-1)
        }}
      >
        小智同学
      </Navbar>
      <div className="chat-list" ref={listRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-item user" key={index}>
                <img src={photo || ''} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="描述问题"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyUp={onKeyUp}
        ></Input>
        <Icon type="iconbianji"></Icon>
      </div>
    </div>
  )
}

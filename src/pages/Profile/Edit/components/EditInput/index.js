import styles from './index.module.scss'
import NavBar from '../../../../../component/Navbar/index'
import Textarea from '../../../../../component/Textarea'
import Input from '../../../../../component/Input'
import { useSelector } from 'react-redux'
import { useState } from 'react'
export default function EditInput({ onclose, type, onCommit }) {
  const defaultValue = useSelector((state) => state.profile.profile[type])
  const [value, setValue] = useState(defaultValue || '')
  return (
    <div className={styles.root}>
      <NavBar
        onLeftClick={onclose}
        extra={
          <span className="commit-btn" onClick={() => onCommit(type, value)}>
            提交
          </span>
        }
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      <div className="countent">
        <h3>编辑{type === 'name' ? '昵称' : '简介'}</h3>
      </div>
      {type === 'name' ? (
        <Input
          className="input-wrap"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></Input>
      ) : (
        <Textarea
          maxLength={200}
          placeholder="请输入"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></Textarea>
      )}
    </div>
  )
}

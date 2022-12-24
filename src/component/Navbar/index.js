import Icon from '../../component/Icon'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
export default function Navbar({ children, extra, onLeftClick }) {
  const navigate = useNavigate()
  const back = () => {
    if (onLeftClick) {
      onLeftClick()
    } else {
      navigate(-1)
    }
  }
  return (
    <div>
      <div className={styles.root}>
        <div className="left">
          <Icon type="iconfanhui" onClick={back}></Icon>
        </div>
        <div className="title">{children}</div>
        <div className="right">{extra}</div>
      </div>
    </div>
  )
}

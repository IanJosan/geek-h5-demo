import Icon from '../Icon'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { ReactElement } from 'react'
type Props = {
  children: string | ReactElement
  extra?: string | ReactElement
  onLeftClick?: () => void
  classname?: string
}
export default function Navbar({
  children,
  extra,
  onLeftClick,
  classname,
}: Props) {
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
      <div className={classnames(styles.root, classname)}>
        <div className="left">
          <Icon type="iconfanhui" onClick={back}></Icon>
        </div>
        <div className="title">{children}</div>
        <div className="right">{extra}</div>
      </div>
    </div>
  )
}

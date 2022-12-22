import styles from './index.module.scss'
import classNames from 'classname'
export default function Input({ extra, onExtraClick, className, ...rest }) {
  return (
    <div>
      <div className={styles.root}>
        <input className={classNames('input', className)} {...rest}></input>
        {extra && (
          <div className="extra" onClick={onExtraClick}>
            {extra}
          </div>
        )}
      </div>
    </div>
  )
}

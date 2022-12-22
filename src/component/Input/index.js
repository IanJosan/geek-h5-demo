import styles from './index.module.scss'
export default function Input({ extra, onExtraClick, ...rest }) {
  return (
    <div>
      <div className={styles.root}>
        <input className="input" {...rest}></input>
        {extra && (
          <div className="extra" onClick={onExtraClick}>
            {extra}
          </div>
        )}
      </div>
    </div>
  )
}

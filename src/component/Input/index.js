import styles from './index.module.scss'
import classNames from 'classname'
import { useEffect, useRef } from 'react'
export default function Input({
  extra,
  onExtraClick,
  autoFocus,
  className,
  ...rest
}) {
  const inputRef = useRef(null)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus()
    }
  }, [autoFocus])
  return (
    <div>
      <div className={styles.root}>
        <input
          ref={inputRef}
          className={classNames('input', className)}
          {...rest}
        ></input>
        {extra && (
          <div className="extra" onClick={onExtraClick}>
            {extra}
          </div>
        )}
      </div>
    </div>
  )
}

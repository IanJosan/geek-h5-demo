import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import { InputHTMLAttributes } from 'react'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  extra?: string
  onExtraClick?: () => void
  autoFocus?: boolean
  className?: string
  type?: 'text' | 'password'
}

export default function Input({
  extra,
  onExtraClick,
  autoFocus,
  className,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current!.focus()
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

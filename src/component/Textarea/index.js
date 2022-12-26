import styles from './index.module.scss'
import classnames from 'classname'
import { useEffect, useRef, useState } from 'react'
export default function Textarea({ maxLength, className, ...rest }) {
  const [value, setValue] = useState(rest.value || '')
  const onChange = (e) => {
    setValue(e.target.value)
    if (rest.onChange) {
      rest.onChange(e)
    }
  }
  const textRef = useRef(null)
  useEffect(() => {
    textRef.current.focus()
  }, [])
  return (
    <div className={styles.root}>
      <textarea
        ref={textRef}
        className={classnames('textarea', className)}
        maxLength={maxLength}
        {...rest}
        value={value}
        onChange={onChange}
      ></textarea>
      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  )
}

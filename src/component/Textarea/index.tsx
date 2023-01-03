import styles from './index.module.scss'
import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
type Props = Omit<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'maxLength' | 'value' | 'onChange'
> & {
  maxLength?: number
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export default function Textarea({ maxLength, className, ...rest }: Props) {
  const [value, setValue] = useState(rest.value || '')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (rest.onChange) {
      rest.onChange(e)
    }
  }
  const textRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    textRef.current!.focus()
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
        // onChange={(e) => {}}
      ></textarea>
      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  )
}

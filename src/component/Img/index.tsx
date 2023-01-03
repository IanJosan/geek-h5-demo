import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon/index'
import styles from './index.module.scss'
type Props = {
  className?: string
  src: string
  alt?: string
}
const Image = ({ className, src, alt }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const current = imgRef.current!
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        current.src = current.dataset.src!
        observer.unobserve(current)
      }
    })
    observer.observe(current)
  }, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const onLoad = () => {
    setError(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setError(true)
  }
  return (
    <div className={classnames(styles.root, className)}>
      {loading && (
        <div className="image-icon">
          <Icon type="iconphoto"></Icon>
        </div>
      )}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail"></Icon>
        </div>
      )}
      <img
        data-src={src}
        alt={alt}
        ref={imgRef}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}

export default Image

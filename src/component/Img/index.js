import classnames from 'classname'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon/index'
import styles from './index.module.scss'

const Image = ({ className, src, alt }) => {
  const imgRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        imgRef.current.src = imgRef.current.dataset.src
        observer.unobserve(imgRef.current)
      }
    })
    observer.observe(imgRef.current)
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

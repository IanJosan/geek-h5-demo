import classNames from 'classnames'
type Props = {
  type: string
  className?: string
  onClick?: () => void
}
function Icon({ type, className, ...rest }: Props) {
  return (
    <svg className={classNames('icon', className)} aria-hidden="true" {...rest}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default Icon

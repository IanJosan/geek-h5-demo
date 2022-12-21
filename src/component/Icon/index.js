import classNames from 'classnames'
import PropTypes from 'prop-types'
function Icon({ type, className, ...rest }) {
  return (
    <svg className={classNames('icon', className)} aria-hidden="true" {...rest}>
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}
Icon.propTypes = {
  type: PropTypes.string.isRequired,
}
export default Icon

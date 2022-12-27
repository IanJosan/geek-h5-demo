import { Navigate } from 'react-router-dom'
import { hasToken } from '../../utils/storage'
import { useLocation } from 'react-router'
function AuthRoute({ children }) {
  const location = useLocation()
  if (hasToken()) {
    return <>{children}</>
  } else {
    return (
      <Navigate
        to={{
          pathname: '/login',
          state: {
            from: location.pathname,
          },
        }}
        replace
      ></Navigate>
    )
  }
}

export default AuthRoute

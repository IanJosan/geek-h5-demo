import { Navigate } from 'react-router-dom'
import { hasToken } from '../../utils/storage'
import { useLocation } from 'react-router'
type Props = {
  children: React.ComponentType<any>
}
function AuthRoute({ children }: Props) {
  const location = useLocation()
  if (hasToken()) {
    return <>{children}</>
  } else {
    return (
      <Navigate
        to={{
          pathname: '/login',
        }}
        state={{
          from: location.pathname,
        }}
        replace
      ></Navigate>
    )
  }
}

export default AuthRoute

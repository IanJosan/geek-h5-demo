import { Navigate } from 'react-router-dom'
import { hasToken } from '../../utils/storage'
function AuthRoute({ children }) {
  if (hasToken()) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace></Navigate>
  }
}

export default AuthRoute

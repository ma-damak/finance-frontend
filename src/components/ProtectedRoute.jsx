import { Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [auth] = useAuthContext()

  if (!auth.user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute

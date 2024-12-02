import { Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

const ProtectedRoute = ({ children }) => {
  const [auth] = useAuthContext()
  return auth.user ? children : <Navigate to="login" />
}
export default ProtectedRoute

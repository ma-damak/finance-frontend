import { Navigate } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

const AuthRedirect = ({ children }) => {
  const [auth] = useAuthContext()
  return auth.user ? <Navigate to="/" /> : children
}
export default AuthRedirect

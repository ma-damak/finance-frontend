import useAuthContext from './useAuthContext'
import storage from '../services/storage'

const useLogout = () => {
  const [, authDispatch] = useAuthContext()

  const logout = () => {
    storage.removeUser()

    authDispatch({ type: 'LOGOUT' })
  }
  return { logout }
}
export default useLogout

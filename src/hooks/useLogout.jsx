import useAuthContext from './useAuthContext'

const useLogout = () => {
  const [, authDispatch] = useAuthContext()

  const logout = () => {
    localStorage.removeItem('user')

    authDispatch({ type: 'LOGOUT' })
  }
  return { logout }
}
export default useLogout

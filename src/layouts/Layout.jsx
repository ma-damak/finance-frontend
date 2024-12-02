import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

const Layout = () => {
  const [, authDispatch] = useAuthContext()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      authDispatch({ type: 'LOGIN', payload: JSON.parse(user) })
    }
  }, [authDispatch])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Outlet />
    </div>
  )
}
export default Layout

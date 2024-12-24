import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import storage from '../services/storage'

const Layout = () => {
  const [, authDispatch] = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      authDispatch({ type: 'LOGIN', payload: user })
    }
    setIsLoading(false)
  }, [authDispatch])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!isLoading && <Outlet />}
    </div>
  )
}
export default Layout

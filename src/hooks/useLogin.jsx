import { useState } from 'react'
import useAuthContext from './useAuthContext'
import userService from '../services/users'

const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [, authDispatch] = useAuthContext()

  const login = async ({ email, password }) => {
    setIsLoading(true)
    setError(null)

    try {
      const user = await userService.login({ email, password })

      localStorage.setItem('user', JSON.stringify(user))
      authDispatch({ type: 'LOGIN', payload: user })
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { error, isLoading, login }
}
export default useLogin

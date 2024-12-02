import { useState } from 'react'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'
import useAuthContext from './useAuthContext'

const useVerifyEmail = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [, authDispatch] = useAuthContext()
  const navigate = useNavigate()

  const verifyEmail = async (code) => {
    setError(null)
    setIsLoading(true)

    try {
      const user = await userService.verifyEmail(code)

      localStorage.setItem('user', JSON.stringify(user))
      authDispatch({ type: 'LOGIN', payload: user })

      navigate('/')
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }
  return { error, isLoading, verifyEmail }
}
export default useVerifyEmail

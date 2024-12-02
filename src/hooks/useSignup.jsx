import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userService from '../services/users'

const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()

  const signup = async ({ email, password }) => {
    setIsLoading(true)
    setError(null)

    try {
      await userService.signup({ email, password })
      navigate('/verify-email')
    } catch (error) {
      setError(
        error?.response?.data?.error ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
export default useSignup

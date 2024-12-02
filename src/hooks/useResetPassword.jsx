import { useState } from 'react'
import userService from '../services/users'
import { useNavigate } from 'react-router-dom'

const useResetPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate()
  const resetPassword = async (password, token) => {
    setError(null)
    setIsLoading(true)
    try {
      await userService.resetPassword(password, token)
      navigate('/login')
    } catch (error) {
      console.log(error)

      setError(error?.response?.data?.error || 'Error reset password.')
    } finally {
      setIsLoading(false)
    }
  }
  return { error, isLoading, resetPassword }
}
export default useResetPassword

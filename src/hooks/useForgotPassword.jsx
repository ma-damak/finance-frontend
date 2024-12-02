import { useState } from 'react'
import userService from '../services/users'

const useForgotPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const forgotPassword = async (email) => {
    setError(null)
    setIsLoading(true)
    try {
      await userService.forgotPassword(email)
    } catch (error) {
      setError(
        error?.response?.data?.error || 'Error sending reset password email.'
      )
    } finally {
      setIsLoading(false)
    }
  }
  return { error, isLoading, forgotPassword }
}
export default useForgotPassword

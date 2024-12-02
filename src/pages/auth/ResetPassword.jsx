import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useResetPassword from '../../hooks/useResetPassword'
import GuestLayout from '../../layouts/GuestLayout'
import InputLabel from '../../components/InputLabel'
import TextInput from '../../components/TextInput'
import InputError from '../../components/InputError'
import PrimaryButton from '../../components/PrimaryButton'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { error, isLoading, resetPassword } = useResetPassword()

  const { token } = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    await resetPassword(password, token)
  }
  return (
    <GuestLayout>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            type="password"
            id="password"
            name="password"
            value={password}
            className="block w-full mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />
          <TextInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={confirmPassword}
            className="block w-full mt-1"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <InputError message={error} className="mt-2" />}
        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={isLoading}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
export default ResetPassword

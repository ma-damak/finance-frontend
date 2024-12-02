import { useState } from 'react'
import useForgotPassword from '../../hooks/useForgotPassword'
import GuestLayout from '../../layouts/GuestLayout'
import TextInput from '../../components/TextInput'
import InputError from '../../components/InputError'
import PrimaryButton from '../../components/PrimaryButton'

const ForgotPassword = () => {
  const { error, isLoading, forgotPassword } = useForgotPassword()
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await forgotPassword(email)
  }
  return (
    <GuestLayout>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </p>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="email"
          type="email"
          name="email"
          value={email}
          className="block w-full mt-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <InputError message={error} className="mt-2" />}

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={isLoading}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
export default ForgotPassword

import { useState } from 'react'
import { Link } from 'react-router-dom'

import useLogin from '../../hooks/useLogin'

import GuestLayout from '../../layouts/GuestLayout'

import PrimaryButton from '../../components/PrimaryButton'
import InputLabel from '../../components/InputLabel'
import TextInput from '../../components/TextInput'
import InputError from '../../components/InputError'
import FormHeading from '../../components/FormHeading'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { error, isLoading, login } = useLogin()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(formData)
  }

  return (
    <GuestLayout>
      <FormHeading>Login to your account</FormHeading>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={formData.email}
            className="block w-full mt-1"
            onChange={handleChange}
          />
        </div>
        <div>
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={formData.password}
            className="block w-full mt-1"
            onChange={handleChange}
          />
        </div>
        {error && <InputError message={error} className="mt-2" />}

        <div className="flex items-center justify-end mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Forgot your password?
          </Link>

          <PrimaryButton className="ms-4" disabled={isLoading}>
            Log in
          </PrimaryButton>
        </div>
        <div className="mt-4 text-sm text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="text-indigo-500 underline ms-4 hover:text-indigo-700 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </GuestLayout>
  )
}
export default Login

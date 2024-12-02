import { useState } from 'react'
import { Link } from 'react-router-dom'

import useSignup from '../../hooks/useSignup'

import GuestLayout from '../../layouts/GuestLayout'

import InputLabel from '../../components/InputLabel'
import TextInput from '../../components/TextInput'
import InputError from '../../components/InputError'
import PrimaryButton from '../../components/PrimaryButton'
import FormHeading from '../../components/FormHeading'

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { signup, error, isLoading } = useSignup()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(formData)
  }

  return (
    <GuestLayout>
      <FormHeading>Sign up</FormHeading>
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
            to="/login"
            className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Already registered?
          </Link>
          <PrimaryButton className="ms-4" disabled={isLoading}>
            Signup
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  )
}
export default Signup

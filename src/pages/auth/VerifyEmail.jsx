import { useEffect, useRef, useState } from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import PrimaryButton from '../../components/PrimaryButton'
import FormHeading from '../../components/FormHeading'
import useVerifyEmail from '../../hooks/useVerifyEmail'
import InputError from '../../components/InputError'

const Verify = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const { error, isLoading, verifyEmail } = useVerifyEmail()

  useEffect(() => {
    inputRefs.current[0].focus()
  }, [])

  const handleChange = (index, value) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    console.log('value =>', value)
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, event) => {
    console.log('index =>', index)
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await verifyEmail(code.join(''))
  }
  return (
    <GuestLayout>
      <FormHeading>Verify your email</FormHeading>
      <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
        Enter the 6 digit code sent to your email
      </p>
      <form onSubmit={handleSubmit} className="text-center">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              className="w-12 h-12 text-2xl font-bold text-center border-gray-300 rounded-md shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600"
              key={index}
              maxLength="1"
              value={digit}
              ref={(element) => (inputRefs.current[index] = element)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              type="text"
            />
          ))}
        </div>
        {error && <InputError message={error} className="mt-2" />}
        <PrimaryButton className="mt-6" disabled={isLoading}>
          Send code
        </PrimaryButton>
      </form>
    </GuestLayout>
  )
}
export default Verify

const InputError = ({ message, className = '', ...props }) => {
  return (
    <p
      {...props}
      className={'text-sm text-red-600 dark:text-red-400 ' + className}
    >
      {message}
    </p>
  )
}
export default InputError

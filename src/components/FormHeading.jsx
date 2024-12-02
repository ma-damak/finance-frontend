const FormHeading = ({ className = '', children, ...props }) => {
  return (
    <h1
      {...props}
      className={`mb-4 font-bold tracking-tight text-center text-gray-800 text-2xl/9 dark:text-gray-200 ${className}`}
    >
      {children}
    </h1>
  )
}
export default FormHeading

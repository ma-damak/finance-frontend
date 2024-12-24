const Error = ({ message }) => {
  return (
    <div className="grid min-h-full px-6 py-24 text-center bg-white place-items-center sm:py-32 lg:px-8">
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 text-balance sm:text-7xl">
        {message}
      </h1>
    </div>
  )
}
export default Error

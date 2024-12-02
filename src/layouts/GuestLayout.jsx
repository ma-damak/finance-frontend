import { Link } from 'react-router-dom'
import ApplicationLogo from '../components/ApplicationLogo'

const GuestLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
      <div>
        <Link to="/">
          <ApplicationLogo className="text-gray-800 fill-current w-30 dark:text-gray-200" />
        </Link>
      </div>

      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md dark:bg-gray-800 sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}
export default GuestLayout

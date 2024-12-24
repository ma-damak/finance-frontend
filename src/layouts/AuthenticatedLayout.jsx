import { useState } from 'react'

import { Link } from 'react-router-dom'
import useLogout from '../hooks/useLogout'

import ApplicationLogo from '../components/ApplicationLogo'
import CustomLink from '../components/CustomLink'
import useAuthContext from '../hooks/useAuthContext'
import ResponsiveNavLink from '../components/ResponsiveNavLink'

const AuthenticatedLayout = ({ children, header }) => {
  const { logout } = useLogout()
  const [auth] = useAuthContext()
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false)

  return (
    <>
      <nav className="bg-white border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center shrink-0">
                <Link to="/">
                  <ApplicationLogo className="block text-gray-800 fill-current w-34 h-9 dark:text-gray-200" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <CustomLink to="/">Home</CustomLink>
                {auth.user.role === 'admin' && (
                  <CustomLink to="/dashboard">Dashboard</CustomLink>
                )}
                {auth.user.role !== 'user' && (
                  <CustomLink to="/checks">Checks</CustomLink>
                )}
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="relative ms-3">
                <p
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md dark:text-gray-400 dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                >
                  {auth.user.email}
                </p>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-700"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="flex items-center -me-2 sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400"
              >
                <svg
                  className="w-6 h-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? 'inline-flex' : 'hidden'
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink to="/">Home</ResponsiveNavLink>
            <ResponsiveNavLink to="/dashboard">Dashboard</ResponsiveNavLink>
            <ResponsiveNavLink to="/test">Test</ResponsiveNavLink>
          </div>

          <div className="py-3 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="text-sm font-medium text-gray-500">
                {auth.user.email}
              </div>
              <button
                onClick={logout}
                className="px-3 py-2 mt-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 dark:focus:ring-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {header && (
        <header className="bg-white shadow dark:bg-gray-800">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
      <main>{children}</main>
    </>
  )
}
export default AuthenticatedLayout

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

import Layout from './layouts/Layout.jsx'

import Home from './pages/home/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import VerifyEmail from './pages/auth/VerifyEmail.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import Test from './pages/home/Test.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
import AuthRedirect from './components/AuthRedirect.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        ),
      },
      {
        path: 'signup',
        element: (
          <AuthRedirect>
            <Signup />
          </AuthRedirect>
        ),
      },
      {
        path: 'verify-email',
        element: (
          <AuthRedirect>
            <VerifyEmail />
          </AuthRedirect>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <AuthRedirect>
            <ForgotPassword />
          </AuthRedirect>
        ),
      },
      {
        path: 'reset-password/:token',
        element: (
          <AuthRedirect>
            <ResetPassword />
          </AuthRedirect>
        ),
      },
      {
        path: 'test',
        element: (
          <ProtectedRoute>
            <Test />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
)

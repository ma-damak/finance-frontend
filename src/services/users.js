import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const signup = async (credentials) => {
  const response = await axios.post(`${baseUrl}/signup`, credentials)
  return response.data
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const verifyEmail = async (code) => {
  const response = await axios.post(`${baseUrl}/verify-email`, { code })
  return response.data
}

const forgotPassword = async (email) => {
  const response = await axios.post(`${baseUrl}/forgot-password`, { email })
  return response.data
}

const resetPassword = async (password, token) => {
  const response = await axios.post(`${baseUrl}/reset-password/${token}`, {
    password,
  })
  return response.data
}

export default {
  getAll,
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
}

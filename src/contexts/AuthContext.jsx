import { createContext, useReducer } from 'react'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [auth, authDispatch] = useReducer(authReducer, {
    user: null,
  })

  console.log('AuthContext state =>', auth)

  return (
    <AuthContext.Provider value={[auth, authDispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

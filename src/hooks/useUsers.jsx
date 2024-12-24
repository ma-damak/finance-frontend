import { useEffect, useState } from 'react'
import userService from '../services/users'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getAll()
        setUsers(users)
      } catch (error) {
        setError(error.message || 'Failed to fetch users')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { error, isLoading, users }
}
export default useUsers

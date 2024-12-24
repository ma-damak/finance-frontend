import { useState } from 'react'
import SelectInput from './SelectInput'
import userService from '../services/users'

const ROLES = ['user', 'accountant', 'manager']

const RoleSelectInput = ({ user }) => {
  const [selectedRole, setSelectedRole] = useState(user.role)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = async (e) => {
    setSelectedRole(e.target.value)
    setIsLoading(true)
    try {
      await userService.setRole(user.id, e.target.value)
    } catch (error) {
      window.alert('Failed to update role:', error)
      setSelectedRole(user.role)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SelectInput
      className="capitalize"
      onChange={handleChange}
      value={selectedRole}
      disabled={isLoading}
    >
      {ROLES.map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </SelectInput>
  )
}
export default RoleSelectInput

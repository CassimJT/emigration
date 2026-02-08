import React from "react"
import { 
  updateUser as updateUserAPI, 
  deleteUser as deleteUserAPI, 
  getAllUsers as getAllUsersAPI 
} from "../api/dashboard.api"

export function useUserManagement() {
  const [users, setUsers] = React.useState([])
  const [loadingUsers, setLoadingUsers] = React.useState(false)
  const [usersError, setUsersError] = React.useState(null)

  const getAllUsers = React.useCallback(async () => {
    setLoadingUsers(true)
    setUsersError(null)
    try {
      const data = await getAllUsersAPI()
      setUsers(data || [])
    } catch (err) {
      console.error('Get all users error:', err)
      setUsersError(err?.message || 'Failed to fetch users')
    } finally {
      setLoadingUsers(false)
    }
  }, [])

    const updateUser= React.useCallback(async (userId, userData) => {
      try {
      await updateUserAPI(userId, userData)
      // Optimistic or refetch — here we refetch for simplicity
      await getAllUsers()
    } catch (err) {
      console.error('Update user error:', err)
      throw new Error(err?.message || 'Failed to update user')
    }
  }, [getAllUsers])

  const deleteUser = React.useCallback(async (userId) => {
    try {
      await deleteUserAPI(userId)
      setUsers(prev => prev.filter(u => u.id !== userId))
    } catch (err) {
      console.error('Delete user error:', err)
      throw new Error(err?.message || 'Failed to delete user')
    }
  }, [])

  // Initial load
  React.useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

  return {
    users,
    loadingUsers,
    usersError,
    getAllUsers,
    updateUser,
    deleteUser,
  }
}
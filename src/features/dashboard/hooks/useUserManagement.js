import React from "react"
import {
  getAllUsers as getAllUsersAPI,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI,
  promoteUser as promoteUserAPI,
  updateUserProfile as updateUserProfileAPI,
} from '@/features/dashboard/api/dashboard.api'

export function useUserManagement() {
  const [users, setUsers] = React.useState([])
  const [loadingUsers, setLoadingUsers] = React.useState(false)
  const [usersError, setUsersError] = React.useState(null)

  // Fetch all users
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
  // Update user
  const updateUser = React.useCallback(async (userId, userData) => {
    try {
      await updateUserAPI(userId, userData)
      await getAllUsers()
    } catch (err) {
      console.error('Update user error:', err)
      throw new Error(err?.message || 'Failed to update user')
    }
  }, [getAllUsers])
// Delete user
  const deleteUser = React.useCallback(async (userId) => {
    try {
      await deleteUserAPI(userId)
      setUsers(prev => prev.filter(u => u.id !== userId))
    } catch (err) {
      console.error('Delete user error:', err)
      throw new Error(err?.message || 'Failed to delete user')
    }
  }, [])
  // Promote user
  const promoteUser = React.useCallback(async (userId) => {
    try {
      await promoteUserAPI(userId)
      await getAllUsers()
    } catch (err) {
      console.error('Promote user error:', err)
      throw new Error(err?.message || 'Failed to promote user')
    }
  }, [getAllUsers])
  // Update user profile
  const updateUserProfile = React.useCallback(async (userId, profileData) => {
    try {
      await updateUserProfileAPI(userId, profileData)
      await getAllUsers()
    } catch (err) {
      console.error('Update user profile error:', err)
      throw new Error(err?.message || 'Failed to update profile')
    }
  }, [getAllUsers])

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
    promoteUser,
    updateUserProfile,
  }
}

import React from "react"
import {
  getAllUsers as getAllUsersAPI,
  updateUser as updateUserAPI,
  deleteUser as deleteUserAPI,
  promoteUser as promoteUserAPI,
  getUserDetails as getUserDetailsAPI,
} from '@/features/dashboard/api/dashboard.api'

export function useUserManagement() {
  const [users, setUsers] = React.useState([])
  const [userToView, setUserToView] = React.useState(null)
  const [loadingUsers, setLoadingUsers] = React.useState(false)
  const [loadingUserDetails, setLoadingUserDetails] = React.useState(false)
  const [userError, setUserError] = React.useState(null)
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
  // Get user details
  const getUserDetails = React.useCallback(async (userId) => {
        setLoadingUserDetails(true)
        setUserError(null)
    try {
      const user = await getUserDetailsAPI(userId)
      setUserToView(user)
    } catch (err) {
      console.error('Get user details error:', err)
      throw new Error(err?.message || 'Failed to fetch user details')
    }finally {
      setLoadingUserDetails(false)
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
      setUsers(prev => prev.filter(u => u.nationalId !== userId))
    } catch (err) {
      console.error('Delete user error:', err)
      throw new Error(err?.message || 'Failed to delete user')
    }
  }, [])
  // Promote user
  const promoteUser = React.useCallback(async (userId, newRole) => {
    try {
      await promoteUserAPI(userId, newRole)
      await getAllUsers()
    } catch (err) {
      console.error('Promote user error:', err)
      throw new Error(err?.message || 'Failed to promote user')
    }
  }, [getAllUsers])
  

  return {
    users,
    userToView,
    loadingUsers,
    loadingUserDetails,
    getAllUsers,
    getUserDetails,
    updateUser,
    promoteUser,
    deleteUser,
    usersError,
    userError,
  }
}

import api from '@/lib/axios'


// Fetch overall dashboard summary (user-specific)
export async function userProfile() {
  try {
    const { data } = await api.get('/users/me/profile')
    return data.message
  } catch (error) {
    return handleError(error)
  }
}

export async function getAllUsers() {
  try {
    const { data } = await api.get('/users')
    return data.message
  } catch (error) {
    return handleError(error)
  }
}

export async function getUserDetails(userId) {
  try {
    const { data } = await api.get(`/users/${userId}`)
    return data.message
  } catch (error) {
    return handleError(error)
  }
}

export async function updateUser(userId, userData) {
  try {
    const { data } = await api.put(`/users/${userId}`, userData)
    return data.message
  } catch (error) {
    return handleError(error)
  }
}

export async function deleteUser(userId) {
  try {
    const { data } = await api.delete(`/users/${userId}`)
    return data.message
  } catch (error) {
    return handleError(error)
  }
}

// Fetch recent activities for dashboard display
export async function getRecentActivities() {
    return [] 
}

// Fetch system notifications for dashboard display
export async function getNotifications() {
    return [] 
}

// Fetch passport/application status for dashboard display
export async function getApplicationStatus() {
    return [] 
}


// Consistent error handling function
function handleError(error) {
  if (error.response) {
    throw error.response.data
  } else if (error.request) {
    throw {
      status: 500,
      message: 'No response from server',
    }
  } else {
    throw {
      status: 500,
      message: error.message,
    }
  }
}



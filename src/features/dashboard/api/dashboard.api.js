import api from '@/lib/axios'


// Example with axios/fetch
export const getProfile = async () => {
  try {
    const {data} = await api.get('/users/me/profile'); 
    if (data.status === 'success') {
      return data.user;  
    }
    throw new Error(data.message || 'Failed to load profile');
  } catch (err) {
    console.error('Get profile error:', err);
    throw err;
  }
};

export async function updateUserProfile(profileData) {
  try {
    const { data } = await api.patch('/users/me/profile', profileData)
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

export async function promoteUser(userId, newRole) {
  try {
    const { data } = await api.patch(`/users/${userId}/promote`, { role: newRole })
    
    if (data.status !== "success") {
      throw new Error(data.message || "Promotion failed");
    }
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



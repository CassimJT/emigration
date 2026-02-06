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

// Fetch passport/application status for dashboard display
export async function fetchApplicationStatus() {
    return [] 
}


// Consistent error handling function
function handleError(error) {
  if (error.response) {
    return { 
      status: error.response.status, 
      statusText: 'Failed', 
      message: error.response.data?.message || 'Server error' 
    }
  } else if (error.request) {
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}



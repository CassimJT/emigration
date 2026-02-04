import api from '@/lib/axios'


// Fetch overall dashboard summary (user-specific) <<exported>>
 export async function fetchDashboardSummary() {
  try {
    const { data } = await api.get('/users') 
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch passport/application status for dashboard display <<exported>>
export async function fetchApplicationStatus() {
  try {
    const { data } = await api.get('/applications/status') 
    return data
  } catch (error) {
    return handleError(error)
  }
}


// Consistent error handling function
function handleError(error) {
  if (error.response) {
    return error.response.data
  } else if (error.request) {
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}


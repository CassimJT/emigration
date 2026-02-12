import api from '@/lib/axios'

// Create a new passport application
export async function createApplication(payload) {
  try {
    const { data } = await api.post('/passport/applications', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Update an existing application
export async function updateApplication(applicationId, payload) {
  try {
    const { data } = await api.put(`/passport/applications/${applicationId}`, payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch a single application
export async function fetchApplication(applicationId) {
  try {
    const { data } = await api.get(`/passport/applications/${applicationId}`)
    if (data.status === 'success') {
    return data
  }  throw new Error(data.message || 'Failed to fetch application') 
  } catch (error) {
    return handleError(error)
  }
}

export async function fetchApplications() {
try {
  const { data } = await api.get('/passport/applications') 
  if (data.status === 'success') {
    return data 
  } throw new Error(data.message || 'Failed to fetch applications')
  } catch (error) { 
  return handleError(error) 
  }
}

// Submit a completed application
export async function submitApplication(applicationId) {
  try {
    const { data } = await api.post(`/passport/applications/${applicationId}/submit`)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Generic error handler
function handleError(error) {
  if (error.response) {
    return error.response.data
  } else if (error.request) {
    return { status: 500, statusText: 'Failed', message: 'No response from server' }
  } else {
    return { status: 500, statusText: 'Failed', message: error.message }
  }
}

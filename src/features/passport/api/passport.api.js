import api from '@/lib/axios'

   //CLIENT SIDE – APPLICATION LIFECYCLE

// Create a new passport application
export async function createApplication(payload) {
  try {
    const { data } = await api.post('/passport/applications', payload)
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Update an existing application (multi-part save)
export async function updateApplication(applicationId, payload) {
  try {
    const { data } = await api.put(
      `/passport/applications/${applicationId}`,
      payload
    )
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
    const { data } = await api.post(
      `/passport/applications/${applicationId}/submit`
    )
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Fetch logged-in user's applications
export async function fetchMyApplications(status = null) {
  try {
    const query = status ? `?status=${status}` : ''
    const { data } = await api.get(
      `/passport/applications${query}`
    )
    return data
  } catch (error) {
    return handleError(error)
  }
}

 //  OFFICER / ADMIN – REVIEW FLOW

// Fetch applications for review (default SUBMITTED)
export async function fetchApplicationsForReview({
  status = "SUBMITTED",
  page = 1,
  limit = 10,
} = {}) {
  try {
    const { data } = await api.get("/passport/admin/applications", {  
      params: {
        status,
        page,
        limit,
      },
    });

    if (data.status === "success") {
      return data;
    }

    throw new Error(data.message || "Failed to fetch review queue");
  } catch (error) {
    console.error("API error:", error);
    return handleError(error);
  }
}

// Start review
export async function startReview(applicationId) {
  try {
    const response = await api.post(
      `/passport/admin/applications/${applicationId}/start-review`
    );
    if(response.status === "success")
    return response.data;
    else
    throw response.error;
  } catch (error) {
    console.log("rewie error:" + error)
    return handleError(error);  
  }
}

// Approve application (creates immigration record)
export async function approveApplication(applicationId) {
  try {
    const { data } = await api.post(
      `/passport/admin/applications/${applicationId}/approve`
    )
    return data
  } catch (error) {
    return handleError(error)
  }
}

// Reject application
export async function rejectApplication(applicationId, reason = null) {
  try {
    const { data } = await api.post(
      `/passport/admin/applications/${applicationId}/reject`,
      { reason }
    )
    return data
  } catch (error) {
    return handleError(error)
  }
}

   //IMMIGRATION RECORD

// Fetch immigration record linked to application
export async function fetchImmigrationRecord(applicationId) {
  try {
    const { data } = await api.get(
      `/passport/applications/${applicationId}/immigration`
    )
    return data
  } catch (error) {
    return handleError(error)
  }
}

  // ERROR HANDLING

function handleError(error) {
  if (error.response) {
    return error.response.data
  }

  if (error.request) {
    return {
      status: 500,
      statusText: 'Failed',
      message: 'No response from server',
    }
  }

  return {
    status: 500,
    statusText: 'Failed',
    message: error.message,
  }
}
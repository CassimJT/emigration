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
export const startReview = async (applicationId) => {
  try {
    const res = await api.post(
      `/passport/admin/applications/${applicationId}/start-review`
    );
    console.log("res.data:", res.data);
    const responseData = res.data ?? {};

    if (!responseData || typeof responseData !== 'object') {
      return {
        status: "failed",
        message: "Invalid response format from server",
        code: "INVALID_FORMAT"
      };
    }

    if (responseData.status === "success") {
      return {
        status: "success",
        data: responseData.data ?? responseData 
      };
    }

    if (responseData._id && responseData.status) {
      return {
        status: "success",
        data: responseData
      };
    }

    if (responseData.status === "failed" || responseData.error || responseData.message) {
      return {
        status: "failed",
        message: responseData.message || responseData.error || "Operation failed",
        code: responseData.code,
        details: responseData.details
      };
    }

    return {
      status: "failed",
      message: "Unexpected response format",
      raw: responseData
    };

    
  } catch (err) {
    if (err.response) {
      const data = err.response.data ?? {};
      return {
        status: "failed",
        httpStatus: err.response.status,
        message: data.message || data.error || `Server error (${err.response.status})`,
        code: data.code,
        details: data.details || data
      };
    }

    if (err.request) {
      return {
        status: "failed",
        httpStatus: 0,
        message: "No response from server – check your network",
        code: "NETWORK_ERROR"
      };
    }

    return {
      status: "failed",
      httpStatus: 0,
      message: err.message || "Unexpected client error",
      code: "CLIENT_ERROR"
    };
  }
};

// Approve application (creates immigration record)
export async function approveApplication(applicationId) {
  try {
    const res = await api.post(
      `/passport/admin/applications/${applicationId}/approve`
    )
    const payload = res.data ?? {}

    if(payload.status === "success"){
    return {
        status: "success",
        data: payload.data ?? payload, 
    };
  }

  if (payload.status === "failed" || payload.error || payload.message) {
      throw new Error(payload.message || payload.error || "Approval failed");
  }

  throw new Error("Unexpected response format from server");
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

// IDENTITY STATUS
export async function getIdentityStatus(referenceId) {
  try {
    const { data } = await api.get(`/identity/status/${referenceId}`)
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
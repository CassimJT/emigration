import axios from 'axios'
import { getToken, setAuthSession, clearAuthSession } from './storage'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Main API client (with interceptors)
const api = axios.create({
  baseURL: BASE_URL,
})

// Bare client for refresh — NO interceptors
const refreshClient = axios.create({
  baseURL: BASE_URL,
})

// Attach access token
api.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let refreshQueue = []

const processQueue = (error, token = null) => {
  refreshQueue.forEach(p => {
    if (error) p.reject(error)
    else p.resolve(token)
  })
  refreshQueue = []
}

//debug log interceptor to verify token is being sent
api.interceptors.request.use(config => {
  const token = getToken();
  console.log('Sending token:', token ? 'yes' : 'NO TOKEN'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access token
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: token => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(api(originalRequest))
            },
            reject,
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await refreshClient.post('/auth/refresh-token') // backend route
        const { accessToken } = res.data

        setAuthSession({ accessToken })
        processQueue(null, accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (err) {
        processQueue(err)
        clearAuthSession()
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api

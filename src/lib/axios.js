import axios from 'axios'
import { getToken, getRefreshToken, setAuthSession, clearAuthSession } from './storage'
import { refreshToken as refreshTokenApi } from '@/features/auth/api/auth.api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

// Attach access token
api.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle expired access token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    // Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) throw new Error('No refresh token')

        const data = await refreshTokenApi({ token: refreshToken })

        setAuthSession({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        clearAuthSession()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api

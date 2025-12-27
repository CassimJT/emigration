const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'

export function setAuthSession({ accessToken, refreshToken, user }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getStoredUser() {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

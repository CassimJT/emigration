// src/lib/storage.js

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'
const TEMP_KEY = 'auth:temp'
const DASHBOARD_VIEW_KEY = 'dashboardView'

/* ---------------- Persistent Auth Session ---------------- */

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
  try {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

/* Optional helper to get full auth session */
export function getAuthSession() {
  return {
    accessToken: getToken(),
    refreshToken: getRefreshToken(),
    user: getStoredUser(),
  }
}

/* ---------------- Temporary Session (Identity / OTP flows) ---------------- */

export function setTempSession(updates) {
  const existing = getTempSession() || {}
  sessionStorage.setItem(TEMP_KEY, JSON.stringify({ ...existing, ...updates }))
}

export function getTempSession() {
  try {
    const raw = sessionStorage.getItem(TEMP_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearTempSession() {
  sessionStorage.removeItem(TEMP_KEY)
}

/* ---------------- Dashboard View Persistence ---------------- */

export function setDashboardView(view) {
  if (view === null || view === undefined) {
    localStorage.removeItem(DASHBOARD_VIEW_KEY);
  } else {
    localStorage.setItem(DASHBOARD_VIEW_KEY, view);
  }
}

export function getDashboardView() {
  const value = localStorage.getItem(DASHBOARD_VIEW_KEY);
  if (value === null || value === "null") {
    return null;
  }
  return value;
}

export function clearDashboardView() {
  localStorage.removeItem(DASHBOARD_VIEW_KEY);
}
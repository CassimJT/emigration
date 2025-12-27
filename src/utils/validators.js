export function isEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}

export function isPhoneNumber(phone) {
  return /^\d{9,15}$/.test(phone)
}

export function isStrongPassword(value) {
  if (typeof value !== 'string') return false

  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
  const isLongEnough = value.length >= minLength

  return isLongEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
}

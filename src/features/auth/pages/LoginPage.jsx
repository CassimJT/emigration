import LoginForm from '@/features/auth/components/LoginForm'
import LoginAvatar from '@/assets/LoginAvatar.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

function LoginPage() {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const {
    login,
    error,
    loading,
    status,
    clearStatus,
    verificationSessionId,
    loginSessionId,
    isAuthenticated,
    isAuthReady,
  } = useAuth()

  const preparePayload = () => ({
    emailAddress: formState.email.trim(),
    password: formState.password,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await login({ credentials: preparePayload() })
      console.log('LOGIN PAGE RECEIVED:', data)
      navigate('/otp')
    } catch (err) {
      console.error('LOGIN PAGE ERROR:', err)
    }
  }

  /* -------- ROUTE GUARD -------- */
  useEffect(() => {
    if (!isAuthReady) return

    if (isAuthenticated) {
      navigate("/dashboard", { replace: true })
    } else if (!verificationSessionId) {
      navigate("/identity/verify", { replace: true })
    } else if (loginSessionId) {
      navigate("/otp", { replace: true })
    }
  }, [
    isAuthReady,
    isAuthenticated,
    verificationSessionId,
    loginSessionId,
    navigate,
  ])

  useEffect(() => {
    if (status === "success") {
      clearStatus()
    }
  }, [status, clearStatus])

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <LoginForm
            values={formState}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </div>
      </div>
      <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center bg-green-100">
        <img
          src={LoginAvatar}
          alt="e-passport"
          className="max-w-full max-h-full object-contain p-10"
        />
      </div>
    </div>
  )
}

export default LoginPage

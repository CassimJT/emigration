import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginAvatar from "@/assets/LoginAvatar.png"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'

function SignupPage() {
  //form state
  const [formState, setFormState] = React.useState({ email: '', password: '', confirmPassword: '' })
  const [passWortMatchError, setPassWortMatchError] = React.useState('')
  const navigate = useNavigate()
  
  const { 
    signup,
    error,  
    loading,
    status
  } = useAuth()

  //prepare signup payload
  const preparePayload = () => {  
    return {
      emailAddress: formState.email.trim(),
      password: formState.password,
      confirmPassword: formState.confirmPassword,
    }
  }
  //handling signup form field changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const validatePasswordMatch = () => {
    if (formState.password !== formState.confirmPassword) {
      setPassWortMatchError('Passwords do not match')
      return false
    }
    setPassWortMatchError('')
    return true
  }

  //handling signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validatePasswordMatch()) return
    const payload = preparePayload()
    await signup(payload)
    
  }
  React.useEffect(() => {   
    if (!status) return
    if (status === 'success') {
      navigate('/login', {replace: true})
    }
  }, [status,navigate])

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <SignupForm 
            values={formState}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={passWortMatchError ? passWortMatchError : error}
            status={status}
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

export default SignupPage
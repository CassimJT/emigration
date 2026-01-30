import React from 'react'
import SignupForm from '../components/SignupForm'
import LoginAvatar from "@/assets/LoginAvatar.png"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function SignupPage() {
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate();

  const {
        signup,
        loading,
        status,
        error,
        clearStatus
    } = useAuth();

  const preparePayload = () => {
    return {
      emailAddress: formState.email.trim(),
      password: formState.password.trim(),
      confirmPassword: formState.confirmPassword.trim(),
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup({ credentials: preparePayload() })
  } 

  React.useEffect(() => {
    if (status === 'success') {
      navigate('/dashboard');
      clearStatus();
    }
  }, [status, navigate, clearStatus]);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 md:p-10 bg-white">
        <div className="w-full max-w-xl">
          <SignupForm 
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

export default SignupPage
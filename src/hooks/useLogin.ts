import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from './useAuth'
import { loginSchema} from '../schemas/authSchema'
import { getErrorMessage } from '@/lib/getErrorMessage'

export function useLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    console.log("entrée handlelogin")
    e.preventDefault()
    setErrors({})
    setGlobalError('')

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)
    try {
      await login(result.data)
      navigate('/dashboard')
    } catch (e) {
      setGlobalError(getErrorMessage(e, 'Erreur de connexion'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email, setEmail,
    password, setPassword,
    errors,
    globalError,
    isLoading,
    handleLogin,
  }
}


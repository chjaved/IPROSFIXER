import { createContext, useContext, useState, useEffect } from 'react'

const BASE = import.meta.env.VITE_API_URL || ''
const AuthContext = createContext(null)

async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.message || 'Request failed')
  return data
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('iprofixer_user')
    const storedToken = localStorage.getItem('iprofixer_token')
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const data = await apiPost('/auth/login', { email, password })
    localStorage.setItem('iprofixer_token', data.token)
    localStorage.setItem('iprofixer_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const signup = async (name, email, password, phone) => {
    const data = await apiPost('/auth/register', { name, email, password, phone })
    localStorage.setItem('iprofixer_token', data.token)
    localStorage.setItem('iprofixer_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const signupPro = async (fields) => {
    const data = await apiPost('/auth/register-pro', fields)
    localStorage.setItem('iprofixer_token', data.token)
    localStorage.setItem('iprofixer_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('iprofixer_token')
    localStorage.removeItem('iprofixer_user')
  }

  const updateUser = (updated) => {
    const merged = { ...user, ...updated }
    setUser(merged)
    localStorage.setItem('iprofixer_user', JSON.stringify(merged))
  }

  const value = {
    user,
    loading,
    login,
    signup,
    signupPro,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isConsumer: user?.type === 'consumer',
    isProfessional: user?.type === 'professional',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export default AuthContext

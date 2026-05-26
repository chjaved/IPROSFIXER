import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
const API_BASE = '/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for stored auth
    const storedToken = localStorage.getItem('iprofixer_token')
    const storedUser = localStorage.getItem('iprofixer_user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password, userType = 'consumer') => {
    try {
      const res = await fetch(`${API_BASE}/auth?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      const json = await res.json()
      
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Login failed')
      }
      
      const { user: userData, token: authToken } = json.data
      
      // Verify user type matches
      if (userData.type !== userType) {
        throw new Error(`This account is registered as a ${userData.type}, not a ${userType}`)
      }
      
      setUser(userData)
      setToken(authToken)
      localStorage.setItem('iprofixer_user', JSON.stringify(userData))
      localStorage.setItem('iprofixer_token', authToken)
      
      return userData
    } catch (err) {
      throw err
    }
  }

  const signup = async (name, email, password, phone, userType = 'consumer', additionalInfo = {}) => {
    try {
      const action = userType === 'professional' ? 'register-pro' : 'register'
      const payload = { name, email, password, phone }
      
      if (userType === 'professional') {
        payload.serviceTypes = additionalInfo.serviceTypes || []
        payload.areas = additionalInfo.areas || []
        payload.experienceYears = additionalInfo.experienceYears || 0
      }
      
      const res = await fetch(`${API_BASE}/auth?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      const json = await res.json()
      
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Registration failed')
      }
      
      const { user: userData, token: authToken } = json.data
      
      setUser(userData)
      setToken(authToken)
      localStorage.setItem('iprofixer_user', JSON.stringify(userData))
      localStorage.setItem('iprofixer_token', authToken)
      
      return userData
    } catch (err) {
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('iprofixer_user')
    localStorage.removeItem('iprofixer_token')
  }

  const isAuthenticated = !!user && !!token
  const isConsumer = user?.type === 'consumer'
  const isProfessional = user?.type === 'professional'

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    isAuthenticated,
    isConsumer,
    isProfessional
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for stored auth
    const storedUser = localStorage.getItem('iprofixer_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password, userType = 'consumer') => {
    // Simulate API call - in production, this would call your backend
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock authentication - accept any email/password for demo
        if (email && password) {
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            type: userType, // 'consumer' or 'professional'
            createdAt: new Date().toISOString()
          }
          setUser(user)
          localStorage.setItem('iprofixer_user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 500)
    })
  }

  const signup = (name, email, password, phone, userType = 'consumer', additionalInfo = {}) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            phone,
            type: userType,
            ...additionalInfo,
            createdAt: new Date().toISOString()
          }
          setUser(user)
          localStorage.setItem('iprofixer_user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Please fill all required fields'))
        }
      }, 500)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('iprofixer_user')
  }

  const isAuthenticated = !!user
  const isConsumer = user?.type === 'consumer'
  const isProfessional = user?.type === 'professional'

  const value = {
    user,
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

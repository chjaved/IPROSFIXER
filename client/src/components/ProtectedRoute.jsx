import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProtectedRoute({ children, allowedTypes = [] }) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login, saving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check if user type is allowed
  if (allowedTypes.length > 0 && !allowedTypes.includes(user?.type)) {
    if (user?.type === 'consumer') return <Navigate to="/dashboard" replace />
    if (user?.type === 'professional') return <Navigate to="/pro-dashboard" replace />
    return <Navigate to="/" replace />
  }

  return children || <Outlet />
}

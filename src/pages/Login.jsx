import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('consumer')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the redirect path from location state, or default based on user type
  const from = location.state?.from?.pathname || (userType === 'professional' ? '/pro-dashboard' : '/dashboard')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password, userType)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#04342C] via-[#0B6B52] to-[#1D9E75] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="iPROFIXER" className="h-10 w-auto" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900">Welcome Back</h1>
            <p className="text-center text-gray-500 text-sm mt-1">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            {/* User Type Toggle */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setUserType('consumer')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  userType === 'consumer'
                    ? 'bg-white text-teal shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setUserType('professional')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  userType === 'professional'
                    ? 'bg-white text-orange shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Professional
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-teal focus:ring-teal" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-teal hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  userType === 'professional'
                    ? 'bg-orange hover:bg-orange-dark'
                    : 'bg-teal hover:bg-teal-dark'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            {/* Sign Up Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/signup"
                className="text-center py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign up as Customer
              </Link>
              <Link
                to="/pro-signup"
                className="text-center py-2.5 px-4 border border-orange text-orange rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors"
              >
                Join as Pro
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-sm mt-6">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-white hover:underline">Terms</Link> and{' '}
          <Link to="/privacy" className="text-white hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

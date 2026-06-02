import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || ''

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]   = useState(null)

  const getAuthHeaders = () => {
    return { 'Content-Type': 'application/json' }
  }

  const get = async (endpoint, params = {}) => {
    setLoading(true)
    setError(null)
    try {
      const queryString = new URLSearchParams(params).toString()
      const url = `${API_BASE}/${endpoint}${queryString ? `?${queryString}` : ''}`
      
      const res = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Request failed')
      return json.data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const post = async (endpoint, data) => {
    setLoading(true)
    setSuccess(false)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Something went wrong.')
      setSuccess(json.message || 'Success!')
      return json.data || true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const put = async (endpoint, data) => {
    setLoading(true)
    setSuccess(false)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Update failed')
      setSuccess(json.message || 'Updated!')
      return json.data || true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const del = async (endpoint) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Delete failed')
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { 
    get, post, put, del,
    loading, success, error, 
    reset: () => { setSuccess(false); setError(null) } 
  }
}

// Hook for auth endpoints (no auth required)
export function useAuthApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const authPost = async (action, data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/auth?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Authentication failed')
      return json.data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { authPost, loading, error, reset: () => setError(null) }
}


import { useState } from 'react'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]   = useState(null)

  const post = async (endpoint, data) => {
    setLoading(true)
    setSuccess(false)
    setError(null)
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message || 'Something went wrong.')
      setSuccess(json.message || 'Sent successfully!')
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { post, loading, success, error, reset: () => { setSuccess(false); setError(null) } }
}

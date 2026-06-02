const BASE = '/api'

function getToken() {
  return localStorage.getItem('iprofixer_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem('iprofixer_token')
    localStorage.removeItem('iprofixer_user')
    window.location.href = '/login'
    return
  }

  const data = await res.json()
  if (!data.success) throw new Error(data.message || 'Request failed')
  return data
}

export const api = {
  get:    (path)         => request(path),
  post:   (path, body)   => request(path, { method: 'POST',  body: JSON.stringify(body) }),
  put:    (path, body)   => request(path, { method: 'PUT',   body: JSON.stringify(body) }),
  delete: (path)         => request(path, { method: 'DELETE' }),
}

export default api

import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setUsers).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="view"><div className="view-heading"><p className="eyebrow">The squad</p><h1>Users</h1><p>Meet the athletes building the habit.</p></div>{error ? <p className="error">{error}</p> : <div className="data-grid">{users.map((user) => <article className="data-card user-card" key={user._id}><span className="avatar">{user.avatar ?? user.name?.slice(0, 2)}</span><strong>{user.name}</strong><p>{user.email}</p></article>)}</div>}{!error && users.length === 0 && <p className="empty">No users found.</p>}</section>
}

export default Users
import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setLeaders).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="view"><div className="view-heading"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p>Momentum is better when it is shared.</p></div>{error ? <p className="error">{error}</p> : <div className="leaderboard">{leaders.map((leader, index) => <article className="leader-row" key={leader.user?._id ?? index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><strong>{leader.user?.name ?? 'Unknown athlete'}</strong><span>{leader.points ?? 0} pts</span><small>{leader.activities ?? 0} activities</small></article>)}</div>}{!error && leaders.length === 0 && <p className="empty">The leaderboard is waiting for its first scores.</p>}</section>
}

export default Leaderboard
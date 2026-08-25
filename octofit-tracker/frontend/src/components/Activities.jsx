import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="view"><div className="view-heading"><p className="eyebrow">Training log</p><h1>Activities</h1><p>Every session, captured and counted.</p></div>{error ? <p className="error">{error}</p> : <div className="data-grid">{activities.map((activity) => <article className="data-card" key={activity._id}><span className="card-kicker">{activity.type}</span><strong>{activity.durationMinutes} min</strong><p>{activity.points} points</p></article>)}</div>}{!error && activities.length === 0 && <p className="empty">No activities recorded yet.</p>}</section>
}

export default Activities
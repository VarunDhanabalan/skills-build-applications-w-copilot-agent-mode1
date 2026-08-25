import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="view"><div className="view-heading"><p className="eyebrow">Your next move</p><h1>Workouts</h1><p>Choose a challenge that fits today.</p></div>{error ? <p className="error">{error}</p> : <div className="data-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><span className="card-kicker">{workout.difficulty} · {workout.activityType}</span><strong>{workout.title}</strong><p>{workout.description}</p></article>)}</div>}{!error && workouts.length === 0 && <p className="empty">No workout suggestions yet.</p>}</section>
}

export default Workouts
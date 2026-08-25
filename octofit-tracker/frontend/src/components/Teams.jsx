import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(endpoint, controller.signal).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="view"><div className="view-heading"><p className="eyebrow">Find your people</p><h1>Teams</h1><p>Small groups. Big consistency.</p></div>{error ? <p className="error">{error}</p> : <div className="data-grid">{teams.map((team) => <article className="data-card" key={team._id}><span className="card-kicker">Team</span><strong>{team.name}</strong><p>{team.members?.length ?? 0} members</p></article>)}</div>}{!error && teams.length === 0 && <p className="empty">No teams have been created yet.</p>}</section>
}

export default Teams
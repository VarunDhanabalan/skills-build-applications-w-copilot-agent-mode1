import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <header className="topbar"><NavLink className="brand" to="/activities">OCTOFIT <span>TRACKER</span></NavLink><nav aria-label="Primary navigation"><NavLink to="/activities">Activities</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">Users</NavLink><NavLink to="/workouts">Workouts</NavLink></nav></header>
      <main><Routes><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes></main>
    </BrowserRouter>
  )
}

export default App

import cors from 'cors'
import express from 'express'
import db, { connectDatabase } from './config/database.js'
import apiRouter from './routes/index.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    health: '/api/health',
  })
})

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
  })
})
app.use('/api', apiRouter)

const server = app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`)
})

connectDatabase()

process.on('SIGTERM', () => {
  server.close()
})

export default app

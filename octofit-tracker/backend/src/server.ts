import cors from 'cors'
import express from 'express'
import db, { connectDatabase } from './config/database.js'
import apiRouter from './routes/index.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(cors())
app.use(express.json())

app.get('/', (_request, response) => {
  response.json({
    name: 'OctoFit Tracker API',
    apiBaseUrl,
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
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load env FIRST before any other imports
dotenv.config()
console.log('ENV CHECK:', {
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_ANON_KEY?.slice(0, 20) + '...'
})

import routesRouter from './routes/routes'
import hubsRouter from './routes/hubs'
import reviewsRouter from './routes/reviews'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/routes', routesRouter)
app.use('/api/hubs', hubsRouter)
app.use('/api/reviews', reviewsRouter)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Movocco API is running',
    supabase_url: process.env.SUPABASE_URL ? 'loaded' : 'MISSING',
    supabase_key: process.env.SUPABASE_ANON_KEY ? 'loaded' : 'MISSING',
  })
})

app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Movocco API running on http://localhost:${PORT}`)
})
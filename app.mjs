// Imports
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'

// Routes
import {testRouter} from './routes/test.js'
import {test2Router} from './routes/test2.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/test', testRouter)
app.use('/test2', test2Router)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
// Port
const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
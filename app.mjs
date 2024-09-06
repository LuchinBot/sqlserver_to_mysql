// Imports
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'

import {testRouter} from './routes/test.js'
const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/test', testRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
// Port
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
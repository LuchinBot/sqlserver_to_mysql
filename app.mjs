// Imports
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'

// Routes
import { sigaRouter } from './routes/siga.js'
import { crontabRouter } from './routes/crontab.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Bienvenidos al servidor!')
})
app.use('/siga', sigaRouter)
app.use('/crontab', crontabRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
// Port
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})

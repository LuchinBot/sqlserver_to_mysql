// swagger.js
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MigrAPI',
      version: '1.0.0',
      description: 'API para migrar datos del S.I.G.A'
    }
  },
  apis: ['./routes/crontab.js']
}

const swaggerSpec = swaggerJsdoc(options)

export const swaggerDocs = (app, port) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log(`📑 Documentación disponible en http://localhost:${port}/docs`)
}

// Imports
import { Router } from 'express'
import { CrontabController } from '../controllers/crontab.js'

// Routes
export const crontabRouter = Router()

crontabRouter.get('/', CrontabController.getAll)
crontabRouter.get('/truncate', CrontabController.truncateTables)
crontabRouter.get('/centrocosto', CrontabController.getCentroCosto)
crontabRouter.get('/ubicacionfisica', CrontabController.getUbicacionFisica)
crontabRouter.get('/personal', CrontabController.getPersonal)
crontabRouter.get('/tipopatrimonio', CrontabController.getTipoPatrimonio)
crontabRouter.get('/marca', CrontabController.getMarca)
crontabRouter.get('/grupo', CrontabController.getGrupo)
crontabRouter.get('/clase', CrontabController.getClase)
crontabRouter.get('/familia', CrontabController.getFamilia)
crontabRouter.get('/catalogo', CrontabController.getCatalogo)
crontabRouter.get('/asignar', CrontabController.getAsignar)

// Get con parametros
crontabRouter.get(
  '/centrocosto/:fecth/:limit',
  CrontabController.getCentroCosto
)
crontabRouter.get(
  '/ubicacionfisica/:fecth/:limit',
  CrontabController.getUbicacionFisica
)
crontabRouter.get('/personal/:fecth/:limit', CrontabController.getPersonal)
crontabRouter.get(
  '/tipopatrimonio/:fecth/:limit',
  CrontabController.getTipoPatrimonio
)
crontabRouter.get('/marca/:fecth/:limit', CrontabController.getMarca)
crontabRouter.get('/grupo/:fecth/:limit', CrontabController.getGrupo)
crontabRouter.get('/clase/:fecth/:limit', CrontabController.getClase)
crontabRouter.get('/familia/:fecth/:limit', CrontabController.getFamilia)
crontabRouter.get('/catalogo/:fecth/:limit', CrontabController.getCatalogo)
crontabRouter.get('/asignar/:fecth/:limit/:dni', CrontabController.getAsignar)

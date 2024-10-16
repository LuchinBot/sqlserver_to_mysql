// Imports
import { Router } from 'express'
import { SigaController } from '../controllers/siga.js'

// Routes
export const sigaRouter = Router()

sigaRouter.get('/', SigaController.getAll)

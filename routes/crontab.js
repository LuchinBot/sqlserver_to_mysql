// Imports
import { Router } from 'express'
import { CrontabController } from '../controllers/crontab.js'

// Routes
export const crontabRouter = Router()

crontabRouter.get('/', CrontabController.getAll)
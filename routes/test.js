// Imports
import { Router } from 'express'
import { TestController } from '../controllers/test.js'

// Routes
export const testRouter = Router()

testRouter.get('/', TestController.getAll)
// Imports
import { Router } from 'express'
import { Test2Controller } from '../controllers/test2.js'

// Routes
export const test2Router = Router()

test2Router.get('/', Test2Controller.getAll)
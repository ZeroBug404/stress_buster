import express, { Router } from 'express'
import { MoodControllers } from './mood.controller'

const router: Router = express.Router()

router.get('/', MoodControllers.getAllMoods)

export const moodRoutes = router

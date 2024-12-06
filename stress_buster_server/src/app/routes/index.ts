import express from 'express'
import { moodRoutes } from '../modules/Mood/mood.routes'

const router = express.Router()

const moduleRoutes = [{ path: '/moods', route: moodRoutes }]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router

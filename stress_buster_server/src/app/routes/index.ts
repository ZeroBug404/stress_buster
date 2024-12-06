import express from 'express'
import { moodRoutes } from '../modules/Mood/mood.routes'
import { chatRoutes } from '../modules/Chat/chat.routes'

const router = express.Router()

const moduleRoutes = [
  { path: '/moods', route: moodRoutes },
  { path: '/chats', route: chatRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router

import express, { Router } from 'express'
import {
  connectWithChatBot,
  connectWithChatBotWithoutUser,
} from './chat.service'
// import { MoodControllers } from './mood.controller'

const router: Router = express.Router()

router.get('/chat', connectWithChatBot)
router.get('/chat-noUser', connectWithChatBotWithoutUser)

export const chatRoutes = router

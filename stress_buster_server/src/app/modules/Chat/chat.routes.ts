import express, { Router } from 'express'
import { connectWithChatBot } from './chat.service';
// import { MoodControllers } from './mood.controller'

const router: Router = express.Router()

router.get('/chat', connectWithChatBot);

export const chatRoutes = router

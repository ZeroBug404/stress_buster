import { Router } from 'express'
import { signinwithGoogle } from './user.service'

const router = Router()

router.post('/google-login', signinwithGoogle)

//
export const userRouter = router

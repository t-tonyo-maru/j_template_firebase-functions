// express
import express from 'express'
// handler
import { createJWT } from '@/controller/handler/authHandler/authHandler'

const jwtRouter = express.Router()

jwtRouter.post('/jwt', createJWT)

export { jwtRouter }

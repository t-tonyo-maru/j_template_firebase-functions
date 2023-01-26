// express
import express from 'express'
// lib
import helmet from 'helmet'
// middleware
import { errorHandler } from '@/middleware/errorHandler/errorHandler'
// routes
import { jwtRouter } from '@/routes/auth/index'
import { todosRouter } from '@/routes/todos/index'

// app
export const app: express.Express = express()
// helmet適用
app.use(helmet())

// jsonデータを扱う
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// router割り当て
app.use('/', jwtRouter)
app.use('/', todosRouter)

// all catch error handlerを設定
app.use('/', errorHandler)

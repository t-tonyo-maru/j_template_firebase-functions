// express
import express from 'express'
// handler
import {
  authenticateWithJWT,
  authenticateWithFirebase
} from '@/controller/handler/authHandler/authHandler'
import {
  getAllTodoHandler,
  getUsersTodoHandler,
  createTodoHandler,
  updateTodoHandler,
  deleteTodoHandler
} from '@/controller/handler/todoHandler/todoHandler'

const todosRouter = express.Router()

todosRouter.get(
  '/todo/all',
  [authenticateWithJWT, authenticateWithFirebase],
  getAllTodoHandler
)

todosRouter.get(
  '/todo/:uid',
  [authenticateWithJWT, authenticateWithFirebase],
  getUsersTodoHandler
)

todosRouter.post(
  '/todo',
  [authenticateWithJWT, authenticateWithFirebase],
  createTodoHandler
)

todosRouter.put(
  '/todo',
  [authenticateWithJWT, authenticateWithFirebase],
  updateTodoHandler
)

todosRouter.delete(
  '/todo/:todo_id',
  [authenticateWithJWT, authenticateWithFirebase],
  deleteTodoHandler
)

export { todosRouter }

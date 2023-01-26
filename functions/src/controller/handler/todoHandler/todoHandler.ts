// express
import { Request, Response } from 'express'
// firebase
import * as functions from 'firebase-functions'
import { admin, db } from '@/settings/firebase'
// settings
import { settings } from '@/settings/settings'
// types
import { TodoType } from '@/types/todo'

/**
 * todoリスト取得のhandler関数です
 *
 * @param {Request} _req express.Request。利用しません。
 * @param {Response} res express.Response。
 * @param {ReturnType<getAllTodoHandler>}
 */
export const getAllTodoHandler = async (_req: Request, res: Response) => {
  const todos: TodoType[] = []

  try {
    const querySnapShot = await db
      .collection(`${settings.firestoreCollectionNames.todos}`)
      .get()

    querySnapShot.forEach((doc) => {
      // TODO: as 構文を修正すること
      todos.push({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at.toDate(),
        updated_at: doc.data().updated_at.toDate()
      } as TodoType)
    })

    res.json({
      message: 'success',
      todos: todos.map((todo) => {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          is_complete: todo.is_complete,
          created_at: todo.created_at,
          updated_at: todo.updated_at
        }
      })
    })
  } catch (err) {
    // prettier-ignore
    functions.logger.info(`[${new Date().toISOString()}]: getAllTodoHandler Error.`)
    res.status(500).json({
      message: 'error'
    })
  }
}

/**
 * あるユーザーのtodoを取得する関数
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @param {ReturnType<createTodoHandler>}
 */
export const getUsersTodoHandler = async (req: Request, res: Response) => {
  const todos: TodoType[] = []
  const uid = req.params.uid

  try {
    const querySnapShot = await db
      .collection(`${settings.firestoreCollectionNames.todos}`)
      .get()

    querySnapShot.forEach((doc) => {
      // TODO: as 構文を修正すること
      todos.push({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at.toDate(),
        updated_at: doc.data().updated_at.toDate()
      } as TodoType)
    })

    res.json({
      message: 'success',
      todos: todos.filter((todo) => todo.user_id === uid)
    })
  } catch (err) {
    // prettier-ignore
    functions.logger.info(`[${new Date().toISOString()}]: getUsersTodoHandler Error.`)
    res.status(500).json({
      message: 'error'
    })
  }
}

/**
 * todo生成の関数
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @param {ReturnType<createTodoHandler>}
 */
export const createTodoHandler = async (req: Request, res: Response) => {
  const uid: string = req.body.uid
  const todoTitle: string = req.body.title
  const todoDescription: string = req.body.description

  // TODO: バリデーション

  try {
    const docRef = await db
      .collection(`${settings.firestoreCollectionNames.todos}`)
      .add({
        user_id: uid,
        title: todoTitle,
        description: todoDescription,
        is_complete: false,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      })
    const docSnapshot = await docRef.get()

    res.json({
      message: 'success',
      newTodo: {
        id: docSnapshot.id,
        ...docSnapshot.data()
      }
    })
  } catch (err) {
    // prettier-ignore
    functions.logger.info(`[${new Date().toISOString()}]: createTodoHandler Error.`)
    res.status(500).json({
      message: 'error'
    })
  }
}

/**
 * 特定のtodoを更新する関数
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @param {ReturnType<updateTodoHandler>}
 */
export const updateTodoHandler = async (req: Request, res: Response) => {
  const id: string = req.body.id
  const todoTitle: string = req.body.title
  const todoDescription: string = req.body.description
  const todoIsComplete: boolean = req.body.isComplete

  // TODO: バリデーション

  try {
    await db
      .collection(`${settings.firestoreCollectionNames.todos}`)
      .doc(id)
      .update({
        title: todoTitle,
        description: todoDescription,
        is_complete: todoIsComplete,
        updated_at: admin.firestore.FieldValue.serverTimestamp()
      })

    res.json({
      message: 'success'
    })
  } catch (err) {
    // prettier-ignore
    functions.logger.info(`[${new Date().toISOString()}]: updateTodoHandler Error.`)
    res.status(500).json({
      message: 'error'
    })
  }
}

/**
 * 特定のtodoを削除する関数
 *
 * @param {Request} req express.Request
 * @param {Response} res express.Response
 * @param {ReturnType<deleteTodoHandler>}
 */
export const deleteTodoHandler = async (req: Request, res: Response) => {
  const todoId: string = req.params.todo_id
  // TODO: バリデーション

  try {
    await db
      .collection(`${settings.firestoreCollectionNames.todos}`)
      .doc(todoId)
      .delete()

    res.json({
      message: 'success'
    })
  } catch (err) {
    // prettier-ignore
    functions.logger.info(`[${new Date().toISOString()}]: deleteTodoHandler Error.`)
    res.status(500).json({
      message: 'error'
    })
  }
}

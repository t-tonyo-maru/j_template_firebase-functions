// lib
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'
import * as functions from 'firebase-functions'
import { plainToInstance } from 'class-transformer'
// service
import { FirebaseService } from '@/firebase/firebase.service'
// dto
import { TodoDto, CreateTodoDto, UpdateTodoDto } from '@/todos/dto/todo.dto'
// converter
import {
  toFirestoreConverter,
  fromFirestoreConverter
} from '@/todos/converter/todo.converter'

@Injectable()
export class TodosService {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * todoの全リストを取得する
   *
   * @return {Promise<{message: string; todos: TodoDto[]; total: number; }>}
   */
  async getTodoList() {
    const querySnapShot = await this.firebaseService
      .getDBsTodosCollection()
      .withConverter<TodoDto>({
        toFirestore: toFirestoreConverter,
        fromFirestore: fromFirestoreConverter
      })
      .limit(50)
      .get()
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > getTodoList Error.`)
        throw new InternalServerErrorException()
      })

    const todos: TodoDto[] = []
    querySnapShot.forEach((doc) => {
      todos.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        isComplete: doc.data().isComplete,
        userId: doc.data().userId,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      })
    })

    return {
      message: 'SUCCESS',
      todos,
      total: todos.length
    }
  }

  /**
   * 特定のユーザーのtodoを取得する
   *
   * @param {string} uid - ユーザーID
   * @return {Promise<{message: string; todos: TodoDto[]; total: number; }>}
   */
  async getUsersTodos(uid: string) {
    const querySnapShot = await this.firebaseService
      .getDBsTodosCollection()
      .withConverter<TodoDto>({
        toFirestore: toFirestoreConverter,
        fromFirestore: fromFirestoreConverter
      })
      .limit(50)
      .where('user_id', '==', uid)
      .get()
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > getUsersTodos Error.`)
        throw new InternalServerErrorException()
      })

    const todos: TodoDto[] = []
    querySnapShot.forEach((doc) => {
      todos.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        isComplete: doc.data().isComplete,
        userId: doc.data().userId,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      })
    })

    return {
      message: 'SUCCESS',
      todos,
      total: todos.length
    }
  }

  /**
   * TODOを生成する
   *
   * @param {CreateTodoDto} payloadTodo - 新規作成するTODO
   * @return {Promise<{message: string; todo: TodoDto; }>}
   */
  async createTodo(payloadTodo: CreateTodoDto) {
    const docRef = await this.firebaseService
      .getDBsTodosCollection()
      .add({
        user_id: payloadTodo.userId,
        title: payloadTodo.title,
        description: payloadTodo.description,
        is_complete: false,
        created_at: this.firebaseService
          .getFirestore()
          .FieldValue.serverTimestamp(),
        updated_at: this.firebaseService
          .getFirestore()
          .FieldValue.serverTimestamp()
      })
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > createTodo Error.`)
        throw new InternalServerErrorException()
      })

    const docSnapshot = await docRef
      .withConverter<TodoDto>({
        toFirestore: toFirestoreConverter,
        fromFirestore: fromFirestoreConverter
      })
      .get()
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > createTodo Error.`)
        throw new InternalServerErrorException()
      })

    const newTodo = docSnapshot.data()
    if (typeof newTodo === 'undefined') {
      throw new InternalServerErrorException()
    }

    return {
      message: 'SUCCESS',
      todo: plainToInstance(TodoDto, {
        id: docSnapshot.id,
        title: newTodo.title,
        description: newTodo.description,
        isComplete: newTodo.isComplete,
        userId: newTodo.userId,
        createdAt: newTodo.createdAt,
        updatedAt: newTodo.updatedAt
      })
    }
  }

  /**
   * 特定のTODOを更新する
   *
   * @param {UpdateTodoDto} payloadTodo - 編集後のTODO
   * @return {Promise<{message: string}>}
   */
  async updateTodo(payloadTodo: UpdateTodoDto) {
    const docRef = this.firebaseService
      .getDBsTodosCollection()
      .doc(payloadTodo.id)

    // 存在チェック
    const docSnapshot = await docRef
      .withConverter<TodoDto>({
        toFirestore: toFirestoreConverter,
        fromFirestore: fromFirestoreConverter
      })
      .get()
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > updateTodo Error.`)
        throw new InternalServerErrorException()
      })
    if (docSnapshot.exists === false) {
      throw new BadRequestException()
    }
    // 更新処理
    await docRef
      .update({
        title: payloadTodo.title,
        description: payloadTodo.description,
        is_complete: payloadTodo.isComplete,
        updated_at: this.firebaseService
          .getFirestore()
          .FieldValue.serverTimestamp()
      })
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > updateTodo Error.`)
        throw new InternalServerErrorException()
      })

    return {
      message: 'SUCCESS'
    }
  }

  /**
   * 特定のTODOを削除する
   *
   * @param {string} id - 削除するTODOのid
   * @return {Promise<{message: string}>}
   */
  async deleteTodo(id: string) {
    const docRef = this.firebaseService.getDBsTodosCollection().doc(id)

    // 存在チェック
    const docSnapshot = await docRef
      .withConverter<TodoDto>({
        toFirestore: toFirestoreConverter,
        fromFirestore: fromFirestoreConverter
      })
      .get()
      .catch(() => {
        // prettier-ignore
        functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > deleteTodo Error.`)
        throw new InternalServerErrorException()
      })
    if (docSnapshot.exists === false) {
      throw new BadRequestException()
    }
    // 削除処理
    await docRef.delete().catch(() => {
      // prettier-ignore
      functions.logger.info(`[${new Date().toISOString()}]: todos/todos.service.ts > deleteTodo Error.`)
      throw new InternalServerErrorException()
    })

    return {
      message: 'SUCCESS'
    }
  }
}

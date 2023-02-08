// lib
import admin from 'firebase-admin'
import { plainToInstance } from 'class-transformer'
// dto
import { TodoDto } from '@/todos/dto/todo.dto'

/**
 * 引数オブジェクトを、Firebaseのsnapshotのスキーマに合わせて変換するための関数<br>
 * withConverter({toFirestore: toFirestoreConverter})として、セットします
 *
 * @param {TodoDto} todo - 変換対象オブジェクト
 * @return {ReturnType<toFirestoreConverter>} - 変換対象オブジェクトをFirestoreのsnapshotのスキーマに合わせて変換したもの
 */
export const toFirestoreConverter = (todo: TodoDto) => {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    is_complete: todo.isComplete,
    user_id: todo.userId,
    created_at: todo.createdAt,
    updated_at: todo.updatedAt
  }
}

/**
 * Firestoreのsnapshotをオブジェクトに変換するための関数<br>
 * withConverter({fromFirestore: fromFirestoreConverter})として、セットします
 *
 * @param {admin.firestore.QueryDocumentSnapshot} snapshot - Firestoreのsnapshot
 * @return {TodoDto} - Firestoreのsnapshotを変換したオブジェクト
 */
export const fromFirestoreConverter = (
  snapshot: admin.firestore.QueryDocumentSnapshot
) => {
  const data = snapshot.data()
  return plainToInstance(TodoDto, {
    id: data.id,
    title: data.title,
    description: data.description,
    isComplete: data.is_complete,
    userId: data.user_id,
    createdAt: data.created_at.toDate(),
    updatedAt: data.updated_at.toDate()
  })
}

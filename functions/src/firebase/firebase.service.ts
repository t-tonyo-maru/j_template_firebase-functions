// lib
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import admin from 'firebase-admin'

@Injectable()
export class FirebaseService {
  app: admin.app.App
  auth: admin.auth.Auth
  db: admin.firestore.Firestore
  bucket: ReturnType<admin.storage.Storage['bucket']>

  constructor(private readonly configService: ConfigService) {
    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.configService.get<string>(
          'firebaseCredentials.projectId'
        )!,
        clientEmail: this.configService.get<string>(
          'firebaseCredentials.clientEmail'
        )!,
        privateKey: this.configService
          .get<string>('firebaseCredentials.privateKey')!
          .replace(/\\n/g, '\n')
      })
    })
    this.auth = this.app.auth()
    this.db = this.app.firestore()
    this.bucket = this.app
      .storage()
      .bucket(
        `${this.configService.get<string>(
          'firebaseCredentials.projectId'
        )!}.appspot.com`
      )
  }

  /**
   * Firebase Authを取得する
   *
   * @return {admin.auth.Auth}
   */
  getAuth() {
    return this.auth
  }

  /**
   * Firestoreのtodosコレクションを取得します
   *
   * @return {CollectionReference<DocumentData>}
   */
  getDBsTodosCollection() {
    return this.db.collection(
      this.configService.get<string>('firestoreCollectionNames.todos') ||
        'todos'
    )
  }

  /**
   * Firebase storageのバケットを取得します
   *
   * @return {ReturnType<admin.storage.Storage['bucket']>}
   */
  getBucket() {
    return this.bucket
  }

  /**
   * Firebase firestoreを取得する<br>
   * Firesotreのcreated_at / updated_atを生成するために利用します
   *
   * @return {Firestore}
   */
  getFirestore() {
    return admin.firestore
  }
}

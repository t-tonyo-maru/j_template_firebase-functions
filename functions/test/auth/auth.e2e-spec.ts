// nodejs
import path from 'path'
// lib
import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { initializeApp, FirebaseApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  Auth as ClientFirebaseAuth
} from 'firebase/auth'
// module
import { AuthModule } from '@/auth/auth.module'
import { TodosModule } from '@/todos/todos.module'
import { FirebaseModule } from '@/firebase/firebase.module'
import { StorageModule } from '@/storage/storage.module'
import { VersionModule } from '@/version/version.module'
// controller / service
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
// config
import configuration from '@/config/configuration'

describe('Auth Guard (e2e)', () => {
  let nestApp: INestApplication // NestJS App
  let frontendFirebaseApp: FirebaseApp // Frontend Firebase App
  let frontendFirebaseAuth: ClientFirebaseAuth // Frontend Firebase Auth
  // Frontend のテストユーザー
  const frontendTestUser = {
    email: '',
    password: ''
  }

  // テスト開始前: 初期セットアップ
  beforeAll(async () => {
    // NestJS App 初期化
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // 環境変数をセット
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          // テストプロジェクトの設定情報を読み込む
          envFilePath: path.resolve(process.cwd(), '.env.test')
        }),
        AuthModule,
        TodosModule,
        FirebaseModule,
        StorageModule,
        VersionModule
      ],
      controllers: [AppController],
      providers: [AppService]
    }).compile()
    nestApp = moduleFixture.createNestApplication()
    await nestApp.init()

    // Frontend Firebase App 初期化
    frontendFirebaseApp = initializeApp({
      apiKey: `${process.env.FB_CLIENT_API_KEY}`,
      authDomain: `${process.env.FB_CLIENT_AUTH_DOMAIN}`,
      projectId: `${process.env.FB_CLIENT_PROJECT_ID}`,
      storageBucket: `${process.env.FB_CLIENT_STORAGE_BUCKET}`,
      messagingSenderId: `${process.env.FB_CLIENT_MESSAGING_SENDER_ID}`,
      appId: `${process.env.FB_CLIENT_APP_ID}`
    })
    // Frontend Firebase Auth 初期化
    frontendFirebaseAuth = getAuth(frontendFirebaseApp)
    // テストユーザー情報を環境変数から取得してセット
    frontendTestUser.email = `${process.env.FB_CLIENT_TEST_USER_EMAIL}`
    frontendTestUser.password = `${process.env.FB_CLIENT_TEST_USER_PASSWORD}`
  })

  // 各テストケース終了時
  afterEach(async () => {
    await signOut(frontendFirebaseAuth)
  })

  it('認証不可テスト: 認証を経ていない状態で todos へのリクエストは 401 であること', async () => {
    const res = await request(nestApp.getHttpServer()).get('/todos')
    expect(res.status).toBe(401)
  })

  it('認証不可テスト: 認証を経ていない状態で storage へのリクエストは 401 であること', async () => {
    const res = await request(nestApp.getHttpServer()).get('/storage/image')
    expect(res.status).toBe(401)
  })

  it('認証可テスト: テストプロジェクトのユーザーでログイン済の場合、todos へのリクエストは 200 であること', async () => {
    // フロントエンド側でユーザーがログインする想定
    const loginUser = await signInWithEmailAndPassword(
      frontendFirebaseAuth,
      frontendTestUser.email,
      frontendTestUser.password
    )
    // ログイン後に token を生成
    const idToken = await loginUser.user.getIdToken()
    const res = await request(nestApp.getHttpServer())
      .get('/todos')
      .auth(idToken, { type: 'bearer' })

    expect(res.status).toBe(200)
  })

  it('認証可テスト: テストプロジェクトのユーザーでログインして、todos 全件を取得する。todo は全件で 3 件であること', async () => {
    const loginUser = await signInWithEmailAndPassword(
      frontendFirebaseAuth,
      frontendTestUser.email,
      frontendTestUser.password
    )
    const idToken = await loginUser.user.getIdToken()
    const res = await request(nestApp.getHttpServer())
      .get('/todos')
      .auth(idToken, { type: 'bearer' })

    expect(res.body.total).toBe(3)
  })

  // テスト終了時
  afterAll(async () => {
    await nestApp.close()
  })
})

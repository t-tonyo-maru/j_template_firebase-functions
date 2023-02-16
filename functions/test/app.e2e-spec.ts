// nodejs
import path from 'path'
// lib
import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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

describe('AppController (e2e)', () => {
  let app: INestApplication // NestJS App

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
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('test: METHOD/GET, URL: "/version"', async () => {
    const res = await request(app.getHttpServer()).get('/version')
    expect(res.body.message).toBe('SUCCESS')
  })

  // テスト終了時
  afterAll(async () => {
    // アプリケーションを終了
    await app.close()
  })
})

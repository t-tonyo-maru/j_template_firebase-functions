// lib
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
// module
import { AppModule } from '@/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  // テスト開始前
  beforeAll(async () => {
    // テストモジュール生成
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    // アプリケーションの初期化
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

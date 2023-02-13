// lib
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
// module
import { AppModule } from '@/app.module'

describe('Auth Guard (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('test: 認証を経ていない状態で todos へのリクエストは 401 であること', async () => {
    const res = await request(app.getHttpServer()).get('/todos')
    expect(res.status).toBe(401)
  })

  it('test: 認証を経ていない状態で storage へのリクエストは 401 であること', async () => {
    const res = await request(app.getHttpServer()).get('/storage/image')
    expect(res.status).toBe(401)
  })

  afterAll(async () => {
    await app.close()
  })
})

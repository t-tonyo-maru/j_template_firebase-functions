// lib
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
// module
import { AuthModule } from '@/auth/auth.module'
import { FirebaseModule } from '@/firebase/firebase.module'
// controller / service
import { TodosController } from '@/todos/todos.controller'
import { TodosService } from '@/todos/todos.service'
// guard
import { AuthGuard } from '@/auth/auth.guard'
// config
import configuration from '@/config/configuration'

describe('TodosService', () => {
  let service: TodosService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        FirebaseModule,
        // 環境変数をセット
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        })
      ],
      providers: [TodosService],
      controllers: [TodosController]
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    service = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('TodosServiceのgetTodoList()で todo の総数を取得できるようにする。todo の総数は3件であること', async () => {
    const result = await service.getTodoList()
    expect(result.total).toBe(3)
  })
})
